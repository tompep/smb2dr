
// basic tile locator
//
var pos_tile = function(x, y, page){
    this.pos_x = x
    this.pos_y = y
    this.pos_page = page
    this.id = function(){
        return [this.pos_x, this.pos_y, this.pos_page]
    }
    this.adjust = function(dir, vert){
        var j = dir[0] + this.pos_x
        var i = dir[1] + this.pos_y
        var page_offset = 0

        if (j < 0) {
            if (!vert) page_offset--
            else return null
            j = j + 16
        }
        else if (j > 15){
            if (!vert) page_offset++
            else return null
            j -= 16
        }
        if (i < 0) {
            if (vert) page_offset--
            else return null
            i = i + 15
        }
        else if (i > 14){
            if (vert) page_offset++
            else return null
            i -= 15
        }

        return new pos_tile(j, i, this.pos_page + page_offset)
    }
}

var up = [0, -1],
    down = [0, 1],
    left = [-1, 0],
    right = [1, 0]

// Function to write bytes to output

function write_enemy_bytes(enemies, page_cnt, vertical){
    var output = []
    var converted_enemies = enemies.map(function(ele){
        var conv_pos = convert_coords_obj_to_item(ele.pos_page, ele.pos_y, ele.pos_x, vertical)
        return create_smb_enemy(ele.obj_type, conv_pos.y, conv_pos.x, conv_pos.page)
    })
    for (var i = 0; i < page_cnt; i++){
        var enemy_by_page = converted_enemies.filter(function page_sort(p){ return p.pos_page === i })
        enemy_by_page = enemy_by_page.sort ((a, b) => a.obj_type - b.obj_type)
        var cnt = 1 + 2 * enemy_by_page.length
        output.push(cnt)
        for (var index in enemy_by_page){
            var x = enemy_by_page[index]
            output.push(x.obj_type)
            output.push((x.pos_x << 4) + x.pos_y)
        }
    }
    return output
}

function write_header_bytes(h){
    var byte1 = (h.horizontal << 7) + (h.unk1 << 6) + (h.pala << 3)
    byte1 += (h.unk2 << 2) + (h.palb)
    var byte2 = (h.unk3 << 5) + h.ground_set
    var byte3 = (h.pages << 4) + h.exterior_type
    if (!Array.isArray(h.ground_type))
        var byte4 = (h.unk4 << 6) + (h.ground_type << 3) 
    else
        var byte4 = (h.unk4 << 6) + (0 << 3) 
    byte4 += (h.unk5 << 2) + (h.music)
    
    return [byte1, byte2, byte3, byte4]
}
    

function create_ground_modifier(data){
    return [0xfa].concat(data.slice(1))
}

function push_modifier(mod, code=0xf9){
    var memory_l = mod.loc_l
    var memory_r = mod.loc_r
    var contents = mod.contents
    var length = mod.contents.length
    if (mod.repeat){
        contents = mod.contents[0]
        length = 0x40 + mod.repeat
    }
    if (mod.vertical){
        length = 0x80 + length
    }
    console.debug([code, memory_l, memory_r, length].concat(contents))
    return [code, memory_l, memory_r, length].concat(contents)
}

function write_level_bytes(my_l, world=0){
    var lvl = my_l.objs
    var ptrs = my_l.ptrs
    var grounds = my_l.grounds

    var output = []
    var output_chunks = []
    var sorted = lvl.sort(function(a, b) {
        return a.layer - b.layer || a.pos_page - b.pos_page || a.pos_y - b.pos_y || a.pos_x - b.pos_x
    })
    sorted = sorted.filter(x => x.obj_type >= 0)
    var sorted_ground = grounds
    sorted_ground = grounds.sort(function(a,b){
        return  a.pos_page - b.pos_page || a.column_tile - b.column_tile
    })

    if (Array.isArray(my_l.header.ground_type)){
        var b = create_ground_modifier(my_l.header.ground_type)
        output.push(...b, my_l.world + 1)
        console.debug(output.map(x => decimalToHexString(x)))
    }

    // for each layer that isn't empty
    for (var layer = 0; layer < 10; layer++){
        var layer_objs = sorted.filter(x => x.layer === layer)
        if (layer_objs.length === 0 && layer != 0){
            break
        } 
        else if (layer > 0) output.push(0xf4)

        var lasty = 15
        // for each page, get objs
        for (var i = 0; i < 10; i++){
            var prev_output = output.slice(0)
            var page_objs = layer_objs.filter(x => x.pos_page === i)
            var destobj = ptrs.filter(x => x != undefined && x.pos_page === i)
            var grouobjs = sorted_ground.filter(x => x.pos_page === i)
            if (destobj.length > 0) destobj = destobj[0]
            else destobj = undefined

            // subtract by 15 to offset last position
            //   if no object exists, will continue to subtract 15
            //   if any objects exist, lasty will end up greater than 0 until next page
            var obj = page_objs[0]
            var g_obj = grouobjs[0] 
            lasty = lasty - 15

            for (var j = 0; j < page_objs.length; j++){
                var obj = page_objs[j]
                var cur_y = obj.pos_y - lasty
                // due to subtraction, new position is distance between last
                //   if greater than 15, adjust until it is back to the top of current page
                if(cur_y >= 15){
                    var cnt = Math.ceil(Math.abs((lasty / 15)))
                    while (cnt > 0){
                        if (output[output.length-1] === 0xf2) output[output.length-1] = 0xf3
                        else output.push(0xf2)
                        cnt -= 1
                    }
                    cur_y = obj.pos_y
                }
                lasty = obj.pos_y

                var posbyte = (Math.abs(cur_y) << 4) + obj.pos_x
                var objbyte = obj.obj_type

                output.push(posbyte)
                output.push(objbyte)
                // push door here
                if (obj_doors.includes(objbyte) && destobj){
                    var ptr_bytes = ptr_object_to_bytes(destobj)
                    output.push(...ptr_bytes)
                    destobj = undefined
                }
            }
            

            // at end of page, push ground objects and pointrs
            //   if objs didn't exist, lasty will be negative, add pages until correct
            if (layer === 0 && (destobj != undefined || grouobjs.length > 0)){ 
                if (lasty < 0){
                    while (lasty < 0){
                        lasty += 15
                        if (output[output.length-1] === 0xf2) output[output.length-1] = 0xf3
                        else output.push(0xf2)
                    }
                    lasty = 0
                }
                for (var j = 0; j < grouobjs.length; j++){
                    obj = grouobjs[j]
                    var left_byte = 0xf0 + ((obj.column_tile & 0b1000) >> 3)
                    if (obj.invert) left_byte += 7
                    var right_byte = ((obj.column_tile & 0b0111) << 5) + obj.ground_set
                    output.push(left_byte)
                    output.push(right_byte)
                    if (obj.ground_type != undefined){
                        if (Array.isArray(obj.ground_type)){
                            var mod = create_ground_modifier(obj.ground_type)
                            output.push(...mod, my_l.world + 1)
                        }
                        else {
                            output.push(0xF6)
                            output.push(obj.ground_type)
                        }
                    }
                }
                // if door is on another layer, it's a problem
                if (destobj != undefined) {
                    var ptr_bytes = ptr_object_to_bytes(destobj)
                    output.push(...ptr_bytes)
                    destobj = undefined
                }
            }

            if (output.length > 240){
                console.error(prev_output.length, layer, i)
                output_chunks.push(prev_output)
                output = output.slice(prev_output.length)
            prev_output.push(0xff)
            }

        }
    }

    var prev_output = output.slice(0)

    if (my_l.modifiers.length){
        for(var mod of my_l.modifiers){
            output.push(...push_modifier(mod))
        }
    }

    if (my_l.hotspots.length){
        var output_hot = [0xf9, 0x76, 0xa0]
        var output_content = []
        for(var mod of my_l.hotspots){
            var pos_page = mod.pos_page
            var pos_y = mod.pos_y
            var pos_x = mod.pos_x
            var pos_yx = pos_y << 4
            pos_yx += pos_x
            var contents = mod.contents
            while (contents.length < 3)
                contents.push(0x00)
            output_content.push(...([pos_page, pos_yx].concat(contents.slice(0, 3))))
        }
        output.push(...output_hot)
        output.push(output_content.length)
        output.push(...output_content)
        console.debug(my_l.hotspots, output_content)
    }

    if (output.length > 240){
        console.error(prev_output.length)
        output_chunks.push(prev_output)
        output = output.slice(prev_output.length)
        prev_output.push(0xff)
    }

    if (my_l.is_jar){
        output.push(...push_modifier({
            loc_l: 0x04,
            loc_r: 0xee,
            contents: [my_l.is_jar]
        }))
    }

    output.push(0xff)

    output_chunks.push(output)

    return output_chunks
}


// Helper Functions for level
//

function convert_hotspot(l_byte, r_byte){
    var full_byte = l_byte << 8 
    full_byte += r_byte - 0x6000
    return {
        pos_page: ~~(full_byte / 0xF0),
        pos_y: ~~((full_byte % 0xF0) / 0x10),
        pos_x: ~~((full_byte % 0x10))
    }
}

function convert_coords(page, y, x, vertical){
    y = vertical ? y + page : y
    page = page + ~~(y / 15)
    y = y % 15
    return {
        page: page,
        x: x,
        y: y
    }
}

function convert_coords_obj_to_item(page, y, x, vertical){
    y = vertical ? (y + 15 * page) : y
    page = vertical ? ~~(y / 16) : page
    y = y % 16
    return {
        page: page,
        x: x,
        y: y
    }
}

function convert_coord_to_hotspot(page, x, y){
    var full_byte = 0x6000
    full_byte += 0xf0 * page
    full_byte += y * 0x10 + x
    return {
        l_byte: full_byte >> 8,
        r_byte: full_byte % 256
    }
}

function get_wlrp_index(i, p){
    return {
        wl: parseInt(i/10),
        rp: (parseInt(i%10) << 4) + p
    }
}

function get_wlrp(w, l, r, p){
    return {
        wl: w * 3 + l,
        rp: (r << 4) + p
    }
}

function ptr_object_to_bytes (ptr, world=-1){
    var output = []
    if (ptr != undefined) {
        if (world >= world_ptr_limit){
            output.push(0xf5)
        }
        var content = get_wlrp(ptr.world, ptr.level, ptr.room, ptr.dest_page)
        var left_byte = content.wl 
        left_byte += ptr.continue_after ? 0x80 : 0
        left_byte += ptr.reset_pos_after ? 0x40 : 0
        left_byte += ptr.slots_after ? 0x20 : 0
        output.push(left_byte)
        output.push(content.rp)
    }
    else {
        if (world >= world_ptr_limit){
            output.push(0xf5)
        }
        output.push(0)
        output.push(0)
    }
    return output
}

function create_ptr_wlrp(w, l, r, p, my_page, flags=0x0){
    var door_ptr = get_wlrp(w, l, r, p)
    return extract_door_ptr(flags + door_ptr.wl, door_ptr.rp, my_page)
}

// TODO: Make these functions as "objects"
function create_smb_object(type, x, y, page, layer=0, param=0){
    var obj_name = get_map_obj_id(type)
    return {
        obj_name: obj_name,
        obj_type: type,
        pos_x: x,
        pos_y: y,
        pos_page: page,
        layer: layer,
        to_pos_tile: function () {new pos_tile(this.pos_x, this.pos_y, this.pos_page)},
        adjust_obj: function (dir, vert) {
            var new_pos = this.to_pos_tile().adjust(dir, vert)
            this.pos_x = new_pos.pos_x
            this.pos_y = new_pos.pos_y
            this.pos_page = new_pos.pos_page
        }
    }
}

function create_smb_enemy(type, y, x, page, vertical){
    var obj_name = EnemyIds[type]
    return {
        obj_name: obj_name,
        obj_type: type,
        pos_x: x,
        pos_y: vertical ? (y + 16 * page) % 15 : y,
        pos_page: vertical ? ~~((y + 16 * page) / 15) : page,
        to_pos_tile: function () {new pos_tile(this.pos_x, this.pos_y, this.pos_page)},
        adjust_obj: function (dir, vert) {
            var new_pos = this.to_pos_tile().adjust(dir, vert)
            this.pos_x = new_pos.pos_x
            this.pos_y = new_pos.pos_y
            this.pos_page = new_pos.pos_page
        }
    }
}

// ROM byte gets

function extract_door_ptr(l, r, my_page){
    var n_l = l
    var l = l & 0b00011111
    return {
        obj_type: 0xf5,
        dest_page: r & 0x0f,
        room: r >> 4,
        world: ~~(l / 3),
        level: l % 3,
        level_room: l * 10 + (r >> 4),
        l_byte: l,
        r_byte: r,
        continue_after:     (n_l & 0b10000000) == 0x80,
        reset_pos_after:    (n_l & 0b01000000) == 0x40,
        slots_after:        (n_l & 0b00100000) == 0x20,
        pos_page: my_page
    }
}


function extract_tile_bytes(contents, mem_locs={}){
    // TODO: update this for memory.js functions
    var bank_offset = 0x8000
    var tile_block = 0x2000 * 6
    var bytes = contents.slice(tile_block)
    // 8000, 16 * 7, 12 * 3
    var backgr_pal_ptrs = extract_ptrs(bytes, 14).map(x => x - bank_offset)
    var background_pals = backgr_pal_ptrs.slice(0,7).map(x => Array.split(Array.split(bytes.slice(x, x+4*4*8), 4), 4))
    var sprite_pals = backgr_pal_ptrs.slice(7,14).map(x => Array.split(Array.split(bytes.slice(x, x+3*4*4), 4), 3))

    //
    var remainder = bytes.slice(14*2 + 7*16*7 + 7*12*3)
    var horiz_ptrs = extract_ptrs(remainder, 14).map(x => x - bank_offset)
    var horiz_tiles = horiz_ptrs.slice(0,7).map(x => Array.split(bytes.slice(x, x+8*4), 4))
    var vert_tiles = horiz_ptrs.slice(7,14).map(x => Array.split(bytes.slice(x, x+8*4), 4))

    //
    var remainder = bytes.slice(0x1200)
    var horiz_set = []
    for(var i = 0; i < 0x1f; i++) horiz_set.push(remainder.slice(4*i, 4*i+4))
    horiz_set[0x1f] = [0, 0, 0, 0]
    var vert_set = []
    for(var i = 0x1f; i < 0x1f*2; i++) vert_set.push(remainder.slice(4*i, 4*i+4))
    vert_set[0x1f] = [0, 0, 0, 0]

    var obj_tiles = extract_ptr_mem_block(contents, mem_locs, 'WorldObjectTilePointersLo', 7, 0xFF)
    var tileq = extract_ptr_mem_block(contents, mem_locs, 'TileQuadPointersLo', 4, 0xFF) 
    for (q in tileq) tileq[q] = Array.split(tileq[q], 4)

    return {
        bpals: background_pals,
        spals: sprite_pals,
        htiles: horiz_tiles,
        vtiles: vert_tiles,
        hset: horiz_set,
        vset: vert_set,
        obj_tiles: obj_tiles,
        tile_quads: tileq,
        world_single: Array.split(extract_mem_block(contents, mem_locs, 'World1thru6SingleBlocks', 14), 7),
        object_tiles: Array.split(Array.split(extract_mem_block(contents, mem_locs, 'World1ObjectTiles', 9*7*4), 4), 9)
    }
    
}

function extract_level_bytes(bytes, ptr_loc=0x8000){
    /*
     *  Extracts all bytes for levels, by header and object data
     *  Discards ptr info
     *  Parameters: level byte starting at ptr_order
     */
    var ptr_order = bytes.slice(0, 21)
    var remainder = bytes.slice(21, 420 + 21)
    var my_ptrs = extract_ptrs(remainder, 210)
    my_ptrs = my_ptrs.map(x => x - ptr_loc)
    var my_headers = my_ptrs.map(x => bytes.slice(x, x+4))
    var my_data = my_ptrs.map(x => bytes.slice(x+4, x+256))
    return {h: my_headers, l: my_data}
}

function extract_enemy_bytes(bytes, ptr_loc=0xA500){
    /*
     *  Extracts all bytes for enemies
     *  Discards ptr info
     *  Paramters: bytes starting at Enemy ptrs
     */
    var all_ptrs = []
    for (var i = 84; i < 84 + 420; i += 20) {
        var my_ptrs = extract_ptrs(bytes.slice(i), 10, true)
        all_ptrs.push(...my_ptrs)
    }
    all_ptrs = all_ptrs.map(x => x - ptr_loc)
    var my_data = all_ptrs.map(x => bytes.slice(x, x+256))
    return my_data
}

var char_lookup_bit = [
    0b0001, // mario
    0b0100, // luigi
    0b0010,
    0b1000
]

var char_names = ['MARIO', 'PRINCESS', 'TOAD', 'LUIGI'] // NOTE: just change the order proper in ASM?
var player_table = [1, 8, 4, 2]
var player_order = [0, 3, 2, 1] // > m l t p
var player_order_d = [0, 2, 3, 1] // m p t l > m l t p
var player_order_b = [0, 1, 3, 2] // m p t l



function extract_all_info (contents_full, mem_locs={}){
    /*
     *  Extracts all bytes relevant to game 
     *  Parameters: full byte rom, memory locations for certain data 
     *  todo: ines detection, cleanup
     */
    // Detect then Remove iNes header
    var contents = contents_full.slice(0x10) 
    var block = 0x2000 
    var level_block = block * 8
    var meta_block = block * 10

    // extract bytes
    var og_level_bytes = contents.slice(level_block)

    // get enemies
    var my_og_enemies = extract_enemy_bytes(contents.slice(level_block + block + 0x500))
    var enemy_ptr_order = contents.slice(level_block+block+0x500,level_block+block+0x500+84)
    
    // manip level bytes
    var level_ptr_order = og_level_bytes.slice(0, 21)
    var all_original_ptrs = extract_ptrs(og_level_bytes.slice(21, 420 + 21), 210)
    var og_hl_pairs = extract_level_bytes(contents.slice(level_block))
    var my_og_headers = og_hl_pairs.h
    var my_og_levels = og_hl_pairs.l

    // extract bytes tiles
    var my_world_metadata = extract_tile_bytes(contents, mem_locs)

    // extract player info
    // 3c9 bank a-b
    var level_start = extract_mem_block(contents, mem_locs, 'Data_StartLevel', 4)
    var char_start = extract_mem_block(contents, mem_locs, 'CharLockVar', 1)

    var enemy_1 = Array.split(extract_mem_block(contents, mem_locs, 'EnemyTilemap1', 0xFF), 2)
    var enemy_2 = Array.split(extract_mem_block(contents, mem_locs, 'EnemyTilemap2', 0xFF), 2)
    var a_tiles = extract_mem_block(contents, mem_locs, 'EnemyAnimationTable', 0xFF)
    var data_46e = extract_mem_block(contents, mem_locs, 'EnemyArray_46E_Data', 0xFF)
    var obj_attr_data = extract_mem_block(contents, mem_locs, 'ObjectAttributeTable', 0xFF)

    // extract only good levels
    var real_my_og_levels = []
    var is_jar = []
    for (var i = 0; i < my_og_levels.length - 10; i++){
        var my_l = read_object(my_og_levels[i], i / 30)
        var my_o = my_l.objs
        var my_p = my_l.ptrs
        var my_vase = my_o.filter(function (ele){ return obj_vase_ptr.includes(ele.obj_type) })
        if (i % 10 == 0) real_my_og_levels[i] = my_og_levels[i]
        for (var ptr of my_p){
            if (ptr != undefined){
                var pos = (ptr.world * 30) + (ptr.level * 10) + ptr.room
                real_my_og_levels[pos] = my_og_levels[pos]
                for (var obj of my_vase){
                    if (ptr.pos_page == obj.pos_page && obj_vase_ptr.includes(obj.obj_type)){
                        is_jar[pos] = 2
                    }
                }
            }
        }
        for (var obj of my_o){
            if (obj_vase_fake.includes(obj.obj_type)){
                var pos = i - (i % 10) + 4
                real_my_og_levels[pos] = my_og_levels[pos]
                is_jar[pos] = 1
            }
        }
        if (is_jar[i] == undefined)
            is_jar[i] = 0
    }

    // pair all information
    var modified_my_l = []
    var world = 0
    var level = 0
    for (var i = 0; i < my_og_levels.length - 10; i++){
        if (real_my_og_levels[i] === undefined || i >= 200){
            modified_my_l.push(undefined)
            continue
        }
        if (i%30 == 0) world = i / 30
        if (i%10 == 0) level = (i / 10) % 3
        var my_l = read_object(real_my_og_levels[i], i / 30)
        var my_h = read_header(my_og_headers[i])
        var my_e = read_enemies(my_og_enemies[i], my_h.pages, my_h.vertical)
        my_l.world = world
        my_l.level = level
        my_l.room = i % 10
        my_l.i = i
        my_l.enemies = my_e
        my_l.header = my_h
        my_l.is_jar = is_jar[i]
        modified_my_l.push(my_l)
    }


    var additional_rom_info = {
        enemy_ptr_order: enemy_ptr_order,
        level_ptr_order: level_ptr_order,
        world_metadata: my_world_metadata,
        level_start: level_start,
        enemy_tilemap_1: enemy_1,
        enemy_tilemap_2: enemy_2,
        a_tiles: a_tiles,
        mem_locs: mem_locs,
        data_46e: data_46e,
        obj_attr_data: obj_attr_data,
    }
    return {
        my_levels: modified_my_l, 
        meta_info: additional_rom_info
    }
}


// read info

function move_page_position(current_y, current_page, next_p){
    var xpage = current_page
    var pleft = next_p >> 4
    var pright = next_p % 0x10
    current_y += pleft
    if (current_y >= 0x0F){
        current_y = (current_y + 1) % 0x10
        xpage += 1
    }
    return {
        new_page: xpage,
        new_y: current_y,
        new_x: pright
    }
}

function read_object(level_bytes, world=0) {
    var ytile = 0
    var xtile = 0
    var xpage = 0 
    var layer = 0 
    var ptrs = []
    var objs = []
    var grounds = []
    var hotspots = []
    var modifiers = []
    for (var i = 0; i < level_bytes.length; i++) {
        var b = level_bytes[i]
        if (b >= const_special_bytes) {
            if (special_zerobyte.includes(b)){
                ytile = 0
                if (b == 0xf2) { xpage += 1 }
                if (b == 0xf3) { xpage += 2 }
                if (b == 0xf4) { xpage = 0; layer += 1 }
                if (b == 0xff) { break }
            }
            else if (special_onebyte.includes(b)){
                if (b != 0xf6){
                    var param = level_bytes[++i]
                    var column_tile = ((b & 0x1) << 3) + (param >> 5)
                    var ground_set = (param & 0x1F)

                    if (grounds.length > 1){
                        var previous = grounds[grounds.length - 1]
                        if (previous.column_tile >= column_tile && xpage == previous.pos_page){
                            column_tile = previous.column_tile + 1
                        }
                    }
                    grounds.push({
                        obj_type: b,
                        param: param,
                        column_tile: column_tile,
                        ground_set: ground_set,
                        layer: 0,
                        pos_page: xpage,
                        invert: b > 0xf5,
                        ground_type: undefined
                    })
                }
                else {
                    var param = level_bytes[++i]
                    grounds[grounds.length - 1].ground_type = param
                }
                
            }
            else if (special_twobyte.includes(b)){
                var WorldLevel = level_bytes[++i] & 0xFF
                var RoomPage = level_bytes[++i]
                ptrs.push(extract_door_ptr(WorldLevel, RoomPage, xpage))
            }
            else if (b == 0xF9){
                var p_left = level_bytes[++i]
                var p_right = level_bytes[++i]
                var p_count = level_bytes[++i]
                var tru_count = level_bytes[i] % 0x40
                var vert = p_count >= 0x80
                var repeat = p_count % 0x80 >= 0x40
                if (repeat)
                    p_count = p_count % 0x40 > 1 ? 1 : 0 
                var contents = []
                for (var j = 0; j < (p_count % 0x40); j++) 
                    contents.push(level_bytes[++i])
                modifiers.push({
                    loc_l: p_left,
                    loc_r: p_right,
                    contents: contents,
                    length: tru_count,
                    repeat: repeat ? tru_count : 0,
                    vertical: vert
                })
            }
        }
        else{
            var new_pos = move_page_position(ytile, xpage, b)
            xpage = new_pos.new_page
            ytile = new_pos.new_y
            xtile = new_pos.new_x
            b = level_bytes[++i]
            if (obj_doors.includes(b) && world < world_ptr_limit){
                var WorldLevel = level_bytes[++i]
                var RoomPage = level_bytes[++i]
                ptrs.push(extract_door_ptr(WorldLevel, RoomPage, xpage))
            }
            else if (special_twobyte.includes(level_bytes[i+1])){
                ++i
                var WorldLevel = level_bytes[++i]
                var RoomPage = level_bytes[++i]
                ptrs.push(extract_door_ptr(WorldLevel, RoomPage, xpage))
            }

            objs.push(create_smb_object(b, xtile, ytile, xpage, layer))
        }
    }
    var grounds = grounds.sort(function(a,b){
        return a.pos_page - b.pos_page || a.column_tile - b.column_tile
    })
    return {
        ptrs: ptrs,
        objs: objs,
        hotspots: hotspots,
        modifiers: modifiers,
        is_jar: 0,
        grounds: grounds
    }
}

function read_enemies(enemy_bytes, pages, vertical){
    var xpage = 0
    var enemies = []
    for (var i = 0; i < enemy_bytes.length; i++) {
        var cnt = enemy_bytes[i]
        for (var j = 1; j < cnt; j+=2){
            var obj_type = enemy_bytes[i+j]
            var p = enemy_bytes[i+j+1]
            var new_pos = move_page_position(0, xpage, enemy_bytes[i+j+1])
            var new_pos = {
                new_y: p >> 4,
                new_x: p & 0xF,
                new_page: xpage
            } 
            enemies.push(create_smb_enemy(obj_type, new_pos.new_x, new_pos.new_y, xpage, vertical))
        }
        i += cnt - 1
        if (++xpage > pages) break
    }
    return enemies
}

function read_header(header_bytes){
    var header_json = {
        vertical:     (header_bytes[0] & 0b10000000) == 0,
        get horizontal() { return this.vertical ? 0 : 1 },
        unk1:         (header_bytes[0] & 0b01000000) >> 6,
        pala:         (header_bytes[0] & 0b00111000) >> 3,
        unk2:         (header_bytes[0] & 0b00000100) >> 2,
        palb:         (header_bytes[0] & 0b00000011) >> 0,
        unk3:         (header_bytes[1] & 0b11100000) >> 5,
        get cust_world() { return this.unk3 },
        ground_set:    (header_bytes[1] & 0b00011111) >> 0,
        pages:        (header_bytes[2] & 0b11110000) >> 4,
        exterior_type:   (header_bytes[2] & 0b00001111) >> 0,
        unk4:         (header_bytes[3] & 0b11000000) >> 6,
        get cust_bxcx() { return this.unk4 },
        ground_type: (header_bytes[3] & 0b00111000) >> 3,
        unk5:         (header_bytes[3] & 0b00000100) >> 2,
        music:        (header_bytes[3] & 0b00000011) >> 0
    }
    return header_json
}

function write_to_file (og_rom, my_levels, my_world_metadata, mem_locs){
    /*
     * Write level data to original ROM
     * Parameters: rom data, level js objects, world_metadata
     */
    var all_new_ptrs_l = [] 
    var all_new_ptrs_h = [] 
    var all_new_e_ptrs_l = [] 
    var all_new_e_ptrs_h = [] 
    var all_new_data = []
    var all_new_enmy = []
    var allcnt = 21 + 420
    var ecnt = 0xa500 + 84 + 420 - 0x8000
    var ptr_order = my_world_metadata.level_ptr_order
    var eptr_order = my_world_metadata.enemy_ptr_order

    var bonus_cnt = (mem_locs['LevelData_CD'] + 0x10) % 0x2000
    var bonus_start = bonus_cnt
    for (var i = 0; i < my_levels.length + 10; i++){
        if (my_levels[i] == undefined || i >= 200){
            var new_ptr = 0x8000 + allcnt
            all_new_ptrs_h.push(new_ptr >> 8)
            all_new_ptrs_l.push(new_ptr % 256)
            var new_ptr = 0x8000 + allcnt
            all_new_e_ptrs_h.push(new_ptr >> 8)
            all_new_e_ptrs_l.push(new_ptr % 256)
            continue
        }
        var my_l = my_levels[i]
        var my_h = my_l.header
        var my_e = my_l.enemies 
        console.debug(my_l.world, my_l.level, my_l.room)

        var header_data = write_header_bytes(my_h)
        var enemy_data = write_enemy_bytes(my_e, my_h.pages + 1, my_h.vertical) 
        if (my_l.is_jar == 1)
            enemy_data = [1,1,1,1,1,1,1,1,1,1].concat(enemy_data)
        enemy_data.push(1)
        var level_data = write_level_bytes(my_l, ((i-(i%30))/30))
        if (level_data.length > 1) {
            console.log('bonus level size', my_l.i, level_data)
            var bonus_level_data = level_data[1]

            set_memory_location(og_rom, mem_locs, 'LevelDataPointersHi_CD', [bonus_cnt >> 8], my_l.i)
            set_memory_location(og_rom, mem_locs, 'LevelDataPointersLo_CD', [bonus_cnt % 256], my_l.i)
            set_memory_location(og_rom, mem_locs, 'LevelData_CD', bonus_level_data, bonus_cnt - bonus_start)

            bonus_cnt += bonus_level_data.length

        }
        level_data = level_data[0]
        console.debug('size of level:', level_data.length, enemy_data.length)
        // fs.writeFileSync("./levels-random/" + (((i-(i%30))/30)).toString() + "/" + i.toString() + ".json", JSON.stringify(my_l, undefined, 4))

        var new_ptr_level = 0x8000 + allcnt + all_new_data.length
        if (new_ptr_level + level_data.length + header_data.length > 0xa500){
            new_ptr_level = 0x8000 + ecnt + all_new_enmy.length 
            all_new_enmy.push(...header_data)
            all_new_enmy.push(...level_data)
        }
        else{
            all_new_data.push(...header_data)
            all_new_data.push(...level_data)
        } 
        all_new_ptrs_h.push(new_ptr_level >> 8)
        all_new_ptrs_l.push(new_ptr_level % 256)

        var new_ptr_enemy = 0x8000 + allcnt + all_new_data.length
        if (new_ptr_enemy + enemy_data.length  > 0xa500){
            new_ptr_enemy = 0x8000 + ecnt + all_new_enmy.length 
            all_new_enmy.push(...enemy_data)
        }
        else{
            all_new_data.push(...enemy_data)
        } 
        all_new_e_ptrs_h.push(new_ptr_enemy >> 8)
        all_new_e_ptrs_l.push(new_ptr_enemy % 256)
        
    }


    var final_bytes = [...ptr_order]
    console.debug('len-og-s', final_bytes.length)
    final_bytes.push(...all_new_ptrs_l)
    console.debug('len-og-s', final_bytes.length)
    while(final_bytes.length < allcnt - 210){
        final_bytes.push(0xFF)
    }
    final_bytes.push(...all_new_ptrs_h)
    console.debug('len-og-s', final_bytes.length)
    while(final_bytes.length < allcnt){
        final_bytes.push(0xFF)
    }
    final_bytes.push(...all_new_data)
    console.debug('padding', 0xa500 - final_bytes.length - 0x8000)
    console.debug('len-og-s', final_bytes.length)
    console.debug('len-level', final_bytes.length.toString(16))
    while(final_bytes.length < 0xa500 - 0x8000){
        final_bytes.push(0xFF)
    }
    console.debug('len-og-s', final_bytes.length.toString(16))
    final_bytes.push(...eptr_order)
    console.debug('len-og', final_bytes.length.toString(16))
    var h_pieces = []
    var l_pieces = []
    for(var i = 0; i < 210; i++) h_pieces.push(all_new_e_ptrs_h.slice(10*i, 10*i+10))
    for(var i = 0; i < 210; i++) l_pieces.push(all_new_e_ptrs_l.slice(10*i, 10*i+10))
    for(var i = 0; i < 21; i++){
        final_bytes.push(...h_pieces[i])
        final_bytes.push(...l_pieces[i])
    }
    console.debug('len-lptr', final_bytes.length.toString(16))
    while(final_bytes.length < 0xa500 - 0x8000 + 420){
        final_bytes.push(0xFF)
    }
    console.debug('len-ptr-pad', final_bytes.length.toString(16))
    final_bytes.push(...all_new_enmy)
    console.log('Final length of level bytes', final_bytes.length.toString(16))
    if(final_bytes.length > 0x4000){
        console.error('level data too big!!  try reducing some options...')
        alert('full level data too big!!  try reducing some options...')
        throw 'Game generated too big to store...'
    }
    while(final_bytes.length < 0x4000){
        final_bytes.push(0xFF)
    }
    console.debug('lenfinal', final_bytes.length.toString(16))

    // bugs to fix
    // no doors on page0 column0
    // no doors on waterfalls/nonrocks
    // asm: rocket transitions
    // asm: pipes

    var offset = 0x10000 + 0x10
    for (var i = 0; i < final_bytes.length; i++) {
        og_rom[offset + i] = final_bytes[i]
    }

}

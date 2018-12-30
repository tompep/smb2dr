
/*  
 * Collections of functions to properly render out object data to tile data
 * Used to determine tile solidity
 *
 */

function is_tile_solid(type){
    if ([0x1a].includes(type)) return 0
    if (type < 0x1) return 0
    if (type < 0x12) return 0
    if (type < 0x18) return 1
    if (type < 0x40) return 2
    if (type < 0x43) return 0
    if (type < 0x60) return 0
    if (type < 0x69) return 1
    if (type < 0x80) return 2
    if (type < 0x80) return 0
    if (type < 0x91) return 0
    if (type < 0x98) return 1
    if (type < 0xc0) return 2
    if (type < 0xc0) return 0
    if (type < 0xca) return 0
    if (type < 0xd5) return 1
    return 2
}

function create_tile(type, tiles=[], palette=[0,0,0,0]){
    var obj_name = BackgroundTileIds[type]
    return {
        obj_name: obj_name,
        obj_type: type,
        spr_tiles: tiles,
        palette: palette,
        solidity: is_tile_solid(type)
    }
}

var render_object = [
   function(w, r, m) { return render_single_tile_meta(0, w, r, m)}, // "Mushroom block",
   function(w, r, m) { return render_single_tile_meta(1, w, r, m)}, // "POW block",
   function(w, r, m) { return render_single_tile_meta(2, w, r, m)}, // "Bombable rock",
   function(w, r, m) { return render_single_tile_meta(3, w, r, m)}, // "Vine",
   function(w, r, m) { return render_single_tile_meta(4, w, r, m)}, // "Jar (small, can't go in)",
   function(w, r, m) { return render_single_tile_meta(5, w, r, m)}, // "Ladder (1 square)",
   function(w, r, m) { return render_vert_tiles([0x73, 0x70, 0x71], 'extend', length=3)}, // "Jar, extends to ground, can go in",
   function(w, r, m) { return render_vert_tiles([0x6F, 0x70, 0x71], 'extend', length=3)}, // "Jar, extends to ground, can go in (not the same as #06)",
   function(w, r, m) { return render_vert_tiles([0x74, 0x70, 0x71], 'extend', length=3)}, // "Jar, extends to ground, can't go in (used for warp zones)",
   function(w, r, m) { return render_vert_tiles([0x4f, 0x50])}, // "Locked door",
   function(w, r, m) { return render_vert_tiles([0x4f, 0x51])}, // "Door",
   function(w, r, m) { return render_vert_tiles([0x83, 0x83])}, // "Dark entrance",
   function(w, r, m) { return render_vert_tiles([0xc1, 0xc2], 'extend')}, // "Vine, extends to ground",
   function(w, r, m) { return render_vert_tiles([0xc2, 0xc2], 'extend')}, // "Vine, extends to ground (no top)",
   function(w, r, m) { return render_single_tile(0x69)}, // "Star background",
   function(w, r, m) { return render_vert_tiles([ 0x79, 0x7a ], 'extend')}, // "Red pillar, extends to ground",
   function(w, r, m) { return render_horiz_tiles([0x1, 0x2])}, // "Cloud",
   function(w, r, m) { return render_single_tile([0x3])}, // "Small cloud",
   function(w, r, m) { return render_vert_tiles([0xc2, 0xc3], 'extend_up')}, // "Vine, extends to top",
   function(w, r, m) { return render_vert_tiles([ 0x52, 0x52 ])}, // "Entrance/exit (light right)",
   function(w, r, m) { return render_vert_tiles([ 0x52, 0x52 ])}, // "Entrance/exit (light left)",
   function(w, r, m) { return render_vert_tiles([0x69], 'extend')}, // "White entrance, extends to ground",
   function(w, r, m) { return render_vert_tiles([0xc0, 0x82], 'extend')}, // "Tree, extends to ground",
   function(w, r, m) { return render_single_tile(0x69)}, // "Pyramid",
   function(w, r, m) { return render_single_tile(0x69)}, // "Brick background, extends to ground",
   function(w, r, m) { return render_single_tile(0x69)}, // "Brick wall, extends to ground",
   function(w, r, m) { return render_single_tile(0x69)}, // "Vegetable thrower (used in Wart's room)",
   function(w, r, m) { return render_single_tile(0x69)}, // "???",
   function(w, r, m) { return render_vert_tiles([0xa8, 0x83])}, // "Castle entrance 1",
   function(w, r, m) { return render_vert_tiles([0xa9, 0x83])}, // "Castle entrance 2",
   function(w, r, m) { return render_single_tile(0x69)}, // "Big mouth entrance used in desert",
   function(w, r, m) { return render_single_tile(0x69)}, // "Large red platform background, extends to ground",
   function(w, r, m) { return render_single_tile(0x43)}, // "Herb with coin",
   function(w, r, m) { return render_single_tile(0x44)}, // "Herb with fresh vegetable",
   function(w, r, m) { return render_single_tile(0x45)}, // "Herb with small vegetable",
   function(w, r, m) { return render_single_tile(0x46)}, // "Herb with rocket",
   function(w, r, m) { return render_single_tile(0x48)}, // "Herb with turtle shell",
   function(w, r, m) { return render_single_tile(0x48)}, // "Herb with bomb",
   function(w, r, m) { return render_single_tile(0x49)}, // "Herb with potion",
   function(w, r, m) { return render_single_tile(0x4a)}, // "Herb with 1UP",
   function(w, r, m) { return render_single_tile(0x4b)}, // "Herb with POW",
   function(w, r, m) { return render_single_tile(0x4e)}, // "Cherry",
   function(w, r, m) { return render_single_tile(0x4c)}, // "Herb with Bob-omb",
   function(w, r, m) { return render_single_tile(0x5b)}, // "1st sub-space Mushroom",
   function(w, r, m) { return render_single_tile(0x5b)}, // "White/red evil head",
   function(w, r, m) { return render_single_tile(0x5b)}, // "2nd sub-space Mushroom",
   function(w, r, m) { return render_single_tile(0x5a)}, // "Whale eye",
   function(w, r, m) { return render_single_tile(0xa4)} // "Wood wall, 1 square"
]

var render_length = [
    null, null, null,
   function(w, r, m, len) { return render_horiz_tiles([0x76], 'fixed', len)}, // "xb1",
   function(w, r, m, len) { return render_horiz_tiles([0x76], 'fixed', len)}, // "xb2",
   function(w, r, m, len) { return render_horiz_tiles([0x45], 'fixed', len)}, // "veg",
   function(w, r, m, len) { return render_horiz_tiles([0x75, 0x76, 0x77], 'fixed', len)}, // "bridge",
   function(w, r, m, len) { return render_horiz_tiles([0x1a], 'fixed', len)}, // "spikes",
   function(w, r, m, len) { return render_vert_tiles([0x9D], 'fixed', len)}, // "bom",
   function(w, r, m, len) { return render_vert_tiles([0x9C], 'fixed', len)}, // "brown",
   function(w, r, m, len) { return render_vert_tiles([0x80], 'fixed', len)}, // "ladder",
   function(w, r, m, len) { return render_platform_b(w, r, m, len)}, // "BX",
   function(w, r, m, len) { return render_platform_c(w, r, m, len)}, // "CX",
   function(w, r, m, len) { return render_horiz_tiles([0x75, 0x76, 0x77], 'fixed', len)}, // "red",
   function(w, r, m, len) { return render_horiz_tiles([0x13, 0x14, 0x15], 'fixed', len)}, // "cloud",
   function(w, r, m, len) { return render_waterfall(w, r, m, len)}, // "water",
]

/* TODO:
 * replace functions with generators or proper objects?
 * proper fix for each tileset
 * shadowed objects
 * large objects
 */

var meta_tile_types = [0x69, 0x6c, 0x9d, 0xc2, 0x72, 0x80]

function render_single_tile_meta(tile_type, w, r, m){
    return render_single_tile(meta_tile_types[tile_type])
}

function render_waterfall(w, r, m, len){
    var top1 = render_horiz_tiles([0x4, 0x4], 'fixed', len)
    var top2 = render_horiz_tiles([0x5, 0x5], 'fixed', len)
    var row = render_horiz_tiles([0x6, 0x6], 'fixed', len)

    return {
        tiles: top1.tiles.concat(top2.tiles),
        render_type: 'extend_over',
        render_name: 'water'
    }

}

function render_platform_b(w, r, m, len){
    var top1 = render_horiz_tiles([0xca, 0xcc, 0xce], 'fixed', len)
    var top2 = render_horiz_tiles([0xcb, 0xcd, 0xcf], 'fixed', len)
    var row = render_horiz_tiles([0xc7, 0xc8, 0xc9], 'fixed', len)

    return {
        tiles: top1.tiles.concat(row.tiles),
        render_type: 'extend_plat',
        render_name: 'bx'
    }

}

function render_platform_c(w, r, m, len){
    var top1 = render_horiz_tiles([0xca, 0xcc, 0xce], 'fixed', len)
    var top2 = render_horiz_tiles([0xcb, 0xcd, 0xcf], 'fixed', len)
    var row = render_horiz_tiles([0xc7, 0xc8, 0xc9], 'fixed', len)

    return {
        tiles: top1.tiles.concat(row.tiles),
        render_type: 'extend_plat',
        render_name: 'cx'
    }

}

function render_single_tile(tile_type){
    return {
        tiles: [[create_tile(tile_type)]],
        render_type: 'single'
    }
}

function render_ladder(tile_type, w, r, m){
    return render_vert_tiles(tile_type, 'fixed', 1)
}

function extend_tiles(tile_type, render_type='normal', length=1){
    var new_tiles = [tile_type[0]]

    var next_tile = tile_type[0]

    if (render_type == 'fixed' && new_tiles.length >= length)
        return new_tiles 

    if (render_type == 'fixed' && new_tiles.length + 1 >= length){
        new_tiles.push(tile_type[tile_type.length - 1])
        return new_tiles
    }

    next_tile = (tile_type[1] ? tile_type[1] : next_tile)

    for (var i = 1; i < length - 1; i++) new_tiles.push(next_tile)

    next_tile = tile_type[tile_type.length - 1]

    new_tiles.push(next_tile)

    return new_tiles
}

function render_horiz_tiles(tile_type, render_type='normal', length=1){
    if (render_type != 'rle')
        var new_tiles = extend_tiles(tile_type, render_type, length)
    else{
        var new_tiles = tile_type.slice(0)
        while(new_tiles.length < length)
            new_tiles.push(tile_type[0])
    }
    return {
        tiles: [[...new_tiles.map(x => create_tile(x))]],
        render_type: render_type,
        render_name: create_tile(tile_type[0])
    }
}

function render_vert_tiles(tile_type, render_type='normal', length=1){
    if (render_type != 'rle')
        var new_tiles = extend_tiles(tile_type, render_type, length)
    else{
        var new_tiles = tile_type.slice(0)
        while(new_tiles.length < length)
            new_tiles.push(tile_type[0])
    }
    return {
        tiles: [...new_tiles.map(x => [create_tile(x)])],
        render_type: render_type,
        render_name: create_tile(tile_type[0])
    }
}

function render_level(level, header, enemies, meta_info, steps=-1){
    // just do the solids
    // first pass ground
    
    var world_metadata = meta_info.world_metadata
    var decoded_level_data = Array(header.pages + 1)
    for (var i = 0; i < header.pages + 1; i++){
        decoded_level_data[i] = Array(16)
        for (var j = 0; j < 16; j++){
            decoded_level_data[i][j] = Array(16)
        }
    }
    
    var vertical = header.vertical
    var palworld = header.pala
    var pal_sprite = header.palb
    var ground_set = header.ground_set
    var ground_type = header.ground_type
    var ext_type = header.exteriortype

    var current_world = header.unk3
    if (current_world == 7)
        current_world = level.world

    if (ground_set == 31) {
        console.log(level.world, level.level, level.room)
    }
    var init_ground = {
        obj_type: 0xF0,
        param: 0b000 + ground_set,
        column_tile: 0,
        ground_set: ground_set,
        layer: 0,
        pos_page: 0,
        invert: false,
        ground_type: ground_type
    }
    var level_grounds = level.grounds.sort(function(a,b){
        return a.pos_page - b.pos_page || a.column_tile - b.column_tile || a.obj_type - b.obj_type
    })
    var ground_pos = 0
    var gs = init_ground
    var gtype = gs.ground_type
    
    for (var page = 0; page < header.pages + 1; page++){
        for (var i = 0; i < 16; i++){
            var next_gs = level_grounds.filter(function(ele){return ele.column_tile == i && ele.pos_page == page})
            if (next_gs.length > 0){
                gs = next_gs[0]
                if (gs.ground_type != undefined)
                    gtype = gs.ground_type
            }
            if (!vertical)
                var gs_bytes = world_metadata.hset[gs.ground_set]
            else
                var gs_bytes = world_metadata.vset[gs.ground_set]
            if (Array.isArray(gtype)){
                var tile_types = gtype
            }
            else {
                if (!vertical) 
                    var tile_types = world_metadata.htiles[current_world][gtype]
                else 
                    var tile_types = world_metadata.vtiles[current_world][gtype]
            }
            if (gs.invert) gs_bytes = gs_bytes.reverse()
            for (var j = 0; j < 16; j++){
                var tile_byte = (gs_bytes[Math.floor(j / 4)] >> (2 * Math.floor(3 - j%4))) & 0x03 
                if (gs.invert)
                    tile_byte = (gs_bytes[Math.floor(j / 4)] >> (2 * Math.floor(j%4))) & 0x03 
                var tile_type = tile_types[tile_byte]
                if (tile_byte == 0){ tile_type = 0x40 }
                if (vertical) decoded_level_data[page][i][j] = create_tile(tile_type)
                else decoded_level_data[page][j][i] = create_tile(tile_type)
            }
        }
    }

    var mod = [0, 2, 15, 25, 47]
    var mod_len = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    var mod_height = [8, 9] 
    var last_obj = null
    var steps_taken = steps
    // remember to consider layers
    for (var l = 0; l < 10; l++){
        for (var obj of level.objs.filter(function(ele){return ele.layer == l})){
            if (steps == 0){
                if (last_obj != null){
                    console.log('Ended on object', steps_taken)
                    console.log(last_obj)
                    console.log(JSON.stringify(last_obj))

                }
                level.decoded = decoded_level_data
                return decoded_level_data
            }
            steps--
            last_obj = obj

            var x = obj.pos_x
            var y = obj.pos_y
            var page = obj.pos_page
            var obj_type = obj.obj_type
            var obj_type_len = obj.obj_type >> 4
            var obj_length = (obj_type & 0xF) + 1


            var output = render_object[obj_type]
            if (output != undefined){
                output = output(current_world, 0, meta_info)
            }

            if (mod_len.includes(obj_type_len)){
                output = render_length[obj_type_len]
                output = output(current_world, 0, meta_info, obj_length)
            }
            var x = obj.pos_x
            var y = obj.pos_y
            var page = obj.pos_page
            if (output != undefined){
                var tiles = output.tiles
                var style = output.render_type
                if (style == 'extend_up'){
                    var new_length = 0
                    while (page >= 0){
                        var map_tile = decoded_level_data[page][(y) % 15][((x) % 16)]
                        if (map_tile.solidity){
                            new_length--
                            y++
                            if (y == 15){
                                page++
                                y = 0
                            }
                            break
                        }
                        if ( y == 0 && !vertical ) break
                        else if (y == 0){
                            if (page == 0) break
                            page--
                            y = 15
                        }
                        y--
                        new_length++;
                    }
                    var new_tiles = []
                    for (var i = 0; i < new_length; i++)
                        new_tiles[i] = tiles[0]
                    new_tiles.push(tiles[1])
                    tiles = new_tiles
                    style == 'fixed'
                }
                write_tiles (decoded_level_data, tiles, style, page, x, y, obj, header)
            }
        } 
    }
    for (var mod of level.modifiers){
        if(mod.loc_l >= 0x60 && mod.loc_l <= 0x69){
            var pos = convert_hotspot(mod.loc_l, mod.loc_r)
            if (mod.vertical)
                var tiles = render_vert_tiles(mod.contents, 'rle', mod.length).tiles
            else
                var tiles = render_horiz_tiles(mod.contents, 'rle', mod.length).tiles
            var page = pos.pos_page
            var x = pos.pos_x
            var y = pos.pos_y
            write_tiles (decoded_level_data, tiles, 'rle', page, x, y, mod, header)
        }
    }
    for (var mod of level.modifiers){
        if(mod.loc_l == 0x76 && mod.loc_r == 0xa0){
            var contents = mod.contents.slice(0)
            while(contents.length){
                var entry = contents.slice(0, 2)
                var vals = contents.slice(2, 5)
                var pos = convert_coords(entry[0], entry[1] >> 4, entry[1] % 0x10, vertical)
                var page = pos.page
                var y = pos.y
                var x = pos.x

                if(page < decoded_level_data.length){
                    decoded_level_data[page][y][x] = JSON.parse(JSON.stringify(decoded_level_data[page][y][x]))
                    decoded_level_data[page][y][x].hotspot = vals
                }
                contents = contents.slice(5)
            }
        }
    }
    level.decoded = decoded_level_data
    return decoded_level_data
}

function write_tiles (decoded_level_data, tiles, style, page, x, y, obj, header){
                var traversed = 0
                var vertical = header.vertical
                for(var i = 0; i < tiles.length; traversed++){
                    for(var j = 0; j < tiles[i].length; j++){
                        tiles[i][j].owner = obj
                        var rel_y = (y + i) % 15
                        var rel_y_page = Math.floor((y + i)/15)
                        var x_offset = !vertical ? rel_y_page : 0 
                        var rel_x = (x + x_offset + j) % 16
                        var rel_x_page = Math.floor((x + x_offset + j)/16)

                        var page_offset = !vertical ? rel_x_page : rel_y_page
                        if (page + page_offset > header.pages)
                            break
                        var map_tile = decoded_level_data[page + page_offset][rel_y][rel_x]
                        if (map_tile.solidity == 2 && style == 'extend_plat' && i > 0){
                            continue
                        }
                        if (map_tile.obj_type === 0x00 && style == 'extend_plat' && i > 0){
                            continue
                        }
                        if (map_tile.solidity > 0 && style == 'extend' && i > 0){
                            i = tiles.length - 1
                            y -= tiles.length - 1
                            if (traversed == 1){
                                style = 'end'
                                continue
                            }
                            var rel_y = (y + i) % 15
                            var rel_y_page = Math.floor((y + i)/15)
                            var x_offset = !vertical ? rel_y_page : 0 
                            var rel_x = (x + x_offset + j) % 16
                            var rel_x_page = Math.floor((x + x_offset + j)/16)

                            var page_offset = !vertical ? rel_x_page : rel_y_page
                            decoded_level_data[page + page_offset][rel_y][rel_x] = tiles[i][j]
                            style = 'end'
                            continue
                        }
                        decoded_level_data[page + page_offset][rel_y][rel_x] = tiles[i][j]
                    }
                    if ((style == 'extend_over' || style == 'extend_plat' || style == 'extend') && i == 1){
                        y++
                        if (y > 13)
                            break
                    }
                    else {
                        i++
                    }
                }
}

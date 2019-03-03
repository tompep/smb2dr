
var c_rand = ['blue', 'black', 'green', 'purple']
var poses = [up, down, left, right]
var up = [0, -1],
    down = [0, 1],
    left = [-1, 0],
    right = [1, 0]

function ping_spots (map, x, y){
    var start_dirs = []
    for (var p of poses){
        var mx = x + p[0], my = y + p[1]
        if (mx <= 0 || mx >= 100 || my <= 0 || my >= 100) continue
        if (map[my][mx] != undefined) continue
        var valid_dirs = []
        for (var p_in of poses) {
            var mix = mx + p_in[0], miy = my + p_in[1]
            var depth = 0
            while (map[miy][mix] == undefined){
                depth++
                if (mix <= 0 || mix >= 100 || miy <= 0 || miy >= 100) break
                if (Math.abs(mix - mx) > 10 || Math.abs(miy - my) > 10) break
                mix += p_in[0]
                miy += p_in[1]
            }
            valid_dirs.push({
                x: p_in[0], // branching direction from tile
                y: p_in[1],
                sx: p[0], // starting direction from tile
                sy: p[1],
                mx: mx, // starting pos from tile
                my: my, 
                mix: mix, // branching pos from tile
                miy: miy, 
                depth: depth,
                d: p[0] ? 'X' : 'Y',
                dp: p_in[0] ? 'X' : 'Y',
                })
        }
        start_dirs.push(valid_dirs)
    }
    return start_dirs
}

var blacklist = {
    "0,0,5":[0,1,2],
    "0,1,0":[3,4,5,6,7],
    "1,2,3":[3,4,5,6],
    "2,0,4":[0,1],
    "2,1,0":null,
    "2,1,1":null,
    "5,2,4":[0, 1, 2],
    "6,1,2":null,
    "6,1,4":null,
    "6,1,6":[6, 7, 8, 9]
}

var patches = {
    "0,1,1": [{page: [3], y_off: 2, add: objEnum.Entrance_exit_light_left, target: 0}],
    "2,0,1": [{page: [9], y_off: 2, add: objEnum.Dark_entrance, target: 6}],
    "3,2,1": [{page: [5], y_off: 1, add: objEnum.Herb_with_rocket, target: 0}],
    "3,2,3": [{page: [6], y_off: 1, add: objEnum.Herb_with_rocket, target: 0}],
    "4,0,1": [{page: [8], y_off: 1, add: objEnum.Herb_with_rocket, target: 0}],
    "4,1,3": [{page: [6], y_off: 1, add: objEnum.Herb_with_rocket, target: 0, reset: 0x40}],
    "6,0,1": [{page: [0], y_off: 2, add: objEnum.Jar_ptr, target: 6}],
    "6,0,3": [{page: [0], y_off: 2, add: objEnum.Jar_ptr, target: 3}],
}

var patch_basic = {
    "0,0,0": [create_smb_object(objEnum.Vine_extends_to_ground, 0, 0, 2, 1)]
}


// TODO: Steps should be easily reversable to backtrack on bad room placements
function door_randomizer_v1(my_levels, blacklist, patches, options, my_rom){
    if (Math.seedrandom)
        Math.seedrandom(rando_seed)
    var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
    var c_j = $('#myCanvas')
    canvas.width = 800
    canvas.height = 800
    ctx.beginPath()
    ctx.globalAlpha = 1
    ctx.lineWidth=0.2;
    ctx.fillStyle='white'
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill() 

    var nodes_out = []
    var map = Array(100).fill(0).map(x => Array(100))

    var num_out = 0
    var oe = objEnum
    var obj_remove = [oe.Locked_door, oe.Door, oe.Jar_warp, 
        oe.Dark_entrance, oe.Jar_ptr,  oe.Herb_with_rocket, oe.Entrance_extends_to_ground,
        oe.Entrance_exit_light_right, oe.Entrance_exit_light_left, oe.Big_mouth_entrance_used_in_desert,
        oe.Castle_entrance_1, oe.Castle_entrance_2]

    for (var l in my_levels) {
        var my_l = my_levels[l]
        if (my_l == undefined) continue
        if (my_l.is_jar == 1) {
            continue
        }
        if (my_l.is_jar == 2) {
            my_l.is_jar = 0
        }
        var hash = [my_l.world, my_l.level, my_l.room]
        my_l.valid_pages = Array.range(my_l.header.pages + 1)
        if (blacklist[(String(hash))] !== undefined) {
            var wl = blacklist[(String(hash))]
            if (wl == null) {
                my_levels[l] = undefined
                continue
            }
            var new_my_l = crop_level(my_l, wl[0], wl[wl.length - 1] + 1)
            for(var key in new_my_l) my_l[key] = new_my_l[key]
            my_l.valid_pages = wl.map((x,y) => y)
        }

        my_l.objs = my_l.objs.filter(x => !obj_remove.includes(x.obj_type))
        my_l.enemies = my_l.enemies.filter(x => ![enemyEnum.HawkmouthBoss, enemyEnum.HawkmouthLeft, enemyEnum.HawkmouthRight].includes(x.obj_type))
        var rendered = render_level(my_l, my_l.header, my_l.enemies, info.meta_info)
        my_l.ptrs = []
        my_l.columns = get_valid_columns(rendered).filter(function(ele){return ele.space > 3})
        my_l.columns = my_l.columns.filter(x => !(x.pos_page == 0 && x.pos_x == 0 ))
        my_l.columns = my_l.columns.filter(x => !VitalTiles.includes(rendered[x.pos_page][x.pos_y - 1][x.pos_x].obj_type))
        my_l.columns = my_l.columns.filter(x => !ClimbableTiles.includes(rendered[x.pos_page][x.pos_y - 1][x.pos_x].obj_type))
        my_l.columns = my_l.columns.filter(x => !(x.pos_page == my_l.header.pages && x.pos_x == 15 ))

        var my_patches = patch_basic[String(hash)]
        if (my_patches){
            for (var patch of my_patches) {
                var new_door = create_smb_object(patch.obj_type, patch.pos_x, patch.pos_y, patch.pos_page, 1)
                my_l.objs.push(new_door)
            }
        }

        var my_patches = patches[String(hash)]
        if (my_patches){
            for (var patch of my_patches) {
                console.log(hash, patch)
                var target_page = patch.page[0]
                var columns = my_l.columns.filter(function(ele){return ele.pos_page == target_page})
                var l_ptrs = []
                columns = Array.random_to_front(columns)
                if (!columns[0]) continue
                var target = columns[0]
                var lx = target.pos_x
                var ly = target.pos_y - patch.y_off
                var lpage = target_page
                var new_door = create_smb_object(patch.add, lx, ly, lpage, 1)
                my_l.objs.push(new_door)

                var new_ptr = create_ptr_wlrp(my_l.world, my_l.level, my_l.room, patch.target, target_page)

                my_l.ptrs.push(new_ptr)
                my_l.columns = my_l.columns.filter(x => x.pos_page != target_page)
                console.log(my_l)
            }

        }

        my_l.valid_pages = my_l.valid_pages.filter(p => my_l.columns.filter(x => x.pos_page == p).length)

        if (my_l.valid_pages.length == 0){
            my_levels[l] = undefined
            continue
        }

        var target_lines = []
        if (my_l.header.vertical){
            target_lines.push(rendered[0][0])
            target_lines.push(rendered[my_l.header.pages][13])
            target_lines.push(rendered[my_l.header.pages][14])
        }
        else {
            for (var tile of rendered[0]){
                for (var i = 0; i < my_l.header.pages + 1; i++){
                    target_lines.push(rendered[i][0])
                    target_lines.push(rendered[i][13])
                    target_lines.push(rendered[i][14])
                }
            }
        }
        for(var line of target_lines){
            for(var tile of line){
                if (ClimbableTiles.includes(tile.obj_type)){
                    console.debug(tile.owner, line)
                    if (tile.owner.pos_y == 0 || tile.owner.pos_y >= 13)
                        tile.owner.obj_type = oe.Column_of_bombable_rock + 1
                    else
                        tile.owner.obj_type = -1
                    //need to recurse on other vine objects writing here?
                } 
            }
        }

        nodes_out.push({
            my_l: my_l,
            my_pages: my_l.header.pages,
            vertical: my_l.header.vertical,
            connections: []
        })
    }

    if (Math.seedrandom)
        Math.seedrandom(rando_seed)
    var anchor = [40, 40]
    var candidates = []
    candidates.push(...render_connection(map, nodes_out[0], {x: anchor[0], y: anchor[1]}, null, nodes_out[0].my_l.valid_pages))

    var LevelStart = mem_locs['Data_StartLevel'] + 0x10
    my_rom[LevelStart] = nodes_out[0].my_l.world * 3 + nodes_out[0].my_l.level
    my_rom[LevelStart + 1] = nodes_out[0].my_l.room
    my_rom[LevelStart + 2] = nodes_out[0].my_l.valid_pages[0]
    my_rom[LevelStart + 3] = 1

    nodes_out = nodes_out.slice(1)
    console.log('starting candidates', candidates)
    while (nodes_out.length && candidates.length) {
        candidates = Array.random_to_front(candidates)
        while (candidates[0] == undefined || candidates[0].connected) {
            console.log(candidates)
            candidates = candidates.slice(1)
            if (candidates.length == 0) {
                console.error('this is bad')
                break
            }
        }
        var target_cand = candidates[0]
        if (target_cand == undefined) break

        var my_dirs = shuffle(ping_spots(map, target_cand.x, target_cand.y))

        for(var d of my_dirs){
            var node = nodes_out[0]
            var breaker = false
            var new_pos = split_em(d, 2)
            if (node.vertical) var p = new_pos[0]
            else var p = new_pos[1]
            if (p[0].depth + p[1].depth >= node.my_pages + 1){
                console.log('my depth', p[0].depth, p[1].depth, p[0].depth + p[1].depth, 'my pages', node.my_pages)
                var new_cand = render_connection(map, node, target_cand, p, node.my_l.valid_pages, options)
                console.log(new_cand)
                if (new_cand != null) {
                    candidates.push(...new_cand)
                    nodes_out = nodes_out.slice(1)
                    target_cand.connected = node
                    break
                }
                else{
                    nodes_out = nodes_out.slice(1)
                    break
                }
            }
        }
    }
    if (nodes_out.length){
        alert('ran out of candidate levels... levels left = ' + nodes_out.length)
        console.error ('ran out of candidate levels... levels left', nodes_out.length)
    }

    var colors_levels = ['green', 'brown', 'red', 'blue', 'black', 'orange', 'purple']
    var colors = {}
    var min_x = 40, min_y = 40, max_x = 40, max_y = 40;
    for (var y in map) {
        for (var x in map[y]) {
            if (map[y][x]){
                min_x = Math.min(min_x, x)
                min_y = Math.min(min_y, y)
                max_x = Math.max(max_x, x)
                max_y = Math.max(max_y, y)
            }
        }
    }
    canvas.width = (max_x - min_x) * 8
    canvas.height = (max_y - min_y) * 8

    for (var y in map) {
        for (var x in map[y]) {
            var draw_x = x - min_x
            var draw_y = y - min_y
            ctx.beginPath()
            ctx.globalAlpha = 1
            ctx.lineWidth=0.2;
            ctx.globalAlpha = map[y][x].connected ? 1 : 0.30
            ctx.fillStyle = colors_levels[map[y][x].target.my_l.world]
            ctx.rect(draw_x*8, draw_y*8, 8, 8)
            ctx.fill() 

            var my_l = map[y][x].target.my_l
            var bosses = my_l.enemies.filter(function(ele){
                return ele.obj_type > 0x5C && ele.pos_page == map[y][x].page})
            var crystals = my_l.enemies.filter(function(ele){
                return ele.obj_type == enemyEnum.CrystalBall && ele.pos_page == map[y][x].page})

            if (bosses.length) {
                var text_tiles = convertByTbl('B', 1).map(x => x % 0x40)
                var gfx = bitmap_from_graphics([bbptext], 
                    text_tiles, Math.min(256, text_tiles.length), [0xF, 48, 48, 48], true)
                ctx.globalAlpha = 1
            }
            else if (x == 40 && y == 40){
                var text_tiles = convertByTbl('!', 1).map(x => x % 0x40)
                var gfx = bitmap_from_graphics([bbptext], 
                    text_tiles, Math.min(256, text_tiles.length), [0xF, 21, 21, 21], true)
                ctx.globalAlpha = 1
            }
            else if (crystals.length) {
                var text_tiles = convertByTbl('C', 1).map(x => x % 0x40)
                var gfx = bitmap_from_graphics([bbptext], 
                    text_tiles, Math.min(256, text_tiles.length), [0xF, 48, 48, 48], true)
                ctx.globalAlpha = 1
            }
            else if (map[y][x].page == 0){
                var text_tiles = convertByTbl(String(my_l.world), 1).map(x => x % 0x40)
                var gfx = bitmap_from_graphics([bbptext], 
                    text_tiles, Math.min(256, text_tiles.length), [0xF, 48, 48, 48], true)
            }
            else{
                var text_tiles = convertByTbl('.', 1).map(x => x % 0x40)
                var gfx = bitmap_from_graphics([bbptext], 
                    text_tiles, Math.min(256, text_tiles.length), [0xF, 48, 48, 48], true)
            }
            var gfx_data = gfx.image_data
            var m_spr_canvas = new OffscreenCanvas(gfx_data.width, gfx_data.height)
            var m_spr_ctx = m_spr_canvas.getContext("2d")
            m_spr_ctx.putImageData(gfx_data, 0, 0)
            ctx.drawImage(m_spr_canvas, draw_x*8, draw_y*8)

            if (colors[map[y][x].color] == undefined)
                colors[map[y][x].color] = 0
            colors[map[y][x].color] += 1
            if(map[y][x])
                if(map[y][x].connected)
                    console.debug(map[y][x].connected)
        }
    }
    downloadURL(canvas.toDataURL(), 'spoiler.png')
    console.debug()
    console.log(colors, num_out)
}

function render_connection (map, node, parent, dir, valid_pages, options){
    var x = parent.x, y = parent.y
    var color = c_rand.shift()
    c_rand.push(color)
    var candidates = []
    var page = 0
    console.debug(x, y, parent, node, valid_pages)
    if (dir){
        x = x + dir[0].sx
        y = y + dir[0].sy
        var min_depth = Math.min(node.my_pages, dir[0].depth)
        var max_depth = Math.min(node.my_pages, dir[1].depth)
        var rand_range = (min_depth + max_depth - node.my_pages)
        var rand_arr = shuffle(Array.range(rand_range))
        if (rand_arr.length == 0) {
            rand_arr = [0]
        }
        for (var num of rand_arr) {
            var new_depth = min_depth - ~~(Math.random() * rand_range)
            if (valid_pages.includes(new_depth) || num == 0) {
                console.log(x, y, new_depth, min_depth, max_depth, rand_range, num, valid_pages)
                if(dir[0].x < 0) {
                    x -= new_depth
                }
                if(dir[0].y < 0) {
                    y -= new_depth
                }
                page = new_depth
                break
            }
        }
    }
    var waow = false
    var bosses = node.my_l.enemies.filter(function(ele){return ele.obj_type > 0x5C})
    for (var i = 0; i < node.my_pages + 1; i++){
        console.debug(x, y, i)
        if (map[y][x]){
            console.error('collision')
            map[y][x].collision = true
        }
        map[y][x] = {
            target: node,
            color: i == 0 ? 'red' : color,
            page: i,
            y: y,
            x: x
        }
        if (dir && page == i) {
            map[y][x].connected = parent.target
            parent.connected = map[y][x].target
            map[y][x].color = 'cyan'
            console.log('WAOW')
            waow = true
            
            // don't just copy the code ;w;
            var ll = parent.target.my_l
            var rl = map[y][x].target.my_l
            ll.rendered = render_level(ll, ll.header, ll.enemies, info.meta_info)
            rl.rendered = render_level(rl, rl.header, rl.enemies, info.meta_info)

            // var columns = get_valid_columns(ll.rendered).filter(function(ele){return ele.space > 3 && ele.pos_page == parent.page})
            var columns = ll.columns
            var columns = ll.columns.filter(c => c.pos_page == parent.page)
            var l_ptrs = ll.ptrs.map(y => y.pos_page)
            columns = columns.filter(x => !l_ptrs.includes(x.pos_page))
            columns = shuffle(columns)

            // var r_columns = get_valid_columns(rl.rendered).filter(function(ele){return ele.space > 3 && ele.pos_page == map[y][x].page})
            var r_columns = rl.columns.filter(c => c.pos_page == map[y][x].page)
            var r_ptrs = rl.ptrs.map(y => y.pos_page)
            r_columns = r_columns.filter(x => !r_ptrs.includes(x.pos_page))
            r_columns = shuffle(r_columns)

            if (columns.length == 0 || r_columns.length == 0){
                console.error('columns were empty')
            }
            else {
                var target = columns[0]
                var lx = target.pos_x
                var ly = target.pos_y - 2
                var lpage = target.pos_page
                var new_door = create_smb_object(0xa, lx, ly, lpage, 1)
                if (SpecialTiles.includes(target.tile_type))
                    ll.objs.push(create_smb_object(0x90, lx, ly + 2, lpage, 1))
                ll.objs.push(new_door)

                var mod = 0x0
                if (bosses.length) {
                    var rpage = bosses[0].pos_page
                    var rpage_dest = 0
                    if (options['ContBossKill']) mod += 0x80
                    mod += 0x20
                }
                else {
                    var r_target = r_columns[0]
                    var rx = r_target.pos_x
                    var ry = r_target.pos_y - 2
                    var rpage = r_target.pos_page
                    var rpage_dest = r_target.pos_page
                    var r_new_door = create_smb_object(0xa, rx, ry, rpage, 1)
                    if (SpecialTiles.includes(r_target.tile_type))
                        rl.objs.push(create_smb_object(0x90, rx, ry + 2, rpage, 1))
                    rl.objs.push(r_new_door)
                }

                var new_ptr = create_ptr_wlrp(rl.world, rl.level, rl.room, rpage_dest, lpage)
                var r_new_ptr = create_ptr_wlrp(ll.world, ll.level, ll.room, lpage, rpage, mod)

                ll.ptrs.push(new_ptr)
                rl.ptrs.push(r_new_ptr)

            }
        }
        if (valid_pages.includes(i)) candidates.push(map[y][x])
        y += node.vertical ? 1 : 0
        x += node.vertical ? 0 : 1
    }
    if (bosses.length) return []
    return candidates
}

function flood_fill(map, my_tile, vertical, open={}, steps=999) {
    steps = steps - 1
    if (!steps)
        return open
    if (!(my_tile != null && map[my_tile.pos_page])) return open
    if (!open[my_tile.id()]) open[my_tile.id()] = true
    else return open

    var start_tile = map[my_tile.pos_page][my_tile.pos_y][my_tile.pos_x]
    if (start_tile.solidity > 1) return
    var new_tile = my_tile.adjust(down, vertical)
    var gravity = false

    if (new_tile != null && map[new_tile.pos_page]) {
        var alexander_bottom_tile = map[new_tile.pos_page][new_tile.pos_y][new_tile.pos_x]
        if (alexander_bottom_tile.solidity || gravity){
            var new_tile = my_tile.adjust(up, vertical)
            flood_fill(map, new_tile, vertical, open)
            var new_tile = my_tile.adjust(left, vertical)
            flood_fill(map, new_tile, vertical, open)
            var new_tile = my_tile.adjust(right, vertical)
            flood_fill(map, new_tile, vertical, open)
        }
        else
            flood_fill(map, new_tile, vertical, open)
    }
    return open
}

function flood_fill_to_cursor(map, my_tile, vertical){
    var output = flood_fill(map, my_tile, vertical)
    var poses = []
    for (var key in output){
        var pose = key.split(',')
        var new_pose = [pose[1] * 16, pose[0] * 16]
        if (!vertical)
            new_pose[1] += pose[2] * 256
        if (vertical)
            new_pose[0] += pose[2] * 240
        poses.push(new_pose)
    }
    draw_tiles_select(poses)
}


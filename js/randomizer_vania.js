
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
                x: p_in[0],
                y: p_in[1],
                sx: p[0],
                sy: p[1],
                mx: mx, 
                my: my, 
                mix: mx, 
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

function test_door_randomizer(my_levels, num){
    if (Math.seedrandom)
        Math.seedrandom(rando_seed)
    canvas = document.getElementById("myCanvas"),
        ctx = canvas.getContext("2d");
    var c_j = $('#myCanvas')
    canvas.width = 400
    canvas.height = 400
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
    for (var my_l of my_levels) {
        if (my_l == undefined)
            continue
        num_out++
        my_l.ptrs = []
        my_l.objs = my_l.objs.filter(x => 
            ![oe.Locked_door, oe.Door, oe.Jar, 
            oe.Dark_entrance, oe.Jar_generic, oe.Jar_ptr, 
            oe.Jar_generic, oe.Herb_with_rocket, oe.Entrance_extends_to_ground,
            oe.Entrance_exit_light_right, oe.Entrance_exit_light_left,
            oe.Castle_entrance_1, oe.Castle_entrance_2].includes(x.obj_type))
        var rendered = render_level(my_l, my_l.header, my_l.enemies, info.meta_info)
        var target_lines = []
        if (my_l.header.vertical){
            console.log(' is vertical')
            target_lines.push(rendered[0][0])
            target_lines.push(rendered[my_l.header.pages][13])
            target_lines.push(rendered[my_l.header.pages][14])
        }
        else {
            console.log(' is horizontal')
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
                    if (tile.owner.pos_y == 0 || tile.owner.pos_y >= 13)
                        tile.owner.obj_type = oe.Column_of_bombable_rock + 1
                    else
                        tile.owner.obj_type = -1
                    //need to recurse on other vine objects writing here?
                } 
            }
        }

        nodes_out.push({
            my_level: my_l.header.pages,
            vertical: my_l.header.vertical,
            connections: []
        })
    }

    if (Math.seedrandom)
        Math.seedrandom(rando_seed)
    var anchor = [50, 50]
    candidates = []
    candidates.push(...render_connection(map, nodes_out[0], {x: anchor[0], y: anchor[1]}, null))
    nodes_out = nodes_out.slice(1)
    while (nodes_out.length && candidates.length) {
        candidates = shuffle(candidates)
        while (candidates[0].connected) {
            candidates = candidates.slice(1)
            if (candidates.length == 0)
                console.error('this is bad')
        }
        var target_cand = candidates[0]

        var my_dirs = shuffle(ping_spots(map, target_cand.x, target_cand.y))

        for(var d of my_dirs){
            var node = nodes_out[0]
            var breaker = false
            var new_pos = split_em(d, 2)
            if (node.vertical)
                p = new_pos[0]
            else
                p = new_pos[1]
            if (p[0].depth + p[1].depth >= node.my_level){
                candidates.push(...render_connection(map, node, target_cand, p))
                nodes_out = nodes_out.slice(1)
                candidates = candidates.slice(1)
                target_cand.connected = node
                break
            }
        }
    }

    var colors = {}
    for (var y in map) {
        for (var x in map[y]) {
            ctx.beginPath()
            ctx.globalAlpha = 1
            ctx.lineWidth=0.2;
            ctx.globalAlpha = map[y][x].collision ? 1 : 0.30
            ctx.fillStyle = map[y][x].color 
            ctx.rect(x*4, y*4, 4, 4)
            ctx.fill() 
            if (colors[map[y][x].color] == undefined)
                colors[map[y][x].color] = 0
            colors[map[y][x].color] += 1
            if(map[y][x])
                if(map[y][x].connected)
                    console.log(map[y][x].connected)
        }
    }
    console.log(colors, num_out)
}

function render_connection (map, node, parent, dir){
    var x = parent.x, y = parent.y
    var color = c_rand.shift()
    c_rand.push(color)
    var candidates = []
    var page = 0
    console.debug(x, y, parent, node)
    if (dir){
        x = x + dir[0].sx
        y = y + dir[0].sy
        var min_depth = Math.min(node.my_level, dir[0].depth)
        var max_depth = Math.min(node.my_level, dir[1].depth)
        var rand_range = (min_depth + max_depth - node.my_level)
        min_depth -= ~~(Math.random() * rand_range)

        page = 0
        if(dir[0].x < 0) {
            x -= min_depth
        }
        if(dir[0].y < 0) {
            y -= min_depth
        }

        console.debug(x, y, min_depth, max_depth, rand_range)
        page = min_depth
    }
    var waow = false
    for (var i = 0; i < node.my_level + 1; i++){
        console.debug(x, y, i)
        if (map[y][x]){
            console.error('collision')
            map[y][x].collision = true
        }
        else 
            map[y][x] = {
                target: node,
                color: i == 0 ? 'red' : color,
                connected_to: null,
                page: i,
                y: y,
                x: x
            }
        if (dir && page == i) {
            map[y][x].connected = parent.target
            map[y][x].color = 'cyan'
            console.log('WAOW')
            waow = true
        }
        candidates.push(map[y][x])
        y += node.vertical ? 1 : 0
        x += node.vertical ? 0 : 1
    }
    return candidates
}

function RandomAlgo2(my_levels, meta_info){
    var modified_my_l = []
    var free_nodes = []
    var odd_nodes = []
    var boss_nodes = []
    for (var pos = 0; pos < my_levels.length; pos++){
        if (my_levels[pos] === undefined || pos >= 200){
            modified_my_l.push(undefined)
            continue
        }
        var my_l = my_levels[pos]
        var my_h = my_l.header
        var my_e = my_l.enemies
        var world = my_l.world
        var level = my_l.level
        var room = my_l.room
        var code = "" + world + "," + level + "," + room 
        // handle world stuff in another not crappy function
        console.log(code)
        var isBoss = my_e.filter(function(ele){return ele.obj_type > 0x5C}).length > 0
        var oddPath = code in metadata
        if (my_l.is_jar){
            console.log('this is jar')
        }
        else if (isBoss){
            var result = create_room_node(my_l, my_h, my_e, meta_info)
            boss_nodes.push(result)
            console.log('this is boss')
        }
        else if (oddPath){
            var result = create_room_node(my_l, my_h, my_e, meta_info)
            odd_nodes.push(result)
            console.log('this is odd')
        }
        else {
            var result = create_room_node(my_l, my_h, my_e, meta_info)
            free_nodes.push(result)
            console.log('this is ok')
            console.log(result.max_doors, my_h.pages + 1)
        }
        modified_my_l.push(my_l)
    }
    extendRandom2(free_nodes, boss_nodes, odd_nodes)
    
    return {
        my_l: modified_my_l,
        f_n: free_nodes,
        b_n: boss_nodes,
        o_n: odd_nodes
    }
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

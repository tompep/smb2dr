
var c_rand = ['blue', 'black', 'green', 'purple']
var up = [0, -1],
    down = [0, 1],
    left = [-1, 0],
    right = [1, 0]
var poses = [up, down, left, right]

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

function test_door_randomizer(num){
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
    for (var my_l of info.my_levels.slice(0, num)) {
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

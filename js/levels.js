
var currentMap
var currentRender
var cursor = [0, 0]
var drag_cursor = [0, 0]
var b_box
var selected_tiles = []

function writeJSON(evt) {
    var my_level_index = $('#world').val() * 30 + $('#level').val() * 10 + $('#room').val() * 1
    console.log($('#world').val() * 30, $('#level').val() * 10, $('#room').val() * 1)
    console.log(my_level_index)
    if (info == undefined){
        console.log('Cannot render level, no rom loaded')
        return
    }
    var level = info.my_levels[my_level_index]
    level.rendered = []
    level.decoded = []
    level.objs = level.objs.map(x => {delete x.obj_name; return x;})
    $('#info_dump').val(JSON.stringify(level))
    show_level(evt)
}

function readJSON(evt) {
    var my_level_index = $('#world').val() * 30 + $('#level').val() * 10 + $('#room').val() * 1
    console.log($('#world').val() * 30, $('#level').val() * 10, $('#room').val() * 1)
    console.log(my_level_index)
    if (info == undefined){
        console.log('Cannot render level, no rom loaded')
        return
    }
    var level = JSON.parse(
        $('#info_dump').val())

    info.my_levels[my_level_index] = level

    show_level(evt)
}

function bounding_box_cursor(poses){
    var min_x = 999999, max_x = 0
    var min_y = 999999, max_y = 0
    for (var p of poses){
        var x = p[1], y = p[0]
        x = (x >> 4) << 4
        y = (y >> 4) << 4
        min_x = Math.min(x, min_x)
        max_x = Math.max(x+16, max_x)
        min_y = Math.min(y, min_y)
        max_y = Math.max(y+16, max_y)
    }
    return {
        mx: min_x,
        my: min_y,
        nx: max_x,
        ny: max_y,
        inside: function(y, x){
            return this.min_x < x &&
                this.max_x > x &&
                this.min_y < y &&
                this.max_y > y
        }
    }
}

function draw_tiles_select(poses, blank=true) {
    var canvas = document.getElementById("myCanvas")
    for (var pose of poses){
        draw_cursor_block([pose], blank, canvas)
        blank = false
    }

}

function draw_cursor_block(poses, blank=true){
    var canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d")
    if (blank){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.putImageData(currentMap, 0, 0)
    }
    b_box = bounding_box_cursor(poses)
    var min_x = b_box.mx,
        min_y = b_box.my,
        max_x = b_box.nx,
        max_y = b_box.ny
        
    console.log(min_x, max_x, min_y, max_y)
    ctx.beginPath()
    ctx.fillStyle='red'
    ctx.globalAlpha = 0.4
    ctx.rect(min_x, min_y, max_x - min_x, max_y - min_y)
    ctx.fill() 
}

function draw_cursor(poses, blank=true) {
    var canvas = document.getElementById("myCanvas"),
        ctx = canvas.getContext("2d")
    if (blank){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.putImageData(currentMap, 0, 0)
    }
    for (var p of poses){
        var x = p[1], y = p[0]
        x = (x >> 4) << 4
        y = (y >> 4) << 4
        ctx.beginPath()
        ctx.globalAlpha = 0.4
        ctx.fillStyle='red'
        ctx.rect(x, y, 16, 16)
        ctx.fill() 
    }
}

function coord_to_tile(x, y, vertical){
    var j = x >> 4,
        i = y >> 4
    var page_num = !vertical ? ~~(j/16) : ~~(i/15)
    var j = (x >> 4) % 16,
        i = (y >> 4) % 15
    console.log('clicked once on', x, y, j, i, page_num)
    return [i, j, page_num, x, y]
}

function get_canvas_coord(canvas, event, vertical){
    var rect = canvas.getBoundingClientRect()
    var x = event.clientX - rect.left
    var y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    return coord_to_tile(x, y, vertical)
}

function test_render() {
    for (var my_l of info.my_levels){
        if (my_l != undefined){
            var t0 = performance.now();

            var rendered = render_level(my_l, my_l.header, my_l.enemies, info.meta_info)

            var t1 = performance.now();
            console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.", my_l.i)
        }
    }
} 

var map_click = function(event, c_j, canvas, vertical, rendered, enemies) {
    c_j.unbind()

    var coords = get_canvas_coord(canvas, event, vertical)
    var i = coords[0], j = coords[1], page_num = coords[2]
    var x = coords[3], y = coords[4]

    if (b_box != undefined)
        console.log(b_box, b_box.inside(y, x))
    if (b_box != undefined && b_box.inside(y, x))
        console.log('coolio')

    var new_enemies = enemies.filter(x => x.pos_y  === i && x.pos_x === j && x.pos_page == page_num)
    
    var render_tile = rendered[page_num][i][j]
    console.log(JSON.stringify(render_tile, null, 2))

    if (render_tile.owner) console.log("Created by:", JSON.stringify(render_tile.owner))
    console.log("Enemies:", JSON.stringify(new_enemies, null, 2))

    cursor = [y, x]
    draw_cursor([cursor])

    c_j.bind("mousedown", function(evt) { map_click(evt, c_j, canvas, vertical, rendered, enemies) })
    c_j.bind("mousemove", function (evt) {
        var coords = get_canvas_coord(canvas, evt, vertical)
        var i = coords[0], j = coords[1], page_num = coords[2]
        var x = coords[3], y = coords[4]
        console.log(coords)
        draw_cursor_block([cursor].concat([[y, x]]))
    })
    c_j.bind("mouseup", function () {
        c_j.unbind("mousemove")
    })
    c_j.bind("mouseleave", function () {
        c_j.unbind("mousemove")
    })
}


    

function show_level(evt) {
    var my_level_index = $('#world').val() * 30 + $('#level').val() * 10 + $('#room').val() * 1
    console.log($('#world').val() * 30, $('#level').val() * 10, $('#room').val() * 1)
    console.log(my_level_index)

    var canvas = document.getElementById("myCanvas"),
        ctx = canvas.getContext("2d", { alpha: false  } );
    var c_j = $('#myCanvas')
    ctx.lineWidth=0.2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle='blue'
    if (info == undefined){
        console.log('Cannot render level, no rom loaded')
        return
    }
    var page_num = $('#page').val()
    var step_num = $('#steps').val()
    var level = info.my_levels[my_level_index]
    console.log('Rendering Level', 
        level.world + 1, "-", level.level + 1, "room", level.room)
    var my_objects = level.objs
    var enemies = level.enemies

    var render_world = ($('#unk3').val() >= 0) ? $('#unk3').val() : level.header.unk3
    var render_x = ($('#unk4').val() >= 0) ? $('#unk4').val() : level.header.unk4 
    var vertical = level.header.vertical
    render_world = render_world == 7 ? level.world : render_world

    if ($('#vert').val() > 0)
        vertical = !vertical

    for (var grid=[]; grid.push(Array(16))< 16;);	
    var a_s = sprites.all_sheets
    var world_sheet = worldTileset[render_world] 
    var world_sheet_enemy = worldTileset_enemy[render_world] 
    var loaded_sheets = [
        a_s[0x0], a_s[0x8], a_s[0x9], a_s[world_sheet_enemy],
        a_s[world_sheet], a_s[world_sheet + 1], a_s[0x18], a_s[0x19]]
    var background_sheets = loaded_sheets.slice(4)
    var world_palette = info.meta_info.world_metadata.bpals[render_world]
    var back_palette = world_palette[level.header.pala]
    var s_pals = info.meta_info.world_metadata.spals[render_world]
    var s_pal = s_pals[level.header.palb]
    var quads = info.meta_info.world_metadata.tile_quads
    var quads_2 = info.meta_info.enemy_tilemap_1
    var quads_3 = info.meta_info.enemy_tilemap_2
    var renderSky = $('#sky_on')[0].checked
    var rendered_tiles = []
    var rendered_enemy = []

    back_palette = ($('#pala').val() >= 0) ? world_palette[$('#pala').val()] : back_palette
    s_pal = ($('#palb').val() >= 0) ? s_pals[$('#palb').val()] : s_pal

    var new_header = $.extend(true, {}, level.header)
    new_header.vertical = vertical
    new_header.pala = back_palette
    new_header.unk3 = render_world
    new_header.unk4 = render_x

    var rendered = render_level(level, new_header, level.enemies, info.meta_info, step_num)
    currentRender = rendered
    var outputted_bytes = write_level_bytes(level, render_world)
    console.log('Bytes of level:', outputted_bytes.length)

    // fix enemy appearance
    if (vertical){
        canvas.height = 240 * (level.header.pages + 1)
        canvas.width = 256 
    }
    else{
        canvas.height = 256 - 16
        canvas.width = 256 * (level.header.pages + 1)
    }


    c_j.unbind()
    c_j.bind("mousedown", function(evt) { map_click(evt, c_j, canvas, vertical, rendered, enemies) })

    var m_spr_canvas = new OffscreenCanvas(canvas.width, canvas.height)
    var m_ctx = m_spr_canvas.getContext('2d', { alpha: false  } );

    var page_count = level.header.pages
    for (page_num = 0; page_num < page_count + 1; page_num++) {
        for (i=0; i<15; i++){
            for (j=0; j<16; j++){
                m_ctx.fillStyle='brown'

                var new_x = j*16 + (!vertical ? page_num*256 : 0)
                var new_y = i*16 + (vertical ? page_num*240 : 0)

                var tile = rendered[page_num][i][j]
                if (tile.obj_type != undefined){
                    if (tile.obj_type == 0x40 && !renderSky){}
                    else {
                        if (rendered_tiles[tile.obj_type] == undefined) {
                            var index = ~~(tile.obj_type/0x40)
                            var sprite_tiles = quads[index][tile.obj_type % 0x40]
                            rendered_tiles[tile.obj_type] = bitmap_from_graphics(background_sheets,
                                    sprite_tiles, 2, back_palette[index], !renderSky).image_data
                        }
                        m_ctx.putImageData(rendered_tiles[tile.obj_type], new_x, new_y)
                    }
                    if (tile.hotspot){
                        m_ctx.fillStyle='green'
                        m_ctx.beginPath()
                        m_ctx.arc(new_x + 8, new_y + 8, 4, 0, 2 * Math.PI)
                        m_ctx.fill();
                    }
                }

                // m_ctx.fillStyle='blue'
                // var new_objs = my_objects.filter(x => x.pos_y === i && x.pos_x === j && x.pos_page == page_num)
                // if (new_objs.length > 0) m_ctx.rect(new_x, new_y, 4, 4)

                var new_enemies = enemies.filter(x => x.pos_y === i && x.pos_x === j && x.pos_page == page_num)
                m_ctx.fillStyle='red'

                if (new_enemies.length > 0) {
                    for (var enemy of new_enemies){
                        m_ctx.beginPath();
                        m_ctx.arc(new_x + 8, new_y + 8, 2, 0, 2 * Math.PI);
                        m_ctx.fill(); 
                        var obj_sprite_loc = info.meta_info.a_tiles[enemy.obj_type]
                        if (obj_sprite_loc != 0xFF) {
                            if (rendered_enemy[enemy.obj_type] == undefined) {
                                var obj_attr = info.meta_info.obj_attr_data[enemy.obj_type]
                                    var my_pal = obj_attr & 0x3 - 1
                                    var mirrored = (obj_attr & 0b10000) > 0
                                    var obj_46e = info.meta_info.data_46e[enemy.obj_type]
                                    var tilemap2 = (obj_46e & 0b10000) > 0
                                    if (tilemap2)
                                        var sprite_tiles = convert_to_8x16(quads_3[obj_sprite_loc >> 1].slice(0, mirrored ? 1 : 2), mirrored)
                                    else
                                        var sprite_tiles = convert_to_8x16(quads_2[obj_sprite_loc >> 1].slice(0, mirrored ? 1 : 2), mirrored)
                                            rendered_enemy[enemy.obj_type] = bitmap_from_graphics(loaded_sheets,
                                                    sprite_tiles, 2, s_pal[my_pal], true).image_data
                            }
                            var img = rendered_enemy[enemy.obj_type]
                            var m_spr_canvas = new OffscreenCanvas(img.width, img.height)
                            var m_spr_ctx = m_spr_canvas.getContext("2d")
                            m_spr_ctx.putImageData(img, 0, 0)
                            
                            m_ctx.drawImage(m_spr_canvas, new_x, new_y);
                        }
                    }
                }
            }
        }
    }
    currentMap = m_ctx.getImageData(0, 0, canvas.width, canvas.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(currentMap, 0, 0);
    draw_cursor([cursor], false)
}

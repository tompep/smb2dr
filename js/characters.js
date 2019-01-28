



var character_frames = [
    "Walk1",
    "Carry1",
    "Walk2",
    "Carry2",
    "Duck",
    "DuckCarry",
    "Jump",
    "Death",
    "Lift",
    "Throw",
    "Climb"
]


function load_character_to_form(char_dict){
    var char_name = invertByTbl(char_dict.name)
    var char_stats = new Int8Array([...char_dict.stats].concat([...char_dict.heights, char_dict.carry[0], char_dict.carry[2]]))
    $('#char_stats #Name').val(char_name)
    var stats_tags = $('#char_stats input#Character_Stats')
    for (var i in char_stats){
        stats_tags[i].value = char_stats[i]
    }
    var char_c = char_dict.characteristics
    var c_vals = []
    for(var x in Array.range(8)){
        if (char_c & (1 << x))
            c_vals.push(x)
    }
    $('#char_stats select#Characteristics').val(c_vals)
    var c_vals = []
    for (var c in Array.range(3))
        for(var x in Array.range(8)){
            if (char_dict.inventory[c] & (1 << x))
                c_vals.push(parseInt(x) + parseInt(c*8))
        }
    console.log(c_vals)
    $('#char_stats select#Starting_Inventory').val(c_vals)
    $('#char_stats select#Starting_Power-Up').val(char_dict.inventory[3])
}

function extract_frames(bitmaps, width, height, offset=0, limit=32) {
    var unique_sprites = []
    var sprite_frame = []
    var sprite_meta = []

    var all_frames = []
    var all_meta = []

    var indices = sprite_mask(bitmaps.length, width, height)
    indices = indices.slice(width*height*offset)

    for (var s of indices){
        if (unique_sprites.length >= limit){
            break
        }
        //split_em(new_spr, 8).map(x => x.reduce(bit_crush_2))
        var sprite = bitmaps[s]
        var new_spr = [].concat(...split_em(sprite, 8).map(x => x.reduce(bc2)))
        var new_spr_mirror = [].concat(...split_em(sprite, 8).map(x => x.reverse().reduce(bc2)))
        // speed this up with 8 comparisons of proper shifted sprites
        if (sprite.reduce((a, c) => a + c) == 0){
            sprite_meta.push(0)
            sprite_frame.push(0xFB)
        }
        else if (unique_sprites.find(x => find_sprite(x, new_spr)) == undefined &&
                unique_sprites.find(x => find_sprite(x, new_spr_mirror)) == undefined){
            sprite_meta.push(0)
            unique_sprites.push(new_spr)
            var sprite_num = unique_sprites.findIndex(x => find_sprite(x, new_spr))
            sprite_num = sprite_num != -1 ? sprite_num : unique_sprites.findIndex(x => find_sprite(x, new_spr_mirror))
            sprite_frame.push(sprite_num * 2)
        }
        else {
            var sprite_num = unique_sprites.findIndex(x => find_sprite(x, new_spr))
            if(sprite_num != -1)
                sprite_meta.push(0)
            else
                sprite_meta.push(1)
            sprite_num = sprite_num != -1 ? sprite_num : unique_sprites.findIndex(x => find_sprite(x, new_spr_mirror))
            sprite_frame.push(sprite_num * 2)
        }
        if(sprite_frame.length == width * height){
            console.log(sprite_frame)
            all_frames.push(sprite_frame)
            var s_m = sprite_meta
            if (s_m.length < 6)
                s_m = [0, s_m[0], s_m[1], 0, s_m[2], s_m[3]]

            all_meta.push([s_m[1], s_m[4], s_m[2], s_m[5], s_m[0], s_m[3], 0, 0])
            sprite_frame = []
            sprite_meta = []
        }
    }
    return {
        uniques: unique_sprites,
        frames: all_frames,
        meta: all_meta
    }
}

function normalizePlayerPal(palette){
    palette = get_nearest_color(palette)
    palette[0] = 0xF
    pal_left = palette[1]
    palette[1] = palette[2]
    palette[2] = pal_left
    return palette
}

function write_sprites_to_rom(currentRom, mem_locs, sheet, offset){
    var mem_spot = 0x20000 + 0x400 * offset 
    var l = sheet.length

    for(var i = 0; i < l; i++){
        var r_spr = sheet[i]
        var new_hi = r_spr.map(x => inverse_lookup_table[(x & 0b1010101010101010) >> 1])
        var new_lo = r_spr.map(x => inverse_lookup_table[(x & 0b101010101010101)])
        set_memory_location(currentRom, mem_locs,
            mem_spot, [].concat(
            ...new_hi.slice(0,8).concat(new_lo.slice(0,8))), 16*(i%l))
        set_memory_location(currentRom, mem_locs,
            mem_spot, [].concat(
            ...new_hi.slice(8,16).concat(new_lo.slice(8,16))), 16*(i%l) + 16)
    }

}

function handleSpriteSelect(evt) {
    var file = evt.target.files[0]
    var reader = new FileReader();
    reader.onload = function(){
        console.log('Loading file...')
        var dataURL = reader.result
        var img = new Image;
    
        img.onload = function(){
            var c_id = $('#a_character').val() & 0b11
            var character = player_order[c_id]
            var characters = info.meta_info.characters

            var img_large = crop_bitmap(img, 0, 0, 24*11, 32)
            var bitmap_sprites = create_sprites_from_bitmap(img_large, 8, 16) 
            var palette = bitmap_sprites.colors, sheet = bitmap_sprites.sheet

            var img_small = crop_bitmap(img, 0, 32, 16*11, 32)
            var small_bitmap_sprites = create_sprites_from_bitmap(img_small, 8, 16, 0, 44, palette) 

            var img_ex = crop_bitmap(img, 16*11, 32)
            var ex_bitmaps = create_sprites_from_bitmap(img_ex, 8, 16) 
            var ex_palette = ex_bitmaps.colors, ex_bitmap_sprites = ex_bitmaps.sheet
            
            // palette stuff
            palette = normalizePlayerPal(palette).slice(0, 4)
            ex_palette = normalizePlayerPal(ex_palette).slice(0, 4)

            characters[character].pal = palette
            characters[character].spal = ex_palette

            var palette = $('.nespalette_select')
            var player_pal = characters[character].pal
            palette.map(x => palette[x].value = player_pal[x])
            palette.trigger('input')

            // slice stuff
            var ex_big = extract_frames(sheet, 3, 2, 0, 31)
            var ex_small = extract_frames(small_bitmap_sprites.sheet, 2, 2)

            var ex_stretch = extract_frames(sheet, 3, 2, ex_big.frames.length)
            ex_stretch.meta.map(x => x[7] = 1)

            console.log(ex_big.frames)
            ex_big.frames.push(...ex_stretch.frames)
            console.log(ex_big.frames)
            console.log(ex_small.frames)

            ex_big.meta.push(...ex_stretch.meta)

            console.log(ex_big.meta)

            characters[character].frames = ex_big.frames.map(x => [...x.slice(1,3), ...x.slice(4, 6)])
            characters[character].s_frames = ex_small.frames
            characters[character].w_frames = ex_big.frames.map(x => [x[0], x[3]])
            characters[character].eyes = 62

            var eye_sprite = [].concat(...split_em(ex_bitmap_sprites[4], 8).map(x => x.reduce(bc2)))

            var big_sheet = []
            ex_big.uniques.map(x => big_sheet.push(...split_em(x, 8)))
            while(big_sheet.length < 64) big_sheet.push(...split_em(eye_sprite, 8))
            big_sheet = big_sheet.slice(0, 64)

            var sml_sheet = []
            ex_small.uniques.map(x => sml_sheet.push(...split_em(x, 8)))
            while(sml_sheet.length < 64) sml_sheet.push(...split_em(eye_sprite, 8))
            sml_sheet = sml_sheet.slice(0, 64)

            var ex_sheet = []
            ex_stretch.uniques.map(x => ex_sheet.push(...split_em(x, 8)))
            while(ex_sheet.length < 64) ex_sheet.push(...split_em(eye_sprite, 8))
            ex_sheet = ex_sheet.slice(0, 64)

            var char_sheet = characters[character].sheet_num
            var x_sheet = characters[character].ex_sheet
            console.log(char_sheet)
            sprites.all_sheets[char_sheet[0]] = big_sheet
            sprites.all_sheets[char_sheet[1]] = sml_sheet
            sprites.all_sheets[x_sheet] = ex_sheet

            write_sprites_to_rom(currentRom, mem_locs, big_sheet, char_sheet[0])  
            write_sprites_to_rom(currentRom, mem_locs, sml_sheet, char_sheet[1])  
            write_sprites_to_rom(currentRom, mem_locs, ex_sheet, x_sheet)  

            console.log(char_sheet, x_sheet)

            set_memory_location(currentRom, mem_locs, 'CharacterOne_Frames', 
                characters[character].frames.reduce((a=[], x) => a.concat(x)), 0x2c*character)
            set_memory_location(currentRom, mem_locs, 'CharacterOne_FramesSmall', 
                characters[character].s_frames.reduce((a=[], x) => a.concat(x)), 0x2c*character)
            set_memory_location(currentRom, mem_locs, 'CO_ExtraFramesOne', 
                characters[character].w_frames.reduce((a=[], x) => a.concat(x)), 22*character)

            console.log(ex_big.meta, ex_small.meta)
            ex_big.meta.map(x => x.reverse())
            ex_small.meta.map(x => x.reverse())
            set_memory_location(currentRom, mem_locs, 'CharacterOneMetaFrames', 
                ex_big.meta.map(x => x.reduce(bc1)), 11*character)
            set_memory_location(currentRom, mem_locs, 'CharacterOneMetaFramesSmall', 
                ex_small.meta.map(x => x.reduce(bc1)), 11*character)

            //set_memory_location(currentRom, mem_locs, 'CharacterOne_Frames', 
            //    characters[character].frames.reduce((a=[], x) => a.concat(x)), 0x2c*character)

            write_to_character(evt)
            show_character(evt)
            $("#char_sheet_load")[0].value = '';
            return

            // 88
            var l = 8 
            mem_locs['start_sprite'] = 0x20000 + 0x400 * 0x30 + 0x80 * c_id
            for (var s of Array.range(l, 88)){
                var offset = 0
                if(s >= 88 + l/2){
                    offset = 0x200
                }
                var r_spr = bitmap_sprites[s]
                r_spr = [].concat(...split_em(r_spr, 8).map(x => x.reduce(bc2)))
                var new_hi = r_spr.map(x => inverse_lookup_table[(x & 0b1010101010101010) >> 1])
                var new_lo = r_spr.map(x => inverse_lookup_table[(x & 0b101010101010101)])
                set_memory_location(currentRom, mem_locs,
                    'start_sprite', [].concat(
                    ...new_hi.slice(0,8).concat(new_lo.slice(0,8))), 32*(s%4) + offset)
                set_memory_location(currentRom, mem_locs,
                    'start_sprite', [].concat(
                    ...new_hi.slice(8,16).concat(new_lo.slice(8,16))), 32*(s%4) + 16 + offset)
            }




            set_memory_location(currentRom, mem_locs, 'CharacterEyeTiles', [characters[character].eyes], character)
            console.log(characters[character].eyes)

        };
        img.src = dataURL;
    }
    reader.readAsDataURL(file)
}

function write_to_character(evt){
    var c_id = $('#a_character').val()
    var character = player_order[c_id & 0b11]
    var characters = info.meta_info.characters
    var char_dict = characters[character]

    var stats_tags = $('#char_stats input#Character_Stats')
    char_dict.name = convertByTbl($('#char_stats #Name').val())
    for (var i in char_dict.stats){
        char_dict.stats[i] = stats_tags[i].value
    }
    char_dict.heights[0] = stats_tags[23].value
    char_dict.heights[1] = stats_tags[24].value
    char_dict.carry[0] = stats_tags[25].value
    char_dict.carry[2] = stats_tags[26].value

    var s_i = $('#char_stats select#Characteristics').val()
    char_dict.characteristics = 0
    for (var x of s_i){
        x = parseInt(x)
        char_dict.characteristics |= 1 << (x%8)
    }
    var s_i = $('#char_stats select#Starting_Inventory').val()
    char_dict.inventory = [0, 0, 0, 0]
    for (var x of s_i){
        x = parseInt(x)
        char_dict.inventory[~~(x/8)] |= 1 << (x%8)
    }
    var s_p = $('#char_stats select#Starting_Power-Up').val()
    char_dict.inventory[3] = parseInt(s_p)

    console.log(char_dict)

    set_memory_location(currentRom, mem_locs, 'CharacterStats', char_dict.stats, char_dict.stats_off)
    set_memory_location(currentRom, mem_locs, 'DokiMode', [char_dict.characteristics], character)
    set_memory_location(currentRom, mem_locs, 'HeightOffset', [char_dict.heights[0]], character)
    set_memory_location(currentRom, mem_locs, 'HeightOffset', [char_dict.heights[1]], character + 4)
    set_memory_location(currentRom, mem_locs, 'CarryYOffsets', [char_dict.carry[0]], character)
    set_memory_location(currentRom, mem_locs, 'CarryYOffsets', [char_dict.carry[1]], character+4)
    set_memory_location(currentRom, mem_locs, 'CarryYOffsets', [char_dict.carry[2]], character+8)
    set_memory_location(currentRom, mem_locs, 'CarryYOffsets', [char_dict.carry[3]], character+12)
    set_memory_location(currentRom, mem_locs, 'StartingInventory', [char_dict.inventory[0]], character)
    set_memory_location(currentRom, mem_locs, 'StartingInventory', [char_dict.inventory[1]], character+4)
    set_memory_location(currentRom, mem_locs, 'StartingInventory', [char_dict.inventory[2]], character+8)
    set_memory_location(currentRom, mem_locs, 'StartingProjectile', [char_dict.inventory[3]], character)
    set_memory_location(currentRom, mem_locs, 'CharacterPalette', char_dict.pal, 4*character)
    set_memory_location(currentRom, mem_locs, 'PlayerSelectSpritePalettes', char_dict.spal, char_dict.soff + 3)
}

function show_character(evt) {
    var a_s = sprites.all_sheets
    var character = player_order[$('#a_character').val() & 0b11]
    var frame = $('#a_frame').val()
    var c_size = $('#a_size')[0].checked ? 1 : 0

    if (currentRom == undefined)
        currentRom = startingRom

    var characters = info.meta_info.characters

    var frame_data = characters[character].frames
    if (c_size)
        frame_data = characters[character].s_frames
    var eye_frame_tiles = characters[character].eyes
    var eye_frame_data = extract_mem_block(
        currentRom.slice(0x10), mem_locs, 'CharacterFrameEyeTiles', 11)
    var char_sheet = characters[character].sheet_num[c_size]

    var current_character_frames = frame_data.map((x, y) => convert_to_8x16(x, [4, 5, 7].includes(y)))
    var picked_frame = current_character_frames[frame]
    var loaded_sheets = [a_s[char_sheet], a_s[0x8], a_s[0x9], a_s[0xC],
        a_s[0xD], a_s[0xD + 1], a_s[0x18], a_s[0x19]]

    var palette = $('.nespalette_select')
    var pal_name = $('#a_char_pal').val()
    if (this.id == 'a_character' || this.id == 'a_char_pal') {
        var player_pal = characters[character].pal
        palette.map(x => palette[x].value = player_pal[x])
        palette.trigger('input')
    }
    if (this.id == 'a_character'){
        load_character_to_form(characters[character])
    }
    var spr_palette = []
    palette.map(x => spr_palette.push(parseInt(palette[x].value)))
    palette.map(x => characters[character].pal[x] = palette[x].value )
    $("#char_sprites").text('')
    
    if(frame == -1){
        for (var index in current_character_frames){
            var current_frame = current_character_frames[index]
            var player = bitmap_from_graphics(loaded_sheets,
                                current_frame, 2, spr_palette, true)
            var img = $("<img alt='frame' class='sprite'></img>")
            img.attr('src', player.data_url)
            $("#char_sprites").append(img)
        }
    }
    else {
        var player_eyes = bitmap_from_graphics(loaded_sheets,
            convert_to_8x16(
                [eye_frame_data[frame] > 0 ? eye_frame_data[frame] : characters[character].eyes
                , 0xDF, 0xDF, 0xDF]),
            2, [32, 32, 32, 32], true)
        var player = bitmap_from_graphics(loaded_sheets,
            picked_frame, 2, spr_palette, true) 

        var img = player.image_data
        var img_eyes = player_eyes.image_data
        var m_canvas = document.createElement('canvas')
        m_canvas.width = img.width 
        m_canvas.height = img.height
        var m_context = m_canvas.getContext("2d")
        m_context.putImageData(player_eyes.image_data, 0, 0)
        var graphic = new OffscreenCanvas(img.width, img.height) 
        graphic.getContext("2d").putImageData(player.image_data, 0, 0)
        m_context.drawImage(graphic, 0, 0)
        var img = $("<img alt='frame' class='sprite'></img>")
        img.attr('src', m_canvas.toDataURL())
        $("#char_sprites").prepend(img)
        $("#char_sprites").show()
    }
    $("#char_sprites").append('</br>')
    for (var s of Array.range(8)){
        var player = bitmap_from_graphics(loaded_sheets,
            convert_to_8x16([s*4,s*4+2]), 2, spr_palette, true)
        var img = $("<img alt='frame' class='sprite'></img>")
        img.attr('src', player.data_url)
        $("#char_sprites").append(img)
    }
    $("#char_sprites").append('</br>')
    for (var s of Array.range(8, 8)){
        var player = bitmap_from_graphics(loaded_sheets,
            convert_to_8x16([s*4,s*4+2]), 2, spr_palette, true)
        var img = $("<img alt='frame' class='sprite'></img>")
        img.attr('src', player.data_url)
        $("#char_sprites").append(img)
    }
}

function outputSpriteSelect(evt) {
    console.log('oh boy')

    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext("2d");

    $("#char_sprites").text('')

    var a_s = sprites.all_sheets
    var c_id = $('#a_character').val() & 0b11
    var character = player_order[c_id]

    if (currentRom == undefined)
        currentRom = startingRom

    var characters = info.meta_info.characters

    var frame_data = characters[character].frames
    var s_frame_data = characters[character].s_frames
    var w_frame_data = characters[character].w_frames
    var eye_frame_tiles = characters[character].eyes

    var meta_big = characters[character].m_big.map(x => [x[0], x[2], x[1], x[3]])
    var meta_big_ex = characters[character].m_big.map(x => [x[4], x[5]])
    var meta_small = characters[character].m_small.map(x => [x[0], x[2], x[1], x[3]])

    var current_character_frames = frame_data.map((x, y) => convert_sprite_to_8x16(x, 2, meta_big[y]))
    var wide_char_frames = w_frame_data.map((x, y) => convert_sprite_to_8x16(x, 1, meta_big_ex[y]))
    var s_current_character_frames = s_frame_data.map((x, y) => convert_sprite_to_8x16(x, 2, meta_small[y]))

    var palette = $('.nespalette_select')
    var spr_palette = []
    palette.map(x => spr_palette.push(parseInt(palette[x].value)))
    $("#char_sprites").text('')

    var bitmaps = []

    var char_sheet = characters[character].sheet_num[0]
    var loaded_sheets = [a_s[char_sheet], a_s[0x8], a_s[0x9], a_s[0xC],
        a_s[0xD], a_s[0xD + 1], a_s[0x18], a_s[0x19]]
    for (var c in current_character_frames){
        var current_frame = current_character_frames[c]
        var extended_frame = wide_char_frames[c]
        bitmaps.push(bitmap_from_graphics(loaded_sheets, extended_frame, 1, spr_palette, true))
        bitmaps.push(bitmap_from_graphics(loaded_sheets, current_frame, 2, spr_palette, true))
    }

    char_sheet = characters[character].sheet_num[1]
    loaded_sheets[0] = a_s[char_sheet]
    for (var current_frame of s_current_character_frames)
        bitmaps.push(bitmap_from_graphics(loaded_sheets, current_frame, 2, spr_palette, true))

    loaded_sheets[0] = a_s[0x30]
    var player_sel1 = convert_to_8x16([0x0, 0x2, 0x4, 0x6].map(x => x + player_order[character]*8))
    var player_sel2 = convert_to_8x16([0x20, 0x22, 0x24, 0x26].map(x => x + player_order[character]*8))
    for (var current_frame of [player_sel1, player_sel2])
        bitmaps.push(bitmap_from_graphics(loaded_sheets, current_frame, 2, spr_palette, true))

    /*
    var player_pal = [0x1fb, 0x1fc, 0x1fd, 0x1fe]
    bitmaps.push(bitmap_from_graphics(loaded_sheets, player_pal, 2, spr_palette, true))
    */
    
    loaded_sheets[0] = a_s[0x48]
    var player_eyes = convert_to_8x16([eye_frame_tiles])
    var player_mini1 = convert_to_8x16([0x0].map(x => x + player_order_b[c_id]*4))
    var player_mini2 = convert_to_8x16([0x2].map(x => x + player_order_b[c_id]*4))
    for (var current_frame of [player_eyes, player_mini1, player_mini2]){
        bitmaps.push(bitmap_from_graphics(loaded_sheets, current_frame, 1, spr_palette, true))
    }

    canvas.height = 2*32
    canvas.width = 11*24
    ctx.fillStyle='cyan'
    ctx.globalAlpha = 1
    ctx.lineWidth=0;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill() 
    var x_in = 0, // if not vert, do nothing
        y_in = 0  
    for (var b in bitmaps) {
        var img = bitmaps[b].image_data
        var graphic = new OffscreenCanvas(img.width, img.height) 
        graphic.getContext("2d").putImageData(img, 0, 0)
        ctx.drawImage(graphic, x_in, y_in)
        x_in += img.width // if not vert, do nothing
        x_in = x_in % canvas.width
        y_in += x_in ? 0 : 32
    }
    var img = $("<img alt='frame'></img>")
    img.attr('src', canvas.toDataURL())
    $("#char_sprites").append(img)
}


var character_config_form = {
    "Character Information": [
        {
            "name": "Default",

            "options": [
                {"name": "Name", "desc": "", "val": "Name", "max": 10},
                {"name": "Player Palette", "desc": "", "val": [0, 0, 0, 0], "class": "palette"},
                {"name": "Select Palette", "desc": "", "val": [0, 0, 0, 0], "class": "palette"},
                {"name": "Deselect Palette", "desc": "", "val": [0, 0, 0, 0], "class": "palette"},
                {"name": "Character Stats", "desc": "",
                    "val": [
                        "Pick-up Speed, frame 1 (pulling)",
                        "Pick-up Speed, frame 2 (pulling)",
                        "Pick-up Speed, frame 3 (ducking)",
                        "Pick-up Speed, frame 4 (ducking)",
                        "Pick-up Speed, frame 5 (ducking)",
                        "Pick-up Speed, frame 6 (ducking)",
                        "Jump Speed, still - no object",
                        "Jump Speed, still - with object",
                        "Jump Speed, charged - no object",
                        "Jump Speed, charged - with object",
                        "Jump Speed, running - no object",
                        "Jump Speed, running - with object",
                        "Jump Speed - in quicksand",
                        "Floating Time",
                        "Gravity without Jump button pressed",
                        "Gravity with Jump button pressed",
                        "Gravity in quicksand",
                        "Running Speed, right - no object",
                        "Running Speed, right - with object",
                        "Running Speed, right - in quicksand",
                        "Running Speed, left - no object",
                        "Running Speed, left - with object",
                        "Running Speed, left - in quicksand",
                        "Height offset (full-size)",
                        "Height offset (small)",
                        "Carry offset final (full-size)",
                        "Carry offset final (small)"]
                    , "class": "mem_array", "mem_loc_name": "Character Stats", "min": -127, "max": 128},
                {"name": "Characteristics", "desc": "", "class": "add_up_multi", 
                    "val": [ "Can Shrink",
                        "Can Run",
                        "Flutter Jump",
                        "Peach Walk",
                        "n/a",
                        "n/a",
                        "n/a",
                        "Wide Sprite"]},

                {"name": "Starting Inventory", "desc": "", "class": "add_up_multi", 
                    "val": [ "Power Throw",
                        "Power Charge",
                        "Power Walk",
                        "Store Item",
                        "Life Vest",
                        "Elec Immune",
                        "Fire Immune",
                        "Magic Mirror",

                        "AT Boots",
                        "Jump Boots",
                        "Float Boots",
                        "Master Key",
                        "Toss Jump",
                        "Unimplemented1",
                        "Unimplemented2",
                        "Unimplemented3" ,

                        "Kirby Jump",
                        "Grapple",
                        "Space Jump",
                        "Bounce Jump",
                        "Bounce All",
                        "Ground Pound",
                        "Unimplemented4",
                        "Unimplemented5" 
                    ]},
                {"name": "Starting Power-Up", "desc": "", "class": "add_up", 
                    "val": [ "n/a",
                        "Fire Flower",
                        "Egg Thrower",
                        "Bomb Thrower",
                        "Phanto Buddy",
                        "Fry Buddy",
                        "Fireball",
                        "Bullet" ]}
            ]
        }
    ]
}

/*
 * 
 *
 * 
 * 
 */

function extract_characters(my_rom, mem_locs){
    // mario prin toad lugi
    var char_stats_offset = extract_mem_block(my_rom, mem_locs, 'StatOffsets', 4)
    var char_stats = []
    char_stats_offset.map(x => char_stats.push(new Int8Array(extract_mem_block(my_rom, mem_locs, 'CharacterStats', 23, x))))

    var char_pal = split_em(extract_mem_block(my_rom, mem_locs, 'CharacterPalette', 16), 4)

    var cps_offset = extract_mem_block(my_rom, mem_locs, 'PlayerSelectPaletteOffsets', 4)
    var char_pal_sel = [] 
    cps_offset.map(x => char_pal_sel.push(
        new Uint8Array(extract_mem_block(my_rom, mem_locs, 'PlayerSelectSpritePalettes', 4, x + 3))))
    var char_names = split_em(extract_mem_block(my_rom, mem_locs, 
        'EndingCelebrationText_MARIO', 12*4), 12).map(x => x.slice(3, x.length - 1))

    var dspals = split_em(extract_mem_block(my_rom, mem_locs, 'PlayerSelectSpritePalettesDark', 16, 3), 4)

    var char_frames = split_em(extract_mem_block(my_rom, mem_locs, 'CharacterOne_Frames', 48*4), 48)
    var s_char_frames = split_em(extract_mem_block(my_rom, mem_locs, 'CharacterOne_FramesSmall', 48*4), 48)
    var char_frames_wide = split_em(extract_mem_block(my_rom, mem_locs, 'CO_ExtraFramesOne', 24*4), 24)

    var char_meta_frames = [...extract_mem_block(my_rom, mem_locs, 'CharacterOneMetaFrames', 12*4)]
    char_meta_frames = split_em(char_meta_frames.map((x, y) => extract_bits(x)), 12)
    var s_char_meta_frames = [...extract_mem_block(my_rom, mem_locs, 'CharacterOneMetaFramesSmall', 12*4)]
    s_char_meta_frames = split_em(s_char_meta_frames.map((x, y) => extract_bits(x)), 12)

    var char_sheet = split_em(extract_mem_block(my_rom, mem_locs, 'CHRBank_CharacterSize', 8), 2) 
    var ex_sheet = extract_mem_block(my_rom, mem_locs, 'CharacterExtraSheets', 4) 
    console.log(char_meta_frames, s_char_meta_frames)
    var char_eyes = extract_mem_block(my_rom, mem_locs, 'CharacterEyeTiles', 4) 
    var char_options = extract_mem_block(my_rom, mem_locs, 'DokiMode', 4)
    var char_heights = split_em(extract_mem_block(my_rom, mem_locs, 'HeightOffset', 8), 4)
    var char_carry = split_em(extract_mem_block(my_rom, mem_locs, 'CarryYOffsets', 16), 4)
    var char_inventory = split_em(extract_mem_block(my_rom, mem_locs, 'StartingInventory', 16), 4)
    var char_select_1 = split_em(extract_mem_block(my_rom, mem_locs, 'PlayerSelectMarioSprites1', 16*4), 16) 
    var char_select_2 = split_em(extract_mem_block(my_rom, mem_locs, 'PlayerSelectMarioSprites2', 16*4), 16) 
    var char_tiny1 = split_em(extract_mem_block(my_rom, mem_locs, 'MarioDream_BubbleSprites', 16), 4) 
    var char_tiny2 = split_em(extract_mem_block(my_rom, mem_locs, 'MarioDream_BubbleSprites2', 16), 4) 

    var characters = []
    for(var i = 0; i < 4; i++){
        characters.push({
            stats: char_stats[i],
            stats_off: char_stats_offset[i],
            pal: char_pal[i],
            spal: char_pal_sel[i],
            dspal: dspals[player_order[i]],
            soff: cps_offset[i],
            name: invertByTbl(char_names[i]),

            frames: split_em(char_frames[i], 4),
            w_frames: split_em(char_frames_wide[i], 2),
            s_frames: split_em(s_char_frames[i], 4),

            m_big: char_meta_frames[i],
            m_small: s_char_meta_frames[i],

            eyes: char_eyes[i],
            sheet_num: char_sheet[i],
            ex_sheet: ex_sheet[i],

            characteristics: char_options[i],
            heights: [char_heights[0][i], char_heights[1][i]],
            carry: char_carry.map(x => x[i]),
            inventory: char_inventory.map(x => x[i]),
            char_select1: char_select_1[player_order[i]],
            char_select2: char_select_2[player_order[i]],
            char_tiny1: char_tiny1[player_order_d[i]],
            char_tiny2: char_tiny2[player_order_d[i]]
        })
    }
    return characters
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

function write_sprites_to_rom(currentRom, mem_locs, data, sheet_num, sprite_num=0){
    var mem_spot = 0x20000 + 0x400 * sheet_num + 0x10 * sprite_num
    var sprite_list = Array.split(data, 32)
    var spr_data = sprites_to_bytes(data)
    set_memory_location(currentRom, mem_locs, mem_spot, spr_data) 
}


function sprite_frames_to_canvas (character, c_id, sprites) {
    // genericify this with the sprite displaying functions
    var char_num = player_order[c_id]
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext("2d")

    var a_s = sprites.all_sheets
    console.log(character, c_id, sprites)

    var frame_data = character.frames
    var s_frame_data = character.s_frames
    var w_frame_data = character.w_frames
    var eye_frame_tiles = character.eyes

    var meta_big = character.m_big.map(x => [x[0], x[2], x[1], x[3]])
    var meta_big_ex = character.m_big.map(x => [x[4], x[5]])
    var meta_small = character.m_small.map(x => [x[0], x[2], x[1], x[3]])

    var current_character_frames = frame_data.map((x, y) => convert_sprite_to_8x16(x, 2, meta_big[y]))
    var wide_char_frames = w_frame_data.map((x, y) => convert_sprite_to_8x16(x, 1, meta_big_ex[y]))
    var s_current_character_frames = s_frame_data.map((x, y) => convert_sprite_to_8x16(x, 2, meta_small[y]))

    var spr_palette = character.pal

    var bitmaps = []

    // bitmaps of frames large
    var char_sheet = character.sheet_num[0]
    var loaded_sheets = [a_s[char_sheet], a_s[0x8], a_s[0x9], a_s[0xC],
        a_s[0xD], a_s[0xD + 1], a_s[0x18], a_s[0x19]]
    for (var c in current_character_frames){
        var current_frame = current_character_frames[c]
        var extended_frame = wide_char_frames[c]
        bitmaps.push(bitmap_from_graphics(loaded_sheets, extended_frame, 1, spr_palette, true))
        bitmaps.push(bitmap_from_graphics(loaded_sheets, current_frame, 2, spr_palette, true))
    }

    // bitmaps of frames small
    char_sheet = character.sheet_num[1]
    loaded_sheets[0] = a_s[char_sheet]
    for (var current_frame of s_current_character_frames)
        bitmaps.push(bitmap_from_graphics(loaded_sheets, current_frame, 2, spr_palette, true))

    var spr_palette = character.spal

    // bitmaps of frames select
    char_sheet = character.sheet_num[1]
    loaded_sheets[0] = a_s[0x30]
    var player_sel1 = convert_to_8x16([0x0, 0x2, 0x4, 0x6].map(x => x + c_id*8))
    var player_sel2 = convert_to_8x16([0x20, 0x22, 0x24, 0x26].map(x => x + c_id*8))
    for (var current_frame of [player_sel1, player_sel2])
        bitmaps.push(bitmap_from_graphics(loaded_sheets, current_frame, 2, spr_palette, true))

    // bitmaps of frames cheer
    loaded_sheets[0] = a_s[0x31]
    for (var current_frame of [player_sel1, player_sel2])
        bitmaps.push(bitmap_from_graphics(loaded_sheets, current_frame, 2, spr_palette, true))

    // bitmaps of eyes and small
    loaded_sheets[0] = a_s[char_sheet]
    var player_eyes = convert_to_8x16([eye_frame_tiles])
    bitmaps.push(bitmap_from_graphics(loaded_sheets, player_eyes, 1, spr_palette, true))
    
    loaded_sheets[0] = a_s[0x48]
    var player_mini1 = convert_to_8x16([0x0].map(x => x + player_order_b[c_id]*4))
    var player_mini2 = convert_to_8x16([0x2].map(x => x + player_order_b[c_id]*4))
    for (var current_frame of [player_mini1, player_mini2]){
        bitmaps.push(bitmap_from_graphics(loaded_sheets, current_frame, 1, spr_palette, true))
    }

    canvas.height = 2*32
    canvas.width = 12*24
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

    return canvas
}


var char_viewer = function (id='char_viewer') {
    var my_obj = this
    this.my_stats = {}
    this.loaded_characters = {}
    
    this.preset_characters = {}
    this.id = id

    this.my_div = $('<div id="' + this.id + '" class="main_item"></div>')

    this.load_sheet = $('<input type="file" style="display: none" class="input" id="char_sheet_load" name="file"/>')
    
    this.option_control = $('<div class="option_div">')
    this.option_control.append(' <label> Character <input id="a_character" type="number" class="char_read" min="0" max="3" value="0"/> </label>')
    this.option_control.append(' <label> Frame <input id="a_frame" type="number" class="char_read" min="-1" max="10" value="0"/> </label>')
    this.option_control.append(' <label> <input id="a_size" type="checkbox" class="char_read"/> Small </label> ')
    this.option_control.append(this.load_sheet)

    var load_sheet = $("<button>Load Sheet</button> ")
    load_sheet.on('click', function() { my_obj.load_sheet.trigger('click') })
    this.option_control.append(load_sheet)

    var save_sheet = $(" <button id='char_sheet_save'>Save Sheet</button> ")
    this.option_control.append(save_sheet)
                
    this.my_div.append(this.option_control)

    this.scratch_page = $('<div>')

    this.my_div.append(this.scratch_page)
    
    var char_stat_control = $('<div id="char_stats"></div>') 
    this.my_div.append(char_stat_control)

    var stat_tags = handle_options(character_config_form)
    var option_tags = stat_tags[1].find('.option, .option_form, .option_select, .option_pal')
    for(var stat of [...option_tags]){
        this.my_stats[stat.id] = $(stat)
    }
    char_stat_control.append(...stat_tags)
    console.debug(this.my_stats)

    this.load_character_to_form = function(char_dict){
        var char_name = char_dict.name
        console.log(char_dict.name)
        var char_stats = new Int8Array([...char_dict.stats].concat([...char_dict.heights, char_dict.carry[0], char_dict.carry[2]]))
        var my_stats = my_obj.my_stats

        my_stats['Name'].val(char_name)
        var stats_tags = my_stats['Character_Stats'].find('.sub_option')
        console.log(my_stats['Character_Stats'], stats_tags)
        for (var i in char_stats){
            stats_tags[i].value = char_stats[i]
        }
        var char_c = char_dict.characteristics
        var c_vals = []
        for(var x in Array.range(8)){
            if (char_c & (1 << x))
                c_vals.push(x)
        }
        my_stats['Characteristics'].val(c_vals)
        var c_vals = []
        for (var c in Array.range(3))
            for(var x in Array.range(8)){
                if (char_dict.inventory[c] & (1 << x))
                    c_vals.push(parseInt(x) + parseInt(c*8))
            }
        console.log(c_vals)
        my_stats['Starting_Inventory'].val(c_vals)
        my_stats['Starting_Power-Up'].val(char_dict.inventory[3])
    }

    this.show_character = function () {
        var a_s = sprites.all_sheets
        var option_control = my_obj.option_control
        var character = player_order[option_control.find('#a_character').val() & 0b11]
        var frame = option_control.find('#a_frame').val()
        var c_size = option_control.find('#a_size')[0].checked ? 1 : 0

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
            var player_pal = [].concat(...characters[character].pal, ...characters[character].spal, ...characters[character].dspal)
            palette.map(x => palette[x].value = player_pal[x])
            palette.trigger('input')
        }
        if (this.id == 'a_character'){
            my_obj.load_character_to_form(characters[character])
        }
        var spr_palette = []
        palette.map(x => spr_palette.push(parseInt(palette[x].value)))
        spr_palette.slice(0, 4).map((x,y) => characters[character].pal[y] = x)
        spr_palette.slice(4, 8).map((x,y) => characters[character].spal[y] = x)
        spr_palette.slice(8, 12).map((x,y) => characters[character].dspal[y] = x)

        var div = my_obj.scratch_page
        div.text('')
        
        if(frame == -1){
            for (var index in current_character_frames){
                var current_frame = current_character_frames[index]
                var player = bitmap_from_graphics(loaded_sheets,
                                    current_frame, 2, spr_palette, true)
                var img = $("<img alt='frame' class='sprite'></img>")
                img.attr('src', player.data_url)
                div.append(img)
            }
        }
        else {
            var player_eyes = bitmap_from_graphics(loaded_sheets,
                convert_to_8x16(
                    [eye_frame_data[frame] > 0 ? eye_frame_data[frame] : characters[character].eyes
                    , 0xFB, 0xFB, 0xFB]),
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
            div.prepend(img)
            div.show()
        }

        div.append('</br>')
        for (var s of Array.range(8)){
            var player = bitmap_from_graphics(loaded_sheets,
                convert_to_8x16([s*4,s*4+2]), 2, spr_palette, true)
            var img = $("<img alt='frame' class='sprite'></img>")
            img.attr('src', player.data_url)
            div.append(img)
        }

        div.append('</br>')
        for (var s of Array.range(8, 8)){
            var player = bitmap_from_graphics(loaded_sheets,
                convert_to_8x16([s*4,s*4+2]), 2, spr_palette, true)
            var img = $("<img alt='frame' class='sprite'></img>")
            img.attr('src', player.data_url)
            div.append(img)
        }
    }

    this.handleSpriteSelect = function (evt) {
        var file = evt.target.files[0]
        var reader = new FileReader();
        console.log('Loading file...?')
        reader.onload = function(){
            console.log('Loading file...')
            var dataURL = reader.result
            var img = new Image;
        
            img.onload = function(){
                var c_id = $('#a_character').val() & 0b11
                var character = player_order[c_id]
                var characters = info.meta_info.characters

                var img_large = crop_bitmap(img, 0, 0, 24*12, 32)
                var bitmap_sprites = create_sprites_from_bitmap(img_large, 8, 16) 
                var palette = bitmap_sprites.colors, sheet = bitmap_sprites.sheet

                var img_small = crop_bitmap(img, 0, 32, 16*12, 32)
                var small_bitmap_sprites = create_sprites_from_bitmap(img_small, 8, 16, 0, 48, palette) 

                var img_ex = crop_bitmap(img, 16*12, 32)
                var ex_bitmaps = create_sprites_from_bitmap(img_ex, 8, 16) 
                var ex_palette = ex_bitmaps.colors, ex_bitmap_sprites = ex_bitmaps.sheet
                
                // palette stuff
                palette = normalizePlayerPal(palette).slice(0, 4)
                ex_palette = normalizePlayerPal(ex_palette).slice(0, 4)

                characters[character].pal = palette
                characters[character].spal = ex_palette

                var palette = $('.nespalette_select')
                var player_pal = characters[character].pal.concat(characters[character].spal).concat([...characters[character].dspal])
                palette.map(x => palette[x].value = player_pal[x])
                palette.trigger('input')

                // slice stuff
                var ex_big = extract_frames(sheet, 3, 2, 0, 31)
                var ex_small = extract_frames(small_bitmap_sprites.sheet, 2, 2)

                var ex_stretch = extract_frames(sheet, 3, 2, ex_big.frames.length)
                ex_stretch.meta.map(x => x[7] = 1)

                ex_big.frames.push(...ex_stretch.frames)
                ex_big.meta.push(...ex_stretch.meta)

                characters[character].frames = ex_big.frames.map(x => [...x.slice(1,3), ...x.slice(4, 6)])
                characters[character].s_frames = ex_small.frames
                characters[character].w_frames = ex_big.frames.map(x => [x[0], x[3]])
                characters[character].eyes = 0x3E

                var eye_sprite = [].concat(...split_em(ex_bitmap_sprites[8].map(x => x > 0 ? 2 : 0), 8).map(x => x.reduce(bc2)))

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

                var indices = sprite_mask(ex_bitmap_sprites.length, 2, 2)
                console.debug(indices)

                var select_sheet = []
                indices.slice(0,32).map(x => select_sheet.push(...
                    split_em(split_em(ex_bitmap_sprites[x], 8).map(x => x.reduce(bc2)), 8)))

                write_sprites_to_rom(currentRom, mem_locs, 
                    select_sheet.slice(0,8), 0x30, character*16)  
                select_sheet.slice(0,8).map((x,y) =>
                    sprites.all_sheets[0x30][y + character*16] = x)

                write_sprites_to_rom(currentRom, mem_locs, 
                    select_sheet.slice(8,16), 0x30, character*8 + 0x20)  
                select_sheet.slice(8,16).map((x,y) =>
                    sprites.all_sheets[0x30][y + character*16 + 0x20] = x)

                write_sprites_to_rom(currentRom, mem_locs, 
                    select_sheet.slice(16,24), 0x31, character*8)  
                select_sheet.slice(16,24).map((x,y) =>
                    sprites.all_sheets[0x31][y + character*16] = x)

                write_sprites_to_rom(currentRom, mem_locs, 
                    select_sheet.slice(24,32), 0x31, character*16 + 0x20)  
                select_sheet.slice(24,32).map((x,y) =>
                    sprites.all_sheets[0x31][y + character*16 + 0x20] = x)

                var indices = sprite_mask(ex_bitmap_sprites.length, 1, 1)
                console.debug(indices, 'windices')

                var select_sheet = []
                indices.slice(9,11).map(x => select_sheet.push(...
                    split_em(split_em(ex_bitmap_sprites[x], 8).map(x => x.reduce(bc2)), 8)))

                write_sprites_to_rom(currentRom, mem_locs, 
                    select_sheet, 0x48, character*4)  
                select_sheet.map((x,y) =>
                    sprites.all_sheets[0x48][y + character*4] = x)


                var char_sheet = characters[character].sheet_num
                var x_sheet = characters[character].ex_sheet
                console.log(char_sheet)
                sprites.all_sheets[char_sheet[0]] = big_sheet
                sprites.all_sheets[char_sheet[1]] = sml_sheet
                sprites.all_sheets[x_sheet] = ex_sheet

                write_sprites_to_rom(currentRom, mem_locs, big_sheet, char_sheet[0])  
                write_sprites_to_rom(currentRom, mem_locs, sml_sheet, char_sheet[1])  
                write_sprites_to_rom(currentRom, mem_locs, ex_sheet, x_sheet)  
                write_sprites_to_rom(currentRom, mem_locs, ex_sheet, x_sheet)  

                console.log(char_sheet, x_sheet)

                set_memory_location(currentRom, mem_locs, 'CharacterOne_Frames', 
                    characters[character].frames.reduce(
                        (a=[], x) => a.concat(x)), 0x30*character)
                set_memory_location(currentRom, mem_locs, 'CharacterOne_FramesSmall', 
                    characters[character].s_frames.reduce(
                        (a=[], x) => a.concat(x)), 0x30*character)
                set_memory_location(currentRom, mem_locs, 'CO_ExtraFramesOne', 
                    characters[character].w_frames.reduce(
                        (a=[], x) => a.concat(x)), 24*character)

                console.log(ex_big.meta, ex_small.meta)
                ex_big.meta.map(x => x.reverse())
                ex_small.meta.map(x => x.reverse())
                set_memory_location(currentRom, mem_locs, 'CharacterOneMetaFrames', 
                    ex_big.meta.map(x => x.reduce(bc1)), 12*character)
                set_memory_location(currentRom, mem_locs, 'CharacterOneMetaFramesSmall', 
                    ex_small.meta.map(x => x.reduce(bc1)), 12*character)

                //set_memory_location(currentRom, mem_locs, 'CharacterOne_Frames', 
                //    characters[character].frames.reduce((a=[], x) => a.concat(x)), 0x2c*character)

                set_memory_location(currentRom, mem_locs, 
                    'CharacterEyeTiles', [characters[character].eyes], character)
                console.log(characters[character].eyes)

                my_obj.write_to_character(evt)
                my_obj.show_character(evt)
                $("#char_sheet_load")[0].value = '';
                return

            };
            img.src = dataURL;
        }
        reader.readAsDataURL(file)
    }

    this.write_to_character = function(evt){
        var c_id = $('#a_character').val()
        var character = player_order[c_id & 0b11]
        var characters = info.meta_info.characters
        var char_dict = characters[character]

        var stats_tags = $('#char_stats input#Character_Stats')
        char_dict.name = $('#char_stats #Name').val()
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
        set_memory_location(currentRom, mem_locs, 'PlayerSelectSpritePalettesDark', char_dict.dspal, 3 + 4*character)
    }

    this.outputSpriteSelect = function(evt) {
        var c_id = $('#a_character').val()
        var character = player_order[c_id & 0b11]
        var characters = info.meta_info.characters
        var char_dict = characters[character]
        var canvas = sprite_frames_to_canvas(char_dict, c_id, sprites)

        var img = $("<img alt='frame'></img>")
        img.attr('src', canvas.toDataURL())
        var div = my_obj.scratch_page
        div.text('')
        div.append(img)
    }

    this.my_div.find('#char_stats input').on('change', my_obj.write_to_character)
    this.my_div.find('#char_stats select').on('change', my_obj.write_to_character)
    this.my_div.find('.nespalette_select').on('change', my_obj.show_character)
    this.my_div.find('.nespalette_select').on('change', my_obj.write_to_character)
    this.my_div.find('#char_sheet_load').on('input', my_obj.handleSpriteSelect)
    this.my_div.find('#char_sheet_save').on('click', my_obj.outputSpriteSelect)
    this.my_div.find('.char_read').on('input', my_obj.show_character)

}

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


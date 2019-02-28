
// config form

var character_config_form = {
    "Character Information": [
        {
            "name": "Default",

            "options": [
                {"name": "Name", "desc": "Display name, truncates to 8 in game", "val": "Name", "max": 12},
                {"name": "Palette Name", "desc": "Palette name, for saving/randomization/powerups", "val": "Name", "max": 12},
                {"name": "Tags", "desc": "tags, for randomization purposes", "val": "Name", "max": 255},
                {"name": "Slot Priority", "desc": "Slot Priority for character, lower is closer to first", "val": 0},
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
                        "Carry offset crouch (full-size)",
                        "Carry offset crouch (small)",
                        "Carry offset final-carry (full-size)",
                        "Carry offset final-carry (small)",
                        "Held X Offset (full-size)",
                        "Held X Offset (small)",
                        "Base Acceleration Value (Left)",
                        "Base Acceleration Value (Right)",
                        "Standing Deceleration (Left)",
                        "Standing Deceleration (Right)",
                        "Acceleration Control (Floor)",
                        "Acceleration Control (Air)"]
                    , "class": "mem_array", "mem_loc_name": "Character Stats", "min": -127, "max": 128},
                {"name": "Characteristics", "desc": "", "class": "add_up_multi", 
                    "val": [
                        "Can Shrink",
                        "Can Run",
                        "Flutter Jump",
                        "Peach Walk",
                        "Starting B costs Cherries",
                        "Starting Up-B costs Cherries",
                        "Air Deceleration",
                        "Wide Sprite",
                        "Custom Stand Frame (uses custom frame 1)"]},

                {"name": "Starting Inventory", "desc": "", "class": "add_up_multi", 
                    "val": [ "Power Throw",
                        "Power Charge",
                        "Power Walk",
                        "Store Item",
                        "Life Vest",
                        "Elec Immune",
                        "Fire Immune",
                        "Magic Mirror",

                        "All-Terrain Boots",
                        "Jump Boots",
                        "Float Boots",
                        "Master Key",
                        "Toss Jump",
                        "Unimplemented1",
                        "Unimplemented2",
                        "Unimplemented3" ,

                        "Kirby Jump",
                        "Unimplemented",
                        "Space Jump",
                        "Bounce Jump",
                        "Bounce All",
                        "Ground Pound (uses custom frame 1)",
                        "Wall Cling (uses custom frame 1)",
                        "Wall Jump (uses custom frame 1)" 
                    ]},
                {"name": "Starting Power-Up", "desc": "", "class": "add_up", 
                    "val": [ "n/a",
                        "Fire Flower",
                        "Egg Thrower",
                        "Bomb Thrower",
                        "Phanto Buddy",
                        "Fry Buddy",
                        "Fireball",
                        "Bullet",
                        "Set Bomb",
                        "'Hammer'",
                        "Ladder",
                        "'Sword Beam'", 
                        "'Missile'",
                        "'Freeze Beam'", 
                    ]}
                ,
                {"name": "Starting Up-B", "desc": "Text", "class": "add_up", 
                    "val": [ "n/a",
                        "Fire Flower",
                        "Egg Thrower",
                        "Bomb Thrower",
                        "Phanto Buddy",
                        "Fry Buddy",
                        "Fireball",
                        "Bullet",
                        "Set Bomb",
                        "'Hammer'",
                        "Ladder",
                        "'Sword Beam'", 
                        "'Missile'",
                        "'Freeze Beam'", 
                    ]}
            ]
        }
    ]
}

/*
 * TODO: Learn how to work with objects in Javascript don't want to hardwire any html page stuff!  or most of it
 */
function extract_characters(my_rom, mem_locs, sprites){
    // mario prin toad lugi
    var char_stats_offset = extract_mem_block(my_rom, mem_locs, 'StatOffsets', 4)
    var char_stats = []
    char_stats_offset.forEach(x => char_stats.push(new Int8Array(extract_mem_block(my_rom, mem_locs, 'CharacterStats', 23, x))))

    var char_pal = Array.split(extract_mem_block(my_rom, mem_locs, 'CharacterPalette', 16), 4)

    var cps_offset = extract_mem_block(my_rom, mem_locs, 'PlayerSelectPaletteOffsets', 4)
    var char_pal_sel = [] 
    cps_offset.forEach(x => char_pal_sel.push(
        new Uint8Array(extract_mem_block(my_rom, mem_locs, 'PlayerSelectSpritePalettes', 4, x + 3))))
    var char_names = Array.split(extract_mem_block(my_rom, mem_locs, 
        'EndingCelebrationText_MARIO', 12*4), 12).map(x => x.slice(3, x.length - 1))

    var dspals = Array.split(extract_mem_block(my_rom, mem_locs, 'PlayerSelectSpritePalettesDark', 16, 3), 4)

    var char_frames = Array.split(extract_mem_block(my_rom, mem_locs, 'CharacterOne_Frames', 48*4), 48)
    var s_char_frames = Array.split(extract_mem_block(my_rom, mem_locs, 'CharacterOne_FramesSmall', 48*4), 48)
    var char_frames_wide = Array.split(extract_mem_block(my_rom, mem_locs, 'ExtraFramesOne', 24*4), 24)

    var char_meta_frames = [...extract_mem_block(my_rom, mem_locs, 'CharacterOneMetaFrames', 12*4)]
    char_meta_frames = Array.split(char_meta_frames.map((x, y) => extract_bits(x)), 12)
    var s_char_meta_frames = [...extract_mem_block(my_rom, mem_locs, 'CharacterOneMetaFramesSmall', 12*4)]
    s_char_meta_frames = Array.split(s_char_meta_frames.map((x, y) => extract_bits(x)), 12)

    var char_sheet = Array.split(extract_mem_block(my_rom, mem_locs, 'CHRBank_CharacterSize', 8), 2) 
    var ex_sheet = extract_mem_block(my_rom, mem_locs, 'CharacterExtraSheets', 4) 
    var char_eyes = extract_mem_block(my_rom, mem_locs, 'CharacterEyeTiles', 4) 
    var char_options = Array.split(extract_mem_block(my_rom, mem_locs, 'DokiMode', 8), 4)
    var char_heights = Array.split(extract_mem_block(my_rom, mem_locs, 'HeightOffset', 8), 4)
    var char_carry = Array.split(extract_mem_block(my_rom, mem_locs, 'CarryYOffsets', 16), 4)
    var char_carry_duck = Array.split(extract_mem_block(my_rom, mem_locs, 'CharacterYOffsetCrouch', 8), 4)
    var char_carry_x = Array.split(extract_mem_block(my_rom, mem_locs, 'HeldOffset', 8), 2)
    var char_accel = Array.split(extract_mem_block(my_rom, mem_locs, 'PlayerControlAcceleration', 8), 2)
    var char_decel = Array.split(extract_mem_block(my_rom, mem_locs, 'PlayerXDeceleration', 8), 2)
    var accel_reduction = Array.split(extract_mem_block(my_rom, mem_locs, 'AccelReduction', 8), 2)

    var char_inventory = Array.split(extract_mem_block(my_rom, mem_locs, 'StartingInventory', 20), 4)

    var characters = []

    // TODO: use some sort of self-verifying JSON/object instead of manually wiring dict entries to form
    for(var i = 0; i < 4; i++){
        var j = player_order[i]
        var k = player_order_d[i]
        characters.push({
            stats: char_stats[i],
            priority: player_order[i]*10,
            pal: [...char_pal[i]],
            spal: [...char_pal_sel[i]],
            dspal: [...dspals[player_order[i]]],
            pal_name: invertByTbl(char_names[i]).trim(),

            alt_pals: [i%4, (i+1)%4, (i+2)%4, (i+3)%4].map(function(x) {
                return {
                    pal_name: invertByTbl(char_names[x]).trim(), 
                    replace_name: invertByTbl(char_names[i]).trim(), 
                    pals: [[...char_pal[x]], [ ...char_pal_sel[x] ], [...dspals[player_order[x]]]]
                }
            }),
            name: invertByTbl(char_names[i]).trim(),
            tags: 'smb2',

            frames: Array.split(char_frames[i], 4),
            w_frames: Array.split(char_frames_wide[i], 2),
            s_frames: Array.split(s_char_frames[i], 4),

            my_sprites: char_sheet[i].map(x => sprites[x]),
            sprites_ex1: sprites[ex_sheet[i]],
            sprites_sel: [0x0 + 8 * j, 0x20 + 8 * j].map(x => sprites[0x30].slice(x, x + 8)),
            sprites_cheer: [0x0 + 8 * j, 0x20 + 8 * j].map(x => sprites[0x31].slice(x, x + 8)),
            sprites_mini: [0x0 + 4 * k].map(x => sprites[0x48].slice(x, x + 4))[0],

            m_big: char_meta_frames[i],
            m_small: s_char_meta_frames[i],

            eyes: char_eyes[i],

            characteristics: char_options.map(x => x[i]),
            heights: [char_heights[0][i], char_heights[1][i]],
            carry: char_carry.map(x => x[i]),
            carry_duck: char_carry_duck.map(x => x[i]),
            carry_x: char_carry_x[i],
            char_accel: char_accel[i],
            char_decel: char_decel[i],
            accel_control: accel_reduction[i].map(x => Math.log2(x + 1)),

            inventory: char_inventory.map(x => x[i]),

            stats_off: char_stats_offset[i],
            soff: cps_offset[i],
            sheet_num: char_sheet[i],
            ex_sheet: ex_sheet[i],
            version: 1
        })
    }
    return characters
}

function extract_frames(bitmaps, width, height, offset=0, limit=32, og_uniques) {
    var unique_sprites = []
    if (og_uniques)
        unique_sprites = og_uniques
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
        //Array.split(new_spr, 8).map(x => x.reduce(bit_crush_2))
        var sprite = bitmaps[s]
        var new_spr = [].concat(...Array.split(sprite, 8).map(x => x.reduce(bc2)))
        var new_spr_mirror = [].concat(...Array.split(sprite, 8).map(x => Array.flip(x).reduce(bc2)))
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
    palette = palette.map(x => get_nearest_color(x, NES_palette))
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
    var this_obj = this
    this.my_stats = {}
    this.cur_char = {}
    this.loaded_characters = {}
    
    this.preset_characters = []
    this.preset_characters_sets = {}
    this.id = id

    // setup controls
    {
        this.my_div = $('<div id="' + this.id + '" class="main_item"></div>')

        this.load_sheet = $('<input type="file" style="display: none" class="input" id="char_sheet_load" name="file"/>')
        this.load_char = $('<input type="file" style="display: none" class="input" id="load_character" name="file" multiple/>')

        this.preset_control = $('<div class="option_block">')
        var _preset_label = $ ('<label style="display: inline-block">Preset</label>')
        this.preset_chars_div = $('<select id="preset_char" class="option a_preset_char"> <option value="-1">Select Preset Character</option> </select>')
        _preset_label.append(this.preset_chars_div)
        var remove_preset = $('<a class="mini_a no_pixel">-</a>')
        remove_preset.on('click', function(){
            var char_dict = this_obj.cur_char
            var my_val = this_obj.preset_chars_div.val()
            this_obj.preset_characters[my_val] = undefined
            this_obj.preset_chars_div.find(":selected").remove()
        }
        )

        var random_preset = $('<a class="mini_a no_pixel">Random</a>')
        random_preset.on('click', function( ){
            var options = this_obj.preset_chars_div.find('option')
            var random = ~~(Math.random() * options.length - 1) + 1
            options[random].selected = true
            this_obj.preset_chars_div.trigger('input')
        })
        this.preset_control.append(_preset_label, remove_preset, random_preset)

        this.preset_control.append('<div style="color: red">In beta, be wary of uploading unknown files</div>')
        var load_char = $("<button>Load Char Presets</button> ")
        load_char.on('click', function() { this_obj.load_char.trigger('click') })
        var save_sheet = $(" <button id='save_character'>Save Char Preset</button> ")
        this.preset_control.append(this.load_char, load_char, save_sheet)

        this.my_div.append(this.preset_control)

        this.option_control = $('<div class="option_block">')
        this.option_control.append(' <label> Character <input id="a_character" type="number" class="char_read" min="0" max="3" value="0"/> </label>')
        this.option_control.append(' <label> Frame <input id="a_frame" type="number" class="char_read" min="-1" max="10" value="0"/> </label>')

        // pal preset functions
        var _preset_pal = $(' <label style="display: inline-block"> Palette <select id="a_preset_pal" class="option char_read"> <option value="-1">Select Preset Palette</option> </select> </label>')
        this.preset_pal = _preset_pal.find('#a_preset_pal')
        this.preset_pal.on('input', function() {
            var val = this.value
            console.log(this.value)
            var char_dict = this_obj.cur_char
            var target_pal = char_dict.alt_pals[val]
            if (target_pal == undefined) return

            char_dict.pal = target_pal.pals[0].slice(0)
            char_dict.spal = target_pal.pals[1].slice(0)
            char_dict.dspal = target_pal.pals[2].slice(0)
            char_dict.name = target_pal.replace_name
            char_dict.pal_name = target_pal.pal_name

            this_obj.load_character_to_form(char_dict)
        })
        var add_palette = $('<a class="mini_a no_pixel">+</a>')
        add_palette.on('click', function(){
            var char_dict = this_obj.cur_char
            var new_pal_entry = {
                pal_name: char_dict.pal_name,
                replace_name: char_dict.name,
                pals: [char_dict.pal, char_dict.spal, char_dict.dspal]
            }
            console.log(new_pal_entry)
            if (!Array.isArray(char_dict.alt_pals)) char_dict.alt_pals = []
            char_dict.alt_pals.push(new_pal_entry)
            this_obj.set_preset_pals(char_dict)
        })
        var remove_palette = $('<a class="mini_a no_pixel">-</a>')
        remove_palette.on('click', function(){
            console.log(this_obj.preset_pal[0].value)
            if (this_obj.preset_pal[0].value == -1) return
            var val = this_obj.preset_pal[0].value
            var char_dict = this_obj.cur_char
            char_dict.alt_pals.splice(val, 1)
            this_obj.set_preset_pals(char_dict)
        })
        var random_palette = $('<a class="mini_a no_pixel">Random</a>')
        random_palette.on('click', function(){
            var char_dict = this_obj.cur_char
            if (char_dict.alt_pals.length) {
                this_obj.preset_pal[0].value = ~~(Math.random() * char_dict.alt_pals.length)
                console.log(this_obj.preset_pal[0].value)
                this_obj.preset_pal.trigger('input')
            }
        })
        this.option_control.append(this.preset_pal, add_palette, remove_palette, random_palette)
        this.option_control.append(' <label> <input id="a_size" type="checkbox" class="char_read"/> Small </label> ')

        var load_sheet = $("<button>Load Sheet</button> ")
        load_sheet.on('click', function() { this_obj.load_sheet.trigger('click') })
        this.option_control.append(this.load_sheet)
        this.option_control.append(load_sheet)

        var save_sheet = $(" <button id='char_sheet_save'>Save Sheet</button> ")
        this.option_control.append(save_sheet)

        this.my_div.append(this.option_control)

        this.scratch_page = $('<div>')

        this.my_div.append(this.scratch_page)

        this.char_stat_control = $('<div id="char_stats"></div>') 
        this.my_div.append(this.char_stat_control)
    }
    var stat_tags = handle_options(character_config_form)
    var option_tags = stat_tags[0].find('.option, .option_form, .option_select, .option_pal, .sub_option')

    for(var stat of [...option_tags]) this.my_stats[stat.id] = $(stat)
    this.char_stat_control.append(...stat_tags)
    console.debug(this.my_stats)

    this.load_character_to_form = function(char_dict){
        // TODO: probably shouldn't run this whole function every time
        // TODO: probably shouldn't do that palette stuff like that either
        
        var palette = $('.nespalette_select')
        var player_pal = char_dict.pal.concat(...char_dict.spal).concat(...char_dict.dspal)
        palette.each(x => palette[x].value = player_pal[x])
        palette.trigger('input')
        var my_stats = this_obj.my_stats
        my_stats['Name'].val(char_dict.name)
        my_stats['Palette_Name'].val(char_dict.pal_name)

        if (this_obj.cur_char == char_dict) return
        this_obj.cur_char = char_dict
        var my_stats = this_obj.my_stats
        var priority = char_dict.priority
        var char_stats = new Int8Array([...char_dict.stats].concat([...char_dict.heights, 
            ...char_dict.carry_duck,
            char_dict.carry[0], char_dict.carry[2],
            ...char_dict.carry_x,
            ...char_dict.char_accel,
            ...char_dict.char_decel,
            ...char_dict.accel_control]))
        console.log(char_stats)

        my_stats['Slot_Priority'].val(priority)
        my_stats['Tags'].val(char_dict.tags)

        var stats_tags = my_stats['Character_Stats'].find('.sub_option')
        for (var i in char_stats) stats_tags[i].value = char_stats[i]

        var char_c = char_dict.characteristics
        var c_vals = []
        for (var c in Array.range(2)) 
            for(var x in Array.range(8))
                if (char_c[c] & (1 << x))
                    c_vals.push(parseInt(x) + parseInt(c*8))
        my_stats['Characteristics'].val(c_vals)

        var c_vals = []
        for (var c in Array.range(3))
            for(var x in Array.range(8))
                if (char_dict.inventory[c] & (1 << x))
                    c_vals.push(parseInt(x) + parseInt(c*8))
        my_stats['Starting_Inventory'].val(c_vals)
        my_stats['Starting_Power-Up'].val(char_dict.inventory[3])
        my_stats['Starting_Up-B'].val(char_dict.inventory[4] > 0x80 ? char_dict.inventory[4] - 0x80 : 0)

        this_obj.set_preset_pals(char_dict)
    }

    this.set_preset_pals = function(char_dict){
        var pal_control = this_obj.option_control.find('#a_preset_pal')
        pal_control.find('option[value!=-1]').remove()
        if (char_dict.alt_pals == undefined) return
        char_dict.alt_pals.forEach(
            function(pal, p){
                console.log(pal, p)
                var new_option = $('<option>')
                new_option.val(p)
                new_option.append(pal.pal_name)
                pal_control.append(new_option)
            }
        )
    }

    this.load_img = function(dataURL=undefined){
        console.log('Loading file...')
        var img = new Image;

        // TODO: ....
        // programmed relatively future proof, as long as images are divided by their expected number of frames
        // current layout of game only allows for max 16 frames but some reprogramming can open to 64
        // additionally, more extra sprite sheets can be opened up if the mario dream sequence is removed
        // ultimately, sprite compression is greedy (always switches to next sheet immediately), but
        //      can be improved by scoring what sprites compress better with other sprites 
        //      (generally, climbing and ground pound sprites are the least alike the other but so is death)
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
            var ds_array = [1, 18, 34]
            var new_pal = ds_array.map(x => ex_palette.map(y => colorDifference(NES_palette[x], NES_palette[y])).slice(1,4) )
            var np = []
            console.debug(new_pal)
            for(var c in ds_array){
                var candidate = new_pal[c].indexOf(Math.min(...new_pal[c]))
                new_pal.forEach(x => x[candidate] = 999999999999999)
                np[candidate] = ds_array[c]
                console.log(np, candidate)
            }
            console.log(new_pal)
            characters[character].dspal = [0xf].concat(np)
           

            // TODO: decouple from jquery 
            var palette = $('.nespalette_select')
            var player_pal = [].concat(...characters[character].pal, ...characters[character].spal, ...characters[character].dspal)
            palette.each(x => palette[x].value = player_pal[x])
            palette.trigger('input')

            // slice stuff
            var ex_big = extract_frames(sheet, 3, 2, 0, 31)
            var ex_small = extract_frames(small_bitmap_sprites.sheet, 2, 2)

            var ex_stretch = extract_frames(sheet, 3, 2, ex_big.frames.length)
            ex_stretch.meta.forEach(x => x[7] = 1)

            var ex_stretch_small = extract_frames(
                small_bitmap_sprites.sheet, 2, 2, ex_small.frames.length, 32, ex_stretch.uniques)
            ex_stretch_small.meta.forEach(x => x[7] = 1)

            ex_big.frames.push(...ex_stretch.frames)
            ex_big.meta.push(...ex_stretch.meta)
            ex_small.frames.push(...ex_stretch_small.frames)
            ex_small.meta.push(...ex_stretch_small.meta)

            characters[character].frames = ex_big.frames.map(x => [...x.slice(1,3), ...x.slice(4, 6)])
            characters[character].s_frames = ex_small.frames
            characters[character].w_frames = ex_big.frames.map(x => [x[0], x[3]])
            characters[character].eyes = 0x3E

            var eye_sprite = [].concat(...Array.split(ex_bitmap_sprites[8].map(x => x > 0 ? 2 : 0), 8).map(x => x.reduce(bc2)))

            if (eye_sprite.reduce((a, c) => a + c) == 0)
                characters[character].eyes = 0xFB

            var big_sheet = []
            ex_big.uniques.forEach(x => big_sheet.push(...Array.split(x, 8)))
            while(big_sheet.length < 64) big_sheet.push(...Array.split(eye_sprite, 8))
            big_sheet = big_sheet.slice(0, 64)

            var sml_sheet = []
            ex_small.uniques.forEach(x => sml_sheet.push(...Array.split(x, 8)))
            while(sml_sheet.length < 64) sml_sheet.push(...Array.split(eye_sprite, 8))
            sml_sheet = sml_sheet.slice(0, 64)

            var ex_sheet = []
            ex_stretch.uniques.forEach(x => ex_sheet.push(...Array.split(x, 8)))
            while(ex_sheet.length < 64) ex_sheet.push(...Array.split(eye_sprite, 8))
            ex_sheet = ex_sheet.slice(0, 64)

            var indices = sprite_mask(ex_bitmap_sprites.length, 2, 2)
            console.debug(indices)

            var select_sheet = []
            indices.slice(0,32).forEach(x => select_sheet.push(...
                Array.split(Array.split(ex_bitmap_sprites[x], 8).map(x => x.reduce(bc2)), 8)))

            var indices = sprite_mask(ex_bitmap_sprites.length, 1, 1)

            // mini
            var mini_sheet = []
            indices.slice(9,11).map(x => mini_sheet.push(...
                Array.split(Array.split(ex_bitmap_sprites[x], 8).map(x => x.reduce(bc2)), 8)))

            // sheet write
            characters[character].my_sprites[0] = big_sheet
            characters[character].my_sprites[1] = sml_sheet
            characters[character].sprites_ex1 = ex_sheet
            characters[character].sprites_sel = Array.split(select_sheet.slice(0,16), 8)
            characters[character].sprites_cheer = Array.split(select_sheet.slice(16,32), 8)
            characters[character].sprites_mini = mini_sheet

            characters[character].m_big = ex_big.meta
            characters[character].m_small = ex_small.meta
            characters[character].alt_pals = []

            var char_sheet = char_dict.sheet_num
            sprites.all_sheets[char_sheet[0]] = char_dict.my_sprites[0]
            sprites.all_sheets[char_sheet[1]] = char_dict.my_sprites[1]
            sprites.all_sheets[char_dict.ex_sheet] = char_dict.sprites_ex1

            this_obj.write_character_graphics(characters[character], c_id, mem_locs, currentRom)
            this_obj.write_to_character()
            this_obj.set_preset_pals(characters[character])
            this_obj.show_character()
            $("#char_sheet_load")[0].value = '';
            return

        };
        img.src = dataURL;
    }

    this.write_character_graphics = function(char_dict, c_id, mem_locs, my_rom){
        var char_sheet = char_dict.sheet_num
        var x_sheet = char_dict.ex_sheet
        var big_sheet =   char_dict.my_sprites[0]
        var sml_sheet =   char_dict.my_sprites[1]
        var ex_sheet =    char_dict.sprites_ex1
        var character = player_order[c_id & 0b11]

        // select
        var select_sheet = char_dict.sprites_sel.concat(char_dict.sprites_cheer)
        console.log(select_sheet)
        write_sprites_to_rom(my_rom, mem_locs, 
            select_sheet[0], 0x30, c_id*8)  
        select_sheet[0].map((x,y) =>
            sprites.all_sheets[0x30][y + c_id*8] = x)

        write_sprites_to_rom(my_rom, mem_locs, 
            select_sheet[1], 0x30, c_id*8 + 0x20)  
        select_sheet[1].map((x,y) =>
            sprites.all_sheets[0x30][y + c_id*8 + 0x20] = x)

        //cheer
        write_sprites_to_rom(my_rom, mem_locs, 
            select_sheet[2], 0x31, c_id*8)  
        select_sheet[2].map((x,y) =>
            sprites.all_sheets[0x31][y + c_id*8] = x)

        write_sprites_to_rom(my_rom, mem_locs, 
            select_sheet[3], 0x31, c_id*8 + 0x20)  
        select_sheet[3].map((x,y) =>
            sprites.all_sheets[0x31][y + c_id*8 + 0x20] = x)

        var mini_sheet = char_dict.sprites_mini
        write_sprites_to_rom(my_rom, mem_locs, 
            mini_sheet, 0x48, player_order_b[c_id]*4)  
        mini_sheet.forEach((x,y) =>
            sprites.all_sheets[0x48][y + player_order_b[c_id]*4] = x)

        write_sprites_to_rom(my_rom, mem_locs, big_sheet, char_sheet[0])  
        write_sprites_to_rom(my_rom, mem_locs, sml_sheet, char_sheet[1])  
        write_sprites_to_rom(my_rom, mem_locs, ex_sheet, x_sheet)  
        set_memory_location(my_rom, mem_locs, 'CharacterOne_Frames', 
            char_dict.frames.reduce(
                (a=[], x) => a.concat(x)).slice(0, 0x30), 0x30*character)
        set_memory_location(my_rom, mem_locs, 'CharacterOne_FramesSmall', 
            char_dict.s_frames.reduce(
                (a=[], x) => a.concat(x)).slice(0, 0x30), 0x30*character)
        set_memory_location(my_rom, mem_locs, 'ExtraFramesOne', 
            char_dict.w_frames.reduce(
                (a=[], x) => a.concat(x)).slice(0, 24), 24*character)
        set_memory_location(my_rom, mem_locs, 'CharacterOneMetaFrames', 
           (char_dict.m_big).map(x => Array.flip(x).reduce(bc1)), 12*character)
        set_memory_location(my_rom, mem_locs, 'CharacterOneMetaFramesSmall', 
           (char_dict.m_small).map(x => Array.flip(x).reduce(bc1)), 12*character)
        set_memory_location(my_rom, mem_locs, 'CharacterEyeTiles', [char_dict.eyes], character)
    }

    this.save_character = function(){
        var c_id = $('#a_character').val()
        var character = player_order[c_id & 0b11]
        var characters = info.meta_info.characters
        var char_dict_target = characters[character]
        var canvas = sprite_frames_to_canvas(char_dict_target, c_id, sprites)

        let char_dict = Object.assign({}, char_dict_target)
        console.log(char_dict)
        for (var c in char_dict){
            if (char_dict[c] instanceof Uint8Array)
                char_dict[c] = [...char_dict[c]]
            if (char_dict[c] instanceof Int8Array)
                char_dict[c] = [...char_dict[c]]

        }
        delete char_dict.stats_off
        delete char_dict.soff
        delete char_dict.sheet_num
        delete char_dict.ex_sheet
        downloadJSON(char_dict, 'character.json')
    }

    this.load_character_file_input = function (evt){
        var my_preset_list = char_component.preset_chars_div
        var loader = function(e, my_name, i){
            console.log('Loading config...')
            var result = JSON.parse(e.target.result);
            my_preset_list.append('<option value="' + i + '">' + my_name + '</option>')
            this_obj.preset_characters[i] = {'name': my_name, 'config': result}
        }
        var ids = Array.range(evt.target.files.length, this_obj.preset_characters.length)
        for (var file of evt.target.files){
            var reader = new FileReader();
            reader.param = file.name.replace('.json', '')
            reader.i = ids.shift()
            reader.onload = function(e){ loader(e, this.param, this.i) }
            reader.readAsText(file)
            console.log(file)
        }
    }

    this.load_character = function(new_char_dict){
        var c_id = $('#a_character').val()
        var character = player_order[c_id & 0b11]
        var characters = info.meta_info.characters
        var new_char = JSON.parse(JSON.stringify(new_char_dict))

        new_char.stats_off = characters[character].stats_off
        new_char.soff = characters[character].soff
        new_char.sheet_num = characters[character].sheet_num
        new_char.ex_sheet = characters[character].ex_sheet

        characters[character] = new_char

        // select
        var char_sheet = new_char.sheet_num
        sprites.all_sheets[char_sheet[0]] = new_char.my_sprites[0]
        sprites.all_sheets[char_sheet[1]] = new_char.my_sprites[1]
        sprites.all_sheets[new_char.ex_sheet] = new_char.sprites_ex1

        this_obj.write_character_graphics(new_char, c_id, mem_locs, currentRom)
        this_obj.load_character_to_form(new_char)
        this_obj.write_to_character()
        this_obj.show_character()
    }

    this.show_character = function () {
        var a_s = sprites.all_sheets
        var option_control = this_obj.option_control
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
        if (this.id == 'a_character'){
            this_obj.load_character_to_form(characters[character])
        }
        else if (this.id == 'a_character' || this.id == 'a_char_pal') {
            var player_pal = [].concat(...characters[character].pal, ...characters[character].spal, ...characters[character].dspal)
            palette.each(x => palette[x].value = player_pal[x])
            palette.trigger('input')
        }
        var spr_palette = []
        palette.each(x => spr_palette.push(parseInt(palette[x].value)))
        spr_palette.slice(0, 4).map((x,y) => characters[character].pal[y] = x)
        spr_palette.slice(4, 8).map((x,y) => characters[character].spal[y] = x)
        spr_palette.slice(8, 12).map((x,y) => characters[character].dspal[y] = x)

        var div = this_obj.scratch_page
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
        console.log('Loading file...')

        reader.onload = function(){this_obj.load_img(this.result)}
        reader.readAsDataURL(file)
    }

    this.write_char_to_rom = function(char_dict, c_id, mem_locs, my_rom) {
        var character = player_order[c_id & 0b11]

        // TODO: overhaul any "get memory locations" with a object that has a writeable callback
        set_memory_location(my_rom, mem_locs, 'CharacterStats', char_dict.stats, char_dict.stats_off)
        set_memory_location(my_rom, mem_locs, 'DokiMode', [char_dict.characteristics[0]], character)
        set_memory_location(my_rom, mem_locs, 'DokiMode', [char_dict.characteristics[1]], character + 4)
        set_memory_location(my_rom, mem_locs, 'HeightOffset', [char_dict.heights[0]], character)
        set_memory_location(my_rom, mem_locs, 'HeightOffset', [char_dict.heights[1]], character + 4)
        set_memory_location(my_rom, mem_locs, 'CarryYOffsets', [char_dict.carry[0]], character)
        set_memory_location(my_rom, mem_locs, 'CarryYOffsets', [char_dict.carry[1]], character+4)
        set_memory_location(my_rom, mem_locs, 'CarryYOffsets', [char_dict.carry[2]], character+8)
        set_memory_location(my_rom, mem_locs, 'CarryYOffsets', [char_dict.carry[3]], character+12)
        set_memory_location(my_rom, mem_locs, 'CharacterYOffsetCrouch', [char_dict.carry_duck[0]], character)
        set_memory_location(my_rom, mem_locs, 'CharacterYOffsetCrouch', [char_dict.carry_duck[1]], character+4)
        set_memory_location(my_rom, mem_locs, 'HeldOffset', char_dict.carry_x, character*2)
        set_memory_location(my_rom, mem_locs, 'PlayerControlAcceleration', char_dict.char_accel, character*2)
        set_memory_location(my_rom, mem_locs, 'PlayerXDeceleration', char_dict.char_decel, character*2)
        set_memory_location(my_rom, mem_locs, 'AccelReduction', char_dict.accel_control.map(x => ~~Math.pow(2, x) - 1), character*2)
        set_memory_location(my_rom, mem_locs, 'StartingInventory', [char_dict.inventory[0]], character)
        set_memory_location(my_rom, mem_locs, 'StartingInventory', [char_dict.inventory[1]], character+4)
        set_memory_location(my_rom, mem_locs, 'StartingInventory', [char_dict.inventory[2]], character+8)
        set_memory_location(my_rom, mem_locs, 'StartingProjectile', [char_dict.inventory[3]], character)
        set_memory_location(my_rom, mem_locs, 'StartingHold', [char_dict.inventory[4]], character)
        set_memory_location(my_rom, mem_locs, 'CharacterPalette', char_dict.pal, 4*character)
        set_memory_location(my_rom, mem_locs, 'PlayerSelectSpritePalettes', char_dict.spal, char_dict.soff + 3)
        set_memory_location(my_rom, mem_locs, 'PlayerSelectSpritePalettesDark', char_dict.dspal, 3 + 4*c_id)
        set_memory_location(my_rom, mem_locs, 'EndingCelebrationPaletteFade1', char_dict.spal, 16 + 3 + 4*c_id)
        set_memory_location(my_rom, mem_locs, 'MarioDream_Palettes', char_dict.spal.slice(1), 16 + 4 + 4 * c_id)
        set_memory_location(my_rom, mem_locs, 'EndingCelebrationText_MARIO', convertByTbl(char_dict.name, 8).slice(0, 8), 3 + 12*character)
        set_memory_location(my_rom, mem_locs, 'TEXT_Mario', convertByTbl(char_dict.name, 8).slice(0, 8), 4 + 13*character)

    }

    this.write_to_character = function(evt){
        var c_id = $('#a_character').val()
        var character = player_order[c_id & 0b11]
        var characters = info.meta_info.characters
        var char_dict = characters[character]

        // TODO: make this not use jquery, we already have the tags allocated
        var stats_tags = $('#char_stats #Character_Stats .sub_option')
        char_dict.name = $('#char_stats #Name').val()
        char_dict.pal_name = $('#char_stats #Palette_Name').val()
        char_dict.tags = $('#char_stats #Tags').val()
        char_dict.priority = $('#char_stats #Slot_Priority').val()
        for (var i in char_dict.stats){
            char_dict.stats[i] = stats_tags[i].value
        }
        char_dict.heights = [23, 24].map(x => stats_tags[x].value)
        char_dict.carry_duck = [25, 26].map(x => stats_tags[x].value)
        char_dict.carry[0] = stats_tags[27].value
        char_dict.carry[2] = stats_tags[28].value
        char_dict.carry_x = [29, 30].map(x => stats_tags[x].value)
        char_dict.char_accel = [31, 32].map(x => stats_tags[x].value)
        char_dict.char_decel = [33, 34].map(x => stats_tags[x].value)
        char_dict.accel_control = [35, 36].map(x => stats_tags[x].value)

        var s_i = $('#char_stats select#Characteristics').val()
        char_dict.characteristics = [0, 0]
        for (var x of s_i){
            x = parseInt(x)
            char_dict.characteristics[~~(x/8)] |= 1 << (x%8)
        }
        var s_i = $('#char_stats select#Starting_Inventory').val()
        char_dict.inventory = [0, 0, 0, 0]
        for (var x of s_i){
            x = parseInt(x)
            char_dict.inventory[~~(x/8)] |= 1 << (x%8)
        }
        var s_p = $('#char_stats select#Starting_Power-Up').val()
        char_dict.inventory[3] = parseInt(s_p)
        var s_p = $('#char_stats select#Starting_Up-B').val()
        char_dict.inventory[4] = parseInt(s_p)
        if (char_dict.inventory[4])
            char_dict.inventory[4] += 0x80

        this_obj.write_char_to_rom(char_dict, c_id, mem_locs, currentRom)
    }

    this.outputSpriteSelect = function(evt) {
        var c_id = $('#a_character').val()
        var character = player_order[c_id & 0b11]
        var characters = info.meta_info.characters
        var char_dict = characters[character]
        var canvas = sprite_frames_to_canvas(char_dict, c_id, sprites)

        var img = $("<img alt='frame'></img>")
        img.attr('src', canvas.toDataURL())
        var div = this_obj.scratch_page
        div.text('')
        div.append(img)
    }

    // Learn how to make nice interfaces... though assigning all the functions at the ends for UI looks cleaner anyway
    this.my_div.find('#char_stats input').on('change', this_obj.write_to_character)
    this.my_div.find('#char_stats select').on('change', this_obj.write_to_character)
    this.my_div.find('.nespalette_select').on('change', this_obj.show_character)
    this.my_div.find('.nespalette_select').on('change', this_obj.write_to_character)
    this.my_div.find('#preset_char').on('input', function(evt) {
        var c_d = this.value
        console.log(this, c_d)
        this_obj.load_character(this_obj.preset_characters[c_d].config)
    } )
    this.my_div.find('#char_sheet_load').on('input', function (evt){this_obj.handleSpriteSelect(evt); this.value=null})
    this.my_div.find('#char_sheet_save').on('click', this_obj.outputSpriteSelect)
    this.my_div.find('#load_character').on('input', function (evt){this_obj.load_character_file_input(evt); this.value=null})
    this.my_div.find('#save_character').on('click', this_obj.save_character)
    this.my_div.find('.char_read').on('input', this_obj.show_character)

}


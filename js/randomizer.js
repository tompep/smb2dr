
// config form

var randomizer_config_form = {
    "Objective": [
        {
            "name": "Default",
            "options": [
                {"tag": "Defeat Final Boss, and the following objectives", "options": [ ]},
                {"name": "Collect X Crystals", "desc": "Find X amount of crystals across the game",
                    "val": 0, "class": "mem_location", "max": 20,
                    "mem_loc_name": "CrystalCondition"},
                {"name": "Defeat X Bosses", "desc": "Defeat X amount of bosses hidden around or at the end of levels",
                    "val": 0, "class": "mem_location", "max": 7,
                    "mem_loc_name": "BossCondition"},
                {"name": "Rescue All Characters", "desc": "Must leave the game with all 4 characters unlocked",
                    "val": false, "class": "mem_location",
                    "mem_loc_name": "RescueCondition"},
                {"name": "End Game at any Exit", "desc": "Don't require the 'final boss' to be defeated to win",
                    "val": false}
            ]
        }
    ],
    "Level Randomization": [
        {
            "name": "Default",
            "options": [
                {"name": "Randomize World Appearance", "desc": "Randomize palette/tiles/music (possible softlocks unknown)",
                    "val": [ "Per Similar", "Per World", "Per Level", "Per Room" ]},
                {"name": "Randomize Palettes", "desc": "Palette Randomization",
                    "val": false},
                {"name": "Randomize Music", "desc": "Music Randomization",
                    "val": false},
                {"name": "Randomize World Appearance", "desc": "Prone to expensive output",
                    "val": false},
                {"name": "Game Scale", "desc": "Number of Levels to compile together",
                    "val": "20", "max": "21"},
                {"name": "Curse Rate", "desc": "Rate at which rooms will spawn an active Phanto",
                    "val": "0.5"},
                {"name": "Inverted Rate", "desc": "Rate at which rooms will be inverted",
                    "val": "0.5"}
            ]
        },
        {
            "name": "World Order Randomizer",
            "options": [
                {"name": "Scramble Levels in World", "desc": "Scramble levels from within a World",
                    "val": false}
            ]
        },
        {
            "name": "Level Order Randomizer",
            "options": []
        },
        {
            "name": "Simple Door Randomizer",
            "options": [
                {"name": "Door Chance", "desc": "Possibility of spawning one of X doors",
                    "val": "60.0", "max": "100"},
                {"name": "Max Possible Doors", "desc": "Max amount of extra doors",
                    "val": "3", "max": "9", "min": "1"}
            ]
        },
        {
            "name": "Door Randomizer V1",
            "options": [
                {"name": "Scramble Levels in Hub", "desc": "Scramble levels from within a Hub, versus linear sets",
                    "val": false},
                {"name": "Continue after Boss Kill", "desc": "Using a continue places at boss door",
                    "val": false},
            ],
            "option_beta": [
                {"name": "Number of Hubs", "desc": "Number of hubs to generate, which can be traversed between",
                    "val": 1, "min": 1, "max": 7}
            ]
        }
    ],
    "Character Randomization": [
        {
            "name": "Default",
            "options": 
                [
                    {"tag": "Unlocked Characters", "class": "wide option_block", "options": [
                        {"name": "Mario", "desc": "Start with character 1",
                            "val": true},
                        {"name": "Luigi", "desc": "Start with character 2",
                            "val": true},
                        {"name": "Toad", "desc": "Start with character 3",
                            "val": true},
                        {"name": "Peach", "desc": "Start with character 4",
                            "val": true}
                    ]},
                    {"name": "Force Character", "desc": "Restrict choice of character (incompatible with Rescue)",
                        "val": [ "No Force", "Per World", "Per Level", "Per Room" ]},                
                    {"name": "Change Character on Death", "desc": "Gives character select screen on life lost",
                        "val": false, "class": "mem_location", "mem_loc_name": "CharSelectDeath"},
                    {"name": "Change Character at any time", "desc": "Switch character any time (Select+LR)",
                        "val": false, "class": "mem_location", "mem_loc_name": "CharSelectAnytime"},
                    {"name": "Elimination Mode", "desc": "Gives each character their own lives, and removes a character from the game when out of lives",
                        "val": false, "class": "mem_location", "mem_loc_name": "IndependentLives"},
                    {"name": "Independent Player Powerups", "desc": "Upgrades are only for individual characters",
                        "val": false, "class": "mem_location", "mem_loc_name": "IndependentPlayers"},
                    {"name": "Add Rescue Items", "desc": "Adds items to rescue lost characters",
                        "val": false},
                    {"name": "Starting Gift", "desc": "Gives a random upgrade to each character",
                        "val": false},
                    {"name": "Random Player Palette", "desc": "Pick random palette from set of palettes",
                        "val": false}
                ]
        },
        {
            "name": "Randomized Pool",
            "options": []
        }
    ],
    "Object Randomization": [
        {
            "name": "Default",
            "options": 
                [
                    {"name": "Enemy Champion Chance", "desc": "Percent chance of 'champion' enemies",
                        "val": 8.25},
                    {"name": "Enemy Randomization", "desc": "Enemy randomizer (hard)",
                        "val": false},
                    {"name": "Enemy Scaling Range", "desc": "Range of which enemies can decrease/increase in difficulty",
                        "val": 1, "min": 0, "max": 10},
                    {"name": "Enemy Max Score Percent", "desc": "Scales how much more dangerous enemies can be overall",
                        "val": 50.0, "min": 0, "max": 200},
                    {"name": "Autospawn Potion Door", "desc": "Spawns a door where mushrooms exist",
                        "val": false},
                    {"name": "Randomize Mushroom Locations", "desc": "Completely randomizes mushroom locations",
                        "val": false},
                    {"name": "Boss Drops", "desc": "Bosses will drop something on death",
                        "val": [ "Nothing", "Mushrooms and Fragments", "Major Items", "Full Item Pool" ]},                
                    {"name": "Mushrooms", "desc": "Number of mushrooms in item pool",
                        "val": "4"},
                    {"name": "Mushroom Fragments", "desc": "Number of mushrooms in item pool",
                        "val": "16"},
                    {"name": "Powerups", "desc": "Number of powerups in item pool",
                        "val": "16"},
                    {"name": "Upgrades", "desc": "Number of upgrades in item pool",
                        "val": "13"},
                    {"name": "Common Items", "desc": "Number of common items in item pool",
                        "val": "8"},
                    {"name": "Crystals", "desc": "Number of crystals in item pool",
                        "val": "0"}
                ]
        }   
    ],
    "Boss Randomization": [
        {
            "name": "Default",
            "options": 
                [
                    {"name": "Randomize Boss Health", "desc": "Gives bosses random health",
                        "val": false},
                    {"name": "Randomize Mini-Boss Health", "desc": "Gives mini-bosses (Birdo and Hawkmouth) random health",
                        "val": false},
                    {"name": "Boss Min Health", "desc": "",
                        "val": "2"},
                    {"name": "Boss Max Health", "desc": "",
                        "val": "7"},
                    {"name": "Mini-Boss Min Health", "desc": "",
                        "val": "1"},
                    {"name": "Mini-Boss Max Health", "desc": "",
                        "val": "5"}
                ]
        },
        {
            "name": "Randomized",
            "options": 
                [
                    {"name": "Randomize Boss Arenas", "desc": "Duplicate arenas",
                        "val": false},
                    {"name": "End with Wart", "desc": "Last boss is always Wart",
                        "val": false}
                ]
        }
    ],
    "Other Randomization": [
        {
            "name": "Default",
            "options": 
                [
                    {"name": "Doki Doki Mode", "desc": "Removes shrinking and running",
                        "val": false, "class": "", "mem_loc_name": "DokiMode"},
                    {"name": "Debug (cheat)", "desc": "Gives debug mode (A+B+START+SELECT), prone to issues with subspace/jars",
                        "val": false, "class": "mem_location",
                        "mem_loc_name": "DebugSet"},
                    {"name": "Ground Breaker (cheat)", "desc": "Lets the player pick up any ground tile",
                        "val": false, "class": "mem_location",
                        "mem_loc_name": "GBreaker"},
                    {"name": "Maxed Upgrades (cheat)", "desc": "Gives players all upgrades",
                        "val": false}, 
                    {"name": "Extra Lives", "desc": "Starting Extra Lives",
                        "val": "5", "class": "mem_location",
                        "mem_loc_name": "ContinueGame", "offset": "1"},
                    {"name": "Continues", "desc": "Starting Continues",
                        "val": "2", "class": "mem_location",
                        "mem_loc_name": "SetNumContinues", "offset": "1"},
                    {"name": "Starting Bonus Health", "desc": "Starting extra health",
                        "val": "1", "class": "mem_location",
                        "mem_loc_name": "StartHealth", "min": -1, "max": 14},
                    {"name": "Maxed Health", "desc": "Maxed amount of extra health",
                        "val": "14", "class": "mem_location",
                        "mem_loc_name": "MaxedHealth", "min": -1, "max": 14},
                    {"name": "Reset Health Cap", "desc": "Reduced extra health after 'completing' a level",
                        "val": "4", "class": "mem_location",
                        "mem_loc_name": "ResetHealth", "min": 0, "max": 14},
                    {"name": "Include CRC Hash on Title", "desc": "Writes CRC hash to title screen (but will modify outputted file hash)",
                        "val": false}, 
                ]
        }
    ]
}

$("#randomizer").text()
$("#randomizer").append(...handle_options(randomizer_config_form))

var start_button = $('<button id="manip">')
start_button.click(randomize_rom);
start_button.text('Randomize ROM');
console.log(start_button)

$("#randomizer").append(start_button)
$('#randomizer input[type=number]').on('focusout', number_cap)

$('#seed').keypress(function (evt){
    if (chars.includes(String.fromCharCode(evt.which).toUpperCase())) {}
    else if (!chars.includes(String.fromCharCode(evt.which))){
        evt.preventDefault();
    }
});

var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
function rand_seed(){
    return Array(10).fill(0).map(x => chars[~~(Math.random() * 36)]).join('')
}

if (!Math.seedrandom){
    Math.seedrandom = function(){}
}

function starting_seed() {
    if (Math.seedrandom) Math.seedrandom((new Date()).toUTCString().split(' ').slice(0, 4).join(' '))
    $('#seed').val(rand_seed());
}

starting_seed()
$('#seed').attr('maxlength', 10);
var rando_seed = $('#seed').val();

function randomize_rom(evt) {
    console.log('Randomizing ROM...')
    var workingRom = currentRom.slice(0)
    // patch
    //
    //
    rando_seed = $('#seed').val();
    level_sets[1] = JSON.parse(JSON.stringify(level_sets[0]))
    var current_level_set = level_sets[1]

    // extract
    var option_tags = $('#randomizer').find('.option, .option_form, .option_select')
    var mem_loc_tags = $('#randomizer').find('.option.mem_location')

    var option_vals = {}
    option_tags.each(function(x){
        option_vals[option_tags[x].id] = {
        val: option_tags[x].value, 
        checked: option_tags[x].checked,
        radio: $(option_tags[x]).find('input:checked').val()
        }
    })

    Math.seedrandom(rando_seed)

    var r_header = option_vals['Randomize_World_Appearance'].radio
    var segments = []
    if (r_header == 'Per_World')
        segments = Array.split(current_level_set, 30)
    else if (r_header == 'Per_Level')
        segments = Array.split(current_level_set, 10)
    else if (r_header == 'Per_Room')
        segments = Array.split(current_level_set, 1)
    else
        console.log('No Header Randomize...')
    for(var s of segments){
        var new_pal_a = ~~(Math.random() * 6)
        var new_pal_b = ~~(Math.random() * 3)
        for(var l of s){
            if (l != undefined){
                var isBoss = l.enemies.filter(function(ele){return ele.obj_type > 0x5C}).length > 0
                if (l.is_jar > 0 || isBoss) console.debug('do not override')
                else randomize_header(l, info.meta_info.world_metadata)
                l.header.pal_a = new_pal_a
                l.header.pal_b = new_pal_a
            }
        }
    }

    // note: ASM likely needs to consider Stars and Subspace situations that change the music between levels
    var r_header = option_vals['Randomize_Music'].checked
    console.log(r_header, option_vals['Randomize_Music'])
    if (r_header){
        if (!segments.length) segments = Array.split(current_level_set, 1)
        var header_music = 0
        for(var s of segments){
            var new_music = ~~(Math.random() * 9)
            for(var l of s){
                if (l != undefined){
                    if (new_music < 8) l.modifiers.push({ loc_l: 0x7d, loc_r: 0x0f, contents: [1 << new_music]}) // pipe loc
                    else l.modifiers.push({ loc_l: 0x7d, loc_r: 0x0f, contents: [0x84]}) // pipe loc
                    l.header.music = header_music
                }
            }
        }
    }


    Math.seedrandom(rando_seed)

    for(var l of current_level_set){
        if (l != undefined){
            equalize_header(l, info.meta_info.world_metadata)
            var WarpPipe = l.objs.filter(function(ele){return ele.obj_type == 0x8})
            if (WarpPipe.length > 0){
                l.modifiers.push({
                loc_l: 0x76, 
                loc_r: 0xcd, 
                contents: [~~(l.i / 10), l.room, WarpPipe[0].pos_page]}) // pipe loc
            }
            if (Math.random() * 100< (option_vals['Curse_Rate'].val))
                l.modifiers.push({
                loc_l: 0x76, 
                loc_r: 0xee, 
                contents: [0x01]}) // curse
            var isBoss = l.enemies.filter(function(ele){return ele.obj_type > 0x5C}).length > 0
            if (Math.random() * 100 < (option_vals['Inverted_Rate'].val) && !isBoss){
                console.log('inverted...')
                inverse_level(l, current_level_set)

            }
        }
    }

    Math.seedrandom(rando_seed)

    var active_levels = level_order_randomizer(current_level_set, workingRom, mem_locs, {
        'ShuffleType': option_vals["Level_Randomization"].val,
        'GameScale': option_vals["Game_Scale"].val,
        'DoorIterations': option_vals["Max_Possible_Doors"].val,
        'DoorChance': option_vals["Door_Chance"].val,
        'BossOrder': option_vals["Boss_Randomization"].val,
        'EndWart': option_vals['End_with_Wart'].checked,
        'ScrambleWorld': option_vals['Scramble_Levels_in_World'].checked,
        'ScrambleHub': option_vals['Scramble_Levels_in_Hub'].checked,
        'ContBossKill': option_vals['Continue_after_Boss_Kill'].checked,
        'CloneBoss': option_vals['Randomize_Boss_Arenas'].checked
    }, info)


    if (option_vals["Enemy_Randomization"].checked)
    {
        Math.seedrandom(rando_seed)
        enemy_randomizer(active_levels,
            option_vals["Enemy_Scaling_Range"].val,
            option_vals["Enemy_Max_Score_Percent"].val)
    }
    set_memory_location(workingRom, mem_locs,
        'ChampionChance', [~~(option_vals["Enemy_Champion_Chance"].val * 255)], 0)

    Math.seedrandom(rando_seed)

    item_randomizer(active_levels, workingRom, mem_locs, info.meta_info, option_vals)

    Math.seedrandom(rando_seed)

    var cc = char_component
    var my_chars = JSON.parse(JSON.stringify(info.meta_info.characters))
    if (option_vals["Character_Randomization"].val == "Randomized_Pool"){
        var valid_chars = char_component.preset_characters.filter(x => x != undefined)
        my_chars = []
        if (valid_chars.length >= 4){
            for (var c_id in Array.range(4)){
                var character = player_order[c_id & 0b11]
                var new_char = JSON.parse(JSON.stringify(Array.pick_random(valid_chars).config))
                new_char.stats_off = info.meta_info.characters[character].stats_off
                new_char.soff = info.meta_info.characters[character].soff
                new_char.sheet_num = info.meta_info.characters[character].sheet_num
                new_char.ex_sheet = info.meta_info.characters[character].ex_sheet
                my_chars.push(new_char)
                cc.write_char_to_rom(new_char, c_id, mem_locs, workingRom)
                cc.write_character_graphics(new_char, c_id, mem_locs, workingRom)
            }
        }
        else {
            my_chars = JSON.parse(JSON.stringify(info.meta_info.characters))
        }
        console.log(info.meta_info.characters.map(x => x.sheet_num))
        console.log(my_chars.map(x => x.sheet_num))
    }
    if (option_vals["Random_Player_Palette"].checked){
        for (var c_id in Array.range(4)){
            var char_dict = my_chars[c_id]
            var target_pal = char_dict.alt_pals[~~(Math.random() * char_dict.alt_pals.length)]
            if (target_pal == undefined) continue
            char_dict.pal = target_pal.pals[0].slice(0)
            char_dict.spal = target_pal.pals[1].slice(0)
            char_dict.dspal = target_pal.pals[2].slice(0)
            char_dict.name = target_pal.replace_name
            char_dict.pal_name = target_pal.pal_name
            cc.write_char_to_rom(char_dict, c_id, mem_locs, workingRom)
        }
    }

    Math.seedrandom(rando_seed)

    player_randomizer(active_levels, workingRom, mem_locs, info.meta_info, option_vals)

    Math.seedrandom(rando_seed)

    handle_boss_options(active_levels, option_vals)

    mem_loc_tags.each(function(ele){
        var ele = mem_loc_tags[ele]
        console.debug(ele)
        var values = [ele.value]
        if (Array.isArray(ele.value))
            values = ele.value
        if (ele.checked)
            values = [ele.checked]
        var ele = $(ele)
        set_memory_location(workingRom, mem_locs,
            ele.data('mem_loc_name'), values, ele.data('offset'))
        return ele
    })

    if (option_vals['End_Game_at_any_Exit'].checked){
        set_memory_location(workingRom, mem_locs,
             'WinLevel', [0xFF])
    }

    set_memory_location(workingRom, mem_locs,
        'FunkyLittleSeedBlock6', convertByTbl('seed-' + rando_seed), 3)

    set_memory_location(workingRom, mem_locs,
        'FunkyLittleSeedBlock2', convertByTbl(' '), 3)

    set_memory_location(workingRom, mem_locs,
        'FunkyLittleSeedBlock3', convertByTbl(' '), 3)

    set_memory_location(workingRom, mem_locs,
        'FunkyLittleSeedBlock4', convertByTbl(''), 3)

    set_memory_location(workingRom, mem_locs,
        'FunkyLittleSeedBlock5', convertByTbl(''), 3)

    set_memory_location(workingRom, mem_locs,
        'FunkyLittleSeedBlock7', convertByTbl(' '), 3)
    
    set_memory_location(workingRom, mem_locs,
        'TitleStoryText_Line01', convertByTbl(
            fit_text('I THOUGHT ABOUT ALL THE COOL STUFF I COULD PUT HERE, LIKE A MAD-LIB GAME STORY, BUT INSTEAD I DECIDED TO SLEEP...', 20), 16*20))


    for (var l in level_sets[0]){
        if (level_sets[0][l]){
            // var len1 = write_level_bytes(level_sets[0][l])
            var len2 = write_level_bytes(level_sets[1][l])
            // console.debug(len1, len2)
            // console.debug('level diff in bytes...', len1.length, len2.length, len2.length - len1.length)
        }
    }

    write_to_file(workingRom, level_sets[level_sets.length - 1], info.meta_info)
    
    var my_crc = decimalToHexString(crc32(workingRom))
    console.log('crc32 hash of randomized ROM: ', my_crc)
    if (option_vals['Include_CRC_Hash_on_Title'].checked) {
        set_memory_location(workingRom, mem_locs,
            'FunkyLittleSeedBlock7', convertByTbl('hash-' + my_crc), 3)
    }

    var blob = new Blob([workingRom])
    var url = window.URL.createObjectURL(blob)
    downloadURL(url, 'smb2-output.nes')
    setTimeout(function() {
            return window.URL.revokeObjectURL(url)
          
    }, 1000)

} 

function fit_text(string, width){
    /* fits string into width */
    string = string.split(" ")
    var output = []
    var outrow = ""
    for (var s of string){
        if (outrow.length + s.length > width){
            if (outrow.length) {
                while(outrow.length < width)
                    outrow += " "
                output.push(outrow)
            }
            outrow = ""
        }
        outrow += s + " "
    }
    if (outrow.length) {
        while(outrow.length < width)
            outrow += " "
        output.push(outrow)
    }
    return output.join("")
}

function handle_boss_options(my_levels, options){
    /* Randomizes boss health per level */
    console.log('Boss Health Randomizer')
    var rboss = options['Randomize_Boss_Health'].checked
    var rmboss = options['Randomize_Mini-Boss_Health'].checked
    var rmin = options['Boss_Min_Health'].val
    var rmax = options['Boss_Max_Health'].val
    var rmmin = options['Mini-Boss_Min_Health'].val
    var rmmax = options['Mini-Boss_Max_Health'].val
    rmin = rmax < rmin ? rmax : rmin
    rmmin = rmmax < rmmin ? rmmax : rmmin
    if (!rboss && !rmboss){
        console.log('No health randomization')
        return
    }
    else{
        if (rboss) console.log('Boss Random range', rmin, rmax)
        if (rmboss) console.log('Mini-Boss Random range', rmmin, rmmax)
    }
    for (var my_l of my_levels){
        if (my_l == undefined)
            continue
        if (rmboss){
            var mini_boss = my_l.enemies.filter(function(ele){ return [0x1c, 0x2d].includes(ele.obj_type) })
            if (mini_boss.length){
                my_l.modifiers.push({
                    loc_l: 0x76,
                    loc_r: 0xF6,
                    contents: [parseInt(~~(Math.random() * (rmmax - rmmin))) + parseInt(rmmin)]
                })
            }

        }
        if (rboss){
            var boss = my_l.enemies.filter(function(ele){ return ele.obj_type >= 0x5c })
            if (boss.length){
                my_l.modifiers.push({
                    loc_l: 0x76,
                    loc_r: 0xF6,
                    contents: [parseInt(~~(Math.random() * (rmax - rmin))) + parseInt(rmin)]
                })
            }
        }
    }

}

function create_door_pair(left_level, right_level, page_l, page_r){

}

function level_order_randomizer(my_levels, my_rom, mem_locs, options, info){
    /* take set of levels and randomizer
     *
     */
    console.log('Level Randomizer')

    console.log(options)
    
    // get boss rooms
    var LevelStart = mem_locs['Data_StartLevel'] + 0x10
    var WinLevel = mem_locs['WinLevel'] + 0x10

    var boss_rooms = []
    for (var l of my_levels){
        if (l != undefined){
            var isBoss = l.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0
            if (isBoss) boss_rooms.push(l)
        }
    }

    if (options['BossOrder'] == 'Randomized'){
        if (options['End_With_Wart']){
            var wart_room = boss_rooms[boss_rooms.length - 1]
            boss_rooms = shuffle(boss_rooms.slice(0, boss_rooms.length - 1))
            boss_rooms.push(wart_room)
        }
        else boss_rooms = shuffle(boss_rooms)

        if (options['CloneBoss']){
            var new_boss_rooms = []
            var end_wart = boss_rooms[boss_rooms.length-1]
            while(new_boss_rooms.length < 6){
                var index = (~~(Math.random() * 6))
                console.log(boss_rooms[index], index)
                var cloned = JSON.parse(JSON.stringify(boss_rooms[index]))
                my_levels[boss_rooms[new_boss_rooms.length].i] = cloned
                new_boss_rooms.push(cloned)
            }
            new_boss_rooms.push(end_wart)
            boss_rooms = new_boss_rooms
        }
    }
    var last_boss = boss_rooms[boss_rooms.length - 1]
    my_rom[WinLevel] = last_boss.world * 3 + last_boss.level

    Math.seedrandom(rando_seed)

    // get level groups
    var level_groups = [] 
    Array.split([...my_levels], 10).map(x => !x.every(y => y == undefined) ? level_groups.push(x) : x) 

    var game_scale = options['GameScale']
    while(game_scale > 0 && level_groups.length > game_scale){
        var target_num = ~~(Math.random() * level_groups.length)
        level_groups.splice(target_num, 1)
        console.log(target_num, level_groups)
    }

    var all_levels = [].concat.apply([], level_groups)

    if(options['ShuffleType'] == 'Door_Randomizer_V1'){
        if (options['ScrambleHub']) all_levels = shuffle(all_levels)
        door_randomizer_v1(all_levels, blacklist, patches, options, my_rom, mem_locs)
        return all_levels
    }
    else if (options['ShuffleType'] == 'World_Order_Randomizer'){
        var world_sets = Array.split(level_groups, 3)
        if (options['ScrambleWorld'])
            world_sets = shuffle(world_sets).map(x => shuffle(x))
        else 
            world_sets = shuffle(world_sets)
        level_groups = [].concat.apply([], world_sets)
    }
    else if(options['ShuffleType'] == 'Level_Order_Randomizer'){
        level_groups = shuffle(level_groups) 
    }
    else if(options['ShuffleType'] == 'Simple_Door_Randomizer'){
        level_groups = shuffle(level_groups) 
        var iterations = options['DoorIterations']
        var chance = options['DoorChance']
        console.log(iterations, chance)

        for (var i = 0; i < iterations; i++) {
            if (Math.random() * 100 >= chance) continue
            var targets = shuffle([...all_levels])
            targets = targets.filter(x => x != undefined)
            targets = targets.filter(x => x.is_jar == 0)
            targets = targets.filter(x => !(x.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0))
            targets = Array.split(targets, 2)

            for (var my_pairs of targets){
                var ll = my_pairs[0]
                var rl = my_pairs[1]
                if(ll == undefined || rl == undefined)
                    continue
                //if (ll.rendered == undefined) 
                //if (rl.rendered == undefined) 
                ll.rendered = render_level(ll, ll.header, ll.enemies, info.meta_info)
                rl.rendered = render_level(rl, rl.header, rl.enemies, info.meta_info)

                var columns = get_valid_columns(ll.rendered).filter(function(ele){return ele.space > 3})
                var l_ptrs = ll.ptrs.map(y => y.pos_page)
                columns = columns.filter(x => !l_ptrs.includes(x.pos_page))
                columns = columns.filter(x => !(x.pos_page == 0 && x.pos_x == 0 ))
                columns = columns.filter(x => !(x.pos_page == ll.header.pages && x.pos_x == 15 ))
                columns = shuffle(columns)

                var r_columns = get_valid_columns(rl.rendered).filter(function(ele){return ele.space > 3})
                var r_ptrs = rl.ptrs.map(y => y.pos_page)
                r_columns = r_columns.filter(x => !r_ptrs.includes(x.pos_page))
                r_columns = r_columns.filter(x => !(x.pos_page == 0 && x.pos_x == 0 ))
                r_columns = r_columns.filter(x => !(x.pos_page == rl.header.pages && x.pos_x == 15 ))
                r_columns = shuffle(r_columns)

                if (columns.length == 0 || r_columns.length == 0){
                    console.error('columns were empty')
                    continue
                }

                var target = columns[0]
                var lx = target.pos_x
                var ly = target.pos_y - 2
                var lpage = target.pos_page
                var new_door = create_smb_object(0xa, lx, ly, lpage, 1)
                ll.objs.push(new_door)

                var r_target = r_columns[0]
                var rx = r_target.pos_x
                var ry = r_target.pos_y - 2
                var rpage = r_target.pos_page
                var r_new_door = create_smb_object(0xa, rx, ry, rpage, 1)
                rl.objs.push(r_new_door)

                var new_ptr = create_ptr_wlrp(rl.world, rl.level, rl.room, rpage, lpage)
                var r_new_ptr = create_ptr_wlrp(ll.world, ll.level, ll.room, lpage, rpage)

                ll.ptrs.push(new_ptr)
                rl.ptrs.push(r_new_ptr)
            }
        }
             
    }


    Math.seedrandom(rando_seed)


    console.log('Stringing levels together')
    for(var n in level_groups){
        console.debug('level_groups', n)
        n = parseInt(n)
        var set = level_groups[n]


        if (set[0] == undefined) continue
        var current_level_end = undefined
        for (var l of set){
            if (l == undefined) continue
            var isCrystal = l.enemies.filter( function(ele){return ele.obj_type == 0x44}).length > 0
            if (isCrystal){
                current_level_end = l
                break
            }   
        }
        if (current_level_end == undefined){
            console.error('should not be undefined')
            continue
        }

        var next_set = level_groups[n + 1]
        if (next_set == undefined){
            next_set = level_groups[0]
            console.error('End of sets, loop to beginning', n + 1)
        }
        if (next_set[0] == undefined){
            next_set = level_groups[n + 2]
        }

        console.log('WorldLevel', set[0].world+1, '-', set[0].level+1)
        
        var next_level_start = next_set[0]
        var end_eagle = current_level_end.enemies.filter( 
            function(ele){return [0x42, 0x43, 0x2d].includes(ele.obj_type)})[0]
        var start_eagle = next_level_start.enemies.filter( 
            function(ele){return [0x42, 0x43, 0x2d].includes(ele.obj_type)})[0]

        var target_ptr = -1
        var ptrs = current_level_end.ptrs
        target_ptr = ptrs.findIndex(x => x.pos_page == end_eagle.pos_page)
        target_ptr = target_ptr >= 0 ? target_ptr : ptrs.length


        if (n % 3 == 2 || n == level_groups.length - 1){
            console.log('boss')
            var boss_room = boss_rooms[0]
            boss_rooms = boss_rooms.slice(1)

            if (n == level_groups.length - 1)
                boss_room = last_boss

            var boss = boss_room.enemies.filter(
                function(ele){return ele.obj_type > 0x5C})[0]

            current_level_end.ptrs[target_ptr] = create_ptr_wlrp(
                boss_room.world, boss_room.level, boss_room.room, 0, end_eagle.pos_page)

            var ptrs = boss_room.ptrs
            target_ptr = boss_room.ptrs.findIndex(x => x.pos_page == boss.pos_page)
            target_ptr = target_ptr >= 0 ? target_ptr : ptrs.length

            boss_room.ptrs[target_ptr] = create_ptr_wlrp(
                next_level_start.world, next_level_start.level, next_level_start.room, 
                (start_eagle != undefined ? start_eagle.pos_page : 0), boss.pos_page ) 
            boss_room.ptrs[target_ptr].continue_after = true
            boss_room.ptrs[target_ptr].reset_pos_after = true
            boss_room.ptrs[target_ptr].slots_after = true
        }
        else {
            current_level_end.ptrs[target_ptr] = create_ptr_wlrp(
                next_level_start.world, next_level_start.level, next_level_start.room,
                (start_eagle != undefined) ? start_eagle.pos_page : 0, end_eagle.pos_page)

            current_level_end.ptrs[target_ptr].continue_after = true
            current_level_end.ptrs[target_ptr].reset_pos_after = true
            current_level_end.ptrs[target_ptr].slots_after = true
        }
    }

    my_rom[LevelStart] = level_groups[0][0].world * 3 + level_groups[0][0].level
    my_rom[LevelStart + 1] = level_groups[0][0].room
    my_rom[LevelStart + 2] = level_groups[0][0].page
    my_rom[LevelStart + 3] = 0

    return all_levels

}

var ne = enemyEnum

var post_enemy_changes = { }

var pick_random_enemy_by_score = function (me, current_variance, max_variance, variance, upgrade = false, extra=[]) { 
    var my_targets = this.targets.concat(this.additional).concat(extra)
    my_targets = my_targets.filter(x => Math.abs(enemy_score[me] - enemy_score[x]) <= variance )
    my_targets = my_targets.filter(x => max_variance >= current_variance + enemy_score[x] )
    if (my_targets.length) return Array.pick_random(my_targets)
    else return me
}

var shuffle_enemy_data = [
    { 
        targets: [ne.ShyguyPink, ne.ShyguyRed, ne.Tweeter, ne.Porcupo,
            ne.NinjiRunning, ne.SnifitRed, ne.SnifitPink, ne.BobOmb, ne.FryguySplit],
        additional: [ne.JarGeneratorShyguy, ne.JarGeneratorBobOmb, ne.SnifitGray, ne.NinjiJumping, ne.Birdo, ne.BeezoStraight, ne.BeezoDiving],
        process: pick_random_enemy_by_score 
    },
    { 
        targets: [ne.Birdo],
        additional: [ne.Mouser],
        process: pick_random_enemy_by_score 
    },
    { 
        targets: [ne.Spark1, ne.Spark2, ne.Spark3, ne.Spark4],
        additional: [],
        process: pick_random_enemy_by_score 
    },
    { 
        targets: [ne.SnifitGray, ne.NinjiJumping, 
            ne.PanserStationaryFiresAngled, ne.PanserStationaryFiresUp],
        additional: [],
        process: pick_random_enemy_by_score 
    },
    { 
        targets: [ne.FallingLogs],
        additional: [ne.Trouter, ne.FallingLogs, ne.FallingLogs],
        process: pick_random_enemy_by_score 
    },
    //{ 
    //    targets: [ne.BossMouser], 
    //    additional: [ne.BossPanserWalking, ne.BossMouser, ne.BossMouser],
    //    process: function () { return Array.pick_random(this.targets.concat(this.additional)) } 
    //},
]

function enemy_randomize_by_score(my_l, max_score, enemy_variance) {
    var score = 0
    for (var e of shuffle(my_l.enemies)){
        for (var rule of shuffle_enemy_data){
            if (rule.targets.includes(e.obj_type)) {
                var prev_type = e.obj_type
                e.obj_type = rule.process(e.obj_type, score, max_score, enemy_variance)
                console.log(prev_type, e)
                if(e.obj_type == prev_type) break 
                if(e.obj_type == ne.Birdo) e.pos_y--
                if(e.obj_type == ne.Mouser) {
                    var my_world = my_l.world
                    var world_bosses = [ne.Mouser, ne.Tryclyde, ne.Mouser, ne.Fryguy, ne.Clawgrip, ne.Tryclyde, ne.Wart]
                    if (my_l.header.cust_world == 7)
                        e.obj_type = world_bosses[my_l.world]
                    else
                        e.obj_type = world_bosses[my_l.header.cust_world]
                    e.pos_y--
                }
                if(e.obj_type == ne.JarGeneratorShyguy || e.obj_type == ne.JarGeneratorBobOmb){
                    my_l.objs.push( create_smb_object(objEnum.Jar_small, 
                        e.pos_x, e.pos_y, e.pos_page, 1) )
                    var options = [ne.Fireball, ne.Heart, ne.VegetableSmall]
                    var attack = e.obj_type
                    while([ne.JarGeneratorShyguy, ne.JarGeneratorBobOmb].includes(attack))
                        attack = rule.process(0, score, max_score, enemy_variance, false, options) 
                    my_l.hotspots.push ({
                        pos_x: e.pos_x,
                        pos_y: e.pos_y,
                        pos_page: e.pos_page,
                        contents: [attack, 0x00, 0x45]
                    })
                } 
                if(e.obj_type == ne.BeezoDiving) e.pos_y = 2
                if(prev_type == ne.BossMouser || prev_type == ne.Birdo) {
                    my_l.enemies.push( create_smb_enemy(ne.JarGeneratorShyguy, 
                        e.pos_y+2, e.pos_x, e.pos_page, my_l.vertical) )
                }
                break
            }
        }
        score += enemy_score[e.obj_type] + 2
    }
}
var enemy_score = [
    0, 0, 1, 0, 1, 2, 2, 2,
    2, 2, 3, 2, 2, 3, 2, 3,
    3, 0, 0, 2, 2, 4, 4, 0,
    3, 3, 5, 0, 6, 9, 0, 9,
    3, 9, 0, 4, 5, 4, 3, 0,
    0, 3, 0, 4, 9, 0, 1, 2,
    1, 2, 0, 0, 0, 0, 0, 3,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 9, 0, 0, 0, 0,
    0, 0
]

function enemy_freq(my_levels){
    var frequency_table = Array.range(256).fill(0)
    var frequency_dict = {}
    for (var i in frequency_table){
        frequency_dict[EnemyIds[i]] = frequency_table[i]
    }
    for (var my_l of my_levels){
        if (my_l == undefined) continue
        var e = my_l.enemies
        for (var enemy of e){
            frequency_table[enemy.obj_type] += 1
            frequency_dict[EnemyIds[enemy.obj_type]] = frequency_table[enemy.obj_type]
        }
    }
    console.log(JSON.stringify(frequency_dict, null, 2))
    return frequency_table
}

function enemy_randomizer(my_levels, scale_range, percent_range){

    for (var my_l of my_levels){
        if (my_l == undefined)
            continue
        else {
            if (my_l.enemies.length) {
                var my_score = 0
                for (var e of my_l.enemies) my_score += enemy_score[e.obj_type] ? enemy_score[e.obj_type] + 2 : 2
                var max_score = my_score + ~~(Math.random() * my_score * percent_range) 
                console.log('scoring', my_score, max_score)
                enemy_randomize_by_score(my_l, max_score, scale_range)
            }
        }
    }
}

var oe = objEnum

var post_obj_changes = { }

var shuffle_obj_data = [
    { 
        targets: [],
        additional: [],
        process: function (extra=[]) { return Array.pick_random(this.targets.concat(this.additional).concat(extra)) }
    },

]

function overworld_item_randomizer(my_levels, my_rom, mem_locs, meta_info, my_options){
    for (var my_l of my_levels){
        if (my_l == undefined)
            continue
        for (var o of my_l.objs){
            for (var rule of shuffle_obj_data){
                if (rule.targets.includes(o.obj_type)) {
                    var prev_type = o.obj_type
                    o.obj_type = rule.process()
                }
            }
        }
    }
}

var all_item_names = [
        'Mushroom', 
        'Power Beet', 
        'Power Charge', 
        'Power Walk', 
        'Magic Lamp', 
        'Life Vest', 
        'Fire Immunity', 
        'Electric Immunity', 
        'Secret Detector', 
        'All Terrain', 
        'Hi-Jump Boots', 
        'Float Boots', 
        'Master Key', 
        'Carry Jump', 
        "Unimplemented",
        "Unimplemented",
        "Unimplemented",
        'Fire Flower', 
        'Egg Thrower', 
        'Bomb Thrower', 
        'Phanto Buddy', 
        'Fry Buddy', 
        'Hammer', 
        'Freeze Flower', 
        'Continue Up',
        'Unlock Mario', 
        'Unlock Luigi', 
        'Unlock Toad', 
        'Unlock Peach',
        'Mushroom Fragment',
        'Key', 
        'Coin', 
        'Shell', 
        'Life', 
        'Star', 
        'Stopwatch', 
        'Shyguy', 
        'Crystals' 
]


var invEnum = {}
all_item_names.map((x,y) => invEnum[x.replaceAll(' ', '_')] = y)


var power_up_start = 19
var cont_start = 24
var lock_start = 25 
var frag_start = 29 
var junk_start = 31
var crystal_start = 37

var upgrade_names = all_item_names.slice(1, 14)

var powerup_names = all_item_names.slice(power_up_start, cont_start)

var continue_names = all_item_names.slice(cont_start, lock_start) 

var unlock_names = all_item_names.slice(lock_start, frag_start) 

var fragment_names = all_item_names.slice(frag_start, junk_start) 

var junk_items = all_item_names.slice(junk_start, crystal_start)

var crystal_items = all_item_names.slice(crystal_start)

// TODO: we can probably generate even probability another way, instead of single element grab bags,
// but since arrays are references, should share across pools
//
var array_pool = function (...pools){
    this.arrays = [...pools],
    this.remove_from_pool = function(n) {
        var cur_pos = 0
        for (var a_pos in this.arrays){
            var a = this.arrays[a_pos]
            if (n >= cur_pos + a.length) cur_pos += a.length
            else {
                var result = a.splice(n - cur_pos, 1)[0]
                if (a.length == 0) this.arrays.splice(a_pos, 1)
                return result
            }
        }
    },
    this.has_stuff = function(){
        return this.get_arrays_combined().length > 0
    },
    this.get_arrays_combined = function () {
        return this.arrays.reduce((a, b) => a.concat(b), [])
    },
    this.get_from_pool = function(num) {
        var new_inventory = []
        var full_pool = this.get_arrays_combined()
        for (var num of Array(num)){
            if (this.arrays.length == 0) return new_inventory
            if (full_pool.length == 0) return new_inventory
            var i = ~~(Math.random() * full_pool.length)
            new_inventory.push(this.remove_from_pool(i))
            full_pool.splice(i, 1)
        }
        return new_inventory
    }
}

function push_level_inventory (my_l, inventory){
    if(inventory.length > 0){
        my_l.modifiers.push({
            id: 'MushItems',
            loc_l: 0x76,
            loc_r: 0x00,
            contents: inventory,
            length: inventory.length,
            repeat: false,
            vertical: false
        })
    }
}

function generate_item_pools(my_levels, options, my_rom, mem_locs, meta_info){
    // create pools for items
    var mushrooms = Array(parseInt(options['Mushrooms'].val)).fill(0)
    var fragments = Array(parseInt(options['Mushroom_Fragments'].val)).fill( invEnum.Mushroom_Fragment)
    var common = Array(parseInt(options['Common_Items'].val)).fill(0).map( (x, y) => ~~(Math.random() * junk_items.length) + junk_start)
    var powerups = Array(parseInt(options['Powerups'].val)).fill(0).map( (x, y) => ~~(Math.random() * powerup_names.length) + power_up_start)

    var upgrades = shuffle(Array.range(upgrade_names.length, 1))
    while (upgrades.length < options['Upgrades'].val)
        upgrades = upgrades.concat(shuffle(Array.range(upgrade_names.length, 1)))
    upgrades = upgrades.slice(0, options['Upgrades'].val)

    var unlocks = []
    if(options['Add_Rescue_Items'].checked || options['Rescue_All_Characters'].checked)
        unlocks = shuffle([...unlock_names.keys()]).map(x => x + lock_start)

    var crystals = Array(parseInt(options['Crystals'].val)).fill(invEnum.Crystals)

    var complete_pool = new array_pool(mushrooms, fragments, upgrades, powerups, common, unlocks, crystals)
    var major_pool = new array_pool(mushrooms, fragments, upgrades, unlocks)
    var minor_pool = new array_pool(powerups, common, crystals)
    var subspace_only_pool = new array_pool(upgrades, unlocks)
    var overworld_pool = new array_pool(mushrooms, fragments, powerups, common, crystals)
    var subspace_specific_items = upgrades.concat(unlocks)
    var major_items = mushrooms.concat(fragments).concat(upgrades).concat(unlocks)

    console.log('debug', mushrooms, fragments, common, powerups)
    console.log('debug', upgrades, unlocks, crystals)
    console.log(JSON.stringify(complete_pool.get_arrays_combined()))
    console.log(JSON.stringify(major_pool.get_arrays_combined()))
    console.log(JSON.stringify(minor_pool.get_arrays_combined()))
    console.log(JSON.stringify(subspace_only_pool.get_arrays_combined()))
    console.log(JSON.stringify(overworld_pool.get_arrays_combined()))

    // Handle Boss Drops
    var boss_levels = my_levels.filter(x => x != undefined && (x.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0))

    var boss_distribution = Array(boss_levels.length).fill(1)
    var boss_inventory = []

    set_memory_location(my_rom, mem_locs, 'BossMushroom', [1]) 
    if(options["Boss_Drops"].radio == "Mushrooms_and_Fragments"){
        var boss_pool = new array_pool(mushrooms, fragments)
        boss_inventory = boss_pool.get_from_pool(boss_levels.length)
    }
    else if (options["Boss_Drops"].radio == "Major_Items"){
        var boss_pool = new array_pool(mushrooms, fragments, unlocks, upgrades, crystals)
        boss_inventory = boss_pool.get_from_pool(boss_levels.length)
    }
    else if (options["Boss_Drops"].radio == "Full_Item_Pool"){
        var boss_pool = new array_pool(mushrooms, fragments, unlocks, upgrades, common, powerups, crystals)
        boss_inventory = boss_pool.get_from_pool(boss_levels.length)
    }
    else {
        set_memory_location(my_rom, mem_locs, 'BossMushroom', [0]) 
        boss_distribution.fill(0)
    }
    while (boss_inventory.length < boss_levels.length) boss_inventory.push(invEnum.Coin)

    for (var boss of boss_levels){
        var count = boss_distribution.pop()
        var level_inventory = boss_inventory.splice(0, count).filter(x => x != 0)
        push_level_inventory(boss, level_inventory)
    }

    // we can only have two subspace items, plus these usually require special tiles
    // we can only have two items that can use the mushroom flags, and we haven't expanded on that yet
    // conclusion: only two max of either, prefer subspace items to subspace then prefer non major items to surface
    //              if major items exist on surface, must be because there's only 0 to 1 subspace items

    var my_level_item_cnt = []

    // TODO: make something a little less biased
    var horizontal_levels = my_levels.filter(x => (x != undefined && !x.header.vertical &&
        x.is_jar == 0 && !(x.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0)))

    if (!options['Randomize_Mushroom_Locations'].checked){
        for (var my_l of shuffle(horizontal_levels)){
            var i = my_l.i
            var cnt = my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45)).length
            var level_inventory = subspace_only_pool.get_from_pool(cnt)
            if (level_inventory.length < cnt)
                level_inventory.push(...complete_pool.get_from_pool(cnt - level_inventory.length))
            my_level_item_cnt[i] = level_inventory
        }
    }
    else{
        for (var my_l of horizontal_levels){
            my_l.objs = my_l.objs.filter(x => !(x.obj_type == 43 || x.obj_type == 45))
        }
    }

    while (complete_pool.has_stuff()) {
        for (var my_l of shuffle(my_levels).slice(0, 30)){
            if (my_l == undefined) continue
            var i = my_l.i
            if (my_level_item_cnt[i] == undefined) my_level_item_cnt[i] = []
            if (my_l.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0) continue
            if (my_l.is_jar == 1) continue
            if (my_l.is_jar == 2) my_level_item_cnt[i].push(...complete_pool.get_from_pool(1))
            else if (my_l.header.vertical){
                var fi = my_level_item_cnt[i].filter(x => major_items.includes(x)).length
                if (fi == 2) my_level_item_cnt[i].push(...minor_pool.get_from_pool(1))
                else my_level_item_cnt[i].push(...overworld_pool.get_from_pool(1))
            }
            else {
                var si = my_level_item_cnt[i].filter(x => subspace_specific_items.includes(x)).length
                if(si == 2) {
                    var fi = my_level_item_cnt[i].filter(x => major_items.includes(x)).length
                    if (fi == 2) my_level_item_cnt[i].push(...minor_pool.get_from_pool(1))
                    else my_level_item_cnt[i].push(...overworld_pool.get_from_pool(1))
                }
                else {
                    var fi = my_level_item_cnt[i].filter(x => major_items.includes(x)).length
                    if (fi == 2) my_level_item_cnt[i].push(...minor_pool.get_from_pool(1))
                    else my_level_item_cnt[i].push(...complete_pool.get_from_pool(1))
                }
            }
        }
    }

    for (var my_l of my_levels.filter(x => x != undefined).sort((a,b) => a.i - b.i)){
        var pool = my_level_item_cnt[my_l.i]
        if (my_level_item_cnt[my_l.i]){
            console.log('my inventory', my_l.i, my_level_item_cnt[my_l.i])
            var pool = my_level_item_cnt[my_l.i].filter(function(a){
                return subspace_specific_items.includes(a)
            })
            console.log('sorted by subspace', pool)
            var pool = my_level_item_cnt[my_l.i].filter(function(a){
                return major_items.includes(a)
            })
            console.log('sorted by subspace', pool)
            var pool = my_level_item_cnt[my_l.i].sort(function(a, b){
                return (subspace_specific_items.includes(b) - subspace_specific_items.includes(a)
                || major_items.includes(b) - major_items.includes(a))
            })
            console.log('sorted by major', pool)
        }
    }

    var item_pool = []
    var bush_replacements = [tileEnum.Sky, tileEnum.GrassCoin, tileEnum.GrassSmallVeggie, 
        tileEnum.GrassLargeVeggie, tileEnum.GrassShell, tileEnum.Grass1UP,
        tileEnum.GrassPow, tileEnum.GrassBobOmb]

    for (var my_l of horizontal_levels){
        if (my_l == undefined) continue
        var rendered = render_level(my_l, my_l.header, my_l.enemies, meta_info)
        var columns = get_valid_columns(rendered).filter(x => 
            rendered[x.pos_page][x.pos_y-1][x.pos_x].obj_type == 0x40 &&
            x.space > 3)
        if (my_level_item_cnt[my_l.i] == undefined) continue
        var pool = my_level_item_cnt[my_l.i].sort(function(a, b){
                return (subspace_specific_items.includes(b) - subspace_specific_items.includes(a)
                || major_items.includes(b) - major_items.includes(a))
            }).slice(0, 2)
        my_level_item_cnt[my_l.i] = my_level_item_cnt[my_l.i].slice(2)

        var targets = my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45))
        while (pool < targets.length) pool.push(invEnum.Coin)

        var isBoss = my_l.enemies.filter(function(ele){return ele.obj_type > 0x5C}).length > 0
        if (!isBoss){
            var my_columns = Array.random_to_front(columns)
            for (var i = targets.length; i < pool.length; i++){
                var target = my_columns[0]
                if (target == undefined)
                    break
                var lx = target.pos_x
                var ly = target.pos_y - 1
                var lpage = target.pos_page
                var new_door = create_smb_object(43, lx, ly-1, lpage, 1)
                my_l.objs.push(new_door)
                // replcae this with a "prefab"
                var pick_obj = Array.pick_random([...Array.range(6),  
                    oe.Vine_extends_to_ground, oe.Red_pillar_extends_to_ground, oe.Herb_with_potion])
                new_door = create_smb_object(pick_obj, lx, ly, lpage, 1) // rebalance this
                my_l.objs.push(new_door)
                my_columns = Array.random_to_front(my_columns.slice(1))
                for (var em of my_l.enemies.filter(x => x.pos_x == lx && x.pos_page == lpage))
                    em.pos_x = em.pos_x + (Math.random() > 0.50 ? -1 : 1)
            }
        }

        targets = my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45))

        for(var i in targets) targets[i].obj_type = 43 + 2*i

        if (options['Autospawn_Potion_Door'].checked){
            for (var pos of targets){
                var height = pos.pos_y
                my_l.enemies.push(create_smb_enemy(60, height - 1, pos.pos_x, pos.pos_page))
            }
        }

        if(pool.length > 0){
            my_l.modifiers.push({
                id: 'MushItems',
                loc_l: 0x76,
                loc_r: 0x00,
                contents: pool,
                length: pool.length,
                repeat: false,
                vertical: false
            })
        }
    }

    for (var my_l of my_levels){
        if (my_l == undefined) continue
        var pool = my_level_item_cnt[my_l.i]
        if (my_level_item_cnt[my_l.i]){
            item_pool.push(...my_level_item_cnt[my_l.i])
            if (my_l.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0){ continue }
            var rendered = render_level(my_l, my_l.header, my_l.enemies, meta_info)
            var my_columns = get_valid_columns(rendered).filter(x => 
                bush_replacements.includes(rendered[x.pos_page][x.pos_y-1][x.pos_x].obj_type) &&
                x.space > 3 && x.pos_y != 1)
            Array.random_to_top(my_columns)
            console.log(pool)
            var occupied_flag = 0
            for (var num of pool){
                var target = my_columns.pop()
                console.log('target', target, my_l.i, my_l.world, my_l.level, my_l.room)
                if (target == undefined) break
                var lx = target.pos_x
                var ly = target.pos_y - 1
                var lpage = target.pos_page
                var new_door = create_smb_object(objEnum.Herb_with_coin, lx, ly, lpage, 1)
                var flag_num = 0xff
                // TODO: make sure this doesn't override subspace flags
                if (major_items.includes(num)) flag_num = occupied_flag++ 
                my_l.objs.push(new_door)
                Array.random_to_top(my_columns)
                var conv_obj = convert_coords_obj_to_item(lpage, ly, lx, my_l.header.vertical)
                my_l.hotspots.push ({
                    pos_x: conv_obj.x,
                    pos_y: conv_obj.y,
                    pos_page: my_l.is_jar == 1 ? 0xa : conv_obj.page,
                    contents: [enemyEnum.Mushroom, num, flag_num]
                })
            }
        }
    }
    console.log(item_pool.sort(function(a, b){ return a - b }).map(x => all_item_names[x]))
}


function item_randomizer(my_levels, my_rom, mem_locs, meta_info, options){
    console.log('Item Randomizer')
    var inventory_set = generate_item_pools(my_levels, options, my_rom, mem_locs, meta_info)
    return

    console.debug('Initial inventory', inventory.map(x => all_item_names[x]))
    
    var horizontal_levels = my_levels.filter(x => (x != undefined && !x.header.vertical &&
        x.is_jar == 0 && !(x.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0)))
    var mush_counts = Array(my_levels.length).fill(0)

    var mush_sum = mush_counts.reduce( (a, b) => a + b ) 
    
    if (inventory.length > horizontal_levels.length * 2){
        for (var my_l of horizontal_levels){
            var l = my_l.i
            mush_counts[l] = 2
        }
        console.debug(mush_counts)
        inventory = inventory.slice(0, horizontal_levels.length * 2)
    }
    else {
        horizontal_levels = shuffle(horizontal_levels)
        var attempts = 3
        while(attempts--) {
            for (var my_l of horizontal_levels){
                var i = my_l.i
                var count_up = ~~(Math.random() * 3)
                mush_counts[i] = 
                    Math.max(count_up, 
                        mush_counts[i], 
                        my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45)).length)
                mush_sum = mush_counts.reduce( (a, b) => a + b ) 
                if ( mush_sum >= horizontal_levels.length * 2 || mush_sum >= inventory.length )
                    break
            }
        }
    }
    mush_sum = mush_counts.reduce( (a, b) => a + b ) 

    while (inventory.length < mush_sum)
        inventory.push(invEnum.Coin)
    inventory = inventory.slice(0, mush_sum)
    inventory = shuffle(inventory)
    console.log('Final inventory', inventory.map(x => all_item_names[x]))

    for (var my_l of my_levels){
        if (my_l == undefined)
            continue
        var rendered = render_level(my_l, my_l.header, my_l.enemies, meta_info)
        var columns = get_valid_columns(rendered).filter(x => 
            rendered[x.pos_page][x.pos_y-1][x.pos_x].obj_type == 0x40 &&
            x.space > 2)

        var targets = my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45))

        var isBoss = my_l.enemies.filter(function(ele){return ele.obj_type > 0x5C}).length > 0
        if (!isBoss && my_l.is_jar == 0 && !my_l.header.vertical){
            var my_columns = Array.random_to_front(columns)
            for (var i = targets.length; i < mush_counts[my_l.i]; i++){
                var target = my_columns[0]
                if (target == undefined) break
                var lx = target.pos_x
                var ly = target.pos_y - 1
                var lpage = target.pos_page
                var new_door = create_smb_object(43, lx, ly-1, lpage, 1)
                my_l.objs.push(new_door)
                // replcae this with a "prefab"
                var pick_obj = Array.pick_random([...Array.range(6),  
                    oe.Vine_extends_to_ground, oe.Herb_with_coin,
                    oe.Red_pillar_extends_to_ground, oe.Herb_with_potion])
                new_door = create_smb_object(pick_obj, lx, ly, lpage, 1) // rebalance this
                my_l.objs.push(new_door)
                my_columns = Array.random_to_front(my_columns.slice(1))
                for (var em of my_l.enemies.filter(x => x.pos_x == lx && x.pos_page == lpage))
                    em.pos_x = em.pos_x + (Math.random() > 0.50 ? -1 : 1)
            }
        }

        targets = my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45))

        for(var i in targets){
            targets[i].obj_type = 43 + 2*i
        }


        if (options['Autospawn_Potion_Door'].checked){
            for (var pos of targets){
                var height = pos.pos_y
                while (rendered[pos.pos_page][height][pos.pos_x].solidity == 0 && height > 15)
                    height++
                my_l.enemies.push(create_smb_enemy(60, height - 1, pos.pos_x, pos.pos_page))
            }
        }

        var level_inventory = inventory.slice(0, targets.length).filter(x => x != 0)
        if(level_inventory.length > 0){
            my_l.modifiers.push({
                id: 'MushItems',
                loc_l: 0x76,
                loc_r: 0x00,
                contents: level_inventory,
                length: level_inventory.length,
                repeat: false,
                vertical: false
            })
        }
        inventory = inventory.slice(targets.length)
    }
    if (inventory.length > 0)
        console.error('Inventory still present', inventory.map(x => all_item_names[x]))
}

function player_randomizer(my_levels, my_rom, mem_locs, meta_info, option_vals){
    console.log('Player Randomizer')
    var character_pool = []
    if (option_vals['Mario'].checked) character_pool.push(0)
    if (option_vals['Peach'].checked) character_pool.push(1)
    if (option_vals['Toad'].checked) character_pool.push(2)
    if (option_vals['Luigi'].checked) character_pool.push(3)
    if (character_pool.length == 0){
        character_pool = [0, 1, 2, 3]
    }
    var lock_var = character_pool.reduce((a, b) => a ^ player_table[b], 0xF)
    // lord please just use react or something else why is getting form elements so confusing
    // abstract this by making form objects modify an options JSON on change rather than on commit
    set_memory_location(my_rom, mem_locs,
        'CharLockVar', [lock_var], 0)
    var level_sets = split_em(my_levels, 10).map(x => x.filter(y => y != undefined))
    
    var starting_gift = option_vals['Starting_Gift'].checked
    var maxed_up = option_vals['Maxed_Upgrades_cheat'].checked

    if (maxed_up){
        set_memory_location(my_rom, mem_locs,
            'StartingInventory',
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
            0, function(l, r){ return l | r })
    }
    else {
        if (starting_gift)
            for(var i = 0; i < 4; i++){
                var powerup = ~~(Math.random() * 13)
                console.log('Character', i, 'acquired', all_item_names[powerup + 1], 0)
                set_memory_location(my_rom, mem_locs,
                    'StartingInventory',
                    [1 << (powerup % 8)],
                    player_order[i] + 4 * (powerup >> 3), function(l, r){ return l | r })
            }
    }

    var doki = option_vals['Doki_Doki_Mode'].checked
    if (doki){
        set_memory_location(my_rom, mem_locs,
            'DokiMode',
            [0b11111100,0b11111100,0b11111100,0b11111100],
            0, function(l, r){ return l & r })
    }

    var r_header = option_vals['Force_Character'].radio
    var character = 0xf
    var segments = []
    if (r_header == 'Per_World')
        segments = Array.split(my_levels, 30)
    else if (r_header == 'Per_Level')
        segments = Array.split(my_levels, 10)
    else if (r_header == 'Per_Room')
        segments = Array.split(my_levels, 1)
    else
        console.log('No Character Forcing...')
    for(var s of segments){
        character = Array.pick_random(character_pool)
        for(var l of s){
            if (l != undefined){
                l.modifiers.push({
                    loc_l: 0x00,
                    loc_r: 0x8f,
                    contents: [character]
                })
                // if not rescue...
                l.modifiers.push({
                    loc_l: 0x7D,
                    loc_r: 0xE0,
                    contents: [[character].reduce((a, b) => a ^ (player_table[b]), 0xF)]
                })
            }
        }
    }
}


////// 
////// create functions
//
// inverse

function crop_level (old_my_l, min, max){
    // consider modifiers/hotspots
    var my_l = JSON.parse(JSON.stringify(old_my_l))
    my_l.header.pages = max - min - 1
    my_l.objs = my_l.objs.filter(x => x.pos_page >= min && x.pos_page < max)
    my_l.enemies = my_l.enemies.filter(x => x.pos_page >= min && x.pos_page < max)
    my_l.ptrs = my_l.ptrs.filter(x => x.pos_page >= min && x.pos_page < max)
    my_l.objs.forEach(x => x.pos_page -= min)
    my_l.ptrs.forEach(x => x.pos_page -= min)
    my_l.enemies.forEach(x => x.pos_page -= min)

    var target_grounds = my_l.grounds.filter(x => x.pos_page < min)
    while (target_grounds.length){
        last_ground = target_grounds.shift()
        if (last_ground.ground_set) my_l.header.ground_set = last_ground.ground_set 
        if (last_ground.ground_type) my_l.header.ground_type = last_ground.ground_type
    }
    my_l.grounds = my_l.grounds.filter(x => x.pos_page >= min && x.pos_page < max)
    my_l.grounds.forEach(x => x.pos_page -= min)
    return my_l
}

function inverse_level(my_l, all_levels){
    // needs inverse ground_set hack
    var my_e = my_l.enemies
    var my_h = my_l.header
    var new_lvl = []
    var new_ptrs = []
    var new_grounds = []

    for (var cur_obj of my_l.objs){
        var cur_obj_type = cur_obj.obj_type
        var offset = 0
        if (cur_obj_type == 0x13) cur_obj_type = 0x14
        else if (cur_obj_type == 0x14) cur_obj_type = 0x13

        if (cur_obj_type > 0x30){
            var inner_type = cur_obj_type >> 4
            if (![8, 9, 10].includes(inner_type)){
                offset = cur_obj_type & 0xF
            }
        }
        else if ([16, 17].includes(cur_obj_type)){
            offset = 1
        }
        else if ([24, 25].includes(cur_obj_type)){
            offset = 6
        }
        else if ([14].includes(cur_obj_type)){
            var new_x = cur_obj.pos_x
            cur_obj.pos_x = new_x
            new_lvl.push(cur_obj)
            continue
        }

        if (my_h.vertical){
            var new_x = 15 - cur_obj.pos_x - offset
            var new_page = cur_obj.pos_page
            new_lvl.push( create_smb_object(
                cur_obj_type, new_x, cur_obj.pos_y, new_page, cur_obj.layer))        
        }
        else {
            var new_x = 15 - cur_obj.pos_x - offset
            var new_page = my_h.pages - cur_obj.pos_page 
            while (new_x < 0){
                new_x += 16
                new_page -= 1
            }
            if (new_page < 0)
                continue
            if (new_page == 0 && new_x == 0 && cur_obj_type > 0xb0 && cur_obj_type < 0xd0)
                continue
            new_lvl.push(create_smb_object(
                cur_obj_type, new_x, cur_obj.pos_y, new_page, cur_obj.layer))        
        }
    }

    my_l.objs = new_lvl

    if (!my_h.vertical){
        my_l.ptrs.forEach(x => x.pos_page = Math.abs(x.pos_page - my_l.header.pages))
        var change_ptrs = all_levels.filter(x => x != undefined).map(x => x.ptrs.filter(y => 
            y.world == my_l.world &&
            y.level == my_l.level &&
            y.room == my_l.room))
        for (var p of change_ptrs){
            for (var ptr of p) ptr.dest_page = Math.abs(ptr.dest_page - my_l.header.pages)
        }
    } 

    for (var enemy of my_l.enemies){
        if (!my_h.vertical) {
            var old_x = enemy.pos_x + 15 * enemy.pos_page
            var total_x = 15 * (my_h.pages + 1)
            var new_x = total_x - old_x 
            var new_page = parseInt(new_x / 15)
            new_x = new_x % 15
        }
        else {
            var old_x = enemy.pos_x 
            var total_x = 15
            var new_x = total_x - old_x 
            var new_page = enemy.pos_page
            new_x = new_x % 15
        }
        if (enemy.obj_type == 0x42) enemy.obj_type = 0x43
        else if (enemy.obj_type == 0x43) enemy.obj_type = 0x42
        else if (enemy.obj_type == 0x1c) new_x = enemy.pos_x
        enemy.pos_x = new_x
        enemy.pos_page = new_page
    }

    // have to properly swap positions for grounds
    var my_grounds = my_l.grounds
    if(my_grounds.length > 0 && !my_h.vertical){
        var init_ground = {
            obj_type: 0xF0,
            param: 0b000 + my_h.ground_set,
            column_tile: 0,
            ground_set: my_h.ground_set,
            layer: 0,
            pos_page: 0,
            invert: my_h.vertical,
            ground_type: my_h.ground_type
        }

        my_grounds.unshift(init_ground)

        var my_g_sets = my_grounds.map(x => x.ground_set)
        var my_g_types = my_grounds.map(x => x.ground_type)
        for (var i = 0; i < my_g_types.length; i++){
            if (my_g_types[i] == undefined)
                 my_g_types[i] = my_g_types[i-1]
        }

        for(var i = 0; i < my_grounds.length - 1; i++){
            var cur_obj = my_grounds[i]
            var next_obj = my_grounds[i + 1]
            var new_column = 16 - next_obj.column_tile 
            var new_page = my_h.pages - next_obj.pos_page
            if (new_column == 16){
                new_column -= 16
                new_page++
            }
            var new_param = ((new_column & 0b111) << 5) + cur_obj.ground_set
            var cur_obj_type = 0xF0 + ( (new_column & 0b1000) >> 3 )
            if (cur_obj_type == 0xF0 && new_column == 0 && new_page == 0) new_column = 8
            new_grounds.push({
                obj_type: cur_obj_type,
                param: new_param,
                column_tile: new_column,
                ground_set: my_g_sets[i],
                layer: 0,
                pos_page: new_page,
                invert: my_h.vertical,
                ground_type: my_g_types[i]
            })
        }

        my_h.ground_set = my_g_sets[my_grounds.length-1] & 0x1F
        my_h.ground_type = my_g_types[my_grounds.length-1] & 0xF

        new_grounds = new_grounds.sort(function(a,b){
            return  a.pos_page - b.pos_page || a.column_tile - b.column_tile
        })

        my_l.grounds = new_grounds
    }
    else if (my_grounds.length > 0){
        for (var ground of my_grounds)
            ground.invert = true
    }
}

function get_valid_columns(rendered){
    var pages = rendered.length
    var page_columns = []
    for (var p = 0; p < pages; p++) {
        var current_page = rendered[p]
        for (var i = 0; i < 15; i++){
            var last_space = -1
            for (var j = 0; j < 14; j++){
                var pos_item = current_page[j][i]
                if (pos_item.solidity > 0) {
                    if (j - last_space > 2) {
                        page_columns.push({
                            pos_page: p,
                            pos_y: j,
                            pos_x: i,
                            top_y: last_space,
                            tile_type: pos_item,
                            space: j - last_space
                        })
                    }
                    if (pos_item.solidity == 2)
                        last_space = j
                }
            }
        }
    }        
    return page_columns
}

var te = tileEnum

function repair_ground_type (my_h, og_gt, og_world, new_world, world_metadata){
    if (Array.isArray(og_gt) || og_gt instanceof Uint8Array || og_gt instanceof Int8Array){
        return og_gt
    }
    if (my_h.vertical){
        var all_tiles = world_metadata.vtiles[new_world]
        var target = world_metadata.vtiles[new_world][og_gt]
        var og_target = world_metadata.vtiles[og_world][og_gt]
    }
    else{
        var all_tiles = world_metadata.htiles[new_world]
        var target = world_metadata.htiles[new_world][og_gt]
        var og_target = world_metadata.htiles[og_world][og_gt]
    }
    var problem_tiles = [te.QuicksandSlow, te.QuicksandFast, te.Sky, te.Black, te.JumpThroughIce, te.DiggableSand]
    if (problem_tiles.every(x => !problem_tiles.includes(x))){
        if (Math.random() < 0.70) {
            for (var tiles_num in all_tiles){
                var tiles = all_tiles[tiles_num]
                for (var i=0; i < tiles.length; i++){
                    if (is_tile_solid(tiles[i]) != is_tile_solid(og_target[i]))
                        break
                    else if (i == 3){
                        console.log(tiles.map(x => is_tile_solid(x)), 'matches', og_target.map(x => is_tile_solid(x)))
                        return tiles
                    }
                }
            }
            console.log('uh oh')
        }
    }


    var new_tiles = []
    var all_tiles = all_tiles.reduce((a, b) => a.concat(...b), [])
    for (var i = 0; i < og_target.length; i++){
        if ([0x93, 0x40, 0x16, 0x8a, 0x8b, 0x0].includes(og_target[i])){
            new_tiles.push(og_target[i])
            continue
        }
        var candidates = shuffle(all_tiles.filter(x => is_tile_solid(x) == is_tile_solid(og_target[i])))
        if (candidates.length){
            new_tiles.push(candidates[0])
        }
        else{
            console.error('no candidates...')
            return og_target
        }
    }
    return new_tiles
}


var og_unk4 = [0, 0, 0, 1, 0, 0, 3]

function randomize_header(my_l, world_metadata, options){
    var new_pal_a = ~~(Math.random() * 6)
    var new_pal_b = ~~(Math.random() * 3)
    var header_json = my_l.header
    var world = my_l.world
    my_l.header.pala = new_pal_a
    my_l.header.palb = new_pal_b
    header_json.unk3 = ~~(Math.random() * 7)
    header_json.unk4 = og_unk4[world]

}


function equalize_header(my_l, world_metadata){
    console.debug(my_l.world, my_l.level, my_l.room)
    var header_json = my_l.header
    var world = my_l.world
    if (header_json.unk3 == 7)
        header_json.unk3 = my_l.world
    header_json.unk4 = og_unk4[world]

    if (world == 3){
        var my_o = my_l.objs
        var waterfalls = my_l.objs.filter(function(ele){return ele.obj_type >> 4 == 0xF})
        var whales = my_l.objs.filter(function(ele){return ele.obj_type >> 4 == 0xb })
        if (whales.length > 0){
            for (var w of whales){
                if (w === undefined)
                    continue
                w.obj_type = w.obj_type + 0x10
                header_json.unk4 = 2
                header_json.unk3 = 3
                console.debug('whale confirm')
            }
        }
        if (waterfalls.length > 0){
            for (var w of waterfalls){
                if (w === undefined)
                    continue
                w.obj_type = w.obj_type - 0x40
                header_json.unk4 = Math.max(header_json.unk4, 1)
                console.debug('ice confirm')
            }
        }
    }

    var new_world = header_json.unk3
    // convert into chart
    if (new_world != my_l.world){
        if (my_l.world == 4) {
            var my_o = my_l.objs
            var brick_walls = my_l.objs.filter(function(ele){return ele.obj_type == 31})
            if (brick_walls.length > 0)
                for (var w of brick_walls){
                    if (w === undefined)
                        continue
                    w.obj_type = 14
                }
        }
        if (new_world == 6){
            var my_o = my_l.objs
            var brick_walls = my_l.objs.filter(function(ele){return ele.obj_type == 24})
            if (brick_walls.length > 0)
                for (var w of brick_walls){
                    if (w === undefined)
                        continue
                    w.obj_type = 14
                }
        }

        var my_h_gt = header_json.ground_type
        if (my_h_gt == undefined) header_json.ground_type = 0
        else header_json.ground_type = repair_ground_type(header_json, my_h_gt, world, new_world, world_metadata)

        var new_ground_types = []
        var my_g = my_l.grounds
        for(var g of my_g){
            var my_h_gt = g.ground_type
            if (my_h_gt == undefined) new_ground_types.push(undefined)
            else new_ground_types.push(repair_ground_type(header_json, my_h_gt, world, new_world, world_metadata))
        }

        for(var g in new_ground_types){
            my_g[g].ground_type = new_ground_types[g]
        }


        for (var e of my_l.enemies){
            if ([0x8, 0x18, 0x19, 0x26].includes(e.obj_type)){
                if ([0x18, 0x19].includes(e.obj_type))
                    if (!(new_world == 1 || new_world == 5))
                        e.pos_y -= 3
                    else continue
                else if (new_world == 1 || new_world == 5)
                    e.pos_y += 2
                if (new_world == 0)
                    e.obj_type = 0x8
                if (new_world == 1)
                    e.obj_type = 0x19
                if (new_world == 2)
                    e.obj_type = 0x8
                if (new_world == 3)
                    e.obj_type = 0x26
                if (new_world == 4)
                    e.obj_type = 0x8
                if (new_world == 5)
                    e.obj_type = 0x19
                if (new_world == 6)
                    e.obj_type = 0x9
            }
            if ([0x1a].includes(e.obj_type)){
                if (new_world == 0)
                    e.obj_type = 0x9
                if (new_world == 2)
                    e.obj_type = 0x9
                if (new_world == 4)
                    e.obj_type = 0x9
            }
            if ([0x29].includes(e.obj_type)){
                if ([0,2,4].includes(new_world))
                    e.obj_type = 0x9
            }
        }
    }
}


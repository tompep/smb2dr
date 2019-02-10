
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
                {"name": "Randomize World Appearance", "desc": "Randomize palette/tiles/music and enemies (possible softlocks unknown)",
                    "val": [ "Do Not Randomize", "Per World", "Per Level", "Per Room"
                    ]},
                {"name": "Randomize Music", "desc": "Music Randomization",
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
            "options": []
        }
    ],
    "Character Randomization": [
        {
            "name": "Default",
            "options": 
                [
                    {"tag": "Starting Characters", "class": "wide", "options": [
                        {"name": "Mario", "desc": "Start with character 1",
                            "val": true},
                        {"name": "Luigi", "desc": "Start with character 2",
                            "val": true},
                        {"name": "Toad", "desc": "Start with character 3",
                            "val": true},
                        {"name": "Peach", "desc": "Start with character 4",
                            "val": true}
                    ]},
                    {"name": "Character Lock", "desc": "Restrict choice of character (incompatible with Rescue)",
                        "val": [ "No Locking", "Per World", "Per Level", "Per Room" 
                        ]},                
                    {"name": "Change Character on Death", "desc": "Gives character select screen on life lost",
                        "val": false, "class": "mem_location", "mem_loc_name": "CharSelectDeath"},
                    {"name": "Change Character at any time", "desc": "Switch character any time (Select+LR)",
                        "val": false, "class": "mem_location", "mem_loc_name": "CharSelectAnytime"},
                    {"name": "Elimination Mode", "desc": "Gives each character it's own lives, and removes a character from the game when out of lives",
                        "val": false, "class": "mem_location", "mem_loc_name": "IndependentLives"},
                    {"name": "Independent Player Powerups", "desc": "Upgrades are only for individual characters",
                        "val": false, "class": "mem_location", "mem_loc_name": "IndependentPlayers"},
                    {"name": "Add Rescue Items", "desc": "Adds items to rescue lost characters",
                        "val": false},
                    {"name": "Starting Gift", "desc": "Gives a random upgrade to each character",
                        "val": false}
                ]
        }
    ],
    "Object Randomization": [
        {
            "name": "Default",
            "options": 
                [
                    {"name": "Enemy Randomization (early)", "desc": "Simple enemy randomizer (hard)",
                        "val": false},
                    {"name": "Autospawn Potion Door", "desc": "Spawns a door where mushrooms exist",
                        "val": false},
                    {"name": "Randomize Mushroom Locations", "desc": "Completely randomizes mushroom locations",
                        "val": false},
                    {"name": "Boss Drops", "desc": "Bosses will drop something on death",
                        "val": [ "Nothing", "Always Mushroom", "Subspace Item Pool" ]},                
                    {"name": "Mushrooms", "desc": "Number of mushrooms in Subspace pool",
                        "val": "4"},
                    {"name": "Mushroom Fragments", "desc": "Number of mushrooms in Subspace pool",
                        "val": "16"},
                    {"name": "Powerups", "desc": "Number of powerups in Subspace pool",
                        "val": "16"},
                    {"name": "Upgrades", "desc": "Number of upgrades in Subspace pool",
                        "val": "13"},
                    {"name": "Common Items", "desc": "Number of common items in Subspace pool",
                        "val": "8"},
                    {"name": "Crystals", "desc": "Number of crystals in Subspace pool",
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
                        "mem_loc_name": "ResetHealth", "min": 0, "max": 14}
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

function starting_seed() {
    if (Math.seedrandom)
        Math.seedrandom((new Date()).toUTCString().split(' ').slice(0, 4).join(' '))
    $('#seed').val(rand_seed());
}

starting_seed()
$('#seed').attr('maxlength', 10);

function handle_boss_options(my_levels, options){
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
                    loc_r: 0xF7,
                    contents: [parseInt(~~(Math.random() * (rmmax - rmmin))) + parseInt(rmmin)]
                })
                continue
            }

        }
        if (rboss){
            var boss = my_l.enemies.filter(function(ele){ return ele.obj_type >= 0x5c })
            if (boss.length){
                my_l.modifiers.push({
                    loc_l: 0x76,
                    loc_r: 0xF7,
                    contents: [parseInt(~~(Math.random() * (rmax - rmin))) + parseInt(rmin)]
                })
                continue
            }
        }
    }

}

function level_order_randomizer(my_levels, my_rom, mem_locs, options, info){
    /* take set of levels and randomizer
     *
     */
    console.log('Level Randomizer')

    console.log(options)

    var LevelStart = mem_locs['Data_StartLevel'] + 0x10
    var WinLevel = mem_locs['WinLevel'] + 0x10

    var level_sets = [] 
    Array.split([...my_levels], 10).map(x => !x.every(y => y == undefined) ? level_sets.push(x) : x) 

    var game_scale = options['GameScale']
    console.debug(level_sets)
    while(game_scale > 0 && level_sets.length > game_scale){
        var target_num = ~~(Math.random() * level_sets.length)
        level_sets.splice(target_num, 1)
        console.log(target_num, level_sets)
    }
    console.debug(level_sets)
    var all_levels = [].concat.apply([], level_sets)

    if (options['ShuffleType'] == 'World_Order_Randomizer'){
        var world_sets = Array.split(level_sets, 3)
        if (options['ScrambleWorld'])
            world_sets = shuffle(world_sets).map(x => shuffle(x))
        else 
            world_sets = shuffle(world_sets)
        level_sets = [].concat.apply([], world_sets)
    }
    else if(options['ShuffleType'] == 'Level_Order_Randomizer'){
        level_sets = shuffle(level_sets) 
    }
    else if(options['ShuffleType'] == 'Simple_Door_Randomizer'){
        level_sets = shuffle(level_sets) 

        for (var i = 0; i < 3; i++)
        {
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

    var boss_rooms = []
    for (var l of my_levels){
        if (l != undefined){
            var isBoss = l.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0
            if (isBoss) boss_rooms.push(l)
        }
    }
    
    Math.seedrandom(rando_seed)

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

    console.log('Stringing levels together')
    for(var n in level_sets){
        console.debug('level_sets', n)
        n = parseInt(n)
        var set = level_sets[n]


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

        var next_set = level_sets[n + 1]
        if (next_set == undefined){
            next_set = level_sets[0]
            console.error('End of sets, loop to beginning', n + 1)
        }
        if (next_set[0] == undefined){
            next_set = level_sets[n + 2]
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


        if (n % 3 == 2 || n == level_sets.length - 1){
            console.log('boss')
            var boss_room = boss_rooms[0]
            boss_rooms = boss_rooms.slice(1)

            if (n == level_sets.length - 1)
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

    my_rom[LevelStart] = level_sets[0][0].world * 3 + level_sets[0][0].level
    my_rom[LevelStart + 1] = level_sets[0][0].room
    my_rom[LevelStart + 2] = level_sets[0][0].page
    my_rom[LevelStart + 3] = 0
    my_rom[WinLevel] = last_boss.world * 3 + last_boss.level

    return all_levels

}

var ne = enemyEnum

var post_enemy_changes = { }


var shuffle_enemy_data = [
    { 
        targets: [ne.ShyguyPink, ne.ShyguyRed, ne.Tweeter, ne.Porcupo,
            ne.NinjiRunning, ne.SnifitRed, ne.SnifitPink, ne.BobOmb, ne.FryguySplit],
        additional: [ne.JarGeneratorShyguy, ne.JarGeneratorBobOmb, ne.SnifitGray, ne.NinjiJumping, ne.Birdo, ne.BeezoStraight, ne.BeezoDiving],
        process: function (extra=[]) { return Array.pick_random(this.targets.concat(this.additional).concat(extra)) }
    },
    { 
        targets: [ne.Spark1, ne.Spark2, ne.Spark3, ne.Spark4],
        process: function () { return Array.pick_random(this.targets) }
    },
    { 
        targets: [ne.SnifitGray, ne.NinjiJumping, 
            ne.PanserStationaryFiresAngled, ne.PanserStationaryFiresUp],
        process: function () { return Array.pick_random(this.targets) }
    },
    { 
        targets: [ne.FallingLogs],
        additional: [ne.Trouter, ne.FallingLogs],
        process: function () { return Array.pick_random(this.targets).concat(this.additional) }
    },
    { 
        targets: [ne.BossMouser], 
        additional: [ne.BossPanserWalking, ne.BossMouser, ne.BossMouser],
        process: function () { return Array.pick_random(this.targets.concat(this.additional)) } 
    },

]

function enemy_randomizer(my_levels, my_rom, mem_locs, meta_info, my_options){
    for (var my_l of my_levels){
        if (my_l == undefined)
            continue
        for (var e of my_l.enemies){
            for (var rule of shuffle_enemy_data){
                if (rule.targets.includes(e.obj_type)) {
                    var prev_type = e.obj_type
                    e.obj_type = rule.process()
                    if(e.obj_type == ne.Birdo) e.pos_y--
                    if(e.obj_type == ne.JarGeneratorShyguy || e.obj_type == ne.JarGeneratorBobOmb){
                        my_l.objs.push( create_smb_object(objEnum.Jar_small, 
                        e.pos_x, e.pos_y, e.pos_page, 1) )
                        var options = [ne.Fireball, ne.Heart, ne.VegetableSmall]
                        var attack = rule.process(options) 
                        while([ne.JarGeneratorShyguy, ne.JarGeneratorBobOmb].includes(attack))
                            attack = rule.process(options) 
                        my_l.hotspots.push ({
                            pos_x: e.pos_x,
                            pos_y: e.pos_y,
                            pos_page: e.pos_page,
                            contents: [attack, 0x00, 0x45]
                        })
                    } 
                    if(e.obj_type == ne.BeezoDiving) e.pos_y = 2
                    if(prev_type == ne.BossMouser) {
                        my_l.enemies.push( create_smb_enemy(ne.JarGeneratorShyguy, 
                        e.pos_y+2, e.pos_x, e.pos_page, my_l.vertical) )
                    }
                    break
                }
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


var power_up_start = 17 
var cont_start = 22
var lock_start = 23 
var frag_start = 27 
var junk_start = 28
var crystal_start = 35

var upgrade_names = all_item_names.slice(1, 14)

var powerup_names = all_item_names.slice(power_up_start, cont_start)

var continue_names = all_item_names.slice(cont_start, lock_start) 

var unlock_names = all_item_names.slice(lock_start, frag_start) 

var fragment_names = all_item_names.slice(frag_start, junk_start) 

var junk_items = all_item_names.slice(junk_start, crystal_start)

var crystal_items = all_item_names.slice(crystal_start)


function item_randomizer(my_levels, my_rom, mem_locs, meta_info, options){
    console.log('Item Randomizer')
    var inventory = Array(parseInt(options['Mushrooms'].val)).fill(0)

    var upgrades = shuffle(Array.range(upgrade_names.length, 1))
    while (upgrades.length < options['Upgrades'].val)
        upgrades = upgrades.concat(shuffle(Array.range(upgrade_names.length, 1)))
    upgrades = upgrades.slice(0, options['Upgrades'].val)

    var powerups = Array(parseInt(options['Powerups'].val)).fill(0).map(
        (x, y) => ~~(Math.random() * powerup_names.length) + power_up_start)
    var common = Array(parseInt(options['Common_Items'].val)).fill(0).map(
        (x, y) => ~~(Math.random() * (junk_items.length)) + junk_start)

    if(options['Add_Rescue_Items'].checked || options['Rescue_All_Characters'].checked){
        var unlocks = shuffle([...unlock_names.keys()]).map(x => x + lock_start)
        inventory.unshift(...unlocks)
    }

    Array(parseInt(options['Mushroom_Fragments'].val)).fill(invEnum.Mushroom_Fragment).map(x => inventory.push(x))
    Array(parseInt(options['Crystals'].val)).fill(invEnum.Crystals).map(x => inventory.push(x))
    // can't just treat crystals as is, can only have one per room
    // consider boss pools

    inventory = inventory.concat(upgrades)
    inventory = inventory.concat(powerups)
    inventory = inventory.concat(common)

    console.log('Initial inventory', inventory.map(x => all_item_names[x]))
    
    var horizontal_levels = my_levels.filter(x => (x != undefined && !x.header.vertical &&
        x.is_jar == 0 && !(x.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0)))
    var mush_counts = Array(my_levels.length).fill(0)

    if (!options['Randomize_Mushroom_Locations'].checked){
        for (var my_l of horizontal_levels){
            var l = my_l.i
            mush_counts[l] = my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45)).length
        }
    }
    else{
        for (var my_l of horizontal_levels){
            var l = my_l.i
            mush_counts[l] = 0
            my_l.objs = my_l.objs.filter(x => !(x.obj_type == 43 || x.obj_type == 45))
        }
    }

    var mush_sum = mush_counts.reduce( (a, b) => a + b ) 
    
    if (inventory.length > horizontal_levels.length * 2){
        for (var my_l of horizontal_levels){
            var l = my_l.i
            mush_counts[l] = 2
        }
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

    while (inventory.length < mush_sum)
        inventory.push(invEnum.Coin)
    inventory = inventory.slice(0, mush_sum)
    console.log('Final inventory', inventory.map(x => all_item_names[x]))
    inventory = shuffle(inventory)

    for (var my_l of my_levels){
        if (my_l == undefined)
            continue
        var rendered = render_level(my_l, my_l.header, my_l.enemies, meta_info)
        var columns = get_valid_columns(rendered).filter(x => 
            rendered[x.pos_page][x.pos_y-1][x.pos_x].obj_type == 0x40 &&
            x.space > 2)

        var targets = my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45))

        if (!my_l.header.vertical){
            var isBoss = my_l.enemies.filter(function(ele){return ele.obj_type > 0x5C}).length > 0
            if (!isBoss && my_l.is_jar == 0){
                var my_columns = shuffle(columns)
                for (var i = targets.length; i < mush_counts[my_l.i]; i++){
                    var target = my_columns[0]
                    if (target == undefined)
                        break
                    var lx = target.pos_x
                    var ly = target.pos_y - 1
                    var lpage = target.pos_page
                    var new_door = create_smb_object(43, lx, ly-1, lpage, 1)
                    my_l.objs.push(new_door)
                    new_door = create_smb_object(15, lx, ly, lpage, 1) // rebalance this
                    my_l.objs.push(new_door)
                    my_columns = shuffle(my_columns.slice(1))
                    for (var em of my_l.enemies.filter(x => x.pos_x == lx && x.pos_page == lpage))
                        em.pos_x = em.pos_x + (Math.random() > 0.50 ? -1 : 1)
                }
            }
        }

        targets = my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45))

        for(var i in targets){
            targets[i].obj_type = 43 + 2*i
        }


        if (options['Autospawn_Potion_Door'].checked){
            for (var pos of targets){
                my_l.enemies.push(create_smb_enemy(60, pos.pos_y - 1, pos.pos_x, pos.pos_page))
            }
        }

        var level_inventory = inventory.slice(0, targets.length)
        if(level_inventory.length > 0){
            my_l.modifiers.push({
                loc_l: 0x76,
                loc_r: 0x00,
                contents: level_inventory,
                length: level_inventory.length,
                repeat: false,
                vertical: false
            })
        }
        inventory = inventory.slice(targets.length)
        return

        my_l.objs = my_l.objs.filter(x => !(x.obj_type >= 32 && x.obj_type < 46))
        my_l.objs = my_l.objs.filter(x => ![0x50].includes(x.obj_type & 0xF0))
        my_l.objs = my_l.objs.filter(x => ![0, 1, 4, 6, 7, 8].includes(x.obj_type))
        var rendered = render_level(my_l, my_l.header, my_l.enemies, meta_info)
        for(var page of rendered){
            for(var y of page){
                for(var x of y){
                    if([0x98, 0x9a].includes(x.obj_type)) {
                        console.log(x.owner)
                        console.log(my_l.modifiers.findIndex(y => y.owner == x.owner))
                    }
                }
            }
        }

        // remove all non-essential enemies
        // my_l.enemies = my_l.enemies.filter(x => x.obj_type >= 0x32 || [0x12, 0x1c, 0x2d].includes(x.obj_type))

        // first pass
        for(var i = 0; i < 5; i++){
            // function get patch
            var my_columns = shuffle(columns)
            var target = my_columns[0]
            if (target == undefined)
                continue
            var patch_length = 3
            var patch_spots = []
            my_columns = my_columns.filter(x => 
                x.pos_y == target.pos_y &&
                x.pos_x < target.pos_x + patch_length &&
                x.pos_x > target.pos_x - patch_length &&
                rendered[x.pos_page][x.pos_y-1][x.pos_x].obj_type == 0x40).sort (
                    function(a, b){
                        return a.pos_x - a.pos_x
                    }
                )
            target = my_columns[0]
            var lx = target.pos_x
            var ly = target.pos_y - 1
            var lpage = target.pos_page
            var new_door = create_smb_object(0x50 + my_columns.length, lx, ly, lpage, 1)
            my_l.objs.push(new_door)

        }
    }
    if (inventory.length > 0)
        console.log('Inventory still present', inventory.map(x => all_item_names[x]))
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
    var locking = option_vals['Character_Lock'].radio
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

    var r_header = option_vals['Character_Lock'].radio
    var character = 0xf
    var segments = []
    if (r_header == 'Per World')
        segments = Array.split(info.my_levels, 30)
    else if (r_header == 'Per Level')
        segments = Array.split(info.my_levels, 10)
    else if (r_header == 'Per Room')
        segments = Array.split(info.my_levels, 1)
    else
        console.log('No Character Locking...')
    for(var s of segments){
        character = shuffle(character_pool)[0]
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



/// helper
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = ~~(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

////// 
////// create functions
//
// inverse

function inverse_level(my_l, all_levels){
    // needs inverse ground_set hack
    var my_level = my_l.objs
    var my_ptrs = my_l.ptrs
    var my_grounds = my_l.grounds
    var my_e = my_l.enemies
    var my_h = my_l.header
    var new_lvl = []
    var new_ptrs = []
    var new_grounds = []
    var new_enemies = []

    for (var cur_obj of my_level){
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
        my_l.ptrs.map(x => x.pos_page = Math.abs(x.pos_page - my_l.header.pages))
        var change_ptrs = all_levels.filter(x => x != undefined).map(x => x.ptrs.filter(y => 
            y.world == my_l.world &&
            y.level == my_l.level &&
            y.room == my_l.room))
        for (var p of change_ptrs){
            for (var ptr of p)
                ptr.dest_page = Math.abs(ptr.dest_page - my_l.header.pages)
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
        var new_enemy = create_smb_enemy(enemy.obj_type, enemy.pos_y, new_x, new_page, my_l.vertical)
        new_enemies.push(new_enemy)
    }

    my_l.enemies = new_enemies

    // have to properly swap positions for grounds
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

function create_room_node(level, header, enemies, meta_info){
    // strip doors
    var max_doors = 0
    var my_objs = level.objs
    var my_ptrs = level.ptrs
    var my_grounds = level.grounds
    var my_edges = []
    var world = header.unk3
    if (world == 7)
        world = level.world

    // remove doors
    var removeable_door_types = obj_doors.slice(0, obj_doors.length-3).concat([35])
    var my_door_objs = my_objs.filter(function (ele){ return removeable_door_types.includes(ele.obj_type) })
    var my_vase = my_objs.filter(function (ele){ return obj_vase_ptr.includes(ele.obj_type) })
    // my_vase.push(...my_objs.filter(function (ele){ return obj_rocket.includes(ele.obj_type) }))
    my_objs = my_objs.filter(function (ele){ return !removeable_door_types.includes(ele.obj_type) })
    level.objs = my_objs

    // remove pointers from doors
    for (var i in my_ptrs){
        if (my_ptrs[i] == undefined) continue
        my_ptrs[i].l_byte = 0
        my_ptrs[i].r_byte = 0
        var targetDoor = my_door_objs.filter(function(ele){ return ele.pos_page == my_ptrs[i].pos_page })
        if (targetDoor.length > 0)
            my_ptrs[i] = undefined
    }

    // get good object for positions
    var good_positions = []
    
    for (var i of my_door_objs){
        good_positions.push(i)
    }

    var real_ptrs = my_ptrs.filter(function(ele){return ele != undefined})

    var rendered = render_level(level, header, enemies, meta_info)

    var columns = get_valid_columns(rendered)

    var column_pages = new Set(columns.map(x => x.pos_page))

    if (my_vase.length > 0){
        var vase_page = new Set(my_vase.map(x => x.pos_page))
        for (var vase of vase_page) 
            column_pages.delete(vase)
    }

    max_doors = column_pages.size

    var node = {
        level: level,
        rendered: rendered,
        columns: columns,
        column_pages: column_pages,
        candidates: good_positions,
        max_doors: max_doors,
        out: []
    }
    return node
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

function compare_ground_type (){}

function repair_ground_type (my_h, og_gt, og_world, new_world, world_metadata){
    if (Array.isArray(og_gt)){
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
    
    /*
    for (var tiles_num in all_tiles){
        var tiles = all_tiles[tiles_num]
        for (var i=0; i < tiles.length; i++){
            if (is_tile_solid(tiles[i]) != is_tile_solid(og_target[i]))
                break
            else if (i == 3){
                console.log('ok we found it?', world, new_world, og_gt, tiles_num)
                console.log(tiles.map(x => is_tile_solid(x)), 'matches', og_target.map(x => is_tile_solid(x)))
                return parseInt(tiles_num)
            }
        }
    }
    console.log('uh oh')
    */


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
    header_json.unk3 = ~~(Math.random() * 6)
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


function connect_nodes(l, r, one_way=false){
    l.out.push(r)
    r.out.push(l)
}

function create_doors(l, used=[]){
    console.log(l.level.world, l.level.level, l.level.room)
    for (var r of l.out){
        console.log(l.level.world, l.level.level, l.level.room, 'going to', r.level.world,r.level.level,r.level.room)
        if (used.includes(r)){
            console.log('used')
            continue
        }
        var columns = shuffle(l.columns.filter(function(ele){return ele.space > 3}))
        var r_columns = shuffle(r.columns.filter(function(ele){return ele.space > 3}))

        if(columns.length == 0 || r_columns.length == 0)
            continue
        var target = columns[0]
        var lx = target.pos_x
        var ly = target.pos_y - 2
        var lpage = target.pos_page
        l.columns = l.columns.filter(function(ele){return ele.pos_page != lpage})
        
        if (l.level.ptrs[lpage] == undefined){
            var new_door = create_smb_object(0xa, lx, ly, lpage, 1)
            l.level.objs.push(new_door)
            if(target.tile_type.solidity == 1){
                var new_door = create_smb_object(0x2, lx, ly+2, lpage, 1)
                l.level.objs.push(new_door)
            }
        }

        var target = r_columns[0]
        var rx = target.pos_x
        var ry = target.pos_y - 2 
        var rpage = target.pos_page
        r.columns = r.columns.filter(function(ele){return ele.pos_page != rpage})

        if (r.level.ptrs[rpage] == undefined){
            var new_door = create_smb_object(0xa, rx, ry, rpage, 1)
            r.level.objs.push(new_door)
            if(target.tile_type.solidity == 1){
                var new_door = create_smb_object(0x2, rx, ry+2, rpage, 1)
                r.level.objs.push(new_door)
            }
        }

        var new_ptr = extract_door_ptr((r.level.world * 3) + r.level.level, (r.level.room << 4) + rpage)
        new_ptr.pos_page = lpage
        var r_new_ptr = extract_door_ptr((l.level.world * 3) + l.level.level, (l.level.room << 4) + lpage)
        r_new_ptr.pos_page = rpage
        
        l.level.ptrs[lpage] = new_ptr
        r.level.ptrs[rpage] = r_new_ptr
        used.push(l)
        used.push(r)
        create_doors(r, used)
    }
}

function extendRandom2(free_nodes, boss_nodes, odd_nodes){
    var free_node_begin = free_nodes[1]
    free_nodes = free_nodes.slice(1)
    var new_nodes = shuffle(free_nodes)
    for (var boss of boss_nodes){
        console.log('boss', boss)
        var path = new_nodes.slice(0,7)
        while (!path.every(x => x.max_doors >= 2)){
            new_nodes = shuffle(new_nodes)
            path = new_nodes.slice(0,7)
            console.log('reset')
        }
        console.log('ok', path, new_nodes, boss.level.world)
        new_nodes = new_nodes.slice(7)
        for (var i = 0; i < path.length; i++){
            console.log(path[i])
            if (i < path.length - 1) connect_nodes(path[i], path[i+1])
            else {
                connect_nodes(path[i], boss)        
            }
        }
        connect_nodes(free_node_begin, path[0])
    }
    create_doors(free_node_begin)
}



// No Level Randomization
                        
var rando_seed = ''

function set_memory_location(my_rom, mem_locs, name, values, offset=0){
    console.debug(name, values.length, values, offset)
    if (!offset)
        offset = 0

    var Location = mem_locs[name]
    if (Location){
        Location = Location + 0x10 + offset
        console.debug(Location)
        for(var i = 0; i < values.length; i++){
            values[i] = values[i] === true ? 1 : (values[i] === false ? 0 : parseInt(values[i]))
            console.debug(my_rom[Location + i])
            my_rom[Location + i] = values[i]
            console.debug(my_rom[Location + i])
        }
    }
    else {
        console.error('Mem loc not found for writing', name)
    }
}

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
    console.log(rboss, rmboss, rmin, rmax, rmmin, rmmax, 'pizzatime')
    if (!rboss && !rmboss) return
    for (var my_l of my_levels){
        if (my_l == undefined)
            continue
        if (rmboss){
            var mini_boss = my_l.enemies.filter(function(ele){ return [0x1c, 0x2d].includes(ele.obj_type) })
            if (mini_boss.length){
                my_l.modifiers.push({
                    loc_l: 0x76,
                    loc_r: 0xF7,
                    contents: [parseInt(Math.floor(Math.random() * (rmmax - rmmin))) + parseInt(rmmin)]
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
                    contents: [parseInt(Math.floor(Math.random() * (rmax - rmin))) + parseInt(rmin)]
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

    var level_sets = split_em([...my_levels], 10) 
    if (options['ShuffleType'] == 'World_Order_Randomizer'){
        var world_sets = split_em(level_sets, 3)
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
            var targets = shuffle([...my_levels])
            targets = targets.filter(x => x != undefined)
            targets = targets.filter(x => x.is_jar == 0)
            targets = targets.filter(x => !(x.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0))
            targets = split_em(targets, 2)

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

                console.log(new_door, r_new_door)

                var new_ptr = create_ptr_wlrp(rl.world, rl.level, rl.room, rpage, lpage)
                var r_new_ptr = create_ptr_wlrp(ll.world, ll.level, ll.room, lpage, rpage)

                console.log(new_ptr, r_new_ptr)

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
                var index = (Math.floor(Math.random() * 6))
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

    for(var n in level_sets){
        console.log('level_sets', n)
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
        var next_level_start = next_set[0]
        var end_eagle = current_level_end.enemies.filter( 
            function(ele){return [0x42, 0x43, 0x2d].includes(ele.obj_type)})[0]
        var start_eagle = next_level_start.enemies.filter( 
            function(ele){return [0x42, 0x43, 0x2d].includes(ele.obj_type)})[0]

        var target_ptr = -1
        var ptrs = current_level_end.ptrs
        target_ptr = ptrs.findIndex(x => x.pos_page == end_eagle.pos_page)
        target_ptr = target_ptr > 0 ? target_ptr : ptrs.length


        if (n % 3 == 2 || n == 0x13){
            console.log('boss')
            var boss_room = boss_rooms[0]
            boss_rooms = boss_rooms.slice(1)

            var boss = boss_room.enemies.filter(
                function(ele){return ele.obj_type > 0x5C})[0]

            current_level_end.ptrs[target_ptr] = create_ptr_wlrp(
                boss_room.world, boss_room.level, boss_room.room, 0, end_eagle.pos_page)

            var ptrs = boss_room.ptrs
            target_ptr = boss_room.ptrs.findIndex(x => x.pos_page == boss.pos_page)
            target_ptr = target_ptr > 0 ? target_ptr : ptrs.length

            boss_room.ptrs[target_ptr] = create_ptr_wlrp(
                next_level_start.world, next_level_start.level, next_level_start.room, 
                (start_eagle != undefined ? start_eagle.pos_page : 0), boss.pos_page ) 
            boss_room.ptrs[target_ptr].continue_after = true
            boss_room.ptrs[target_ptr].reset_pos_after = true
            boss_room.ptrs[target_ptr].slots_after = true
        }
        else {
            console.log('no boss')

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

}

var upgrade_names = [
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
]

var power_up_start = upgrade_names.length + 3

var powerup_names = [
        'Fire Flower', 
        'Egg Thrower', 
        'Bomb Thrower', 
        'Phanto Buddy', 
        'Fry Buddy', 
]

var cont_start = power_up_start + powerup_names.length

var continue_names = [
        'Continue Up'
]

var lock_start = cont_start + 1

var unlock_names = [
        'Unlock Mario', 
        'Unlock Luigi', 
        'Unlock Toad', 
        'Unlock Peach',
]

var junk_start = unlock_names.length + lock_start

var junk_items = [
        'Key', 
        'Coin', 
        'Shell', 
        'Life', 
        'Star', 
        'Stopwatch', 
        'Crystals' 
]

function item_randomizer(my_levels, my_rom, mem_locs, meta_info, options){
    console.log('Item Randomizer')
    var inventory = Array(parseInt(options['Mushrooms'].val)).fill(0)

    var upgrades = shuffle([...upgrade_names.keys()])
    while (upgrades.length < options['Upgrades'].val)
        upgrades = upgrades.concat(shuffle(upgrades))
    upgrades = upgrades.slice(0, options['Upgrades'].val)

    var powerups = Array(parseInt(options['Powerups'].val)).fill(0).map(
        (x, y) => Math.floor(Math.random() * powerup_names.length) + power_up_start)
    var common = Array(parseInt(options['Common_Items'].val)).fill(0).map(
        (x, y) => Math.floor(Math.random() * (junk_items.length - 1)) + junk_start)

    if(options['Add_Rescue_Items'].checked || options['Rescue_All_Characters'].checked){
        var unlocks = shuffle([...unlock_names.keys()]).map(x => x + lock_start)
        console.log(unlocks)
        inventory = inventory.concat(unlocks)
    }

    inventory = inventory.concat(upgrades)
    inventory = inventory.concat(powerups)
    inventory = inventory.concat(common)

    console.log(inventory, upgrades, powerups, common)
    
    var horizontal_levels = my_levels.filter(x => (x != undefined && !x.header.vertical &&
        (x => !(x.enemies.filter( function(ele){return ele.obj_type > 0x5C}).length > 0))))
    var mush_counts = Array(my_levels.length).fill(0)

    if (!options['Randomize_Mushroom_Locations'].checked){
        for (var my_l of horizontal_levels){
            var l = my_l.i
            mush_counts[l] = my_l.objs.filter(x => (x.obj_type == 43 || x.obj_type == 45)).length
        }
    }

    var mush_sum = mush_counts.reduce( (a, b) => a + b ) 
    
    if (inventory.length > horizontal_levels.length * 2){
        mush_counts = mush_counts.fill(2)
        inventory = inventory.slice(0, horizontal_levels.length * 2)
    }
    else {
        horizontal_levels = shuffle(horizontal_levels)
        var attempts = 3
        while(attempts--) {
            for (var my_l of horizontal_levels){
                var i = my_l.i
                var count_up = Math.floor(Math.random() * 3)
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
    console.log(horizontal_levels, inventory, mush_counts, mush_sum)

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
            if (!isBoss){
                var my_columns = shuffle(columns)
                for (var i = targets.length; i < mush_counts[my_l.i]; i++){
                    var target = my_columns[0]
                    if (target == undefined)
                        break
                    var lx = target.pos_x
                    var ly = target.pos_y - 1
                    var lpage = target.pos_page
                    var new_door = create_smb_object(43, lx, ly, lpage, 1)
                    my_l.objs.push(new_door)
                    my_columns = my_columns.slice(1)
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

        var level_inventory = inventory.slice(0, targets.length).filter(x => x != 0)
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
        continue
        if (options['Randomize Enemies']){}
        if (options['Randomize Enemies']){}
        if (options['Randomize Enemies']){}
        if (options['Randomize Enemies']){}
        if (options['Randomize Enemies']){}
        if (options['Randomize Enemies']){}
        if (options['Randomize Enemies']){}
        if (options['Randomize Enemies']){}
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

        my_l.enemies = my_l.enemies.filter(x => x.obj_type >= 0x32 || [0x12, 0x1c, 0x2d].includes(x.obj_type))

        // first pass
        var rendered = render_level(my_l, my_l.header, my_l.enemies, meta_info)
        var columns = get_valid_columns(rendered).filter(x => 
            rendered[x.pos_page][x.pos_y-1][x.pos_x].obj_type == 0x40)
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
        console.log('Inventory still present', inventory)
}

var player_table = [1, 8, 2, 4]

function player_randomizer(my_levels, my_rom, mem_locs, meta_info, option_vals){
    console.log('Player Randomizer')
    console.log(option_vals['Character_Lock'])
    console.log(option_vals['Mario'], option_vals['Luigi'], option_vals['Toad'], option_vals['Peach'])
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
    var locking = Array(...option_vals['Character_Lock'].my_tag.elements).filter(x => x.checked)[0].value
    set_memory_location(my_rom, mem_locs,
        'CharLockVar', [lock_var], 0)
    console.log(character_pool, lock_var, locking)
    var level_sets = split_em(my_levels, 10).map(x => x.filter(y => y != undefined))
    
    var starting_gift = option_vals['Starting_Gift'].checked
    var maxed_up = option_vals['Maxed_Upgrades_(cheat)'].checked

    if (maxed_up){
        set_memory_location(my_rom, mem_locs,
            'StartingInventory',
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF])
    }
    else {
        set_memory_location(my_rom, mem_locs,
            'StartingInventory',
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
        if (starting_gift)
            for(var i = 0; i < 4; i++){
                var powerup = Math.floor(Math.random() * 13)
                set_memory_location(my_rom, mem_locs,
                    'StartingInventory',
                    [1 << (powerup % 8)],
                    i + 4 * (powerup >> 3))
            }
    }

    if (locking != 'No locking'){
        var world_sets = split_em(level_sets, 3)
        var character = 0xf
        for (var w of world_sets){
            if (locking == 'Per World')
                character = shuffle(character_pool)[0]
            for (var l of w){
                if (locking == 'Per Level')
                    character = shuffle(character_pool)[0]
                for (var r of l) {
                    if (locking == 'Per Room')
                        character = shuffle(character_pool)[0]
                    if (r != undefined){
                        r.modifiers.push({
                            loc_l: 0x00,
                            loc_r: 0x8f,
                            contents: [character]
                        })
                        // if not rescue...
                        r.modifiers.push({
                            loc_l: 0x7D,
                            loc_r: 0xE0,
                            contents: [[character].reduce((a, b) => a ^ (player_table[b]), 0xF)]
                        })
                    }
                }
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
        let index = Math.floor(Math.random() * counter);

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

function inverse_level(my_l){
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

    // bad
    while(my_l.ptrs.length < my_h.pages + 1) my_l.ptrs.push(undefined)

    if (!my_h.vertical) my_l.ptrs = my_l.ptrs.reverse()

    for (var index in my_l.ptrs){
        if (my_l.ptrs[index] != undefined)
            my_l.ptrs[index].pos_page = index // what about destinations?
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
        var new_enemy = create_smb_enemy(enemy.obj_type, enemy.pos_y, new_x, new_page)
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
    var new_pal_a = Math.floor(Math.random() * 6)
    var new_pal_b = Math.floor(Math.random() * 3)
    var new_music = Math.floor(Math.random() * 2)
    var header_json = my_l.header
    var world = my_l.world
    my_l.header.pala = new_pal_a
    my_l.header.palb = new_pal_b
    my_l.header.music = new_music
    var isBoss = my_l.enemies.filter(function(ele){return ele.obj_type > 0x5C}).length > 0
    if (my_l.is_jar > 0 || isBoss)
        return
    header_json.unk3 = Math.floor(Math.random() * 6)
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

function write_header_bytes(h){
    var byte1 = (h.horizontal << 7) + (h.unk1 << 6) + (h.pala << 3)
    byte1 += (h.unk2 << 2) + (h.palb)
    var byte2 = (h.unk3 << 5) + h.ground_set
    var byte3 = (h.pages << 4) + h.exterior_type
    if (!Array.isArray(h.ground_type))
        var byte4 = (h.unk4 << 6) + (h.ground_type << 3) 
    else
        var byte4 = (h.unk4 << 6) + (0 << 3) 
    byte4 += (h.unk5 << 2) + (h.music)
    
    return [byte1, byte2, byte3, byte4]
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
            if (Math.random() > 0.75)
                inverse_level(my_l)
            var result = create_room_node(my_l, my_h, my_e, meta_info)
            odd_nodes.push(result)
            console.log('this is odd')
        }
        else {
            if (Math.random() > 0.75)
                inverse_level(my_l)
            var result = create_room_node(my_l, my_h, my_e, meta_info)
            free_nodes.push(result)
            console.log('this is ok')
            console.log(result.max_doors, my_h.pages + 1)
        }
        equalize_header(my_l, meta_info.world_metadata)
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


function write_to_file (og_rom, my_levels, my_world_metadata){
    /*
     * Write level data to original ROM
     * Parameters: rom data, level js objects, world_metadata
     */
    var all_new_ptrs_l = [] 
    var all_new_ptrs_h = [] 
    var all_new_e_ptrs_l = [] 
    var all_new_e_ptrs_h = [] 
    var all_new_data = []
    var all_new_enmy = []
    var allcnt = 21 + 420
    var ecnt = 0xa500 + 84 + 420 - 0x8000
    var ptr_order = my_world_metadata.level_ptr_order
    var eptr_order = my_world_metadata.enemy_ptr_order
    for (var i = 0; i < my_levels.length + 10; i++){
        if (my_levels[i] === undefined || i >= 200){
            var new_ptr = 0x8000 + allcnt
            all_new_ptrs_h.push(new_ptr >> 8)
            all_new_ptrs_l.push(new_ptr % 256)
            var new_ptr = 0x8000 + allcnt
            all_new_e_ptrs_h.push(new_ptr >> 8)
            all_new_e_ptrs_l.push(new_ptr % 256)
            continue
        }
        if (i%30 == 0) console.log("world", i / 30)
        if (i%10 == 0) console.log("level", (i / 10) % 3)
        var my_l = my_levels[i]
        var my_h = my_l.header
        var my_e = my_l.enemies 

        var header_data = write_header_bytes(my_h)
        var enemy_data = write_enemy_bytes(my_e, my_h.pages + 1) 
        if (my_l.is_jar == 1)
            enemy_data = [1,1,1,1,1,1,1,1,1,1].concat(enemy_data)
        enemy_data.push(1)
        var level_data = write_level_bytes(my_l, ((i-(i%30))/30))
        // fs.writeFileSync("./levels-random/" + (((i-(i%30))/30)).toString() + "/" + i.toString() + ".json", JSON.stringify(my_l, undefined, 4))

        var new_ptr_level = 0x8000 + allcnt + all_new_data.length
        if (new_ptr_level + level_data.length + header_data.length > 0xa500){
            new_ptr_level = 0x8000 + ecnt + all_new_enmy.length 
            all_new_enmy.push(...header_data)
            all_new_enmy.push(...level_data)
        }
        else{
            all_new_data.push(...header_data)
            all_new_data.push(...level_data)
        } 
        all_new_ptrs_h.push(new_ptr_level >> 8)
        all_new_ptrs_l.push(new_ptr_level % 256)

        var new_ptr_enemy = 0x8000 + allcnt + all_new_data.length
        if (new_ptr_enemy + enemy_data.length  > 0xa500){
            new_ptr_enemy = 0x8000 + ecnt + all_new_enmy.length 
            all_new_enmy.push(...enemy_data)
        }
        else{
            all_new_data.push(...enemy_data)
        } 
        all_new_e_ptrs_h.push(new_ptr_enemy >> 8)
        all_new_e_ptrs_l.push(new_ptr_enemy % 256)
        
    }


    var final_bytes = [...ptr_order]
    console.log('len-og-s', final_bytes.length)
    final_bytes.push(...all_new_ptrs_l)
    console.log('len-og-s', final_bytes.length)
    while(final_bytes.length < allcnt - 210){
        final_bytes.push(0xFF)
    }
    final_bytes.push(...all_new_ptrs_h)
    console.log('len-og-s', final_bytes.length)
    while(final_bytes.length < allcnt){
        final_bytes.push(0xFF)
    }
    final_bytes.push(...all_new_data)
    console.log('padding', 0xa500 - final_bytes.length - 0x8000)
    console.log('len-og-s', final_bytes.length)
    console.log('len-level', final_bytes.length.toString(16))
    while(final_bytes.length < 0xa500 - 0x8000){
        final_bytes.push(0xFF)
    }
    console.log('len-og-s', final_bytes.length.toString(16))
    final_bytes.push(...eptr_order)
    console.log('len-og', final_bytes.length.toString(16))
    var h_pieces = []
    var l_pieces = []
    for(var i = 0; i < 210; i++) h_pieces.push(all_new_e_ptrs_h.slice(10*i, 10*i+10))
    for(var i = 0; i < 210; i++) l_pieces.push(all_new_e_ptrs_l.slice(10*i, 10*i+10))
    for(var i = 0; i < 21; i++){
        final_bytes.push(...h_pieces[i])
        final_bytes.push(...l_pieces[i])
    }
    console.log('len-lptr', final_bytes.length.toString(16))
    while(final_bytes.length < 0xa500 - 0x8000 + 420){
        final_bytes.push(0xFF)
    }
    console.log('len-ptr-pad', final_bytes.length.toString(16))
    final_bytes.push(...all_new_enmy)
    console.log('lenfinal', final_bytes.length.toString(16))
    while(final_bytes.length < 0x4000){
        final_bytes.push(0xFF)
    }
    console.log('lenfinal', final_bytes.length.toString(16))

    // bugs to fix
    // no doors on page0 column0
    // no doors on waterfalls/nonrocks
    // asm: rocket transitions
    // asm: pipes

    var offset = 0x10000 + 0x10
    for (var i = 0; i < final_bytes.length; i++) {
        og_rom[offset + i] = final_bytes[i]
    }

}

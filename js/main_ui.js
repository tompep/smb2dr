
function Main_UI(){
    this.main = $('div')

}

// start script
var startingRom
var currentRom

var currentPatch
var currentPatch_A

var mem_locs = {}

var info
var sprites

var presets = []



function read_info_file_info (targetRom){
    var crc32_rom = decimalToHexString(crc32(targetRom))
    console.log('CRC32: ' + crc32_rom)
    if (!smb2_crcs.includes(crc32_rom) && !smb2_crcs2.includes(crc32_rom)){
        console.log(targetRom.length)
        if (targetRom.length != 262160) {
            console.log('The size of this ROM seems incorrect... requires 262160 bytes')
            alert('This ROM is not of the correct SIZE')
            return false
        }
        else {
            console.log('This ROM has not been tested to patch, but we will attempt anyway')
            alert('This ROM is untested or not the correct game!')
            currentRom = patch_ips(targetRom, currentPatch_A)
            info = extract_all_info(currentRom, mem_locs)
            sprites = extract_graphics(currentRom.slice(0x20010))
            console.normal_log(info)
            console.normal_log(sprites)
            return true
        }
    }
    else{
        console.log(targetRom.length)
        if (smb2_crcs2.includes(crc32_rom))
            console.log('This ROM can be patched, but has not been fully tested')
        else
            console.log('This ROM can be patched')
        if (crc32_rom == smb2_crcs[0] || crc32_rom == smb2_crcs2[0]){
            currentRom = patch_ips(targetRom, currentPatch)
        }
        else if (crc32_rom == smb2_crcs[1] || crc32_rom == smb2_crcs2[1]){
            currentRom = patch_ips(targetRom, currentPatch_A)
        }
        info = extract_all_info(currentRom, mem_locs)
        sprites = extract_graphics(currentRom.slice(0x20010))
        console.normal_log(info)
        console.normal_log(sprites)
        return true
    }
}

var downloadURL = function(data, fileName) {
      var a
      a = document.createElement('a')
      a.href = data
      a.download = fileName
      document.body.appendChild(a)
      a.style = 'display: none'
      a.click()
      a.remove()
}

function randomize_rom(evt) {
    console.log('Randomizing ROM...')
    // patch
    rando_seed = $('#seed').val();

    // extract
    var option_tags = $('.option, .option_form, .option_select')
    var mem_loc_tags = $('.option.mem_location')

    var option_vals = {}
    option_tags.map(x => 
        option_vals[option_tags[x].id] = {
        val: option_tags[x].value, 
        checked: option_tags[x].checked,
        radio: $(option_tags[x]).find('input:checked').val()
    })

    Math.seedrandom(rando_seed)

    var r_header = option_vals['Randomize_World_Appearance'].radio
    if (r_header != 'Do Not Randomize'){
        for(var l of info.my_levels){
            if (l != undefined){
                var isBoss = l.enemies.filter(function(ele){return ele.obj_type > 0x5C}).length > 0
                if (l.is_jar > 0 || isBoss) continue
                randomize_header(l, info.meta_info.world_metadata)
            }
        }
    }

    Math.seedrandom(rando_seed)

    for(var l of info.my_levels){
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
                loc_r: 0xeb, 
                contents: [0x01]}) // curse
            var isBoss = l.enemies.filter(function(ele){return ele.obj_type > 0x5C}).length > 0
            if (Math.random() * 100 < (option_vals['Inverted_Rate'].val) && !isBoss){
                console.log('inverted...')
                inverse_level(l, info.my_levels)

            }
        }
    }

    Math.seedrandom(rando_seed)

    level_order_randomizer(info.my_levels, currentRom, mem_locs, {
        'ShuffleType': option_vals["Level_Randomization"].val,
        'BossOrder': option_vals["Boss_Randomization"].val,
        'EndWart': option_vals['End_with_Wart'].checked,
        'ScrambleWorld': option_vals['Scramble_Levels_in_World'].checked,
        'CloneBoss': option_vals['Randomize_Boss_Arenas'].checked
    }, info)


    if (option_vals["Level_Randomization"].val == 'Experimental_Door_Randomizer'){
        RandomAlgo2(info.my_levels, info.meta_info)
        set_memory_location(currentRom, mem_locs, 'Data_StartLevel', [0, 2, 0, 0], offset=0)
    }

    // skipped
    var level_sets = split_em(info.my_levels, 10).map(x => x.filter(y => y != undefined))
    var locking = 'Do Not Randomize'
    if (locking != 'Do Not Randomize'){
        var world_sets = split_em(level_sets, 3)
        if (locking == 'Per World')
            for (var w of world_sets){
                var new_pal_a = (Math.random() * 6)
                var new_pal_b = (Math.random() * 3)
                var new_music = (Math.random() * 2)
                for (var l of w) {
                    for (var r of l){
                        console.log(r)
                        r.header.pal_a = new_pal_a
                        r.header.pal_b = new_pal_a
                    } 
                }
            }
        if (locking == 'Per Level')
            for (var w of world_sets){
                for (var l of w){
                    var new_pal_a = (Math.random() * 6)
                    var new_pal_b = (Math.random() * 3)
                    var new_music = (Math.random() * 2)
                    for (var r of l){
                        console.log(r)
                        r.header.pal_a = new_pal_a
                        r.header.pal_b = new_pal_a
                    } 
                } 
            }
        if (locking == 'Per Room')
            for (var w of world_sets){
                for (var l of w){
                    for (var r of l){
                        var new_pal_a = (Math.random() * 6)
                        var new_pal_b = (Math.random() * 3)
                        var new_music = (Math.random() * 2)
                        console.log(r)
                        r.header.pal_a = new_pal_a
                        r.header.pal_b = new_pal_a
                    } 
                } 
            }
    }

    Math.seedrandom(rando_seed)

    item_randomizer(info.my_levels, currentRom, mem_locs, info.meta_info, option_vals)

    Math.seedrandom(rando_seed)

    player_randomizer(info.my_levels, currentRom, mem_locs, info.meta_info, option_vals)

    Math.seedrandom(rando_seed)

    handle_boss_options(info.my_levels, option_vals)

    mem_loc_tags.map(function(ele){
        var ele = mem_loc_tags[ele]
        console.debug(ele)
        var values = [ele.value]
        if (Array.isArray(ele.value))
            values = ele.value
        if (ele.checked)
            values = [ele.checked]
        var ele = $(ele)
        set_memory_location(currentRom, mem_locs,
            ele.data('mem_loc_name'), values, ele.data('offset'))
        return ele
    })

    if (option_vals['End_Game_at_any_Exit'].checked){
        set_memory_location(currentRom, mem_locs,
             'WinLevel', [0xFF])
    }

    set_memory_location(currentRom, mem_locs,
        'FunkyLittleSeedBlock2', convertByTbl('seed-' + rando_seed), 3)

    set_memory_location(currentRom, mem_locs,
        'FunkyLittleSeedBlock3', convertByTbl(' '), 3)

    set_memory_location(currentRom, mem_locs,
        'FunkyLittleSeedBlock4', convertByTbl(' '), 3)

    set_memory_location(currentRom, mem_locs,
        'FunkyLittleSeedBlock5', convertByTbl(' '), 3)

    set_memory_location(currentRom, mem_locs,
        'FunkyLittleSeedBlock6', convertByTbl(' '), 3)

    set_memory_location(currentRom, mem_locs,
        'FunkyLittleSeedBlock7', convertByTbl(' '), 3)
    
    set_memory_location(currentRom, mem_locs,
        'TitleStoryText_Line01', convertByTbl(
            fit_text('I THOUGHT ABOUT ALL THE COOL STUFF I COULD PUT HERE, BUT INSTEAD I DECIDED TO SLEEP...', 20), 16*20))

    console.log(option_vals)


    write_to_file(currentRom, info.my_levels, info.meta_info)
    
    blob = new Blob([currentRom])
    url = window.URL.createObjectURL(blob);
    downloadURL(url, 'smb2-output.nes');
    setTimeout(function() {
            return window.URL.revokeObjectURL(url);
          
    }, 1000);

} 

function fit_text(string, width){
    string = string.split(' ')
    var output = []
    var outrow = ''
    for (var s of string){
        if (outrow.length + s.length > width){
            if (outrow.length) {
                while(outrow.length < width)
                    outrow += ' '
                output.push(outrow)
            }
            outrow = ''
        }
        outrow += s + ' '
    }
    if (outrow.length) {
        while(outrow.length < width)
            outrow += ' '
        output.push(outrow)
    }
    return output.join('')
}

function setupLabels (text, num){
    /*
        Sets up labels from asm6f Symbol files    
    */
    var offset = 0x8000
    var mem_locs_new = {}
    if (num == 8) num = 7
    if (num == 7) offset = 0xC000
    var true_location = num * 0x4000
    for (var entry of text.split('\n')){
        var values = entry.split('#')
        var location = parseInt(values[0].slice(1), 16)
        location = true_location + location - offset 
        var value_name = values[1]
        if (value_name != undefined && location != NaN)
            mem_locs_new[value_name] = location
    }
    return mem_locs_new
}

var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
function rand_seed(){
    return Array(10).fill(0).map(x => chars[~~(Math.random() * 36)]).join('')
}

function handle_options (jsn){
    /*
     * This function is not well made
     * is there a gui lib that would just do this for me lmao
     */
    var tags = []
    for (var key in jsn){
        var option = jsn[key]
        var title_name = key
        key = key.replaceAll(' ', '_').replaceAll('(', '').replaceAll(')', '')
        // if array, create select out of it (top layer)
        // this determines different modes of randomization
        // if only one of it, always use it
        if (Array.isArray(option)){
            var tag = $("<select class='option_select' id='" + key + "'></select>")
            tag.prepend = title_name 
            var outer_tag = $("<div class='option_div' id='" + key + "_Option'></div>")
            for (var o of option){
                var inner_name = o.name.replaceAll(' ', '_').replaceAll('(', '').replaceAll(')', '')
                var inner_tag = $("<option value='" + inner_name + "'>" + o.name + "</option>")
                tag.append(inner_tag)
                var specific_ops = handle_options(o.options)
                var specific_tag = $("<div class='hide_me'></div>")
                specific_tag.attr('id', inner_name)
                if (o.name == 'Default')
                    specific_tag.removeClass('hide_me')
                specific_tag.append(specific_ops)
                outer_tag.append(specific_tag)
            }
            tags.push(title_name)
            if (option.length > 1){
                tags.push(tag)
                tag.on('input', function(){
                    var search_target = this.id + "_Option"
                    var targets = $('.option_div')
                    var target = targets.filter((x, y) => y.id == search_target)[0]
                    for (var x of target.childNodes)
                        if (x.id != 'Default' && x.id != this.value) $(x).addClass('hide_me')
                        else $(x).removeClass('hide_me')

                })
            }
            tags.push(outer_tag)
            tags.push('<br/>')
        }
        // otherwise, treat as simple description div or own option
        // create option itself also takes arrays and turns them into radios
        else{
            if (option.tag){
                var tag = $("<div></div>")
                if (option.class){
                    tag.attr('class', option.class)
                }
                tag.append(...handle_options(option.options))
                tags.push(option.tag)
                tags.push(tag)
            }
            else {
                var tag = create_option(option.name, option.desc, option.val, option.min, option.max, option.class)
                tag.find('input').attr('data-mem_loc_name', option.mem_loc_name)
                tag.find('input').attr('data-offset', option.offset)
                tags.push(tag)
            }
        }
    }
    return tags
}


function create_option(name, description, start, min=0, max=100, cl=null){
    var tag = $('<label title="'+ description +'"></label>')
    var title_name = name
    name = name.replaceAll(' ', '_').replaceAll('(', '').replaceAll(')', '')
    var type = 'number'
    if (typeof start === "boolean"){
        type = 'checkbox' 
    }
    else if (typeof start === "string" && isNaN(start)){
        type = 'text' 
    }
    else if (Array.isArray(start) && cl == 'mem_array'){
        type = 'form' 
        var tag_name = $("<label></label>")
        tag_name.append(title_name)
        tag.append(tag_name)
        var form = tag
        form.attr('id', name)
        form.attr('name', title_name)
        tag.append(form)
        for (var index in start){
            var o = start[index]
            var label = $("<label></label>")
            var innertag = $("<input class='option' style='width: 48px;' type='number' value='0'> </input>")
            innertag.attr('id', name)
            innertag.attr('min', min)
            innertag.attr('max', max)
            label.append(innertag)
            label.append(" ", o)
            form.append(label)
        }
        return tag
    }
    else if (Array.isArray(start) && (cl == 'add_up' || cl == 'add_up_multi')){
        type = 'select' 
        var tag_name = $("<div></div>")
        tag_name.append(title_name)
        tag.append(tag_name)
        var form = $("<select class='option_select' style='height: 100%' size='"+start.length+"' id='" + name + "'></select>")
        if (cl == 'add_up_multi')
            form.attr('multiple', 'multiple')
        form.attr('id', name)
        form.attr('name', title_name)
        tag.append(form)
        for (var index in start){
            var o = start[index]
            var innertag = $("<option class='option_radio' value='"+o+"'>"+o+"</input>")
            innertag.attr('name', name)
            innertag.attr('value', index)
            form.append(innertag)
        }
        return tag
    }
    else if (Array.isArray(start)){
        type = 'form' 
        var tag_name = $("<div></div>")
        tag_name.append(title_name)
        tag.append(tag_name)
        var form = $("<form class='option_div option_form'></form>")
        form.attr('id', name)
        form.attr('name', title_name)
        tag.append(form)
        for (var index in start){
            var o = start[index]
            var label = $("<label></label>")
            var innertag = $("<input class='option_radio' type='radio' value='"+o+"'></input>")
            if (index == 0)
                innertag.attr('checked', true)
            innertag.attr('name', name)
            label.append(innertag)
            label.append(" ", o)
            form.append(label)
        }
        return tag
    }
    var innertag = $("<input class='option' type='"+type+"' id='"+name+"'/>")
    if (type == 'checkbox')
        innertag.attr('checked', start)
    else{
        innertag.attr('value', start)
        innertag.attr('step', start % 1 == 0 ? 1 : 0.1)
    }
    if (cl){
        innertag.addClass(cl)
    }
    innertag.attr('min', min)
    innertag.attr('max', max)
    innertag.attr('maxlength', max);
    tag.append(innertag)
    if(type == 'text')
        tag.prepend(title_name + ' ')
    else
        tag.append(' ' + title_name)
    return tag
}

function handleFileSelect(evt) {
    var file = evt.target.files[0]

    var reader = new FileReader();
    reader.onload = function(){
        console.log('Loading file...')
        var dataURL = reader.result
        startingRom = new Uint8Array(dataURL)
        if (!read_info_file_info(startingRom)){
            return
        }
        $('#a_character').trigger('input')
        $('#world').trigger('input')
    }
    reader.readAsArrayBuffer(file)
}

function load_options(files, id){
    var reader = new FileReader();
    reader.onload = function(e){
        console.log('Loading config...')
        var result = JSON.parse(e.target.result);
        var my_name = file.name.replace('.json', '')
        $('#preset_game').append('<option value="' + presets.length + '">' + my_name + '</option>')
        presets.push({'name': my_name, 'config': result})
        reload_options(result, id)
    }

    for (var file of files){
        reader.readAsText(file)
        console.log(file)
    }
}


function reload_options(json, tag_id){
    for (var json_id in json) {
        var option = json[json_id]
        var option_tag = $('.option, .option_form, .option_select'.replaceAll('.', tag_id + ' #' + json_id + '.'))
        option_tag[0].checked = option.checked
        option_tag[0].value = option.val
        if (option.radio){
            option_tag.find('input').attr('checked', false)
            option_tag.find('input[value="' + option.radio + '"]').attr('checked', true)
        }
    }

}

function save_options(tag_id, filename){
    var option_vals = {}
    var option_tags = $('.option, .option_form, .option_select'.replaceAll('.', tag_id + ' .'))

    option_tags.each( function(x){
        var opt_val = {}
        option_vals[option_tags[x].id] = opt_val

        if (option_tags[x].value == "on")
            opt_val.checked = option_tags[x].checked
        else if (option_tags[x].value == undefined)
            opt_val.radio = $(option_tags[x]).find('input:checked').val()
        else 
            opt_val.val = option_tags[x].value
    })
    console.log(JSON.stringify(option_vals))
    var data = new Blob([JSON.stringify(option_vals)], {
            type: 'application/json',
            name: filename

    });
    blob = new Blob([JSON.stringify(option_vals)])
    url = window.URL.createObjectURL(blob);
    downloadURL(url, filename)
}


var number_cap = function () {
    setTimeout(function(ele){
        var val = ele.value
        ele.value = Math.min(ele.value, ele.max)
        ele.value = Math.max(ele.value, ele.min) 
            }, 200, this)
}


$('#start_summary').click(function(){
    $('.main_item').fadeOut(0)
    $('#summary').fadeIn()
})

$('#start_changelog').click(function(){
    $('.main_item').fadeOut(0)
    $('#changelog').fadeIn()
})

$('#start_randomizer').click(function(){
    $('.main_item').fadeOut(0)
    $('#fileupload').fadeIn()
    $('#randomizer_body').fadeIn()
})

$('#start_map_viewer').click(function(){
    $('.main_item').fadeOut(0)
    $('#fileupload').fadeIn()
    $('#map_viewer').fadeIn()
})

$('#start_sprite_viewer').click(function(){
    $('.main_item').fadeOut(0)
    $('#fileupload').fadeIn()
    $('#sprite_viewer').fadeIn()
})

$('#start_character_viewer').click(function(){
    $('.main_item').fadeOut(0)
    $('#fileupload').fadeIn()
    $('#char_viewer').fadeIn()
})

$('#auditByRoom').click(function(){
    var my_level_index = $('#world').val() * 30 + $('#level').val() * 10 + $('#room').val() * 1
    var levels = [info.my_levels[my_level_index]]
    audit_function(levels)
})


$('#auditByLevel').click(function(){
    var my_level_index = $('#world').val() * 30 + $('#level').val() * 10
    var levels = info.my_levels.slice(my_level_index, my_level_index + 10).filter(x => x != undefined)
    audit_function(levels)
})

$('#auditByWorld').click(function(){
    var my_level_index = $('#world').val() * 30 + $('#level').val() * 10
    var levels = info.my_levels.slice(my_level_index, my_level_index + 30).filter(x => x != undefined)
    audit_function(levels)
})

$('#auditByGame').click(function(){
    var levels = info.my_levels.filter(x => x != undefined)
    audit_function(levels)
})

function audit_function (levels){
    console.log('In levels...', levels.length)

    var e = audit_rooms($('#a_enemy').val(), levels.map(x => x.enemies), 'enemy')
    console.log(e.length, EnemyIds[$('#a_enemy').val()])

    var o = audit_rooms($('#a_object').val(), levels.map(x => x.objs), 'object')
    console.log(o.length, get_map_obj_id($('#a_object').val()))

    var t = audit_rooms($('#a_tiles').val(), levels.map(x => 
        render_level(x, x.header, x.enemies, info.meta_info)), 'tile')
    console.log(t.length, BackgroundTileIds[$('#a_tiles').val()])
}

function audit_rooms(value, level_info, type='enemy'){
    if (value == -1)
        return []
    if (type == 'enemy')
        var result = level_info.map(x => x.filter(y => y.obj_type == value))
    if (type == 'object')
        var result = level_info.map(x => x.filter(y => y.obj_type >= 0x30 ? 
            (y.obj_type >> 4 == value >> 4): (y.obj_type == value)))
    if (type == 'tile'){
        var result = level_info.reduce((a,page) => a.concat(page))
        result = result.reduce((a,y) => a.concat(y))
        result = result.reduce((a,x) => a.concat(x))
        result = result.filter( x => x.obj_type == value )
        return result
    }
    return result.reduce((a, b) => a.concat(b))
}

String.prototype.replaceAll = function(find, replace){
    return this.split(find).join(replace)
    console.log(find, replace)
    var str = this
    newstring = str.replace(new RegExp(find, 'g'), replace)
    console.log(newstring)
    return newstring
}

Array.range = function(len, min=0) {
    return Array(len).fill(0).map((x,y) => y + min)
}



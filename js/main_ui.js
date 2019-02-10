
function Main_UI(){
    this.main = $('div')
}

function htmlLogger() {
    /*
     *  
     */
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

// palette constructor
// I'm new to this...
var select_color = $('<select class="nespalette_select"></select>')
select_color.on('input', function(evt){
    var x = this.value
    var color_string = NES_palette[x].toString()
    color_string = color_string.slice(1, color_string.length)
    color_string = 'rgba(' + NES_palette[x].toString() + ')'
    this.style.backgroundColor = color_string
})
for (var x in NES_palette){
    var color_string = NES_palette[x].toString()
    color_string = color_string.slice(1, color_string.length)
    color_string = 'rgba(' + NES_palette[x].toString() + ')'
    var color_option = $('<option style="background-color: '+ color_string +'" val="'+ x +'" > </option>')
    color_option.text(x)
    select_color.append(color_option)
}

var palette_selector = function (id, size) {
    // mmm I don't know this kind of UI backend design
    this.tag = $('<div>')
    this.tag.attr('id', id)
    this.tag.attr('class', 'option_pal')
    for (var i = 0; i < size; i++)
        this.tag.append(select_color.clone(true))
}


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
    var option_tags = $('#randomizer').find('.option, .option_form, .option_select')
    var mem_loc_tags = $('#randomizer').find('.option.mem_location')

    var option_vals = {}
    option_tags.map(function(x){
        option_vals[option_tags[x].id] = {
        val: option_tags[x].value, 
        checked: option_tags[x].checked,
        radio: $(option_tags[x]).find('input:checked').val()
        }
    })

    Math.seedrandom(rando_seed)

    var r_header = option_vals['Randomize_World_Appearance'].radio
    var segments = []
    if (r_header == 'Per World')
        segments = Array.split(info.my_levels, 30)
    else if (r_header == 'Per Level')
        segments = Array.split(info.my_levels, 10)
    else if (r_header == 'Per Room')
        segments = Array.split(info.my_levels, 1)
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
        if (!segments.length) segments = Array.split(info.my_levels, 1)
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

    var active_levels = level_order_randomizer(info.my_levels, currentRom, mem_locs, {
        'ShuffleType': option_vals["Level_Randomization"].val,
        'GameScale': option_vals["Game_Scale"].val,
        'BossOrder': option_vals["Boss_Randomization"].val,
        'EndWart': option_vals['End_with_Wart'].checked,
        'ScrambleWorld': option_vals['Scramble_Levels_in_World'].checked,
        'CloneBoss': option_vals['Randomize_Boss_Arenas'].checked
    }, info)


    if (option_vals["Enemy_Randomization_early"].checked)
    {
        Math.seedrandom(rando_seed)
        enemy_randomizer(active_levels, currentRom, mem_locs, info.meta_info)
    }

    Math.seedrandom(rando_seed)

    item_randomizer(active_levels, currentRom, mem_locs, info.meta_info, option_vals)

    Math.seedrandom(rando_seed)

    player_randomizer(active_levels, currentRom, mem_locs, info.meta_info, option_vals)

    Math.seedrandom(rando_seed)

    handle_boss_options(active_levels, option_vals)

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
        'FunkyLittleSeedBlock4', convertByTbl(''), 3)

    set_memory_location(currentRom, mem_locs,
        'FunkyLittleSeedBlock5', convertByTbl(''), 3)

    set_memory_location(currentRom, mem_locs,
        'FunkyLittleSeedBlock6', convertByTbl(' '), 3)

    set_memory_location(currentRom, mem_locs,
        'FunkyLittleSeedBlock7', convertByTbl(' '), 3)
    
    set_memory_location(currentRom, mem_locs,
        'TitleStoryText_Line01', convertByTbl(
            fit_text('I THOUGHT ABOUT ALL THE COOL STUFF I COULD PUT HERE, BUT INSTEAD I DECIDED TO SLEEP...', 20), 16*20))


    write_to_file(currentRom, info.my_levels, info.meta_info)
    
    blob = new Blob([currentRom])
    url = window.URL.createObjectURL(blob)
    downloadURL(url, 'smb2-output.nes')
    setTimeout(function() {
            return window.URL.revokeObjectURL(url)
          
    }, 1000)

} 

function fit_text(string, width){
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

function setupLabelsLst (text){
    /*
        Sets up labels from asm6f lst file 
    */
    var offset = 0
    var last_address = 0x0
    var mem_locs_new = {}
    var ram_offset = 0x8000
    for (var entry of text.split('\n')){
        var mem_address = entry.slice(0, 5)
        if (isNaN('0x' + mem_address))
            continue
        var mem_address = parseInt('0x' + mem_address)
        if (mem_address < 0x8000)
            continue

        var isAddress = entry.search(':')
        if (isAddress === -1)
            continue

        if (mem_address - 0x8000 < last_address){
            offset += 0x4000
        }
        var new_entry = entry.slice(5, isAddress).trim()
        mem_locs_new[new_entry] = mem_address - 0x8000 + offset
        last_address = mem_address - 0x8000

    }
    return mem_locs_new
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


function handle_options (jsn){
    /*
     * This function is not well made
     * is there a gui lib that would just do this for me lmao
     */
    var tags = []
    for (var key in jsn){
        var option = jsn[key]
        var title_name = key
        key = key.replaceAll(" ", "_").replaceAll("(", "").replaceAll(")", "")
        // if array, create select out of it (top layer)
        // this determines different modes of randomization
        // if only one of it, always use it
        if (Array.isArray(option)){
            var tag = $("<select class='option_select'></select>")
            tag.attr("id", key)
            tag.prepend = title_name 
            var outer_tag = $("<div class='option_div'></div>")
            outer_tag.attr("id", key + "_Option")
            for (var o of option){
                var inner_name = o.name.replaceAll(" ", "_").replaceAll("(", "").replaceAll(")", "")
                var inner_tag = $("<option>")
                inner_tag.append(o.name)
                inner_tag.attr("value", inner_name)
                tag.append(inner_tag)
                var specific_ops = handle_options(o.options)
                var specific_tag = $("<div class='hide_me'></div>")
                specific_tag.attr("id", inner_name)
                if (o.name == "Default")
                    specific_tag.removeClass("hide_me")
                specific_tag.append(specific_ops)
                outer_tag.append(specific_tag)
            }
            tags.push(title_name)
            if (option.length > 1){
                tags.push(tag)
                tag.on("input", function(){
                    var search_target = this.id + "_Option"
                    var targets = $(".option_div")
                    var target = targets.filter((x, y) => y.id == search_target)[0]
                    for (var x of target.childNodes)
                        if (x.id != "Default" && x.id != this.value) $(x).addClass("hide_me")
                        else $(x).removeClass("hide_me")

                })
            }
            tags.push(outer_tag)
            tags.push("<br/>")
        }
        // otherwise, treat as simple description div or own option
        // create option itself also takes arrays and turns them into radios
        else{
            if (option.tag){
                var tag = $("<div></div>")
                if (option.class){
                    tag.attr("class", option.class)
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
    var tag = $("<label>")
    tag.attr("title", description)
    var title_name = name
    name = name.replaceAll(" ", "_").replaceAll("(", "").replaceAll(")", "")
    var type = "number"
    if (typeof start === "boolean"){
        type = "checkbox" 
    }
    else if (typeof start === "string" && isNaN(start)){
        type = "text" 
    }
    else if (Array.isArray(start) && cl == "palette"){
        type = "form" 
        var tag_name = $("<label></label>")
        tag_name.append(title_name)
        tag.append(tag_name)
        var form = tag

        tag.append((new palette_selector(name, 4)).tag)
        return tag
    }
    else if (Array.isArray(start) && cl == "mem_array"){
        type = "form" 
        var tag_name = $("<label></label>")
        tag_name.append(title_name)
        tag.append(tag_name)
        tag.attr("name", title_name)
        tag.attr("id", name)
        tag.attr("class", "option_form")
        for (var index in start){
            var item = start[index]
            var label = $("<label></label>")
            var innertag = $("<input class='sub_option' style='width: 48px;' type='number' value='0'> </input>")
            var item_name = item.replaceAll(" ", "_").replaceAll("(", "").replaceAll(")", "")
            innertag.attr('id', item_name)
            innertag.attr('min', min)
            innertag.attr('max', max)
            label.append(innertag)
            label.append(" ", item)
            tag.append(label)
        }
        return tag
    }
    else if (Array.isArray(start) && (cl == "add_up" || cl == "add_up_multi")){
        type = "select" 
        var tag_name = $("<div></div>")
        tag_name.append(title_name)
        tag.append(tag_name)
        var form = $("<select class='option_select' style='height: 100%'></select>")
        form.attr("size", start.length)
        form.attr("id", name)
        if (cl == "add_up_multi")
            form.attr("multiple", "multiple")
        form.attr("id", name)
        form.attr("name", title_name)
        tag.append(form)
        for (var index in start){
            var item = start[index]
            var innertag = $("<option class='option_radio'></input>")
            innertag.append(item)
            innertag.attr("name", name)
            innertag.attr("value", index)
            form.append(innertag)
        }
        return tag
    }
    else if (Array.isArray(start)){
        type = "form" 
        var tag_name = $("<div></div>")
        tag_name.append(title_name)
        tag.append(tag_name)
        var form = $("<form class='option_div option_form'></form>")
        form.attr("id", name)
        form.attr("name", title_name)
        tag.append(form)
        for (var index in start){
            var item = start[index]
            var label = $("<label></label>")
            var innertag = $("<input class='option_radio' type='radio'></input>")
            innertag.attr('value', item)
            if (index == 0)
                innertag.attr('checked', true)
            innertag.attr('name', name)
            label.append(innertag)
            label.append(" ", item)
            form.append(label)
        }
        return tag
    }
    var innertag = $("<input class='option'>")
    innertag.attr("type", type)
    innertag.attr("id", name)
    if (type == "checkbox")
        innertag.attr("checked", start)
    else{
        innertag.attr("value", start)
        innertag.attr("step", start % 1 == 0 ? 1 : 0.1)
    }
    if (cl){
        innertag.addClass(cl)
    }
    innertag.attr("min", min)
    innertag.attr("max", max)
    innertag.attr("maxlength", max);
    tag.append(innertag)
    if(type == "text")
        tag.prepend(title_name + " ")
    else
        tag.append(" " + title_name)
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

function load_options(files, tag){
    var loader = function(e){
        console.log('Loading config...')
        var result = JSON.parse(e.target.result);
        var my_name = file.name.replace('.json', '')
        $('#preset_game').append('<option value="' + presets.length + '">' + my_name + '</option>')
        presets.push({'name': my_name, 'config': result})
        reload_options(result, tag)
    }

    for (var file of files){
        var reader = new FileReader();
        reader.onload = loader
        reader.readAsText(file)
        console.log(file)
    }
}


function reload_options(json, tag){
    // this is not xss safe I'm sure
    var option_tags = tag.find('.option, .option_form, .option_select')
    for (var t in Array.range(option_tags.length)) {
        tag = option_tags[t]
        var option = json[tag.id]
        if (option == undefined)
            continue
        tag.checked = option.checked
        tag.value = option.val
        if (option.radio){
            tag = $(tag)
            tag.find('input').attr('checked', false)
            if (isNaN(option.radio))
                var selected_tag = tag.find('input[value="' + option.radio + '"]')
            else
                var selected_tag = tag.find('input')[option.radio]
            if (selected_tag && selected_tag.length)
                selected_tag.attr('checked', true)
            else
                tag.find('input')[0].checked = true
            console.log(selected_tag)
            console.log(tag)
            console.log(option.radio)
        }
    }

}

function collect_options(tag, query='.option, .option_form, .option_select, .sub_option'){
    var option_vals = {}
    var option_tags = tag.find(query)

    option_tags.each( function(x){
        var opt_val = {}
        option_vals[option_tags[x].id] = opt_val

        if (option_tags[x].type == 'checkbox')
            opt_val.checked = option_tags[x].checked
        else if (option_tags[x].tagName == 'FORM')
            opt_val.radio = $(option_tags[x]).find('input:checked').val()
        else 
            opt_val.val = option_tags[x].value
    })
    return option_vals
}

function save_options(tag, filename){
    var option_vals = collect_options(tag)
    console.log(JSON.stringify(option_vals))
    downloadJSON(option_vals, filename)
}

function downloadJSON(js_data, filename){
    var data = new Blob([JSON.stringify(js_data)], {
        type: "application/json",
        name: filename
    })
    var blob = new Blob([JSON.stringify(js_data)])
    var url = window.URL.createObjectURL(blob)
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



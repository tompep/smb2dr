
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


var bbptext = 
        [[682,2048,10920,40970,32770,34946,34946,32770],
        [32770,32778,8232,2720,168,43690,514,43520],
        [32768,8194,2058,554,33322,43688,33440,35456],
        [2208,8,2,32906,41128,41642,43680,10880],
        [42,128,8712,2082,2082,8234,10248,40960],
        [8362,8362,43050,10250,2568,2696,8840,170],
        [43008,512,32896,8232,8736,40968,32776,10],
        [43048,43016,41002,32808,160,8864,43656,43520],
        [0,0,0,0,0,0,0,0],
        [2056,10794,10922,10922,10922,2728,672,128],
        [0,0,0,0,0,0,0,0],
        [0,160,640,2560,2560,640,160,0],
        [0,0,0,0,0,0,0,0],
        [10920,160,2688,160,168,41128,10912,0],
        [672,2728,2728,672,672,0,672,672],
        [0,0,0,640,640,0,0,0],
        [10912,41128,41128,41128,41128,41128,10912,0],
        [2688,10880,2688,2688,2688,2688,10912,0],
        [10912,41128,168,2720,10752,43008,43688,0],
        [10920,160,2688,160,168,41128,10912,0],
        [672,2720,10400,41120,43688,160,160,0],
        [43680,40960,43680,168,168,41128,10912,0],
        [10912,40960,43680,41128,41128,41128,10912,0],
        [43688,41128,160,640,2560,2560,2560,0],
        [10912,41128,41128,10912,41128,41128,10912,0],
        [10912,41128,41128,10920,168,168,10912,0],
        [2688,10912,43048,43048,43688,43048,43048,0],
        [43680,43048,43048,43680,43048,43048,43680,0],
        [2720,10280,43008,43008,43008,10280,2720,0],
        [43648,43168,43048,43048,43048,43168,43648,0],
        [43688,43008,43008,43680,43008,43008,43688,0],
        [43688,43008,43008,43680,43008,43008,43008,0],
        [2720,10240,43008,43176,43048,10280,2728,0],
        [43048,43048,43048,43688,43048,43048,43048,0],
        [10912,2688,2688,2688,2688,2688,10912,0],
        [680,40,40,40,43048,43048,10912,0],
        [43048,43168,43648,43520,43648,43168,43048,0],
        [10752,10752,10752,10752,10752,10752,10920,0],
        [41000,43176,43688,43688,41512,41000,41000,0],
        [41000,43048,43560,43688,43176,43048,43048,0],
        [10912,43048,43048,43048,43048,43048,10912,0],
        [43680,43048,43048,43048,43680,43008,43008,0],
        [10912,43048,43048,43048,43688,43168,10888,0],
        [43680,43048,43048,43168,43648,43168,43048,0],
        [10880,43168,43008,10912,40,43048,10912,0],
        [43688,2688,2688,2688,2688,2688,2688,0],
        [43048,43048,43048,43048,43048,43048,10912,0],
        [43048,43048,43048,43048,10400,2688,512,0],
        [41000,41000,41512,41512,43688,43176,41000,0],
        [41000,43176,10912,2688,10912,43176,41000,0],
        [43048,43048,43048,10912,2688,2688,2688,0],
        [43688,168,672,2688,10752,43008,43688,0],
        [0,0,0,10920,10920,0,0,0],
        [2720,10280,10280,160,640,640,0,640],
        [0,0,0,0,0,10240,10240,0],
        [0,0,0,0,0,10240,10240,40960],
        [2688,8224,35464,34824,35464,8224,2688,0],
        [10914,16114,514,514,514,771,0,0],
        [35328,60928,8704,12800,512,768,0,0],
        [0,0,0,0,0,0,0,0],
        [43690,43690,43690,43690,43690,43690,43690,43690],
        [21845,21845,21845,21845,21845,21845,21845,21845],
        [65535,65535,65535,65535,65535,65535,65535,65535],
        [0,0,0,0,0,0,0,0]]


function textify_this(div){
    for (var n in div.childNodes) {
        var node = div.childNodes[n]
        if (node.nodeType != 3) continue
        var full_text = node.nodeValue
        if (full_text == undefined || full_text.length == 0 ) continue
        full_text = full_text.trim()
        if (full_text.length == 0) continue

        var pal_col = get_nearest_color(parseColor($(div).css('color')), NES_palette)
        var div_new = $("<text class='replaced_text'>")
        var text_paragraphs = full_text.split('\n')
        for (var p in text_paragraphs) {
            var paragraph = text_paragraphs[p]
            var text_words = paragraph.split(' ')
            for (var t in text_words) {
                var text = text_words[t]
                if (text.length == 0) continue

                var text_tiles = []
                text_tiles.push(...convertByTbl(text, text.length).map(x => x % 0x40))

                if (t < text_words.length - 1) text_tiles.push(0xFB)
                var gfx = bitmap_from_graphics([bbptext], 
                    text_tiles, Math.min(256, text_tiles.length), [0xF,pal_col, pal_col, pal_col], true)

                var gfx_data = gfx.image_data

                var img = new Image(gfx_data.width, gfx_data.height)
                img.src = gfx.data_url
                div_new.append(img)

            }
            if (p < text_paragraphs.length - 1) div_new.append('</br>')
        }
        div_new.attr('aria-label', full_text)
        div.replaceChild(div_new[0], node)
    }
}

function textify_everything(num=9999){
    var all_divs = $('button, a, select, label, div, form').not('.no_pixel')
    for (var d in all_divs){
        if (d > num)
            break
        var div = all_divs[d]
        setTimeout(textify_this(div))
    }
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
            setTimeout(function() {
                    info = extract_all_info(currentRom.slice(0x10), mem_locs)
                    level_sets = [info.my_levels]
                    sprites = extract_graphics(currentRom.slice(0x20010)) 
                    info.meta_info.characters = extract_characters(currentRom.slice(0x10), mem_locs, sprites.all_sheets)
            })
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
        setTimeout(function() {
                info = extract_all_info(currentRom, mem_locs)
                level_sets = [info.my_levels]
                sprites = extract_graphics(currentRom.slice(0x20010)) 
                info.meta_info.characters = extract_characters(currentRom.slice(0x10), mem_locs, sprites.all_sheets)
        })
        console.normal_log(info)
        console.normal_log(sprites)
        return true
    }
}

var downloadURL = function(data, fileName) {
      var a = document.createElement('a')
      a.href = data
      a.download = fileName
      document.body.appendChild(a)
      a.style = 'display: none'
      a.click()
      a.remove()
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
            var outer_tag = $("<div class='option_div option_block'></div>")
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
                if (o.options.length == 0)
                    continue
                specific_tag.append(specific_ops)
                outer_tag.append(specific_tag)
            }
            if (option.length > 1){
                outer_tag.prepend(tag)
                tag.on("input", function(){
                    var target = this.parentElement
                    for (var x of target.childNodes) {
                        if (x.tagName != "DIV") continue
                        if (x.id != "Default" && x.id != this.value) $(x).addClass("hide_me")
                        else $(x).removeClass("hide_me")
                    }
                })
            }
            var title_taggu = $('<div class="bold" id="Default">')
            title_taggu.append(title_name)
            outer_tag.prepend(title_taggu)
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
                var title = $('<label>')
                title.append(option.tag)
                tags.push(title)
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
    var id_name = name.replaceAll(" ", "_").replaceAll("(", "").replaceAll(")", "")
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

        tag.append((new palette_selector(id_name, 4)).tag)
        return tag
    }
    else if (Array.isArray(start) && cl == "mem_array"){
        type = "form" 
        var tag_name = $("<label></label>")
        tag_name.append(title_name)
        tag.append(tag_name)
        tag.attr("name", title_name)
        tag.attr("id", id_name)
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
        if (cl == "add_up_multi") form.attr("multiple", "multiple")
        form.attr("id", id_name)
        form.attr("name", title_name)
        tag.append(form)
        for (var index in start){
            var item = start[index]
            var innertag = $("<option class='option_radio'></input>")
            innertag.append(item)
            innertag.attr("name", id_name)
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
        var form = $("<form class='option_div option_block option_form'></form>")
        form.attr("id", id_name)
        form.attr("name", title_name)
        tag.append(form)
        for (var index in start){
            var item = start[index]
            var item_id = item.replaceAll(" ", "_").replaceAll("(", "").replaceAll(")", "")
            var label = $("<label></label>")
            var innertag = $("<input class='option_radio' type='radio'></input>")
            innertag.attr('value', item_id)
            if (index == 0) innertag.attr('checked', true)
            innertag.attr('name', id_name)
            label.append(innertag)
            label.append(" ", item)
            form.append(label)
        }
        return tag
    }
    var innertag = $("<input class='option'>")
    innertag.attr("type", type)
    innertag.attr("id", id_name)
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
        tag.prepend(title_name)
    else
        tag.append(title_name)
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
        var start_interface = function(){
            if (sprites == undefined || info.meta_info.characters == undefined)
                setTimeout(start_interface, 1000)
            else {
                $('#a_character').trigger('input')
                $('#world').trigger('input')
            }
        }
        setTimeout(start_interface, 1000)
    }
    reader.readAsArrayBuffer(file)
}


function load_options(files, tag){
    var loader = function(e){
        console.log('Loading config...')
        var result = JSON.parse(e.target.result);
        var my_name = file.name.replace('.json', '')
        $('#preset_game').append('<option value="' + presets.length - 1 + '">' + my_name + '</option>')
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
        }
        $(tag).trigger('input')
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
    var data = new Blob([JSON.stringify(js_data, 4)], {
        type: "application/json",
        name: filename
    })
    var blob = new Blob([JSON.stringify(js_data, 4)])
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
    $('.main_item:not(#summary)').fadeOut(0)
    $('#summary').fadeIn()
})

$('#start_changelog').click(function(){
    $('.main_item:not(#changelog)').fadeOut(0)
    $('#changelog').fadeIn()
})

$('#start_randomizer').click(function(){
    $('.main_item:not(#fileupload, #randomizer_body)').fadeOut(0)
    $('#fileupload').fadeIn()
    $('#randomizer_body').fadeIn()
})

$('#start_map_viewer').click(function(){
    $('.main_item:not(#fileupload, #map_viewer)').fadeOut(0)
    $('#fileupload').fadeIn()
    $('#map_viewer').fadeIn()
})

$('#start_sprite_viewer').click(function(){
    $('.main_item:not(#fileupload, #sprite_viewer)').fadeOut(0)
    $('#fileupload').fadeIn()
    $('#sprite_viewer').fadeIn()
})

$('#start_character_viewer').click(function(){
    $('.main_item:not(#fileupload, #char_viewer)').fadeOut(0)
    $('#fileupload').fadeIn()
    $('#char_viewer').fadeIn()
})

$('#auditByRoom').click(function(){
    var my_level_index = $('#world').val() * 30 + $('#level').val() * 10 + $('#room').val() * 1
    var levels = [level_sets[level_sets.length - 1][my_level_index]]
    audit_function(levels)
})


$('#auditByLevel').click(function(){
    var my_level_index = $('#world').val() * 30 + $('#level').val() * 10
    var levels = level_sets[level_sets.length - 1].slice(my_level_index, my_level_index + 10).filter(x => x != undefined)
    audit_function(levels)
})

$('#auditByWorld').click(function(){
    var my_level_index = $('#world').val() * 30 + $('#level').val() * 10
    var levels = level_sets[level_sets.length - 1].slice(my_level_index, my_level_index + 30).filter(x => x != undefined)
    audit_function(levels)
})

$('#auditByGame').click(function(){
    var levels = level_sets[level_sets.length - 1].filter(x => x != undefined)
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




console.normal_log = console.log
console.log = addToLog

var update_log;
var new_lines = [];

function apply_lines_to_log(id){
    var my_lines = new_lines.slice(0)
    new_lines = []
    var my_log_tag = $(id)
    var oldtext = my_log_tag.text()
    for (var line of my_lines){
        oldtext += '\n' + line
    }
    my_log_tag.text(oldtext)
    my_log_tag.scrollTop(my_log_tag[0].scrollHeight)
    clearTimeout(update_log)
}

function addToLog( ...text ){
    addToLogCustom('#log', 999, ...text)
}

function addToLogCustom(id, clearlines=50, ...text ){
    console.normal_log(...text)
    new_lines.push(text.map(x => String(x)).join(" "))
    clearTimeout(update_log)
    if (new_lines.length > clearlines)
        apply_lines_to_log(id, 8000)
    else 
        update_log = setTimeout(function(){apply_lines_to_log(id, 8000)}, 200)
}

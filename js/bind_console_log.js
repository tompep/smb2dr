
String.prototype.replaceAll = function(find, replace){
    return this.split(find).join(replace)
}

Array.range = function(len, min=0) {
    return Array(len).fill(0).map((x,y) => y + min)
}

Array.flip = function(array) {
    var output = []
    for (var i in array)
        output[array.length - 1 - i] = array[i]
    return output
}

Array.split = function (array, amnt){
    var result = []
    while (array.length){
        result.push(array.slice(0, amnt))
        array = array.slice(amnt)
    }
    return result
}

Array.pick_random = function(array){
    return array[~~(Math.random() * array.length)]
}

var split_em = Array.split

function html_logger(id='log', refresh_lines = 100) {
    /*
     *  
     */

    var my_obj = this
    this.update_log = null
    this.new_lines = []
    this.id = id
    this.refresh_lines = refresh_lines

    this.log_div = $('<pre id="' + this.id + '" class="log">>___</pre>')

    this.log = function ( ...text ){
        console.debug((new Error).stack.split('\n')[3])
        console.normal_log( ...text )
        clearTimeout(my_obj.update_log)
        this.new_lines.push(text.map(x => String(x)).join(" "))
        if (this.new_lines.length > this.refresh_lines)
            my_obj.apply_lines_to_log()
        else 
            my_obj.update_log = setTimeout(function(){ my_obj.apply_lines_to_log() }, 80)
        return null
    }

    this.apply_lines_to_log = function() {
        var my_lines = this.new_lines.slice(0)
        this.new_lines = []

        var my_log_tag = this.log_div
        var oldtext = my_log_tag.text()

        for (var line of my_lines){
            oldtext += "\n" + line
        }
        my_log_tag.text(oldtext)
        my_log_tag.scrollTop(my_log_tag[0].scrollHeight)
        clearTimeout(my_obj.update_log)
    }

    this.rebind_console_log = function () {
        console.normal_log = console.log
        console.log = function( ...text ) { my_obj.log( ...text ) }
    }
}

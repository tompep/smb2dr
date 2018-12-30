
console.normal_log = console.log
console.log = addToLog
function addToLog( ...text ){
    console.normal_log(...text)
    setTimeout(function(){
    text = text.join(" ")
    var oldtext = $('#log').text()
    if (oldtext.length)
        $('#log').text(oldtext + '\n' + text)
    else
        $('#log').text(text)
    $('#log').scrollTop($('#log')[0].scrollHeight)
    })
}

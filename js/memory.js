
function set_memory_location(my_rom, mem_locs, name, values, offset=0, func=null){
    if (!offset)
        offset = 0

    if (isNaN(name)){
        var Location = mem_locs[name]
    }
    else {
        Location = ~~(name)
    }
    console.debug(name, values, Location)
    if (Location){
        console.debug(name, values.length, values.map(x => x.toString(16)), Location.toString(16), offset)
        Location = Location + 0x10 + offset
        for(var i = 0; i < values.length; i++){
            values[i] = values[i] === true ? 1 : (values[i] === false ? 0 : parseInt(values[i]) % 256)
            if (!func)
                my_rom[Location + i] = values[i]
            else
                my_rom[Location + i] = func(my_rom[Location + i], values[i])
        }
    }
    else {
        console.error('Mem loc not found for writing', name)
    }
}

function extract_ptrs(bytes, number_of_ptrs, swap=false, offset=0){
    // swap makes hi first
    var ptrs = []
    for (var i = 0; i < number_of_ptrs; i++) {
        var j = number_of_ptrs + i + offset
        var new_ptr = (bytes[j] << 8) + bytes[i]
        if (swap){
            new_ptr = bytes[j] + (bytes[i] << 8)
        }
        ptrs.push(new_ptr)
    }  
    return ptrs
}

function extract_ptr_mem_block (bytes, mem_locs, name, num_ptrs, size, split=1){
    if (name in mem_locs){
        var start_char = mem_locs[name]
        var bank = ~~(start_char / 0x4000)
        if (bank < 7) var bank_offset = 0x8000
        else bank_offset = 0xc000
        var rom_offset = bank * 0x4000
        var obj_tile_ptrs = 
            extract_ptrs(bytes.slice(start_char), num_ptrs).map(x => x - bank_offset)
        return obj_tile_ptrs.map(x => bytes.slice(rom_offset).slice(x, x + size))
    }
    else {
        console.log(name, 'not found in compiled ASM')
    }
    return null
}

function extract_mem_block (bytes, mem_locs, name, size, offset=0){
    // fix this for ines header stuff
    // make behavior consistent for everything (see set_mem_loc)
    // return instead, an object/callback that can write back to the rom?
    if (name in mem_locs){
        var start_char = mem_locs[name] + offset
        var b = bytes.slice(start_char, start_char + size)
        return [...b]
    }
    else {
        console.log(name, 'not found in compiled ASM')
    }
    return null
}




/*
 * Bitshifting lookup-table
 * In order to speed up CHR extraction
 * Use chart to simplify masking 2-bit palette images
 */
var lookup_table = [
    0b0000000000000000,
    0b0000000000000001,
    0b0000000000000100,
    0b0000000000000101,
    0b0000000000010000,
    0b0000000000010001,
    0b0000000000010100,
    0b0000000000010101,
    0b0000000001000000,
    0b0000000001000001,
    0b0000000001000100,
    0b0000000001000101,
    0b0000000001010000,
    0b0000000001010001,
    0b0000000001010100,
    0b0000000001010101,
    0b0000000100000000,
    0b0000000100000001,
    0b0000000100000100,
    0b0000000100000101,
    0b0000000100010000,
    0b0000000100010001,
    0b0000000100010100,
    0b0000000100010101,
    0b0000000101000000,
    0b0000000101000001,
    0b0000000101000100,
    0b0000000101000101,
    0b0000000101010000,
    0b0000000101010001,
    0b0000000101010100,
    0b0000000101010101,
    0b0000010000000000,
    0b0000010000000001,
    0b0000010000000100,
    0b0000010000000101,
    0b0000010000010000,
    0b0000010000010001,
    0b0000010000010100,
    0b0000010000010101,
    0b0000010001000000,
    0b0000010001000001,
    0b0000010001000100,
    0b0000010001000101,
    0b0000010001010000,
    0b0000010001010001,
    0b0000010001010100,
    0b0000010001010101,
    0b0000010100000000,
    0b0000010100000001,
    0b0000010100000100,
    0b0000010100000101,
    0b0000010100010000,
    0b0000010100010001,
    0b0000010100010100,
    0b0000010100010101,
    0b0000010101000000,
    0b0000010101000001,
    0b0000010101000100,
    0b0000010101000101,
    0b0000010101010000,
    0b0000010101010001,
    0b0000010101010100,
    0b0000010101010101,
    0b0001000000000000,
    0b0001000000000001,
    0b0001000000000100,
    0b0001000000000101,
    0b0001000000010000,
    0b0001000000010001,
    0b0001000000010100,
    0b0001000000010101,
    0b0001000001000000,
    0b0001000001000001,
    0b0001000001000100,
    0b0001000001000101,
    0b0001000001010000,
    0b0001000001010001,
    0b0001000001010100,
    0b0001000001010101,
    0b0001000100000000,
    0b0001000100000001,
    0b0001000100000100,
    0b0001000100000101,
    0b0001000100010000,
    0b0001000100010001,
    0b0001000100010100,
    0b0001000100010101,
    0b0001000101000000,
    0b0001000101000001,
    0b0001000101000100,
    0b0001000101000101,
    0b0001000101010000,
    0b0001000101010001,
    0b0001000101010100,
    0b0001000101010101,
    0b0001010000000000,
    0b0001010000000001,
    0b0001010000000100,
    0b0001010000000101,
    0b0001010000010000,
    0b0001010000010001,
    0b0001010000010100,
    0b0001010000010101,
    0b0001010001000000,
    0b0001010001000001,
    0b0001010001000100,
    0b0001010001000101,
    0b0001010001010000,
    0b0001010001010001,
    0b0001010001010100,
    0b0001010001010101,
    0b0001010100000000,
    0b0001010100000001,
    0b0001010100000100,
    0b0001010100000101,
    0b0001010100010000,
    0b0001010100010001,
    0b0001010100010100,
    0b0001010100010101,
    0b0001010101000000,
    0b0001010101000001,
    0b0001010101000100,
    0b0001010101000101,
    0b0001010101010000,
    0b0001010101010001,
    0b0001010101010100,
    0b0001010101010101,
    0b0100000000000000,
    0b0100000000000001,
    0b0100000000000100,
    0b0100000000000101,
    0b0100000000010000,
    0b0100000000010001,
    0b0100000000010100,
    0b0100000000010101,
    0b0100000001000000,
    0b0100000001000001,
    0b0100000001000100,
    0b0100000001000101,
    0b0100000001010000,
    0b0100000001010001,
    0b0100000001010100,
    0b0100000001010101,
    0b0100000100000000,
    0b0100000100000001,
    0b0100000100000100,
    0b0100000100000101,
    0b0100000100010000,
    0b0100000100010001,
    0b0100000100010100,
    0b0100000100010101,
    0b0100000101000000,
    0b0100000101000001,
    0b0100000101000100,
    0b0100000101000101,
    0b0100000101010000,
    0b0100000101010001,
    0b0100000101010100,
    0b0100000101010101,
    0b0100010000000000,
    0b0100010000000001,
    0b0100010000000100,
    0b0100010000000101,
    0b0100010000010000,
    0b0100010000010001,
    0b0100010000010100,
    0b0100010000010101,
    0b0100010001000000,
    0b0100010001000001,
    0b0100010001000100,
    0b0100010001000101,
    0b0100010001010000,
    0b0100010001010001,
    0b0100010001010100,
    0b0100010001010101,
    0b0100010100000000,
    0b0100010100000001,
    0b0100010100000100,
    0b0100010100000101,
    0b0100010100010000,
    0b0100010100010001,
    0b0100010100010100,
    0b0100010100010101,
    0b0100010101000000,
    0b0100010101000001,
    0b0100010101000100,
    0b0100010101000101,
    0b0100010101010000,
    0b0100010101010001,
    0b0100010101010100,
    0b0100010101010101,
    0b0101000000000000,
    0b0101000000000001,
    0b0101000000000100,
    0b0101000000000101,
    0b0101000000010000,
    0b0101000000010001,
    0b0101000000010100,
    0b0101000000010101,
    0b0101000001000000,
    0b0101000001000001,
    0b0101000001000100,
    0b0101000001000101,
    0b0101000001010000,
    0b0101000001010001,
    0b0101000001010100,
    0b0101000001010101,
    0b0101000100000000,
    0b0101000100000001,
    0b0101000100000100,
    0b0101000100000101,
    0b0101000100010000,
    0b0101000100010001,
    0b0101000100010100,
    0b0101000100010101,
    0b0101000101000000,
    0b0101000101000001,
    0b0101000101000100,
    0b0101000101000101,
    0b0101000101010000,
    0b0101000101010001,
    0b0101000101010100,
    0b0101000101010101,
    0b0101010000000000,
    0b0101010000000001,
    0b0101010000000100,
    0b0101010000000101,
    0b0101010000010000,
    0b0101010000010001,
    0b0101010000010100,
    0b0101010000010101,
    0b0101010001000000,
    0b0101010001000001,
    0b0101010001000100,
    0b0101010001000101,
    0b0101010001010000,
    0b0101010001010001,
    0b0101010001010100,
    0b0101010001010101,
    0b0101010100000000,
    0b0101010100000001,
    0b0101010100000100,
    0b0101010100000101,
    0b0101010100010000,
    0b0101010100010001,
    0b0101010100010100,
    0b0101010100010101,
    0b0101010101000000,
    0b0101010101000001,
    0b0101010101000100,
    0b0101010101000101,
    0b0101010101010000,
    0b0101010101010001,
    0b0101010101010100,
    0b0101010101010101
]

var inverse_lookup_table = {}
for (var i in lookup_table){
    inverse_lookup_table[lookup_table[i]] = i
}

/*
 *  Original NES Palette
 */
var NES_palette = [
    [124,124,124],
    [0,0,252],
    [0,0,188],
    [68,40,188],
    [148,0,132],
    [168,0,32],
    [168,16,0],
    [136,20,0],
    [80,48,0],
    [0,120,0],
    [0,104,0],
    [0,88,0],
    [0,64,88],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [188,188,188],
    [0,120,248],
    [0,88,248],
    [104,68,252],
    [216,0,204],
    [228,0,88],
    [248,56,0],
    [228,92,16],
    [172,124,0],
    [0,184,0],
    [0,168,0],
    [0,168,68],
    [0,136,136],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [248,248,248],
    [60,188,252],
    [104,136,252],
    [152,120,248],
    [248,120,248],
    [248,88,152],
    [248,120,88],
    [252,160,68],
    [248,184,0],
    [184,248,24],
    [88,216,84],
    [88,248,152],
    [0,232,216],
    [120,120,120],
    [0,0,0],
    [0,0,0],
    [252,252,252],
    [164,228,252],
    [184,184,248],
    [216,184,248],
    [248,184,248],
    [248,164,192],
    [240,208,176],
    [252,224,168],
    [248,216,120],
    [216,248,120],
    [184,248,184],
    [184,248,216],
    [0,252,252],
    [248,216,248],
    [0,0,0],
    [0,0,0]
]

// euclidean distance example from ?
function colorDifference (pal1, pal2) {
    var sumOfSquares = 0
    for (var x in pal1)
        sumOfSquares += Math.pow(pal1[x] - pal2[x], 2)
    return Math.sqrt(sumOfSquares)
}

function get_nearest_color (color, color_set){
    color = color.slice(0,3)
    var diff_min = 99999
    var target_color = 0
    for (var c in color_set){
        var diff = colorDifference(color, color_set[c])
        if (diff < diff_min){
            diff_min = diff
            target_color = c
        }
    }
    return target_color
}

function sprites_to_bytes(sheet){
    var l = sheet.length
    var output = []
    for(var i = 0; i < l; i++){
        var r_spr = sheet[i]
        var new_hi = r_spr.map(x => inverse_lookup_table[(x & 0b1010101010101010) >> 1])
        var new_lo = r_spr.map(x => inverse_lookup_table[(x & 0b101010101010101)])
        output.push(...new_hi.slice(0,8).concat(new_lo.slice(0,8)))
        output.push(...new_hi.slice(8,16).concat(new_lo.slice(8,16)))
    }
    return output
}

var find_sprite = function(l, r){
    for (var i = 0; i < l.length; i++)
        if ((l[i] ^ r[i])) return false
    return true
}

function crop_bitmap(img, x, y, right, down){
    var m_canvas = document.createElement('canvas')
    var m_context = m_canvas.getContext('2d');
    m_canvas.width = right ? Math.min(right, img.width - x) : img.width - x
    m_canvas.height = down ? Math.min(down, img.height - y) : img.height - y
    m_context.drawImage(img, -x, -y) // Or at whatever offset you like
    return m_context.getImageData(0, 0, m_canvas.width, m_canvas.height)
}

function sprite_mask(length, width, height){
    if (length % width) console.error('Indivisible')
    var row_length = ~~(length / height)
    if (row_length % width) console.error('Indivisible')

    var indices = []

    for (var i = 0; i < row_length; i += width){
        var frame = []
        for (var j = 0; j < height; j += 1){
            frame.push(...Array.range(width, i + j * row_length))
        }
        indices.push(...frame)
    }
    return indices
}

function create_sprites_from_bitmap(img, tile_width, tile_height, 
    start_pos=0, limit, unique_pixels=[]) {
    // todo make this not tied to two tile high sprites
    var m_canvas = document.createElement('canvas')
    var m_context = m_canvas.getContext('2d');

    document.body.appendChild(m_canvas);

    m_canvas.width = img.width
    m_canvas.height = img.height
    if (img.width % tile_width || img.height % tile_height){
        console.error('Sheet is not divisible by tilesize', tile_width, tile_height)
    }

    var max_row = ~~(img.width / tile_width)
    var max_col = ~~(img.height / tile_height)
    var max_sprites = max_row * max_col
    if (limit)
        max_sprites = Math.min(max_sprites, limit)
    
    m_context.putImageData(img, 0, 0) // Or at whatever offset you like

    // enumerate all pixels
    // each pixel's r,g,b,a datum are stored in separate sequential array elements

    // or just use dict (but I hate uniterable dicts, curse javascript)
    var sprite_sheet = []
    var current_sprite_sheet = sprite_sheet

    for(var i=start_pos; i < max_sprites; i++){
        var x_in = (i % max_row) * tile_width
        var y_in = ~~(i / max_row) * tile_height
        var imgData = m_context.getImageData(x_in, y_in, tile_width, tile_height);
        m_context.clearRect(x_in, y_in, tile_width, tile_height)

        var data = imgData.data;
        var pixels = Array.split(data, 4).map(x => x.slice(0, 3))
        var new_spr = []
        for(var j=0; j<pixels.length; j++) {
            if (unique_pixels.find(x => find_sprite(x, pixels[j])) == undefined){
                unique_pixels.push(pixels[j])
            }
            var color_num = unique_pixels.findIndex(x => find_sprite(x, pixels[j]))
            new_spr.push(color_num)
        }
        sprite_sheet.push(new_spr)
    }

    return {
        sheet: sprite_sheet,
        colors: unique_pixels
    }
}

function extract_graphics(current_char, sheets = 0x80){
    /* 
     * Extracts X amount of 64 sprite sheets from CHR data
     * (usually located at the end of a dumped ROM)
     */

    var all_sprites = []
    for(var spr = 0; spr < sheets*64; spr++){
        var cur_sprite = current_char.slice(spr*16)
        var sprite = []
        for (var row = 0; row < 8; row++){
            var sprite_l = cur_sprite[0 + row]
            var sprite_r = cur_sprite[8 + row]
            var expanded_sprite_l = lookup_table[sprite_l] << 1
            var expanded_sprite_r = lookup_table[sprite_r]
            sprite.push((expanded_sprite_l | expanded_sprite_r))
        }
        all_sprites.push(sprite)
    }

    console.log('Sprites extracted')

    var parse_sprites = all_sprites.slice(0)
    var all_sheets = []
    while(parse_sprites.length && all_sheets.length < sheets){
        all_sheets.push(parse_sprites.slice(0, 0x40))
        parse_sprites = parse_sprites.slice(0x40)
    }

    return {
        sprites: all_sprites,
        all_sheets: all_sheets
    }
}

function convert_sprite_to_8x16(frame, width=2, mirror=[]){
    var sprite_tiles = []
    if (!width)
        width = 2
    frame = Array.split([...frame], width)
    mirror = Array.split([...mirror], width)
    for (var r in frame){
        var row = frame[r]
        var mirror_row = mirror[r] ? mirror[r] : []
        sprite_tiles.push(...row.map((x, y) => (((x % 2) == 0) ? (x) : (x + 0xFF)) + (mirror_row[y] ? 0x200 : 0)    ))
        sprite_tiles.push(...row.map((x, y) => (((x % 2) == 0) ? (x + 1) : (x + 0x100))  + (mirror_row[y] ? 0x200 : 0)    ))
    }
    return sprite_tiles
}

function convert_to_8x16(frame, mirror){
    var sprite_tiles = []
    frame = [...frame]
    if(!mirror)
        for (var i = 0; i < frame.length; i+=2){
            sprite_tiles.push(...frame.slice(i, i+2).map(x => ((x % 2) == 0) ? (x) : (x + 0xFF)))
            sprite_tiles.push(...frame.slice(i, i+2).map(x => ((x % 2) == 0) ? (x + 1) : (x + 0x100)))
            if (mirror)
                sprite_tiles.push(...sprite_tiles.slice(sprite_tiles.length - 2).map(x => x + 0x200))
        }
    else
        for (var i = 0; i < frame.length; i+=2){
            sprite_tiles.push((frame[i] % 2 == 0) ? (frame[i]) : (0x100 + frame[i] - 1))
            sprite_tiles.push(sprite_tiles[sprite_tiles.length - 1] + 0x200)
            sprite_tiles.push(sprite_tiles[sprite_tiles.length - 2] + 1)
            sprite_tiles.push(sprite_tiles[sprite_tiles.length - 2] + 1)
        }
    return sprite_tiles
}


function create_bitmap(sprite, palette, transparency, x_flipped, y_flipped) {
    var i_offset = y_flipped ? 7 : 0
    var j_offset = x_flipped ? 7 : 0
    var bitmap_sprite = []
    for (var i = 0; i < 8; i++){
        var sprite_row = sprite[Math.abs(i - i_offset)]
        for (var j = 0; j < 8; j++){
            var pixel = (sprite_row >> (14 - 2*Math.abs(j-j_offset))) & 0b11
            if (pixel == 1) pixel = 2
            else if (pixel == 2) pixel = 1
            var pal_color = palette[pixel]
            var nes_color = NES_palette[pal_color % 64] 
            var color = {
                r: nes_color[0],
                g: nes_color[1],
                b: nes_color[2]
            } // r, b, g
            bitmap_sprite.push(...[color.r, color.g, color.b, (pixel == 0 && transparency) ? 0: 255])
        }
    }
    return bitmap_sprite
}

var hashed_bitmap = {}

function bitmap_from_graphics(loaded_sheets, sprites, width, palette, attribute){
    /*
     *  Create temporary canvas element and draw bitmap
     */

    var layer = null
    var hash = [loaded_sheets, sprites, width, palette, attribute, layer].toString()
    if (hashed_bitmap[hash]){
        return hashed_bitmap[hash]
    }
    console.debug('no cache hit')

    var m_canvas = document.createElement('canvas')
    m_canvas.width = 8 * width 
    m_canvas.height = 8 * Math.ceil(sprites.length/width)
    var m_context = m_canvas.getContext("2d")
    m_context.fillStyle='white'
    m_context.clearRect(0, 0, m_canvas.width, m_canvas.height);

    if (layer)
        m_context.putImageData(layer, 0, 0)

    for (var index in sprites){
        var spr_index = sprites[index]
        var x_flipped = (spr_index & 0x200) > 0
        var y_flipped = (spr_index & 0x400) > 0
        var x_loc = (index % width) * 8, y_loc = (~~(index / width) * 8)
        spr_index = spr_index % 0x200
        var my_sheet = loaded_sheets[~~(spr_index / 0x40)]
        if (my_sheet == undefined){
            m_context.clearRect(x_loc, y_loc, x_loc + 8, y_loc + 8)
        }
        else {
            var sprite = my_sheet[spr_index % 0x40]
            var bitmap_sprite = create_bitmap(sprite, palette, attribute, x_flipped, y_flipped)
            var bitmap = new ImageData(new Uint8ClampedArray(bitmap_sprite), 8)
            m_context.putImageData(bitmap, (index % width) * 8, (parseInt(index / width) * 8))
        }
    }

    hashed_bitmap[hash] = {
        image_data: m_context.getImageData(0, 0, m_canvas.width, m_canvas.height),
        data_url: m_canvas.toDataURL()
    }

    return hashed_bitmap[hash]
}

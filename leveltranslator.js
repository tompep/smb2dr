// enum definitions (rewrite to consts)
var BackgroundTileIds = [
    "BackgroundTile_Black",
    "BackgroundTile_BgCloudLeft",
    "BackgroundTile_BgCloudRight",
    "BackgroundTile_BgCloudSmall",
    "BackgroundTile_WaterfallTop",
    "BackgroundTile_Waterfall",
    "BackgroundTile_WaterfallSplash",
    "BackgroundTile_Chain",
    "BackgroundTile_WaterTop",
    "BackgroundTile_HouseLeft",
    "BackgroundTile_Water",
    "BackgroundTile_HouseMiddle",
    "BackgroundTile_WaterWhale",
    "BackgroundTile_HouseRight",
    "BackgroundTile_Unused0E",
    "BackgroundTile_Unused0F",
    "BackgroundTile_Unused10",
    "BackgroundTile_WaterWhaleTail",
    "BackgroundTile_JumpThroughBlock",
    "BackgroundTile_CloudLeft",
    "BackgroundTile_CloudMiddle",
    "BackgroundTile_CloudRight",
    "BackgroundTile_JumpThroughIce",
    "BackgroundTile_ChainStandable",
    "BackgroundTile_SolidBrick0",
    "BackgroundTile_GroundBrick0",
    "BackgroundTile_Spikes",
    "BackgroundTile_SolidRoundBrick0",
    "BackgroundTile_SolidBlock",
    "BackgroundTile_Grass",
    "BackgroundTile_CactusTop",
    "BackgroundTile_CactusMiddle",
    "BackgroundTile_FrozenRock",
    "BackgroundTile_LogPillarTop0",
    "BackgroundTile_LogPillarMiddle0",
    "BackgroundTile_ClawGripRock",
    "BackgroundTile_Unused23",
    "BackgroundTile_Unused24",
    "BackgroundTile_Unused25",
    "BackgroundTile_Unused26",
    "BackgroundTile_Unused27",
    "BackgroundTile_Unused28",
    "BackgroundTile_Unused29",
    "BackgroundTile_Unused2A",
    "BackgroundTile_Unused2B",
    "BackgroundTile_Unused2C",
    "BackgroundTile_Unused2D",
    "BackgroundTile_Unused2E",
    "BackgroundTile_Unused2F",
    "BackgroundTile_Unused30",
    "BackgroundTile_Unused31",
    "BackgroundTile_Unused32",
    "BackgroundTile_Unused33",
    "BackgroundTile_Unused34",
    "BackgroundTile_Unused35",
    "BackgroundTile_Unused36",
    "BackgroundTile_Unused37",
    "BackgroundTile_Unused38",
    "BackgroundTile_Unused39",
    "BackgroundTile_Unused3A",
    "BackgroundTile_Unused3B",
    "BackgroundTile_Unused3C",
    "BackgroundTile_Unused3D",
    "BackgroundTile_Unused3E",
    "BackgroundTile_Unused3F",
    "BackgroundTile_Sky",
    "BackgroundTile_SubspaceMushroom1",
    "BackgroundTile_SubspaceMushroom2",
    "BackgroundTile_GrassCoin",
    "BackgroundTile_GrassLargeVeggie",
    "BackgroundTile_GrassSmallVeggie",
    "BackgroundTile_GrassRocket",
    "BackgroundTile_GrassShell",
    "BackgroundTile_GrassBomb",
    "BackgroundTile_GrassPotion",
    "BackgroundTile_Grass1UP",
    "BackgroundTile_GrassPow",
    "BackgroundTile_GrassBobOmb",
    "BackgroundTile_GrassInactive",
    "BackgroundTile_Cherry",
    "BackgroundTile_DoorTop",
    "BackgroundTile_DoorBottomLock",
    "BackgroundTile_DoorBottom",
    "BackgroundTile_LightDoor",
    "BackgroundTile_LightTrailRight",
    "BackgroundTile_LightTrail",
    "BackgroundTile_LightTrailLeft",
    "BackgroundTile_LightDoorEndLevel",
    "BackgroundTile_DoorBottomLockStuck",
    "BackgroundTile_DrawBridgeChain",
    "BackgroundTile_Whale",
    "BackgroundTile_WhaleEye",
    "BackgroundTile_Phanto",
    "BackgroundTile_TreeBackgroundLeft",
    "BackgroundTile_TreeBackgroundMiddleLeft",
    "BackgroundTile_TreeBackgroundRight",
    "BackgroundTile_TreeBackgroundMiddleRight",
    "BackgroundTile_WhaleTopLeft",
    "BackgroundTile_WhaleTop",
    "BackgroundTile_WhaleTopRight",
    "BackgroundTile_WhaleTail",
    "BackgroundTile_JumpThroughMachineBlock",
    "BackgroundTile_Bridge",
    "BackgroundTile_BridgeShadow",
    "BackgroundTile_ConveyorLeft",
    "BackgroundTile_ConveyorRight",
    "BackgroundTile_MushroomBlock",
    "BackgroundTile_Unused6AMushroomBlock",
    "BackgroundTile_Unused6BMushroomBlock",
    "BackgroundTile_POWBlock",
    "BackgroundTile_Unused6D",
    "BackgroundTile_SolidBrick1",
    "BackgroundTile_JarTopPointer",
    "BackgroundTile_JarMiddle",
    "BackgroundTile_JarBottom",
    "BackgroundTile_JarSmall",
    "BackgroundTile_JarTopGeneric",
    "BackgroundTile_JarTopNonEnterable",
    "BackgroundTile_LogLeft",
    "BackgroundTile_LogMiddle",
    "BackgroundTile_LogRight",
    "BackgroundTile_LogRightTree",
    "BackgroundTile_LogPillarTop1",
    "BackgroundTile_LogPillarMiddle1",
    "BackgroundTile_Unused7B",
    "BackgroundTile_Unused7C",
    "BackgroundTile_Unused7D",
    "BackgroundTile_Unused7E",
    "BackgroundTile_Unused7F",
    "BackgroundTile_Ladder",
    "BackgroundTile_LadderShadow",
    "BackgroundTile_PalmTreeTrunk",
    "BackgroundTile_DarkDoor",
    "BackgroundTile_PyramidLeftAngle",
    "BackgroundTile_PyramidLeft",
    "BackgroundTile_PyramidRight",
    "BackgroundTile_PyramidRightAngle",
    "BackgroundTile_StarBg1",
    "BackgroundTile_StarBg2",
    "BackgroundTile_QuicksandSlow",
    "BackgroundTile_QuicksandFast",
    "BackgroundTile_HornTopLeft",
    "BackgroundTile_HornTopRight",
    "BackgroundTile_HornBottomLeft",
    "BackgroundTile_HornBottomRight",
    "BackgroundTile_BackgroundBrick",
    "BackgroundTile_JumpthroughSand",
    "BackgroundTile_JumpthroughWoodBlock",
    "BackgroundTile_DiggableSand",
    "BackgroundTile_LadderStandable",
    "BackgroundTile_LadderStandableShadow",
    "BackgroundTile_JumpthroughSandBlock",
    "BackgroundTile_JumpthroughBrick",
    "BackgroundTile_98",
    "BackgroundTile_SolidSand",
    "BackgroundTile_9A",
    "BackgroundTile_SolidBrick2",
    "BackgroundTile_GroundBrick2",
    "BackgroundTile_BombableBrick",
    "BackgroundTile_9E",
    "BackgroundTile_RockWallAngle",
    "BackgroundTile_RockWall",
    "BackgroundTile_RockWallOffset",
    "BackgroundTile_SolidRoundBrick2",
    "BackgroundTile_SolidBrick2Wall",
    "BackgroundTile_SolidWood",
    "BackgroundTile_RockWallEyeLeft",
    "BackgroundTile_RockWallEyeRight",
    "BackgroundTile_RockWallMouth",
    "BackgroundTile_WindowTop" ,
    "BackgroundTile_DoorwayTop",
    "BackgroundTile_ColumnPillarTop2",
    "BackgroundTile_ColumnPillarMiddle2",
    "BackgroundTile_UnusedAC",
    "BackgroundTile_UnusedAD",
    "BackgroundTile_UnusedAE",
    "BackgroundTile_UnusedAF",
    "BackgroundTile_UnusedB0" ,
    "BackgroundTile_UnusedB1",
    "BackgroundTile_UnusedB2",
    "BackgroundTile_UnusedB3",
    "BackgroundTile_UnusedB4",
    "BackgroundTile_UnusedB5",
    "BackgroundTile_UnusedB6",
    "BackgroundTile_UnusedB7",
    "BackgroundTile_UnusedB8",
    "BackgroundTile_UnusedB9",
    "BackgroundTile_UnusedBA",
    "BackgroundTile_UnusedBB",
    "BackgroundTile_UnusedBC",
    "BackgroundTile_UnusedBD",
    "BackgroundTile_UnusedBE",
    "BackgroundTile_UnusedBF",
    "BackgroundTile_PalmTreeTop",
    "BackgroundTile_VineTop",
    "BackgroundTile_Vine",
    "BackgroundTile_VineBottom",
    "BackgroundTile_ClimbableSky",
    "BackgroundTile_UnusedC5",
    "BackgroundTile_BackgroundColor3",
    "BackgroundTile_GreenPlatformLeft",
    "BackgroundTile_GreenPlatformMiddle",
    "BackgroundTile_GreenPlatformRight",
    "BackgroundTile_GreenPlatformTopLeft",
    "BackgroundTile_MushroomTopLeft",
    "BackgroundTile_GreenPlatformTop",
    "BackgroundTile_MushroomTopMiddle",
    "BackgroundTile_GreenPlatformTopRight",
    "BackgroundTile_MushroomTopRight",
    "BackgroundTile_GreenPlatformTopLeftOverlap",
    "BackgroundTile_GreenPlatformTopRightOverlap",
    "BackgroundTile_GreenPlatformTopLeftOverlapEdge",
    "BackgroundTile_GreenPlatformTopRightOverlapEdge",
    "BackgroundTile_VineStandable",
    "BackgroundTile_SolidGrass",
    "BackgroundTile_SolidBrick3",
    "BackgroundTile_GroundBrick3",
    "BackgroundTile_UnusedD8",
    "BackgroundTile_UnusedD9",
    "BackgroundTile_UnusedDA",
    "BackgroundTile_UnusedDB",
    "BackgroundTile_UnusedDC",
    "BackgroundTile_UnusedDD",
    "BackgroundTile_UnusedDE",
    "BackgroundTile_UnusedDF",
    "BackgroundTile_UnusedE0",
    "BackgroundTile_UnusedE1",
    "BackgroundTile_UnusedE2",
    "BackgroundTile_UnusedE3",
    "BackgroundTile_UnusedE4",
    "BackgroundTile_UnusedE5",
    "BackgroundTile_UnusedE6",
    "BackgroundTile_UnusedE7",
    "BackgroundTile_UnusedE8",
    "BackgroundTile_UnusedE9",
    "BackgroundTile_UnusedEA",
    "BackgroundTile_UnusedEB",
    "BackgroundTile_UnusedEC",
    "BackgroundTile_UnusedED",
    "BackgroundTile_UnusedEE",
    "BackgroundTile_UnusedEF",
    "BackgroundTile_UnusedF0",
    "BackgroundTile_UnusedF1",
    "BackgroundTile_UnusedF2",
    "BackgroundTile_UnusedF3",
    "BackgroundTile_UnusedF4",
    "BackgroundTile_UnusedF5",
    "BackgroundTile_UnusedF6",
    "BackgroundTile_UnusedF7",
    "BackgroundTile_UnusedF8",
    "BackgroundTile_UnusedF9",
    "BackgroundTile_UnusedFA",
    "BackgroundTile_UnusedFB",
    "BackgroundTile_UnusedFC",
    "BackgroundTile_UnusedFD",
    "BackgroundTile_UnusedFE",
    "BackgroundTile_UnusedFF" 
]

var EnemyIds = [
    "Enemy_Heart",
    "Enemy_ShyguyRed",
    "Enemy_Tweeter",
    "Enemy_ShyguyPink",
    "Enemy_Porcupo",
    "Enemy_SnifitRed",
    "Enemy_SnifitGray",
    "Enemy_SnifitPink",
    "Enemy_Ostro",
    "Enemy_BobOmb",
    "Enemy_AlbatossCarryingBobOmb",
    "Enemy_AlbatossStartRight",
    "Enemy_AlbatossStartLeft",
    "Enemy_NinjiRunning",
    "Enemy_NinjiJumping",
    "Enemy_BeezoDiving",
    "Enemy_BeezoStraight",
    "Enemy_WartBubble",
    "Enemy_Pidgit",
    "Enemy_Trouter",
    "Enemy_Hoopstar",
    "Enemy_JarGeneratorShyguy",
    "Enemy_JarGeneratorBobOmb",
    "Enemy_Phanto",
    "Enemy_CobratJar",
    "Enemy_CobratSand",
    "Enemy_Pokey",
    "Enemy_Bullet",
    "Enemy_Birdo",
    "Enemy_Mouser",
    "Enemy_Egg",
    "Enemy_Tryclyde",
    "Enemy_Fireball",
    "Enemy_Clawgrip",
    "Enemy_ClawgripRock",
    "Enemy_PanserStationaryFiresAngled",
    "Enemy_PanserWalking",
    "Enemy_PanserStationaryFiresUp",
    "Enemy_Autobomb",
    "Enemy_AutobombFire",
    "Enemy_WhaleSpout",
    "Enemy_Flurry",
    "Enemy_Fryguy",
    "Enemy_FryguySplit",
    "Enemy_Wart",
    "Enemy_HawkmouthBoss",
    "Enemy_Spark1",
    "Enemy_Spark2",
    "Enemy_Spark3",
    "Enemy_Spark4",
    "Enemy_VegetableSmall",
    "Enemy_VegetableLarge",
    "Enemy_VegetableWart",
    "Enemy_Shell",
    "Enemy_Coin",
    "Enemy_Bomb",
    "Enemy_Rocket",
    "Enemy_MushroomBlock",
    "Enemy_POWBlock",
    "Enemy_FallingLogs",
    "Enemy_SubspaceDoor",
    "Enemy_Key",
    "Enemy_SubspacePotion",
    "Enemy_Mushroom",
    "Enemy_Mushroom1up",
    "Enemy_FlyingCarpet",
    "Enemy_HawkmouthRight",
    "Enemy_HawkmouthLeft",
    "Enemy_CrystalBall",
    "Enemy_Starman",
    "Enemy_Stopwatch",
    "Enemy_AttackAlbatossCarryingBobOmb",
    "Enemy_AttackBeezo",
    "Enemy_StopAttack",
    "Enemy_VegetableThrower",
    "Enemy_4B",
    "Enemy_4C",
    "Enemy_4D",
    "Enemy_4E",
    "Enemy_4F",
    "Enemy_50",
    "Enemy_51",
    "Enemy_52",
    "Enemy_53",
    "Enemy_54",
    "Enemy_55",
    "Enemy_56",
    "Enemy_57",
    "Enemy_58",
    "Enemy_59",
    "Enemy_5A",
    "Enemy_5B",
    "Enemy_BossBirdo",
    "Enemy_BossMouser",
    "Enemy_BossEgg",
    "Enemy_BossTryclyde",
    "Enemy_BossFireball",
    "Enemy_BossClawgrip",
    "Enemy_BossClawgripRock",
    "Enemy_BossPanserStationaryFiresAngled",
    "Enemy_BossPanserWalking",
    "Enemy_BossPanserStationaryFiresUp",
    "Enemy_BossAutobomb",
    "Enemy_BossAutobombFire",
    "Enemy_BossWhaleSpout",
    "Enemy_BossFlurry",
    "Enemy_BossFryguy",
    "Enemy_BossFryguySplit",
    "Enemy_BossWart",
    "Enemy_BossHawkmouthBoss",
    "Enemy_BossSpark1",
    "Enemy_BossSpark2",
    "Enemy_BossSpark3",
    "Enemy_BossSpark4",
    "Enemy_BossVegetableSmall",
    "Enemy_BossVegetableLarge",
    "Enemy_BossVegetableWart",
    "Enemy_BossShell",
    "Enemy_BossCoin",
    "Enemy_BossBomb",
    "Enemy_BossRocket",
    "Enemy_BossMushroomBlock",
    "Enemy_BossPOWBlock",
    "Enemy_BossFallingLogs",
    "Enemy_BossSubspaceDoor",
    "Enemy_BossKey",
    "Enemy_BossSubspacePotion",
    "Enemy_BossMushroom" 
]

// thx loginsinex
var MapObjectIds = [
    "Mushroom block",
    "POW block",
    "Bombable rock",
    "Vine",
    "Jar (small, can't go in)",
    "Ladder (1 square)",
    "Jar, extends to ground, can go in",
    "Jar, extends to ground, can go in (not the same as #06)",
    "Jar, extends to ground, can't go in (used for warp zones)",
    "Locked door",
    "Door",
    "Dark entrance",
    "Vine, extends to ground",
    "Vine, extends to ground (no top)",
    "Star background",
    "Red pillar, extends to ground",
    "Cloud",
    "Small cloud",
    "Vine, extends to top",
    "Entrance/exit (light right)",
    "Entrance/exit (light left)",
    "White entrance, extends to ground",
    "Tree, extends to ground",
    "Pyramid",
    "Brick background, extends to ground",
    "Brick wall, extends to ground",
    "Vegetable thrower (used in Wart's room)",
    "???",
    "Castle entrance 1",
    "Castle entrance 2",
    "Big mouth entrance used in desert",
    "Large red platform background, extends to ground",
    "Herb with coin",
    "Herb with fresh vegetable",
    "Herb with small vegetable",
    "Herb with rocket",
    "Herb with turtle shell",
    "Herb with bomb",
    "Herb with potion",
    "Herb with 1UP",
    "Herb with POW",
    "Cherry",
    "Herb with Bob-omb",
    "1st sub-space Mushroom",
    "White/red evil head",
    "2nd sub-space Mushroom",
    "Whale eye",
    "Wood wall, 1 square"
]

var MapObjectIdsExtendable = [
    "",
    "",
    "",
    "X-Blocks [1]",
    "X-Blocks [2]",
    "Herb(s) with small vegetable",
    "Bridge",
    "Spikes barrier",
    "Column of bombable rock",
    "Column of brown brick",
    "Ladder",
    "Whale",
    "Green platform",
    "Red wood platform",
    "Cloud platform",
    "Waterfall"
]

var const_special_bytes = 0xF0
var special_zerobyte = [0xF2, 0xF3, 0xF4, 0xF7, 0xF8, 0xF9, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE, 0xFF]
var special_onebyte = [0xF0, 0xF1, 0xF6]
var special_twobyte = [0xF5]
var obj_ladders = [3, 5, 12, 13, 18, 55]
var obj_doors = [9, 10, 11, 19, 20, 21, 28, 29, 30]
var obj_vase_ptr = [6]
var obj_rocket = [35]
var obj_vase_fake = [7]

////// create bytes
function write_enemy_bytes(dictionary, page_cnt){
    var output = []
    for (var i = 0; i < page_cnt; i++){
        var enemy_by_page = dictionary.filter(function page_sort(p){ return p.pos_page === i })
        var cnt = 1 + 2*enemy_by_page.length
        output.push(cnt)
        for (var index in enemy_by_page){
            var x = enemy_by_page[index]
            output.push(x.obj_type)
            output.push((x.pos_y << 4) + x.pos_x)
        }
    }
    return output
}

function write_level_bytes(lvl, ptrs, grounds, world=0){
    var output = []
    var sorted = lvl.sort(function(a, b) {
        return a.layer - b.layer || a.pos_page - b.pos_page || a.pos_y - b.pos_y || a.pos_x - b.pos_x
    })
    var sortedground = grounds 

    // for each layer that isn't empty
    for (var layer = 0; layer < 10; layer++){
        var layer_objs = sorted.filter(x => x.layer === layer)
        //console.log('....', layer_objs)
        if (layer_objs.length === 0) break
        else if (layer > 0) output.push(0xf4)

        var lasty = 15
        // for each page, get objs
        for (var i = 0; i < 10; i++){
            var page_objs = layer_objs.filter(x => x.pos_page === i)
            var destobj = ptrs.filter(x => x.pos_page === i)
            var grouobjs = sortedground.filter(x => x.pos_page === i)
            if (destobj.length > 0) destobj = destobj[0]
            else destobj = undefined

            // subtract by 15 to offset last position
            //   if no object exists, will continue to subtract 15
            //   if any objects exist, lasty will end up greater than 0 until next page
            var obj = page_objs[0]
            var g_obj = grouobjs[0] 
            lasty = lasty - 15

            for (var j = 0; j < page_objs.length; j++){
                var obj = page_objs[j]
                var cur_y = obj.pos_y - lasty
                // due to subtraction, new position is distance between last
                //   if greater than 15, adjust until it is back to the top of current page
                if(cur_y >= 15){
                    var cnt = Math.ceil(Math.abs((lasty / 15)))
                    // console.log(cur_y, lasty, i, cnt)
                    while (cnt > 0){
                        if (output[output.length-1] === 0xf2) output[output.length-1] = 0xf3
                        else output.push(0xf2)
                        cnt -= 1
                    }
                    cur_y = obj.pos_y
                }
                lasty = obj.pos_y

                var posbyte = (Math.abs(cur_y) << 4) + obj.pos_x
                var objbyte = obj.obj_type

                output.push(posbyte)
                output.push(objbyte)
                // push door here
                if (obj_doors.includes(objbyte)){
                    if (destobj != undefined) {
                        if (world >= 5){
                            output.push(0xf5)
                        }
                        output.push(destobj.l_byte)
                        output.push(destobj.r_byte)
                        destobj = undefined
                    }
                    else {
                        console.log('no ptr push')
                        output.push(0)
                        output.push(0)
                    }
                }
            }

            // at end of page, push ground objects and pointrs
            //   if objs didn't exist, lasty will be negative, add pages until correct
            if (layer === 0 && (destobj != undefined || grouobjs.length > 0)){ 
                if (lasty < 0){
                    while (lasty < 0){
                        lasty += 15
                        if (output[output.length-1] === 0xf2) output[output.length-1] = 0xf3
                        else output.push(0xf2)
                    }
                    lasty = 0
                }
                for (var j = 0; j < grouobjs.length; j++){
                    obj = grouobjs[j]
                    output.push(obj.obj_type)
                    output.push(obj.param)
                }
                // if door is on another layer, it's a problem
                if (destobj != undefined) {
                    output.push(0xf5)
                    output.push(destobj.l_byte)
                    output.push(destobj.r_byte)
                }
            }
        }
    }

    output.push(0xff)

    return output
}



/////// extract stuff

function create_smb_object(type, x, y, page, layer=0, param=0){
    var obj_name = MapObjectIds[type]
    if (obj_name === undefined) obj_name = MapObjectIdsExtendable[type>>4]
    return {
        obj_name: obj_name,
        obj_type: type,
        pos_x: x,
        pos_y: y,
        pos_page: page,
        layer: layer
    }
}

function create_smb_enemy(type, x, y, page){
    var obj_name = EnemyIds[type]
    return {
        obj_name: obj_name,
        obj_type: type,
        pos_x: x,
        pos_y: y,
        pos_page: page
    }
}

function extract_ptrs(bytes, number_of_ptrs, swap=false){
    var ptrs = []
    for (var i = 0; i < number_of_ptrs; i++) {
        var j = number_of_ptrs + i
        var new_ptr = (bytes[j] << 8) + bytes[i]
        if (swap){
            new_ptr = bytes[j] + (bytes[i] << 8)
        }
        ptrs.push(new_ptr)
    }  
    return ptrs
}

function extract_door_ptr(l, r){
    return {
        obj_type: 0xf5,
        dest_page: r & 0x0f,
        room: r >> 4,
        world: Math.floor(l / 3),
        level: l % 3,
        level_room: l * 10 + (r >> 4),
        l_byte: l,
        r_byte: r
    }
}

function extract_level_bytes(bytes){
    var ptr_order = bytes.slice(0, 21)
    var remainder = bytes.slice(21, 420 + 21)
    var my_ptrs = extract_ptrs(remainder, 210)
    my_ptrs = my_ptrs.map(x => x - 0x8000)
    var my_headers = my_ptrs.map(x => bytes.slice(x, x+4))
    var my_data = my_ptrs.map(x => bytes.slice(x+4, x+256))
    return {h: my_headers, l: my_data}
}

function extract_enemy_bytes(bytes){
    // skip top ptrs
    var all_ptrs = []
    for (var i = 84; i < 84 + 420; i += 20) {
        var my_ptrs = extract_ptrs(bytes.slice(i), 10, true)
        all_ptrs.push(...my_ptrs)
    }
    all_ptrs = all_ptrs.map(x => x - 0xA500)
    var my_data = all_ptrs.map(x => bytes.slice(x, x+256))
    return my_data
}

function move_page_position(current_y, current_page, next_p){
    var xpage = current_page
    var pleft = next_p >> 4
    var pright = next_p % 0x10
    current_y += pleft
    if (current_y >= 0x0F){
        current_y = (current_y + 1) % 0x10
        xpage += 1
    }
    return {
        new_page: xpage,
        new_y: current_y,
        new_x: pright
    }
}

function read_object(level_bytes, world=0) {
    var ytile = 0
    var xtile = 0
    var xpage = 0 
    var layer = 0 
    var ptrs = []
    var objs = []
    var grounds = []
    for (var i = 0; i < level_bytes.length; i++) {
        var b = level_bytes[i]
        if (b >= const_special_bytes) {
            if (special_zerobyte.includes(b)){
                ytile = 0
                if (b == 0xf2) { xpage += 1 }
                if (b == 0xf3) { xpage += 2 }
                if (b == 0xf4) { xpage = 0; layer += 1 }
                if (b == 0xff) { break }
            }
            else if (special_onebyte.includes(b)){
                var param = level_bytes[++i]
                grounds.push({
                    obj_type: b,
                    param: param,
                    layer: 0,
                    pos_x: 0,
                    pos_y: ytile,
                    pos_page: xpage
                })
            }
            else if (special_twobyte.includes(b)){
                var WorldLevel = level_bytes[++i]
                var RoomPage = level_bytes[++i]
                ptrs[xpage] = extract_door_ptr(WorldLevel, RoomPage)
                ptrs[xpage].pos_page = xpage
            }
        }
        else{
            var new_pos = move_page_position(ytile, xpage, b)
            xpage = new_pos.new_page
            ytile = new_pos.new_y
            xtile = new_pos.new_x
            b = level_bytes[++i]
            if (obj_doors.includes(b) && world < 5){
                var WorldLevel = level_bytes[++i]
                var RoomPage = level_bytes[++i]
                ptrs[xpage] = extract_door_ptr(WorldLevel, RoomPage)
                ptrs[xpage].pos_page = xpage
            }
            objs.push(create_smb_object(b, xtile, ytile, xpage, layer))
        }
    }
    return {
        ptrs: ptrs,
        objs: objs,
        grounds, grounds
    }
}

function read_enemies(enemy_bytes, pages){
    var xpage = 0
    var enemies = []
    for (var i = 0; i < enemy_bytes.length; i++) {
        var cnt = enemy_bytes[i]
        for (var j = 1; j < cnt; j+=2){
            var obj_type = enemy_bytes[i+j]
            var new_pos = move_page_position(0, xpage, enemy_bytes[i+j+1])
            enemies.push(create_smb_enemy(obj_type, new_pos.new_x, new_pos.new_y, xpage))
        }
        i += cnt - 1
        if (++xpage > pages) break
    }
    return enemies
}

function read_header(header_bytes){
    var header_json = {
        vertical:     (header_bytes[0] & 0b10000000) == 0,
        unk1:         (header_bytes[0] & 0b01000000) >> 6,
        pala:         (header_bytes[0] & 0b00111000) >> 3,
        unk2:         (header_bytes[0] & 0b00000100) >> 2,
        palb:         (header_bytes[0] & 0b00000011) >> 0,
        unk3:         (header_bytes[1] & 0b11100000) >> 5,
        groundset:    (header_bytes[1] & 0b00011111) >> 0,
        pages:        (header_bytes[2] & 0b11110000) >> 4,
        groundtype:   (header_bytes[2] & 0b00001111) >> 0,
        unk4:         (header_bytes[3] & 0b11000000) >> 6,
        exteriortype: (header_bytes[3] & 0b00111000) >> 3,
        unk5:         (header_bytes[3] & 0b00000100) >> 2,
        music:        (header_bytes[3] & 0b00000011) >> 0
    }
    return header_json
}
    
// var reader = new FileReader()
var fs = require("fs")
 
var contents_full = fs.readFileSync("smb2.nes")
// Remove iNes header
var contents = contents_full.slice(0x10)

var block = 0x2000

var level_block = block * 8

var bytes = contents.slice(level_block)
var hl_pairs = extract_level_bytes([...contents.slice(level_block)])
var my_headers = hl_pairs.h
var my_levels = hl_pairs.l
var my_enemies = extract_enemy_bytes([...contents.slice(level_block + block + 0x500)])
var my_h = read_header(my_headers[2])
var my_l = read_object(my_levels[2])
var my_e = read_enemies(my_enemies[2], my_h.pages)
var new_l=  write_level_bytes(my_l.objs, my_l.ptrs, my_l.grounds)
for (var i = 0; i < my_levels[2].length; i++){
    //console.log(my_levels[2][i], new_l[i])
}
//console.log(my_levels[2].slice(0,30))

var ptr_order = bytes.slice(0, 21)
var remainder = bytes.slice(21, 420 + 21)
var all_ptrs = extract_ptrs(remainder, 210)


var new_my_levels = []
for (var i = 0; i < my_levels.length - 10; i++){
    var my_l = read_object(my_levels[i], i / 30)
    var my_o = my_l.objs
    var my_p = my_l.ptrs
    if (i % 10 == 0) new_my_levels[i] = my_levels[i]
    for (var j = 0; j < my_p.length; j++){
        var ptr = my_p[j]
        if (ptr != undefined){
            var pos = ptr.world * 30 + ptr.level * 10 + ptr.room
            new_my_levels[pos] = my_levels[pos]
        }
    }
    for (var j = 0; j < my_o.length; j++){
        var obj = my_o[j]
        if (obj_vase_fake.includes(obj.obj_type)){
            var pos = i - (i % 10) + 4
            new_my_levels[pos] = my_levels[pos]
        }
    }
}
console.log(all_lvls)

var allcnt = 21 + 420
var ecnt = 0
var all_lvls = 0
var all_new_ptrs_l = [] 
var all_new_ptrs_h = [] 
var all_new_data = []
var all_new_enmy = []
for (var i = 0; i < my_levels.length; i++){
    if (new_my_levels[i] === undefined || i >= 200){
        var new_ptr = 0x8000 + allcnt
        all_new_ptrs_h.push(new_ptr >> 8)
        all_new_ptrs_l.push(new_ptr % 256)
        continue
    }
    if (i%30 == 0) console.log("world", i / 30)
    if (i%10 == 0) console.log("level", (i / 10) % 3)
    //console.log('#', i, all_new_data.length, my_levels.length)
    all_lvls++
    var my_h = read_header(my_headers[i])
    var my_l = read_object(new_my_levels[i], (((i-(i%30))/30))    )
    var my_e = read_enemies(my_enemies[i], my_h.pages)
    my_l.header = my_h
    my_l.enemies = my_e
    fs.writeFileSync('./levels/' + (((i-(i%30))/30)).toString() + '/' + i.toString() + '.json', JSON.stringify(my_l, undefined, 4))
    //console.log(write_level_bytes(my_l.objs, my_l.ptrs, my_l.grounds))
    //console.log(write_enemy_bytes(my_e, my_h['pages']))
    var new_ptr = 0x8000 + allcnt + all_new_data.length
    for (var j = 0; j < my_l.objs.length; j++){
        obj = my_l.objs[j]
        if (obj_doors.includes(obj.obj_type)){
            my_l.objs[j].obj_type = 11
        } 
    }
    //console.log(my_headers[i].length)
    all_new_data.push(...my_headers[i])
    all_new_data.push(...write_level_bytes(my_l.objs, my_l.ptrs, my_l.grounds, ((i-(i%30))/30)))
    
    console.log(all_ptrs[i].toString(16))
    console.log(new_ptr.toString(16))

    all_new_ptrs_h.push(new_ptr >> 8)
    all_new_ptrs_l.push(new_ptr % 256)
    ecnt += write_enemy_bytes(my_e, my_h['pages']).length
}

var final_bytes = [...ptr_order]
final_bytes.push(...all_new_ptrs_l)
final_bytes.push(...all_new_ptrs_h)
final_bytes.push(...all_new_data)

var offset = 0x10000 + 0x10
for (var i = 0; i < final_bytes.length; i++) {
    contents_full[offset + i] = final_bytes[i]
}

fs.writeFile('./smb2-newout.nes', contents_full)

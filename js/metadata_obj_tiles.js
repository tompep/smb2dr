
var sheet_names = {
    "Sheet_CharSelect": 0x30,
    "Sheet_CharCheer": 0x31,
    "Sheet_CharMini": 0x48,
}


// enum definitions (rewrite to consts)
var BackgroundTileIds = [
    "Tile_Black", // $00
    "Tile_BgCloudLeft", // $01
    "Tile_BgCloudRight", // $02
    "Tile_BgCloudSmall", // $03
    "Tile_WaterfallTop", // $04
    "Tile_Waterfall", // $05
    "Tile_WaterfallSplash", // $06
    "Tile_Chain", // $07
    "Tile_WaterTop", // $08
    "Tile_HouseLeft", // $09
    "Tile_Water", // $0A
    "Tile_HouseMiddle", // $0B
    "Tile_WaterWhale", // $0C
    "Tile_HouseRight", // $0D
    "Tile_Unused0E", // $0E
    "Tile_Unused0F", // $0F
    "Tile_Unused10", // $10
    "Tile_WaterWhaleTail", // $11
    "Tile_JumpThroughBlock", // $12
    "Tile_CloudLeft", // $13
    "Tile_CloudMiddle", // $14
    "Tile_CloudRight", // $15
    "Tile_JumpThroughIce", // $16
    "Tile_ChainStandable", // $17
    "Tile_SolidBrick0", // $18
    "Tile_GroundBrick0", // $19
    "Tile_Spikes", // $1A
    "Tile_SolidRoundBrick0", // $1B
    "Tile_SolidBlock", // $1C
    "Tile_CactusTop", // $1D
    "Tile_CactusMiddle", // $1E
    "Tile_FrozenRock", // $1F
    "Tile_LogPillarTop0", // $20
    "Tile_LogPillarMiddle0", // $21
    "Tile_ClawGripRock", // $22
    "Tile_Unused23", // $23 ; These are just solid palette-swapped mirrors of $40
    "Tile_Unused24", // $24
    "Tile_Unused25", // $25
    "Tile_Unused26", // $26
    "Tile_Unused27", // $27
    "Tile_Unused28", // $28
    "Tile_Unused29", // $29
    "Tile_Unused2A", // $2A
    "Tile_Unused2B", // $2B
    "Tile_Unused2C", // $2C
    "Tile_Unused2D", // $2D
    "Tile_Unused2E", // $2E
    "Tile_Unused2F", // $2F
    "Tile_Unused30", // $30
    "Tile_Unused31", // $31
    "Tile_Unused32", // $32
    "Tile_Unused33", // $33
    "Tile_Unused34", // $34
    "Tile_Unused35", // $35
    "Tile_Unused36", // $36
    "Tile_Unused37", // $37
    "Tile_Unused38", // $38
    "Tile_Unused39", // $39
    "Tile_Unused3A", // $3A
    "Tile_Unused3B", // $3B
    "Tile_Unused3C", // $3C
    "Tile_Unused3D", // $3D
    "Tile_Unused3E", // $3E
    "Tile_Unused3F", // $3F
    "Tile_Sky", // $40
    "Tile_SubspaceMushroom1", // $41
    "Tile_SubspaceMushroom2", // $42
    "Tile_GrassCoin", // $43
    "Tile_GrassLargeVeggie", // $44
    "Tile_GrassSmallVeggie", // $45
    "Tile_GrassRocket", // $46
    "Tile_GrassShell", // $47
    "Tile_GrassBomb", // $48
    "Tile_GrassPotion", // $49
    "Tile_Grass1UP", // $4A
    "Tile_GrassPow", // $4B
    "Tile_GrassBobOmb", // $4C
    "Tile_GrassInactive", // $4D
    "Tile_Cherry", // $4E
    "Tile_DoorTop", // $4F
    "Tile_DoorBottomLock", // $50
    "Tile_DoorBottom", // $51
    "Tile_LightDoor", // $52
    "Tile_LightTrailRight", // $53
    "Tile_LightTrail", // $54
    "Tile_LightTrailLeft", // $55
    "Tile_LightDoorEndLevel", // $56
    "Tile_DoorBottomLockStuck", // $57
    "Tile_DrawBridgeChain", // $58
    "Tile_Whale", // $59
    "Tile_WhaleEye", // $5A
    "Tile_Phanto", // $5B
    "Tile_TreeBackgroundLeft", // $5C
    "Tile_TreeBackgroundMiddleLeft", // $5D
    "Tile_TreeBackgroundRight", // $5E
    "Tile_TreeBackgroundMiddleRight", // $5F
    "Tile_WhaleTopLeft", // $60
    "Tile_WhaleTop", // $61
    "Tile_WhaleTopRight", // $62
    "Tile_WhaleTail", // $63
    "Tile_JumpThroughMachineBlock", // $64
    "Tile_Bridge", // $65
    "Tile_BridgeShadow", // $66
    "Tile_ConveyorLeft", // $67
    "Tile_ConveyorRight", // $68
    "Tile_MushroomBlock", // $69
    "Tile_Unused6AMushroomBlock", // $6A
    "Tile_Unused6BMushroomBlock", // $6B
    "Tile_POWBlock", // $6C
    "Tile_Unused6D", // $6D ; Used to mark where the liftable blocks end
    "Tile_SolidBrick1", // $6E
    "Tile_JarTopPointer", // $6F
    "Tile_JarMiddle", // $70
    "Tile_JarBottom", // $71
    "Tile_JarSmall", // $72
    "Tile_JarTopGeneric", // $73
    "Tile_JarTopNonEnterable", // $74
    "Tile_LogLeft", // $75
    "Tile_LogMiddle", // $76
    "Tile_LogRight", // $77
    "Tile_LogRightTree", // $78
    "Tile_LogPillarTop1", // $79
    "Tile_LogPillarMiddle1", // $7A
    "Tile_Unused7B", // $7B
    "Tile_Unused7C", // $7C
    "Tile_Unused7D", // $7D
    "Tile_Unused7E", // $7E
    "Tile_Unused7F", // $7F
    "Tile_Ladder", // $80
    "Tile_LadderShadow", // $81
    "Tile_PalmTreeTrunk", // $82
    "Tile_DarkDoor", // $83
    "Tile_PyramidLeftAngle", // $84
    "Tile_PyramidLeft", // $85
    "Tile_PyramidRight", // $86
    "Tile_PyramidRightAngle", // $87
    "Tile_StarBg1", // $88
    "Tile_StarBg2", // $89
    "Tile_QuicksandSlow", // $8A
    "Tile_QuicksandFast", // $8B
    "Tile_HornTopLeft", // $8C
    "Tile_HornTopRight", // $8D
    "Tile_HornBottomLeft", // $8E
    "Tile_HornBottomRight", // $8F
    "Tile_BackgroundBrick", // $90
    "Tile_JumpthroughSand", // $91
    "Tile_JumpthroughWoodBlock", // $92
    "Tile_DiggableSand", // $93
    "Tile_LadderStandable", // $94
    "Tile_LadderStandableShadow", // $95
    "Tile_JumpthroughSandBlock", // $96
    "Tile_JumpthroughBrick", // $97
    "Tile_98", // $98
    "Tile_SolidSand", // $99
    "Tile_9A", // $9A
    "Tile_SolidBrick2", // $9B
    "Tile_GroundBrick2", // $9C
    "Tile_BombableBrick", // $9D
    "Tile_JarWall", // $9E ; solid color, solid wall
    "Tile_RockWallAngle", // $9F
    "Tile_RockWall", // $A0
    "Tile_RockWallOffset", // $A1
    "Tile_SolidRoundBrick2", // $A2
    "Tile_SolidBrick2Wall", // $A3
    "Tile_SolidWood", // $A4
    "Tile_RockWallEyeLeft", // $A5 ; World 6
    "Tile_RockWallEyeRight", // $A6 ; World 6
    "Tile_RockWallMouth", // $A7 ; World 6
    "Tile_WindowTop", // $A8 ; World 7
    "Tile_DoorwayTop", // $A9 ; World 7
    "Tile_ColumnPillarTop2", // $AA
    "Tile_ColumnPillarMiddle2", // $AB
    "Tile_UnusedAC", // $AC
    "Tile_UnusedAD", // $AD
    "Tile_UnusedAE", // $AE
    "Tile_UnusedAF", // $AF
    "Tile_UnusedB0", // $B0 ; These are just solid palette-swapped mirrors of $C4
    "Tile_UnusedB1", // $B1
    "Tile_UnusedB2", // $B2
    "Tile_UnusedB3", // $B3 ; SolidPlatformLeft2
    "Tile_UnusedB4", // $B4 ; SolidPlatformMiddle2
    "Tile_UnusedB5", // $B5 ; SolidPlatformRight2
    "Tile_UnusedB6", // $B6 ; SolidPlatformTopLeft2
    "Tile_UnusedB7", // $B7
    "Tile_UnusedB8", // $B8 ; SolidPlatformTop2
    "Tile_UnusedB9", // $B9
    "Tile_UnusedBA", // $BA ; SolidPlatformTopRight2
    "Tile_UnusedBB", // $BB
    "Tile_UnusedBC", // $BC ; SolidPlatformTopLeftOverlap2
    "Tile_UnusedBD", // $BD ; SolidPlatformTopRightOverlap2
    "Tile_UnusedBE", // $BE ; SolidPlatformTopLeftOverlapEdge2
    "Tile_UnusedBF", // $BF ; SolidPlatformTopRightOverlapEdge2
    "Tile_PalmTreeTop", // $C0
    "Tile_VineTop", // $C1
    "Tile_Vine", // $C2
    "Tile_VineBottom", // $C3
    "Tile_ClimbableSky", // $C4
    "Tile_UnusedC5", // $C5
    "Tile_JarOutsideBackground", // $C6 ; solid color, background
    "Tile_GreenPlatformLeft", // $C7
    "Tile_GreenPlatformMiddle", // $C8
    "Tile_GreenPlatformRight", // $C9
    "Tile_GreenPlatformTopLeft", // $CA
    "Tile_MushroomTopLeft", // $CB
    "Tile_GreenPlatformTop", // $CC
    "Tile_MushroomTopMiddle", // $CD
    "Tile_GreenPlatformTopRight", // $CE
    "Tile_MushroomTopRight", // $CF
    "Tile_GreenPlatformTopLeftOverlap", // $D0
    "Tile_GreenPlatformTopRightOverlap", // $D1
    "Tile_GreenPlatformTopLeftOverlapEdge", // $D2
    "Tile_GreenPlatformTopRightOverlapEdge", // $D3
    "Tile_VineStandable", // $D4
    "Tile_SolidGrass", // $D5
    "Tile_SolidBrick3", // $D6
    "Tile_GroundBrick3", // $D7 ; World 7
    "Tile_UnusedD8", // $D8
    "Tile_UnusedD9", // $D9
    "Tile_UnusedDA", // $DA
    "Tile_UnusedDB", // $DB
    "Tile_UnusedDC", // $DC
    "Tile_UnusedDD", // $DD
    "Tile_UnusedDE", // $DE
    "Tile_UnusedDF", // $DF
    "Tile_UnusedE0", // $E0
    "Tile_UnusedE1", // $E1
    "Tile_UnusedE2", // $E2
    "Tile_UnusedE3", // $E3
    "Tile_UnusedE4", // $E4
    "Tile_UnusedE5", // $E5
    "Tile_UnusedE6", // $E6
    "Tile_UnusedE7", // $E7
    "Tile_UnusedE8", // $E8
    "Tile_UnusedE9", // $E9
    "Tile_UnusedEA", // $EA
    "Tile_UnusedEB", // $EB
    "Tile_UnusedEC", // $EC
    "Tile_UnusedED", // $ED
    "Tile_UnusedEE", // $EE
    "Tile_UnusedEF", // $EF
    "Tile_UnusedF0", // $F0
    "Tile_UnusedF1", // $F1
    "Tile_UnusedF2", // $F2
    "Tile_UnusedF3", // $F3
    "Tile_UnusedF4", // $F4
    "Tile_UnusedF5", // $F5
    "Tile_UnusedF6", // $F6
    "Tile_UnusedF7", // $F7
    "Tile_UnusedF8", // $F8
    "Tile_UnusedF9", // $F9
    "Tile_UnusedFA", // $FA
    "Tile_UnusedFB", // $FB
    "Tile_UnusedFC", // $FC
    "Tile_UnusedFD", // $FD
    "Tile_UnusedFE", // $FE
    "Tile_UnusedFF" // $FF
]

var tileEnum = {}
BackgroundTileIds.forEach((x,y) => tileEnum[x.replace('Tile_')] = y)


var EnemyIds = [
    "Enemy_Heart", // 0
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
    "Enemy_BeezoDiving", // 15
    "Enemy_BeezoStraight", // 16
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
    "Enemy_Fireball", // 32
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
    "Enemy_Spark3", // 48
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
    "Enemy_Mushroom1up", // 64
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

var enemyEnum = {}
EnemyIds.forEach((x,y) => enemyEnum[x.replace('Enemy_', '')] = y)

// thx loginsinex
var MapObjectIds = [
    "Mushroom block", // 0 
    "POW block",
    "Bombable rock",
    "Vine",
    "Jar small",
    "Ladder 1 square",
    "Jar generic",
    "Jar ptr",
    "Jar warp",
    "Locked door",
    "Door",
    "Dark entrance",
    "Vine extends to ground",
    "Vine extends to ground no top",
    "Star background",
    "Red pillar extends to ground",
    "Cloud", // 16
    "Small cloud",
    "Vine extends to top",
    "Entrance exit light right",
    "Entrance exit light left",
    "Entrance extends to ground",
    "Tree extends to ground",
    "Pyramid",
    "Brick background extends to ground",
    "Brick wall extends to ground",
    "Vegetable thrower used in Warts room",
    "???",
    "Castle entrance 1",
    "Castle entrance 2",
    "Big mouth entrance used in desert",
    "Large red platform background",
    "Herb with coin", // 32
    "Herb with fresh vegetable",
    "Herb with small vegetable",
    "Herb with rocket",
    "Herb with turtle shell",
    "Herb with bomb",
    "Herb with potion",
    "Herb with 1UP",
    "Herb with POW", // 40 0x28
    "Cherry",
    "Herb with Bob omb",
    "1st sub space Mushroom", // 43 0x2b
    "White red evil head",
    "2nd sub space Mushroom", // 45 0x2d
    "Whale eye",
    "Wood wall 1 square"
]

var objEnum = {}
MapObjectIds.forEach((x,y) => objEnum[x.replaceAll(' ', '_')] = y)

function get_map_obj_id (num) {
    if (num < 0x30)
        return MapObjectIds[num]
    else
        return MapObjectIdsExtendable[num >> 4]
}

var MapObjectIdsExtendable = [
    "null0", //0
    "null1", //1
    "null2", //2
    "X_Blocks_1", //3
    "X_Blocks_2", //4
    "Herbs_with_small_vegetable", //5
    "Bridge", //_6
    "Spikes_barrier", //_7
    "Column_of_bombable_rock", //_8
    "Column_of_brown_brick", //_9
    "Ladder", //_a
    "Whale_and_Drawbridge_BX_patched", //_BX_water_frozen_frozen_bridge_"
    "Green_platform_CX_patched", //_green_green_whale_mush"
    "Red_wood_platform", //_d
    "Cloud_platform", //_e
    "Waterfall" //_f
]

MapObjectIdsExtendable.map((x,y) => objEnum[x] = y * 0x10)

var blacklist = {
    "0,0,5":[0,1,2],
    "0,1,0":[3,4,5,6,7,8,9],
    "0,1,1":[0,1,2],
    "1,2,3":[3,4,5,6],
    "2,0,4":[0,1],
    "2,1,0":null,
    "2,1,1":null,
    "5,2,4":[0, 1, 2],
    "6,1,2":null,
    "6,1,4":null,
    "6,1,6":[6, 7, 8, 9]
}

var patches = {
    "2,0,1": [{page: [6], add: objEnum.Herb_with_rocket, target: 0}],
    "3,2,1": [{page: [4], add: objEnum.Herb_with_rocket, target: 0}],
    "3,2,3": [{page: [6], add: objEnum.Herb_with_rocket, target: 0}],
    "4,0,1": [{page: [8], add: objEnum.Herb_with_rocket, target: 0}],
    "4,1,3": [{page: [6], add: objEnum.Herb_with_rocket, target: 0}],
    "6,0,1": [{page: [0], add: objEnum.Herb_with_rocket, target: 6}],
    "6,0,3": [{page: [0], add: objEnum.Herb_with_rocket, target: 3}],
}

var tbl= {
    "*":0XCF,
    "0":0xD0, "1":0xD1, "2":0xD2, "3":0xD3, "4":0xD4, "5":0xD5, "6":0xD6, "7":0xD7, "8":0xD8, "9":0xD9,
    "A":0xDA, "B":0xDB, "C":0xDC, "D":0xDD, "E":0xDE, "F":0xDF, "G":0xE0, "H":0xE1, "I":0xE2, "J":0xE3,
    "K":0xE4, "L":0xE5, "M":0xE6, "N":0xE7, "O":0xE8, "P":0xE9, "Q":0xEA, "R":0xEB, "S":0xEC, "T":0xED,
    "U":0xEE, "V":0xEF, "W":0xF0, "X":0xF1, "Y":0xF2, "Z":0xF3, "-":0xF4, "?":0xF5, ".":0xF6, ",":0xF7,
    "@":0xF8, " ":0xFB
}

var i_tbl = []
for (var key in tbl)
    i_tbl[tbl[key]] = key

function convertByTbl(string, minlength=0xF){
    string = string.toUpperCase().split("")
    return string.map(x => x in tbl ? tbl[x] : 0xCF).concat(Array(Math.max(minlength - string.length, 0)).fill(0xFB))
}

function invertByTbl(bytes){
    return [...bytes].map(x => i_tbl[x] != undefined ? i_tbl[x] : "?").join('')
}

var ClimbableTiles = [
    tileEnum.Tile_Vine,
    tileEnum.Tile_VineStandable,
    tileEnum.Tile_VineBottom,
    tileEnum.Tile_ClimbableSky,
    tileEnum.Tile_Chain,
    tileEnum.Tile_Ladder,
    tileEnum.Tile_LadderShadow,
    tileEnum.Tile_LadderStandable,
    tileEnum.Tile_LadderStandableShadow,
    tileEnum.Tile_ChainStandable
]

var bankEnum = {
    "CHRBank_Mario":  0x00,
    "CHRBank_Luigi":  0x01,
    "CHRBank_Princess":  0x02,
    "CHRBank_Toad":  0x03,
    "CHRBank_MarioSmall":  0x04,
    "CHRBank_LuigiSmall":  0x05,
    "CHRBank_PrincessSmall":  0x06,
    "CHRBank_ToadSmall":  0x07,
    "CHRBank_CommonEnemies1":  0x08,
    "CHRBank_CommonEnemies2":  0x09,
    "CHRBank_BackgroundGrassClawgrip":  0x0A,
    "CHRBank_EnemiesGrass":  0x0C,
    "CHRBank_EnemiesDesert":  0x0D,
    "CHRBank_EnemiesIce":  0x0E,
    "CHRBank_EnemiesSky":  0x0F,
    "CHRBank_BackgroundGrass":  0x10,
    "CHRBank_BackgroundDesert":  0x12,
    "CHRBank_BackgroundIce":  0x14,
    "CHRBank_BackgroundSky":  0x16,
    "CHRBank_Animated1":  0x18,
    "CHRBank_Animated2":  0x1A,
    "CHRBank_Animated3":  0x1C,
    "CHRBank_Animated4":  0x1E,
    "CHRBank_Animated5":  0x20,
    "CHRBank_Animated6":  0x22,
    "CHRBank_Animated7":  0x24,
    "CHRBank_Animated8":  0x26,
    "CHRBank_TitleScreenBG1":  0x28,
    "CHRBank_TitleScreenBG2":  0x2A,
    "CHRBank_CharacterSelectBG1":  0x2C,
    "CHRBank_CharacterSelectBG2":  0x2E,
    "CHRBank_CharacterSelectSprites":  0x30,
    "CHRBank_ChanceBG1":  0x34,
    "CHRBank_ChanceBG2":  0x36,
    "CHRBank_CelebrationBG1":  0x38,
    "CHRBank_CelebrationBG2":  0x3A,
    "CHRBank_CharExtra1":  0x3C,
    "CHRBank_CharExtra2":  0x3D,
    "CHRBank_CharExtra3":  0x3E,
    "CHRBank_CharExtra4":  0x3F,
    "CHRBank_TitleCardGrass":  0x40,
    "CHRBank_TitleCardDesert":  0x42,
    "CHRBank_TitleCardIce":  0x44,
    "CHRBank_TitleCardSky":  0x46,
    "CHRBank_EndingSprites":  0x48,
    "CHRBank_EndingCast1":  0x4C,
    "CHRBank_EndingCast2":  0x4D,
    "CHRBank_EndingCast3":  0x4E,
    "CHRBank_EndingCast4":  0x4F,
    "CHRBank_EndingBackground1":  0x50,
    "CHRBank_EndingBackground2":  0x54,
    "CHRBank_EndingBackground3":  0x58,
    "CHRBank_EndingBackground4":  0x5C,
    "CHRBank_EndingBackground5":  0x60,
    "CHRBank_EndingBackground6":  0x64,
    "CHRBank_EndingBackground7":  0x68,
    "CHRBank_EndingBackground8":  0x6C
}

var worldTileset = [0x10, 0x12, 0x10, 0x14, 0xA, 0x12, 0x16]
var worldTileset_enemy = [0xC, 0xD, 0xC, 0xE, 0xC, 0xD, 0xF]

var const_special_bytes = 0xF0
var special_zerobyte = [0xF2, 0xF3, 0xF4, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE, 0xFF]
var special_onebyte = [0xF0, 0xF1, 0xF6, 0xF7, 0xF8]
var special_twobyte = [0xF5]
var obj_ladders = [3, 5, 12, 13, 18, 55]
var obj_doors = [9, 10, 11, 19, 20, 21, 28, 29, 30]
var obj_vase_ptr = [6]
var obj_rocket = [35]
var obj_vase_fake = [7]
var obj_unmoveable = obj_ladders.concat(obj_doors.slice(obj_doors.length - 3)) 
var world_ptr_limit = -1


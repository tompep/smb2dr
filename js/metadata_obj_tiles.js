
// enum definitions (rewrite to consts)

var worldTileset = [0x10, 0x12, 0x10, 0x14, 0x10, 0x12, 0x16]
var worldTileset_enemy = [0xC, 0xD, 0xC, 0xE, 0xC, 0xD, 0xF]

var BackgroundTileIds = [
    "BackgroundTile_Black", // $00
    "BackgroundTile_BgCloudLeft", // $01
    "BackgroundTile_BgCloudRight", // $02
    "BackgroundTile_BgCloudSmall", // $03
    "BackgroundTile_WaterfallTop", // $04
    "BackgroundTile_Waterfall", // $05
    "BackgroundTile_WaterfallSplash", // $06
    "BackgroundTile_Chain", // $07
    "BackgroundTile_WaterTop", // $08
    "BackgroundTile_HouseLeft", // $09
    "BackgroundTile_Water", // $0A
    "BackgroundTile_HouseMiddle", // $0B
    "BackgroundTile_WaterWhale", // $0C
    "BackgroundTile_HouseRight", // $0D
    "BackgroundTile_Unused0E", // $0E
    "BackgroundTile_Unused0F", // $0F
    "BackgroundTile_Unused10", // $10
    "BackgroundTile_WaterWhaleTail", // $11
    "BackgroundTile_JumpThroughBlock", // $12
    "BackgroundTile_CloudLeft", // $13
    "BackgroundTile_CloudMiddle", // $14
    "BackgroundTile_CloudRight", // $15
    "BackgroundTile_JumpThroughIce", // $16
    "BackgroundTile_ChainStandable", // $17
    "BackgroundTile_SolidBrick0", // $18
    "BackgroundTile_GroundBrick0", // $19
    "BackgroundTile_Spikes", // $1A
    "BackgroundTile_SolidRoundBrick0", // $1B
    "BackgroundTile_SolidBlock", // $1C
    "BackgroundTile_CactusTop", // $1D
    "BackgroundTile_CactusMiddle", // $1E
    "BackgroundTile_FrozenRock", // $1F
    "BackgroundTile_LogPillarTop0", // $20
    "BackgroundTile_LogPillarMiddle0", // $21
    "BackgroundTile_ClawGripRock", // $22
    "BackgroundTile_Unused23", // $23 ; These are just solid palette-swapped mirrors of $40
    "BackgroundTile_Unused24", // $24
    "BackgroundTile_Unused25", // $25
    "BackgroundTile_Unused26", // $26
    "BackgroundTile_Unused27", // $27
    "BackgroundTile_Unused28", // $28
    "BackgroundTile_Unused29", // $29
    "BackgroundTile_Unused2A", // $2A
    "BackgroundTile_Unused2B", // $2B
    "BackgroundTile_Unused2C", // $2C
    "BackgroundTile_Unused2D", // $2D
    "BackgroundTile_Unused2E", // $2E
    "BackgroundTile_Unused2F", // $2F
    "BackgroundTile_Unused30", // $30
    "BackgroundTile_Unused31", // $31
    "BackgroundTile_Unused32", // $32
    "BackgroundTile_Unused33", // $33
    "BackgroundTile_Unused34", // $34
    "BackgroundTile_Unused35", // $35
    "BackgroundTile_Unused36", // $36
    "BackgroundTile_Unused37", // $37
    "BackgroundTile_Unused38", // $38
    "BackgroundTile_Unused39", // $39
    "BackgroundTile_Unused3A", // $3A
    "BackgroundTile_Unused3B", // $3B
    "BackgroundTile_Unused3C", // $3C
    "BackgroundTile_Unused3D", // $3D
    "BackgroundTile_Unused3E", // $3E
    "BackgroundTile_Unused3F", // $3F
    "BackgroundTile_Sky", // $40
    "BackgroundTile_SubspaceMushroom1", // $41
    "BackgroundTile_SubspaceMushroom2", // $42
    "BackgroundTile_GrassCoin", // $43
    "BackgroundTile_GrassLargeVeggie", // $44
    "BackgroundTile_GrassSmallVeggie", // $45
    "BackgroundTile_GrassRocket", // $46
    "BackgroundTile_GrassShell", // $47
    "BackgroundTile_GrassBomb", // $48
    "BackgroundTile_GrassPotion", // $49
    "BackgroundTile_Grass1UP", // $4A
    "BackgroundTile_GrassPow", // $4B
    "BackgroundTile_GrassBobOmb", // $4C
    "BackgroundTile_GrassInactive", // $4D
    "BackgroundTile_Cherry", // $4E
    "BackgroundTile_DoorTop", // $4F
    "BackgroundTile_DoorBottomLock", // $50
    "BackgroundTile_DoorBottom", // $51
    "BackgroundTile_LightDoor", // $52
    "BackgroundTile_LightTrailRight", // $53
    "BackgroundTile_LightTrail", // $54
    "BackgroundTile_LightTrailLeft", // $55
    "BackgroundTile_LightDoorEndLevel", // $56
    "BackgroundTile_DoorBottomLockStuck", // $57
    "BackgroundTile_DrawBridgeChain", // $58
    "BackgroundTile_Whale", // $59
    "BackgroundTile_WhaleEye", // $5A
    "BackgroundTile_Phanto", // $5B
    "BackgroundTile_TreeBackgroundLeft", // $5C
    "BackgroundTile_TreeBackgroundMiddleLeft", // $5D
    "BackgroundTile_TreeBackgroundRight", // $5E
    "BackgroundTile_TreeBackgroundMiddleRight", // $5F
    "BackgroundTile_WhaleTopLeft", // $60
    "BackgroundTile_WhaleTop", // $61
    "BackgroundTile_WhaleTopRight", // $62
    "BackgroundTile_WhaleTail", // $63
    "BackgroundTile_JumpThroughMachineBlock", // $64
    "BackgroundTile_Bridge", // $65
    "BackgroundTile_BridgeShadow", // $66
    "BackgroundTile_ConveyorLeft", // $67
    "BackgroundTile_ConveyorRight", // $68
    "BackgroundTile_MushroomBlock", // $69
    "BackgroundTile_Unused6AMushroomBlock", // $6A
    "BackgroundTile_Unused6BMushroomBlock", // $6B
    "BackgroundTile_POWBlock", // $6C
    "BackgroundTile_Unused6D", // $6D ; Used to mark where the liftable blocks end
    "BackgroundTile_SolidBrick1", // $6E
    "BackgroundTile_JarTopPointer", // $6F
    "BackgroundTile_JarMiddle", // $70
    "BackgroundTile_JarBottom", // $71
    "BackgroundTile_JarSmall", // $72
    "BackgroundTile_JarTopGeneric", // $73
    "BackgroundTile_JarTopNonEnterable", // $74
    "BackgroundTile_LogLeft", // $75
    "BackgroundTile_LogMiddle", // $76
    "BackgroundTile_LogRight", // $77
    "BackgroundTile_LogRightTree", // $78
    "BackgroundTile_LogPillarTop1", // $79
    "BackgroundTile_LogPillarMiddle1", // $7A
    "BackgroundTile_Unused7B", // $7B
    "BackgroundTile_Unused7C", // $7C
    "BackgroundTile_Unused7D", // $7D
    "BackgroundTile_Unused7E", // $7E
    "BackgroundTile_Unused7F", // $7F
    "BackgroundTile_Ladder", // $80
    "BackgroundTile_LadderShadow", // $81
    "BackgroundTile_PalmTreeTrunk", // $82
    "BackgroundTile_DarkDoor", // $83
    "BackgroundTile_PyramidLeftAngle", // $84
    "BackgroundTile_PyramidLeft", // $85
    "BackgroundTile_PyramidRight", // $86
    "BackgroundTile_PyramidRightAngle", // $87
    "BackgroundTile_StarBg1", // $88
    "BackgroundTile_StarBg2", // $89
    "BackgroundTile_QuicksandSlow", // $8A
    "BackgroundTile_QuicksandFast", // $8B
    "BackgroundTile_HornTopLeft", // $8C
    "BackgroundTile_HornTopRight", // $8D
    "BackgroundTile_HornBottomLeft", // $8E
    "BackgroundTile_HornBottomRight", // $8F
    "BackgroundTile_BackgroundBrick", // $90
    "BackgroundTile_JumpthroughSand", // $91
    "BackgroundTile_JumpthroughWoodBlock", // $92
    "BackgroundTile_DiggableSand", // $93
    "BackgroundTile_LadderStandable", // $94
    "BackgroundTile_LadderStandableShadow", // $95
    "BackgroundTile_JumpthroughSandBlock", // $96
    "BackgroundTile_JumpthroughBrick", // $97
    "BackgroundTile_98", // $98
    "BackgroundTile_SolidSand", // $99
    "BackgroundTile_9A", // $9A
    "BackgroundTile_SolidBrick2", // $9B
    "BackgroundTile_GroundBrick2", // $9C
    "BackgroundTile_BombableBrick", // $9D
    "BackgroundTile_JarWall", // $9E ; solid color, solid wall
    "BackgroundTile_RockWallAngle", // $9F
    "BackgroundTile_RockWall", // $A0
    "BackgroundTile_RockWallOffset", // $A1
    "BackgroundTile_SolidRoundBrick2", // $A2
    "BackgroundTile_SolidBrick2Wall", // $A3
    "BackgroundTile_SolidWood", // $A4
    "BackgroundTile_RockWallEyeLeft", // $A5 ; World 6
    "BackgroundTile_RockWallEyeRight", // $A6 ; World 6
    "BackgroundTile_RockWallMouth", // $A7 ; World 6
    "BackgroundTile_WindowTop", // $A8 ; World 7
    "BackgroundTile_DoorwayTop", // $A9 ; World 7
    "BackgroundTile_ColumnPillarTop2", // $AA
    "BackgroundTile_ColumnPillarMiddle2", // $AB
    "BackgroundTile_UnusedAC", // $AC
    "BackgroundTile_UnusedAD", // $AD
    "BackgroundTile_UnusedAE", // $AE
    "BackgroundTile_UnusedAF", // $AF
    "BackgroundTile_UnusedB0", // $B0 ; These are just solid palette-swapped mirrors of $C4
    "BackgroundTile_UnusedB1", // $B1
    "BackgroundTile_UnusedB2", // $B2
    "BackgroundTile_UnusedB3", // $B3 ; SolidPlatformLeft2
    "BackgroundTile_UnusedB4", // $B4 ; SolidPlatformMiddle2
    "BackgroundTile_UnusedB5", // $B5 ; SolidPlatformRight2
    "BackgroundTile_UnusedB6", // $B6 ; SolidPlatformTopLeft2
    "BackgroundTile_UnusedB7", // $B7
    "BackgroundTile_UnusedB8", // $B8 ; SolidPlatformTop2
    "BackgroundTile_UnusedB9", // $B9
    "BackgroundTile_UnusedBA", // $BA ; SolidPlatformTopRight2
    "BackgroundTile_UnusedBB", // $BB
    "BackgroundTile_UnusedBC", // $BC ; SolidPlatformTopLeftOverlap2
    "BackgroundTile_UnusedBD", // $BD ; SolidPlatformTopRightOverlap2
    "BackgroundTile_UnusedBE", // $BE ; SolidPlatformTopLeftOverlapEdge2
    "BackgroundTile_UnusedBF", // $BF ; SolidPlatformTopRightOverlapEdge2
    "BackgroundTile_PalmTreeTop", // $C0
    "BackgroundTile_VineTop", // $C1
    "BackgroundTile_Vine", // $C2
    "BackgroundTile_VineBottom", // $C3
    "BackgroundTile_ClimbableSky", // $C4
    "BackgroundTile_UnusedC5", // $C5
    "BackgroundTile_JarOutsideBackground", // $C6 ; solid color, background
    "BackgroundTile_GreenPlatformLeft", // $C7
    "BackgroundTile_GreenPlatformMiddle", // $C8
    "BackgroundTile_GreenPlatformRight", // $C9
    "BackgroundTile_GreenPlatformTopLeft", // $CA
    "BackgroundTile_MushroomTopLeft", // $CB
    "BackgroundTile_GreenPlatformTop", // $CC
    "BackgroundTile_MushroomTopMiddle", // $CD
    "BackgroundTile_GreenPlatformTopRight", // $CE
    "BackgroundTile_MushroomTopRight", // $CF
    "BackgroundTile_GreenPlatformTopLeftOverlap", // $D0
    "BackgroundTile_GreenPlatformTopRightOverlap", // $D1
    "BackgroundTile_GreenPlatformTopLeftOverlapEdge", // $D2
    "BackgroundTile_GreenPlatformTopRightOverlapEdge", // $D3
    "BackgroundTile_VineStandable", // $D4
    "BackgroundTile_SolidGrass", // $D5
    "BackgroundTile_SolidBrick3", // $D6
    "BackgroundTile_GroundBrick3", // $D7 ; World 7
    "BackgroundTile_UnusedD8", // $D8
    "BackgroundTile_UnusedD9", // $D9
    "BackgroundTile_UnusedDA", // $DA
    "BackgroundTile_UnusedDB", // $DB
    "BackgroundTile_UnusedDC", // $DC
    "BackgroundTile_UnusedDD", // $DD
    "BackgroundTile_UnusedDE", // $DE
    "BackgroundTile_UnusedDF", // $DF
    "BackgroundTile_UnusedE0", // $E0
    "BackgroundTile_UnusedE1", // $E1
    "BackgroundTile_UnusedE2", // $E2
    "BackgroundTile_UnusedE3", // $E3
    "BackgroundTile_UnusedE4", // $E4
    "BackgroundTile_UnusedE5", // $E5
    "BackgroundTile_UnusedE6", // $E6
    "BackgroundTile_UnusedE7", // $E7
    "BackgroundTile_UnusedE8", // $E8
    "BackgroundTile_UnusedE9", // $E9
    "BackgroundTile_UnusedEA", // $EA
    "BackgroundTile_UnusedEB", // $EB
    "BackgroundTile_UnusedEC", // $EC
    "BackgroundTile_UnusedED", // $ED
    "BackgroundTile_UnusedEE", // $EE
    "BackgroundTile_UnusedEF", // $EF
    "BackgroundTile_UnusedF0", // $F0
    "BackgroundTile_UnusedF1", // $F1
    "BackgroundTile_UnusedF2", // $F2
    "BackgroundTile_UnusedF3", // $F3
    "BackgroundTile_UnusedF4", // $F4
    "BackgroundTile_UnusedF5", // $F5
    "BackgroundTile_UnusedF6", // $F6
    "BackgroundTile_UnusedF7", // $F7
    "BackgroundTile_UnusedF8", // $F8
    "BackgroundTile_UnusedF9", // $F9
    "BackgroundTile_UnusedFA", // $FA
    "BackgroundTile_UnusedFB", // $FB
    "BackgroundTile_UnusedFC", // $FC
    "BackgroundTile_UnusedFD", // $FD
    "BackgroundTile_UnusedFE", // $FE
    "BackgroundTile_UnusedFF" // $FF
]

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

// thx loginsinex
var MapObjectIds = [
    "Mushroom block", // 0 
    "POW block",
    "Bombable rock",
    "Vine",
    "Jar (small, can't go in)",
    "Ladder (1 square)",
    "Jar, extends to ground, generic",
    "Jar, extends to ground, ptr",
    "Jar, extends to ground, warp",
    "Locked door",
    "Door",
    "Dark entrance",
    "Vine, extends to ground",
    "Vine, extends to ground (no top)",
    "Star background",
    "Red pillar, extends to ground",
    "Cloud", // 16
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
    "Herb with Bob-omb",
    "1st sub-space Mushroom", // 43 0x2b
    "White/red evil head",
    "2nd sub-space Mushroom", // 45 0x2d
    "Whale eye",
    "Wood wall, 1 square"
]

function get_map_obj_id (num) {
    if (num < 0x30)
        return MapObjectIds[num]
    else
        return MapObjectIdsExtendable[num >> 4]
}

var MapObjectIdsExtendable = [
    "", //0
    "", //1
    "", //2
    "X-Blocks [1]", //3
    "X-Blocks [2]", //4
    "Herb(s) with small vegetable", //5
    "Bridge", // 6
    "Spikes barrier", // 7
    "Column of bombable rock", // 8
    "Column of brown brick", // 9
    "Ladder", // a
    "Whale and Drawbridge (BX patched)", // (BX, water, frozen, frozen, bridge )"
    "Green platform (CX patched)", //, green green whale mush)"
    "Red wood platform", // d
    "Cloud platform", // e
     "Waterfall" // f
]

var metadata = {
    "0,0,0":"0>3",
    "0,0,5":"02<4",
    "0,1,0":"0>467",
    "0,1,1":"0>3",
    "1,2,3":"0>36",
    "2,0,1":"06>9",
    "2,0,4":"01<3",
    "2,1,0":"01/23/45/6",
    "2,1,1":"1<2/34/5<7",
    "2,1,2":"1<3",
    "3,2,1":"1>6<78",
    "3,2,3":"0>36",
    "4,0,1":"0>8",
    "4,1,3":"0>6",
    "5,2,4":"02<4",
    "6,0,1":"0<26",
    "6,0,3":"0<3",
    "6,1,2":"0/12/34/56/78/9",
    "6,1,4":"04<123/79",
    "6,1,6":"03/69"
}

var tbl= {
    '0':0xD0,
    '1':0xD1,
    '2':0xD2,
    '3':0xD3,
    '4':0xD4,
    '5':0xD5,
    '6':0xD6,
    '7':0xD7,
    '8':0xD8,
    '9':0xD9,
    'A':0xDA,
    'B':0xDB,
    'C':0xDC,
    'D':0xDD,
    'E':0xDE,
    'F':0xDF,
    'G':0xE0,
    'H':0xE1,
    'I':0xE2,
    'J':0xE3,
    'K':0xE4,
    'L':0xE5,
    'M':0xE6,
    'N':0xE7,
    'O':0xE8,
    'P':0xE9,
    'Q':0xEA,
    'R':0xEB,
    'S':0xEC,
    'T':0xED,
    'U':0xEE,
    'V':0xEF,
    'W':0xF0,
    'X':0xF1,
    'Y':0xF2,
    'Z':0xF3,
    '-':0xF4,
    '?':0xF5,
    '.':0xF6,
    ',':0xF7,
    '@':0xF8,
    ' ':0xFB
}

function convertByTbl(string, minlength=0xF){
    string = string.toUpperCase().split('')
    return string.map(x => x in tbl ? tbl[x] : 0xF5).concat(Array(Math.max(minlength - string.length, 0)).fill(0xFB))
}

function invertByTbl(string, minlength=0xF){
    string = string.toUpperCase().split('')
    return string.map(x => x in tbl ? tbl[x] : 0xF5).concat(Array(Math.max(minlength - string.length, 0)).fill(0xFB))
}

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


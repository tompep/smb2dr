This project uses GNU GPL v3.0... consult LICENSE.md for more info

# SMB2DR

Visit us at the SMB2R Discord!  Join others or report bugs...

## About
    SMB2 Door Randomizer is a project designed to alter and enhance the original Super Mario Bros 2, with the end goal to create "metroidvania" genre gameplay from the skeleton of the original structure.
    Additionally, in the future, providing extra ROMs will extract its level data and add them to the available level pool to randomize. 
    While fixing minor bugs, it also expands the range of random events and restrictions to challenge the player, while also including new powerups and mapping options.
    Visit the github pages for contribution, http://github.com/smb2randomizer

    NOTE: This program is in beta, and is such liable to experiencing bugs that may make the game incompleteable.
    Please report any bugs with a description, seed and optional save state.
    If there are UI bugs, please report with steps to replicate bug.

## Instructions
    Provide a US (U, USA) ROM of Super Mario Bros. 2 of either PRG0, PRG1, or REV A.
    Then, use the Randomizer tab to customize playstyle or pick a preset.
    Use Characters to pick or randomizer new characters, or create new characters (instructions pending)
    Use Maps to view loaded maps in the game (instructions pending)

    NOTE:  The randomizer currently cannot compound or use information of already randomized ROM files or non-basegame ROM files.
    Due to the volatility of character modifying and the nature of the beta, generated ROMs should be verified by hash.

## Gameplay
    Choose a type of Level Randomizer and Game objective to modify goals and play styles
    Level and World randomizers for a more classical play style
    Door randomizers for a more open-ended world
    
    Modify character, crystal and boss requirements required to finish the game vs Wart or at any Eagle/Boss

## Randomizer
    Many options are provided for modifying game contents, gameplay goals and restrictions.
    Each option provides its own tooltip describing its purpose.

    NOTE:  Options may generously consume more level data than expected;
    If a level consumes too much data, the game will suffer unintentional consequence.
    This will be mitigated/improved in future updates.

## Characters
    This randomizer provides a myriad of new characters along with the means to create your own!

    NOTE: interface is in progress, and may reflect information that is not indicative of in-game effects

    Getting started
        To create new character graphics, click Save Sheet on any complete character, then substitute each slot for your own.
        Large sprite frames may be 24 pixels wide, while all other sprite frames are 16 pixels wide.
        A palette will automatically be generated for large/small sprites and seperately for select/credit sprites.
        Adjust any stats and effects that may apply to your new character's abilities, then save your character preset.
        New palettes may be added by changing the generated palettes, 'Name' and 'Palette Name', and hitting '+' next to palette presets
        Certain abilities or characteristics use an additional frame provided at the end of large and small sprites.
        Wide sprites will adjust the entire large character to the center of the 24px sprite.
        
        NOTE:  A sprite sheet can only be compressed to 64 unique 8x16 "sprites";
        While the program will automatically adjust sprite usage, unintentional effects may occur if sprite data exceeds this limit.
        This compression will be improved/expanded over future updates.

    Characters provide their own stats and abilities that can change gameplay dramatically.

## Maps
    This randomizer provides a simple map viewer/editor for previewing maps and map changes.
    Adjust world, level and room values to view in-game levels.
    Rudimentary map editing can be accomplished through saving and loading JSON data.
    
## New Control Features
    Command inputs for various power-ups/upgrades
        B to activate a powerup
        Up + B to Store Item, or use a default powerup (if available)
        Hold Down for Ground Pound in mid-air (if available)
        Charge Jump for invincibility (if 8HP+ and has Power Walk, pending change)
        Tap/Hold A mid-air given certain abilities (Space Jump, Kirby Jump, Item Jump, Float Jump)
    B to skip slots, Start to pay 5 coins for a 1up
    Hold B while jumping underneath a Mushroom Block to pick it up
    Hit a POW block or Brick block from underneath to activate it
    Select + LR to switch characters (if Always Switch is on)
    Some powerups have unlisted effects...

## TODO pipe-line
    GAMEPLAY: Create more complex, gated and hub-based Door Randomization content
    GAMEPLAY: In-game map and inventory description, shops
    CODE: Modernize code-structure to mitigate inexperience with production JS.
    CODE: Verify game and character preset files and forms.
    CODE: Create a more fully fledged and accurate level editor.
    CODE: Create substitution logic for tileset graphics.
    ASM: Expand level space to at least 512 bytes, and include custom prefabs
    ASM: Create custom background tiles, and custom collision data
    ASM: Create more expandable custom tables for user-generated characters, ASM, frame data, etc

## Credits
    Programmed by pepperpowerhour (@pepperpowerhour)
    Prog assist by kmck, xkeeper (@xkeepah)

    Custom player graphics by Pako (@pakothepako)
    Other graphics by pepperpowerhour

    Special Thanks: Data Crystal, loginsinex, tetraly,
        rippers of Sprites-Resource, listed on games: Doki Doki Panic, SMB2, Castlevania, Pocket Bomberman...
        if credit withheld please contact
    libs used: jquery, seedrandom

    Mario, Link, DK, Wario and Super Mario Bros 2 copyright Nintendo,
    Simon, Bomberan copyright Konami...



/*
 * Lily Demos
 * Rocket Patrol: Epic Edition
 * Time taken: 6.5 hours
 * Mods: 
 *    Fire UI added (5), New tilemap (5), Speedup after 30 seconds (5), Randomized spaceship direction (5), 
 *    Rocket moveable while fired (5), Remaining time displayed (10), New title screen (10), New spaceship enemy (15),
 *    Randomized explosion sfx (10), high score display (5), Background music added (5)
 * Sources:
 *    https://phaser.discourse.group/t/how-to-remove-text/742
 *    https://www.html5gamedevs.com/topic/14039-call-a-function-in-the-update-method-only-once/
 *    https://gamedev.stackexchange.com/questions/182242/phaser-3-how-to-trigger-an-event-every-1-second
 */

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//UI size
let borderUIsize = game.config.height / 15;
let borderPadding = borderUIsize / 3;

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

let highScore = 0;
/*
 * Lily Demos
 * Title
 * Time taken: 1 hour currently
 * Mods: 
 *    Fire UI added, New tilemap (more stars, added asteroids)
 * Sources:
 *    https://phaser.discourse.group/t/how-to-remove-text/742
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
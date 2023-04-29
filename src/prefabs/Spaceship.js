//spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        // super(scene, x, y, texture, frame);

        // let direction = 0//Math.floor(Math.random());

        // this.points = pointValue;
        // if(direction) {
        //     scene.add.existing(this);
        //     this.moveSpeed = game.settings.spaceshipSpeed;
        // }
        // else {
        //     this.x = game.config.width - this.x;
        //     this.moveSpeed = game.settings.spaceshipSpeed * -1;
        // }

        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue; 
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update() {
        //move spaceship left
        this.x -= this.moveSpeed;

        //wrap around
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}
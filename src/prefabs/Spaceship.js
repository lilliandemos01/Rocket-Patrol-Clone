//spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        this.points = pointValue;

        //decide which side of screeen spaceship will spawn
        this.direction = Math.floor(Math.random() * 2);
        if(this.direction) {
            scene.add.existing(this);
            if(this.width > 40) {
                this.moveSpeed = game.settings.spaceshipSpeed;
            }
            else {
                this.moveSpeed = game.settings.fighterSpeed;
            }
        }
        else {
            this.x = 0
            scene.add.existing(this);
            if(this.width > 40) {
                this.moveSpeed = game.settings.spaceshipSpeed * -1;
            }
            else {
                this.moveSpeed = game.settings.fighterSpeed * -1;
            }
            this.flipX = true;
        }
    }

    update() {
        //move spaceship left
        this.x -= this.moveSpeed;

        //wrap around
        if(this.direction && this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
        else if(!this.direction && this.x >= game.config.width) {
            this.x = 0;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}
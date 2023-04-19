class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images and tilesprite
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");

        //load spritesheet
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //place tilesprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0, 0);

        //green UI background
        this.add.rectangle(0, borderUIsize + borderPadding, game.config.width, borderUIsize * 2, 0x00FF00).setOrigin(0, 0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUIsize, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUIsize, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add rocket(p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUIsize - borderPadding, "rocket").setOrigin(0.5, 0);

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUIsize * 6, borderUIsize * 4, "spaceship", 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUIsize * 3, borderUIsize * 5 + borderPadding * 2, 
                                    "spaceship", 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUIsize * 6 + borderPadding * 4, "spaceship", 0, 10).setOrigin(0, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            framerate: 30
        });    
    }

    update() {
        this.starfield.tilePositionX -= 4;

        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.ship03.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.ship02.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.ship01.reset();
        }
    }

    checkCollision(rocket, ship) {
        //AABB checking
        if(rocket.x < ship.x + ship.width && 
           rocket.x + rocket.width > ship.x && 
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship. y) {
            return true;
           }
        else {
            return false;
        }
    }

    shipExplode(ship) {
        
    }
}
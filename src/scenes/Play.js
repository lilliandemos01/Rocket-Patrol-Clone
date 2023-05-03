class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images and tilesprite
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("fighter", "./assets/fighter.png");
        this.load.image("starfield", "./assets/starfield_mod.png");

        //load spritesheet
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //place tilesprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0, 0);

        //add rocket(p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUIsize - borderPadding, "rocket").setOrigin(0.5, 0);

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUIsize * 6, borderUIsize * 5, "spaceship", 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUIsize * 3, borderUIsize * 6 + borderPadding * 2, 
                                     "spaceship", 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUIsize * 7 + borderPadding * 4, "spaceship", 0, 10).setOrigin(0, 0);
        //add new spaceship
        this.fighter01 = new Spaceship(this, game.config.width + borderUIsize * 9, borderUIsize * 4, "fighter", 0, 50).setOrigin(0, 0);

        //green UI background
        this.add.rectangle(0, borderUIsize + borderPadding, game.config.width, borderUIsize * 2, 0x00FF00).setOrigin(0, 0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUIsize, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUIsize, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

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

        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUIsize + borderPadding, borderUIsize + borderPadding * 2, `P1:${this.p1Score}`, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUIsize - borderPadding * 2 - scoreConfig.fixedWidth, 
                                       borderUIsize + borderPadding * 2, `HS:${highScore}`, scoreConfig).setOrigin(1, 0);

        //play background music
        let musicConfig = {
            loop: true
        };
        let background_music = this.sound.add("background_music", musicConfig);
        background_music.play();

        //display time remaining
        this.timer = 0;
        this.timeRemaining = game.settings.gameTimer / 1000;
        this.displayTime = this.add.text(game.config.width - borderUIsize -borderPadding, borderUIsize + borderPadding * 2, 
                                         this.timeRemaining, scoreConfig).setOrigin(1, 0);
        //game over flag
        this.gameOver = false;

        //clock
        this.speedup = false;
        this.speedupTime = 30000;
        scoreConfig.fixedWidth = 0;
        this.speedupClock = this.time.delayedCall(this.speedupTime, () => {
            this.speedup = true;
        }, null, this);

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, "Press (R) to Restart or <- for Menu", 
                          scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            background_music.stop();
            if(this.p1Score > highScore) {
                highScore = this.p1Score;
            }
            this.displayTime.text = 0;
        }, null, this);

        //create fire UI
        this.displayFire = this.add.text(game.config.width / 2, borderUIsize + borderPadding * 2, 
                                         "FIRE", scoreConfig).setOrigin(0.5, 0).setVisible(false);
    }

    update(time, delta) {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if(!this.gameOver) {
            this.starfield.tilePositionX -= 4;
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.fighter01.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.fighter01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.fighter01);
        }

        //display fire ui temproarily
        if(this.p1Rocket.isFiring) {
            this.displayFire.setVisible(true)
        }
        else {
            this.displayFire.setVisible(false)
        }

        //speedup
        if(this.speedup) {
            this.ship01.moveSpeed *= 1.3;
            this.ship02.moveSpeed *= 1.3;
            this.ship03.moveSpeed *= 1.3;
            this.fighter01.moveSpeed *= 1.3;
            this.speedup = false;
        }
        
        //update display time
        this.timer += delta;
        while (this.timer > 1000 && !this.gameOver) {
            this.timeRemaining--;
            this.displayTime.text = this.timeRemaining;
            this.timer -= 1000;
        }
    }

    checkCollision(rocket, ship) {
        //AABB checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship. y) {
            return true;
        }
        else {
            return false;
        }
    }

    shipExplode(ship) {
        //temp hide ship
        ship.alpha = 0;
        //create explosion sprite at ship position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //update score
        this.p1Score += ship.points;
        this.scoreLeft.text = `P1:${this.p1Score}`;

        let rand_sfx = Math.floor(Math.random() * 5);
        if(rand_sfx == 0)
            this.sound.play("sfx_explosion");
        else if(rand_sfx == 1)
            this.sound.play("sfx_explosion1");
        else if(rand_sfx == 2)
            this.sound.play("sfx_explosion2");
        else if(rand_sfx == 3)
            this.sound.play("sfx_explosion3");
        else if(rand_sfx == 4)
            this.sound.play("sfx_explosion4");
    }
}
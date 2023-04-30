class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio("sfx_select", "./assets/blip_select12.wav");
        this.load.audio("sfx_explosion", "./assets/explosion38.wav");
        this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");

        //load tileprite
        this.load.image("title_screen", "./assets/title_screen.png")
    }

    create() {
        //place tilesprite
        this.add.tileSprite(0, 0, 640, 480, "title_screen").setOrigin(0, 0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width / 2, borderUIsize, "ROCKET PATROL", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUIsize, "EPIC EDITION", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '28px';
        this.add.text(game.config.width / 2, game.config.height / 1.3, "Use <--> arrows to move & (F) to fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        this.add.text(game.config.width / 2, game.config.height / 1.3 + borderUIsize + borderPadding,
                      "Press <- for Novice or -> for Expert", menuConfig).setOrigin(0.5); 

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                fighterSpeed: 5,
                gameTimer: 10000
            };

            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 4,
                fighterSpeed: 6,
                gameTimer: 45000
            };

            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
    }
}
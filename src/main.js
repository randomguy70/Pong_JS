import TitleScene from "./scenes/titleScreen";

// class TitleScene extends Phaser.Scene {

// 	constructor() {
// 		super({key:'titleScene'});
// 	}

// 	preload() {
// 		// this.load.image('background', 'images/background.jpg');
// 	}

// 	create() {
		
// 		var text = this.add.text(100,100, 'Welcome to my game');
// 	}
// }

var titleScene = new TitleScene();

var config = {
	type: Phaser.AUTO,
	pixelArt: false,
	roundPixels: false,
	width: 1000,
	height: 700,
	backgroundColor: 0x000000,
	
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0, x: 0 },
			debug: true
		}
	},
	
	scenes: [ titleScene ]
};

var game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);

game.scene.start('titleScene');
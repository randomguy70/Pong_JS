import TitleScene from "./scenes/titleScreen.js";
import GameScene from "./scenes/game.js";

var titleScene = new TitleScene();
var gameScene = new GameScene();

const config = {
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
	
	scenes: [ titleScene, gameScene]
};

var game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);

game.scene.start('titleScene');
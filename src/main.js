import TitleScene from "./scenes/titleScene.js";
import GameScene from "./scenes/gameScene.js";
import StatsScene from "./scenes/statsScene.js";

var titleScene = new TitleScene();
var gameScene = new GameScene();
var statsScene = new StatsScene();

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
	
	scenes: [ titleScene, gameScene, statsScene]
};

var game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);
game.scene.add('gameScene', gameScene);
game.scene.add('statsScene', statsScene);

game.scene.start('titleScene');
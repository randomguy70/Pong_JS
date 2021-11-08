import EndScreen from './scenes/EndScreen'

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
		}h
	},
	
	scenes: [ EndScreen ]
};

var game = new Phaser.Game(config);
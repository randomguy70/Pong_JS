import Phaser from "phaser";

var player;
var stars;
var bombs;
var cursors;
var score = 0;
var scoreText;
	
var paddle = {
	width: 20,
	height: 100,
	sprite: 'paddle',
}
	
class main extends Phaser.Scene
{
	constructor()
	{
		super();
	}
	
	preload ()
	{
		this.load.image('sky', './public/assets/sky.jpeg');
		// this.load.image(paddle.sprite, './public/assets/paddle.png');
		// this.load.image('ball', './public/assets/ball.png');
		// this.objects = {};
	}
	
	create ()
	{
		this.add.image(40, 300, 'sky');
	}
	
	update ()
	{
	}
}

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: 0x000000,
	
	physics: {
		 default: 'arcade',
		 arcade: {
			  gravity: { y: 300 },
			  debug: false
		 }
	},
	
	scene: {
		 preload: preload,
		 create: create,
		 update: update
	}
};

const game = new Phaser.Game(config);
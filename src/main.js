// import MovingPlatform from "./classes/platforms";

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: 0x000000,
	
	physics: {
		 default: 'arcade',
		 arcade: {
			  gravity: { y: 0, x: 0 },
			  debug: false
		 }
	},
	
	scene: {
		 preload: preload,
		 create: create,
		 update: update
	}
};

var game = new Phaser.Game(config);

var player;
var ai;
var ball;

var paddle = {
	width: 20,
	height: 100,
	sprite: 'paddle',
}

var playerConfig = {
	startingX: 50,
	startingY: (config.height / 2) - (paddle.height / 2),
	velocityX: 0,
	velocityY: 0,
	scoreText: '',
}

var aiConfig = {
	startingX: config.width - (paddle.width + 50),
	startingY: (config.height / 2) - (paddle.height / 2),
	velocityX: 0,
	velocityY: 0,
}

var ballConfig = {
	velocityX: 300,
	velocityY: 300,
	
	startingX: (config.width / 2) - (30 / 2),
	startingY: (config.height / 2) - (30 / 2),
}

function preload()
{
	this.load.image('ball', '/public/assets/ball.png');
	this.load.image('paddle', '/public/assets/paddle.png');
}

function create()
{	
	player = this.physics.add.sprite(playerConfig.startingX, playerConfig.startingY, 'paddle').setOrigin(0, 0);
	ai = this.physics.add.sprite(aiConfig.startingX, aiConfig.startingY, 'paddle').setOrigin(0, 0);
	ball = this.physics.add.sprite(ballConfig.startingX, ballConfig.startingY, 'ball').setOrigin(0, 0);
	
	player.body.immovable = true;
	ai.body.immovable = true;
	
	player.setCollideWorldBounds(true);
	ai.setCollideWorldBounds(true);
	ball.setCollideWorldBounds(true);
		
	ball.setVelocityX(ballConfig.velocityX);
	ball.setVelocityY(ballConfig.velocityY);
	ball.setBounce(1);
	
	this.physics.add.collider(player, ball);
	this.physics.add.collider(ball, ai);
	
	cursor = this.input.keyboard.createCursorKeys();
}

function update()
{
	if(cursor.up.isDown)
	{
		player.setVelocityY(-playerConfig.velocityY);
	}
	else if(cursor.down.isDown)
	{
		player.setVelocityY(playerConfig.velocityY);
	}
	else
	{
		player.setVelocityY(0);
	}
}

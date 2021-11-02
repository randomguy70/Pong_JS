import MovingPlatform from "./classes/platforms";

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

var paddle = {
	width: 20,
	height: 100,
	sprite: 'paddle',
}

var game = new Phaser.Game(config);

var player;
var ai;
var ball;

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
	platforms = this.physics.add.group();
	
	player = new MovingPlatform(this, playerConfig.velocityX, playerConfig.startingY, 'paddle', {
		isStatic: true
	})
	ai = new MovingPlatform(this, aiConfig.startingX, aiConfig.startingY, 'paddle', {
		isStatic: true
	})
	
	ball = this.physics.add.sprite(ballConfig.startingX, ballConfig.startingY, 'ball');
	
	player.setCollideWorldBounds(true);
	ai.setCollideWorldBounds(true);
	ball.setCollideWorldBounds(true);
	
	ball.setVelocityX(ballConfig.velocityX);
	ball.setVelocityY(ballConfig.velocityY);
	ball.setBounce(1);
	
	this.physics.add.collider(player, ball, hitPlayer);
	this.physics.add.collider(ball, ai, hitAI);
	
	cursor = this.input.keyboard.createCursorKeys();
}

function update()
{
	if(cursor.up.isDown)
	{
		player.setVelocityY(-playerVelocityY);
	}
	else if(cursor.down.isDown)
	{
		player.setVelocityY(playerVelocityY);
	}
	else
	{
		player.setVelocityY(0);
	}
}

function hitPlayer()
{
	ballVelocityX *= -1;
		
	ball.setVelocityX(ballVelocityX);
	
	if(velocityY<0)
	{
		ballVelocityY *= -1
		ball.setVelocityY(ballVelocityY);
	}
	
}

function hitAI()
{
  	aiVelocityX *= -1;
	
	ball.setVelocityX(aiVelocityX);
	
  	if(aiVelocityY<0)
  	{
  	  	aiVelocityY *= -1
  	  	ball.setVelocityY(aiVelocityY);
  	}
	
}
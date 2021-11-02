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
	this.platforms = this.add.physicsGroup();
	
	player = this.platforms.create(this, playerConfig.startingX, playerConfig.startingY, 'paddle');
	ai = this.platforms.create(this, aiConfig.startingX, aiConfig.startingY, 'paddle');
	
	ball = this.physics.add.sprite(ballConfig.startingX, ballConfig.startingY, 'ball');
	
	this.platforms.setAll('body.allowGravity', false);
	this.platforms.setAll('body.immovable', true);
	this.platforms.setAll('body.velocity.y', 0);

	player.setCollideWorldBounds(true);
	ai.setCollideWorldBounds(true);
	ball.setCollideWorldBounds(true);
	
	ball.setVelocityX(ballConfig.velocityX);
	ball.setVelocityY(ballConfig.velocityY);
	ball.setBounce(1);
	// 
	this.physics.add.collider(player, ball, hitPlayer);
	this.physics.add.collider(ball, ai, hitAI);
	// 
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
	ballConfig.velocityX *= -1;
	
	ball.setVelocityX(ballConfig.velocityX);
	
	if(velocityY<0)
	{
		ballConfig.velocityY *= -1
		ball.setVelocityY(ballConfig.velocityY);
	}
	
}

function hitAI()
{
  	aiConfig.velocityX *= -1;
	
	ball.setVelocityX(aiConfig.velocityX);
	
  	if(aiConfig.velocityY<0)
  	{
		aiConfig.velocityY *= -1
  	  	ball.setVelocityY(aiConfig.velocityY);
  	}
	
}
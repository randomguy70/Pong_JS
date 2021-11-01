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

// player properties
var playerStartingX = 100;
var playerStartingY = 100;

var playerVelocityX = 0;
var playerVelocityY = 300;

// ai properties
var aiStartingX   = 400;
var aiStartingY   = 100;
var aiVelocityX   = 0;
var aiVelocityY   = 300;
var ballVelocityX = 300;
var ballVelocityY = 300;

var playerScoreText;
var aiScoreText;

function preload()
{
	this.load.image('ball', '/public/assets/ball.png');
	this.load.image('paddle', '/public/assets/paddle.png');
}

function create()
{
	platforms = this.physics.add.group();
	
	player = platforms.create(playerStartingX, playerStartingY, 'paddle');
	ai = platforms.create(aiStartingX, aiStartingY, 'paddle');
	
	ball = this.physics.add.sprite(aiStartingX, aiStartingY, 'ball');
	
	player.setCollideWorldBounds(true);
	ai.setCollideWorldBounds(true);
	ball.setCollideWorldBounds(true);
	
	ball.setVelocityX(playerVelocityX);
	ball.setVelocityY(ballVelocityY);
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
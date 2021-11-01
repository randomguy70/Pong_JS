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

var velocityX = 300;
var velocityY = 300;

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
	
	player = platforms.create(100, 100, 'paddle');
	ai = platforms.create(700, 100, 'paddle');
	
	ball = this.physics.add.sprite(400, 100, 'ball');
	
	player.setCollideWorldBounds(true);
	ai.setCollideWorldBounds(true);
	ball.setCollideWorldBounds(true);
	
	ball.setVelocityX(velocityX);
	ball.setVelocityY(velocityY);
	ball.setBounce(1);
	
	this.physics.add.collider(player, ball, hitPlayer);
	this.physics.add.collider(ball, ai, hitAI);
	
	cursor = this.input.keyboard.createCursorKeys();
}

function update()
{
	if(cursor.up.isDown)
	{
		player.setVelocityY(-300);
	}
	else if(cursor.down.isDown)
	{
		player.setVelocityY(300);
	}
	else
	{
		player.setVelocityY(0);
	}
}

function hitPlayer()
{
	velocityX *= -1;
		
	ball.setVelocityX(velocityX);
	
	if(velocityY<0)
	{
		velocityY *= -1
		ball.setVelocityY(velocityY);
	}
	
}

function hitAI()
{
  	velocityX *= -1;
	
	ball.setVelocityX(velocityX);
	
  	if(velocityY<0)
  	{
  	  	velocityY *= -1
  	  	ball.setVelocityY(velocityY);
  	}
	
}
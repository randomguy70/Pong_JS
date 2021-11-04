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

var playerScore = 0;
var aiScore = 0;

var playerScoreText;
var aiScoreText;

var playerWon = false;
var aiWon = false;

var cursors;

var paddle = {
	width: 20,
	height: 100,
	sprite: 'paddle',
}

var playerConfig = {
	startingX: 20,
	startingY: (config.height / 2) - (paddle.height / 2),
	velocityX: 0,
	velocityY: 0,
}

var aiConfig = {
	startingX: config.width - (50),
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

import './public/assets/ball.png'
function preload()
{
	this.load.image('ball', 'assets/ball.png');
	this.load.image('paddle', 'assets/paddle.png');
}

function create()
{
	var r1 = this.add.rectangle(0, 0, 20, config.height, 0xC0C0C0).setOrigin(0, 0);
	var r2 = this.add.rectangle(config.width - 20, 0, 20, config.height, 0xC0C0C0).setOrigin(0, 0);
	
	player = this.physics.add.sprite(playerConfig.startingX, playerConfig.startingY, 'paddle').setOrigin(0, 0).setImmovable();
	ai = this.physics.add.sprite(aiConfig.startingX, aiConfig.startingY, 'paddle').setOrigin(0, 0).setImmovable();
	ball = this.physics.add.sprite(ballConfig.startingX, ballConfig.startingY, 'ball').setOrigin(0, 0);
	
	player.setCollideWorldBounds(true);
	ai.setCollideWorldBounds(true);
	ball.setCollideWorldBounds(true);
	
	ball.setVelocityX(ballConfig.velocityX);
	ball.setVelocityY(ballConfig.velocityY);
	ball.setBounce(1);
	
	this.physics.add.collider(player, ball);
	this.physics.add.collider(ball, ai);
	
	playerScoreText = this.add.text(config.width/3, config.height / 3, '0', { fontSize: '64px', fill: '#fff' });
	aiScoreText = this.add.text(config.width*2/3, config.height*2 / 3, '0', { fontSize: '64px', fill: '#fff' });
	cursors = this.input.keyboard.createCursorKeys();
}

function update()
{
	updatePlayer();
	updateAI();
	checkForScore();
}

function updatePlayer()
{
	if(cursors.up.isDown)
	{
		player.setVelocityY(-300);
	}
	else if(cursors.down.isDown)
	{
		player.setVelocityY(300);
	}
	else
	{
		player.setVelocityY(0);
	}
}

function updateAI()
{
	let difference = Math.sqrt(Math.abs(ball.y - ai.y)) + 4;
	
	if(ball.y > ai.y)
	{
		ai.setVelocityY(26*difference);
	}
	else if(ball.y < ai.y)
	{
		ai.setVelocityY(-26*difference);
	}
	else
	{
		ai.setVelocityY(0);
	}
}

function checkForScore()
{
	if(ball.x <= 20)
	{
		aiScore++;
		aiScoreText.setText(aiScore);
		
		ball.x = ballConfig.startingX;
		ball.y = ballConfig.startingY;
		ball.setVelocityX(-ballConfig.velocityX);
		ball.setVelocityY(ballConfig.velocityY);
	}
	if(ball.x >= config.width - 60)
	{
		playerScore++;
		playerScoreText.setText(playerScore);
		
		ball.x = ballConfig.startingX;
		ball.y = ballConfig.startingY;
		ball.setVelocityX(ballConfig.velocityX);
		ball.setVelocityY(-ballConfig.velocityY);
	}
}

function checkForWin()
{
	if(aiScore >= 3)
	{
		aiWon = true;
	}
	else if(playerScore >= 3)
	{
		playerWon = true;
	}
}
var config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 700,
	backgroundColor: 0x000000,
	
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0, x: 0 },
			debug: false
		}
	},
	
	scene: [SceneOne, SceneTwo]
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
	velocityX: 400,
	velocityY: 400,
	
	startingX: (config.width / 2) - (30 / 2),
	startingY: (config.height / 2) - (30 / 2),
}

function preload()
{
	this.load.image('ball', './assets/ball.png');
	this.load.image('paddle', './assets/paddle.png');
	this.load.image('horiz_border', './assets/horizontal_border.png');
}

function create()
{
	player = this.physics.add.sprite(playerConfig.startingX, playerConfig.startingY, 'paddle').setOrigin(0, 0).setImmovable();
	ai = this.physics.add.sprite(aiConfig.startingX, aiConfig.startingY, 'paddle').setOrigin(0, 0).setImmovable();
	ball = this.physics.add.sprite(ballConfig.startingX, ballConfig.startingY, 'ball').setOrigin(0, 0);
	
	player.setCollideWorldBounds(true);
	ai.setCollideWorldBounds(true);
	ball.setCollideWorldBounds(true);
	
	this.physics.add.collider(player, ball);
	
	this.physics.add.collider(ai, ball);
	
	initialiseBall();
	
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

function initialiseBall() 
{
	ball.x = config.width / 2;
	ball.y = Phaser.Math.Between(25, config.height - (20 + 5));
	
	ball.setBounce(1);
	
	var goingUp = Phaser.Math.Between(0, 1);
	var goingRight = Phaser.Math.Between(0, 1);
	
	if(goingUp === 1)
	{
		ball.setVelocityY(ballConfig.velocityY);
	}
	else
	{
		ball.setVelocityY(- ballConfig.velocityY);
	}
	if(goingRight ===1)
	{
		ball.setVelocityX(ballConfig.velocityX);
	}
	else
	{
		ball.setVelocityX(- ballConfig.velocityX);
	}
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
	let difference = 1.5 * Math.sqrt(Math.abs(ball.y - ai.y) + 40);
	let speed;
	
	if (difference > 400)
	{
		speed = 400;
	}
	else if (difference < 100 && difference > 10)
	{
		speed = 50;
	}
	else 
	{
		speed = difference + 20;
	}
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
	if(ball.x < 1)
	{
		aiScore++;
		aiScoreText.setText(aiScore);
		
		initialiseBall();
	}
	if(ball.x > (config.width - 41))
	{
		playerScore++;
		playerScoreText.setText(playerScore);
		
		initialiseBall();
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
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

function preload()
{
	this.load.image('ball', '/public/assets/ball.png');
	this.load.image('paddle', '/public/assets/paddle.png');
}

function create()
{
	player = this.physics.add.sprite(100, 100, 'paddle');
	ai = this.physics.add.sprite(700, 100, 'paddle');
	ball = this.physics.add.sprite(400, 100, 'ball');
	
	player.setCollideWorldBounds(true);
	ai.setCollideWorldBounds(true);
	ball.setCollideWorldBounds(true);
	
	ball.setVelocityX(300, 300);
	ball.setVelocityY(300);
	ball.setBounce(1, 1);
	
	this.physics.add.collider(player, ball);
	this.physics.add.collider(ball, ai);
	
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

function updatePlayer()
{
	
}

function updateAI()
{
	
}
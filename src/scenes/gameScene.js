const config =
{
	type: Phaser.AUTO,
	pixelArt: false,
	roundPixels: false,
	width: 1000,
	height: 700,
	backgroundColor: 0x000000,
};

var player;
var ai;
var ball;

var playerScore = 0;
var aiScore = 0;

var playerScoreText;
var aiScoreText;

var cursors;

var paddle =
{
	width: 20,
	height: 100,
	sprite: 'paddle',
}

var playerConfig =
{
	startingX: 20,
	startingY: (config.height / 2) - (paddle.height / 2),
	velocityX: 0,
	velocityY: 0,
}

var aiConfig =
{
	startingX: config.width - (50),
	startingY: (config.height / 2) - (paddle.height / 2),
	velocityX: 0,
	velocityY: 0,
}

var ballConfig =
{
	velocityX: 400,
	velocityY: 400,
	
	startingX: (config.width / 2) - (30 / 2),
	startingY: (config.height / 2) - (30 / 2),
}

var timedEvent;

class GameScene extends Phaser.Scene
{
	constructor()
	{
		super({key:'gameScene'});
		console.log('constructed gameScene');
		
		aiScore = 0;
		playerScore = 0;
	}
	
	preload ()
	{
		console.log('preloaded');
		this.load.image('ball', './assets/ball.png');
		this.load.image('paddle', './assets/paddle.png');
		this.load.image('horiz_border', './assets/horizontal_border.png');
	}
	
	create ()
	{
		console.log('created');
		player = this.physics.add.sprite(playerConfig.startingX, playerConfig.	startingY, 'paddle').setOrigin(0, 0).setImmovable();
		ai = this.physics.add.sprite(aiConfig.startingX, aiConfig.startingY, 	'paddle').setOrigin(0, 0).setImmovable();
		ball = this.physics.add.sprite(ballConfig.startingX, ballConfig.startingY, 'ball').setOrigin(0, 0);
		
		player.setCollideWorldBounds(true);
		ai.setCollideWorldBounds(true);
		ball.setCollideWorldBounds(true);
		
		this.physics.add.collider(player, ball);
		
		this.physics.add.collider(ai, ball);
		
		this.initialiseBall();
		
		playerScoreText = this.add.text(config.width/3, config.height / 3, '0', { 	fontSize: '64px', fill: '#fff' });
		aiScoreText = this.add.text(config.width*2/3, config.height*2 / 3, '0', { 	fontSize: '64px', fill: '#fff' });
		
		cursors = this.input.keyboard.createCursorKeys();
	}

	update ()
	{
		this.updatePlayer();
		this.updateAI();
		this.checkForScore();
		this.checkForWin();
	}
	
	initialiseBall ()
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
	
	updatePlayer ()
	{
		if(cursors.up.isDown)
		{
			player.setVelocityY(-400);
		}
		else if(cursors.down.isDown)
		{
			player.setVelocityY(400);
		}
		else
		{
			player.setVelocityY(0);
		}
	}
	
	updateAI ()
	{
		let difference = 350 + Math.sqrt( Math.abs( ball.y - ai.y ) );
		
		if(ball.y > ai.y)
		{
			ai.setVelocityY(difference);
		}
		else if(ball.y < ai.y)
		{
			ai.setVelocityY(-difference);
		}
		else
		{
			ai.setVelocityY(0);
		}
	}
	
	checkForScore ()
	{
		if(ball.x < 1)
		{
			aiScore++;
			aiScoreText.setText(aiScore);
			
			this.initialiseBall();
		}
		if(ball.x > (config.width - 41))
		{
			playerScore++;
			playerScoreText.setText(playerScore);
			
			this.initialiseBall();
		}
	}
	
	checkForWin ()
	{
		if(aiScore >= 3)
		{
			aiScoreText.setText("WON");
			console.log('ai won \n return to titleScene');
			
			timedEvent = this.time.delayedCall(3000, this.newGame, [], this);
		}
		else if(playerScore >= 3)
		{
			playerScoreText.setText("WON");
			console.log('player won \n return to titleScene');
			
			timedEvent = this.time.delayedCall(3000, this.newGame, [], this);
		}
	}
	
	newGame ()
	{
		playerScore = 0;
		aiScore = 0;
		
		this.scene.start('titleScene');
	}
};

export default GameScene;
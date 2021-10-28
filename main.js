import Phaser from "phaser";

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
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

game.scene.add()
var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var scoreText;

function preload ()
{
	this.load.image('sky', 'assets/sky.png');
	this.load.image('paddle', 'assets/paddle.png');
}

function create ()
{
	this.add.image(400, 300, 'sky');
	this.add.image(100, 100, '')
	
}

function update ()
{
	if (cursors.left.isDown)
	{
		player.setVelocityX(-160);

		player.anims.play('left', true);
	}
	else if (cursors.right.isDown)
	{
		player.setVelocityX(160);

		player.anims.play('right', true);
	}
	else
	{
		player.setVelocityX(0);

		player.anims.play('turn');
	}

	if (cursors.up.isDown && player.body.touching.down)
	{
		player.setVelocityY(-330);
   }
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}

function hitBomb (player, bomb)
{
	this.physics.pause();

	player.setTint(0xff0000);

	player.anims.play('turn');

	gameOver = true;
}
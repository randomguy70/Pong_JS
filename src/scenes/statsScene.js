const config =
{
	type: Phaser.AUTO,
	pixelArt: false,
	roundPixels: false,
	width: 1000,
	height: 700,
	backgroundColor: 0x000000,
};

class StatsScene extends Phaser.Scene
{
	constructor()
	{
		super({key:'statsScene'});
	}
	
	init (data)
	{
		this.data = data;
	}
	
	create ()
	{
		this.add.text(config.width / 2, config.height / 2, this.data.winner + " won!");
	}
}
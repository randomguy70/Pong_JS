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
		console.log('constructed statsScene');
	}
}

export default StatsScene;
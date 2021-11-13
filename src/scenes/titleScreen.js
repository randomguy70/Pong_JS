const config =
{
	type: Phaser.AUTO,
	pixelArt: false,
	roundPixels: false,
	width: 1000,
	height: 700,
	backgroundColor: 0x000000,
};

var playButton;
var creditsButton;

class TitleScene extends Phaser.Scene
{

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.image('button', '../assets/button.png');
	}

	create() {
		
		this.add.text(config.width / 2, config.height / 4, "Pong", {fontSize: 65, color: '#fff'}).setOrigin(0.5);
		this.add.text(config.width / 2, config.height / 4 + 60, "cloned by Randomguy", {fontSize: 20, color: '#fff'}).setOrigin(.5);
				
		playButton = this.add.image(config.width / 2, config.height / 4 + 120, 'button');
		this.add.text(config.width / 2, config.height / 4 + 120, 'Play', {fontSize: 25}).setOrigin(0.5);
		
		
	}
}

function over ()
{
	
}

function playIsClicked ()
{
	
}

export default TitleScene;
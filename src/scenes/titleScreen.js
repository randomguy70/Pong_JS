const config = {
	type: Phaser.AUTO,
	pixelArt: false,
	roundPixels: false,
	width: 1000,
	height: 700,
	backgroundColor: 0x000000,
};

class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		// this.load.image('background', 'images/background.jpg');
	}

	create() {
		
		this.add.text(config.width / 2, config.height / 4, "Pong", {fontSize: 65}).setOrigin(0.5);
		this.add.text(config.width / 2, config.height / 4 + 60, "cloned by Randomguy", {fontSize: 20}).setOrigin(.5);
	}
}

export default TitleScene;
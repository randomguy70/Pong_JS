class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		// this.load.image('background', 'images/background.jpg');
	}

	create() {
		var text = this.add.text(100,100, 'Welcome to my game');
	}
}

export default TitleScene;
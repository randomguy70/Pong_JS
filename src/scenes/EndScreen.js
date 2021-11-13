class endScreen extends Phaser.Scene {
	
	constructor() {
		super({ key: 'endScreen' });
	}
	
	preload() {
		// this.load.image('shape', '../assets/ball.png');
	}
	
	create() {
		// this.add.image(100, 100, 'shape');
		this.add.text(40, 40, 'ReadMe!!!', { 	fontSize: '64px', fill: '#bbf' });
	}
	
	update() {
	}
}

export default endScreen;
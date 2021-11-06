class EndScreen extends Phaser.Scene {
	
	constructor() {
		super({ key: 'EndScreen' });
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
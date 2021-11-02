export default class MovingPlatform extends Phaser.Physics.Matter.Image
{
	/**
	 * 
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {string} texture
	 * @param {Phaser.Types.Physics.Matter.MatterBodyConfig} options
	 */
	constructor(scene, x, y, texture, options)
	{
		super(scene.matter.world, x, y, texture, 0, options)

		scene.add.existing(this)
	}
	
	moveUp()
	{
		this.setVelocityY();
	}
}
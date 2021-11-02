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
		
		this.startY = y;
	}
	moveVertically()
	{
		this.scene.tweens.addCounter({
			from: 0,
			to: -300,
			duration: 1500,
			ease: Phaser.Math.Easing.Sine.InOut,
			repeat: -1,
			yoyo: true,
			onUpdate: (tween, target) => {
				const y = this.startY + target.value
				const dy = y - this.y
				this.y = y
				this.setVelocityY(dy)
			}
		})
	}
	
}
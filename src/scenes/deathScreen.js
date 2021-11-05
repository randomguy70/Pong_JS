var SceneTwo = new Phaser.Class(
{
	Extends: Phaser.Scene,
	
	initialize: function() {
		 Phaser.Scene.call(this, { "key": "SceneTwo" });
	},
	
	preload: function() {},
	
    create: function() {
        var text = this.add.text(
            640, 
            360, 
            "This is the Death Screen. Either you or the AI just perished...", 
            {
                fontSize: 20,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
		  
		  this.time.addEvent({
			delay: 5000,
			loop: false,
			callback: () => {
				 this.scene.start("SceneTwo");
			}
		})
    },
	 
    update: function() {}
})
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
	
	constructor()
	{
		super({key:'titleScene'});
	}
	
	preload()
	{
		this.load.image('button', './assets/button.png');
	}
	
	create()
	{
		
		this.add.text(config.width / 2, config.height / 4, "Pong", {fontSize: 65, color: '#fff'}).setOrigin(0.5);
		this.add.text(config.width / 2, config.height / 4 + 60, "cloned by Randomguy", {fontSize: 20, color: '#fff'}).setOrigin(.5);
		
		// play button
		playButton = this.add.image(config.width / 2, config.height / 4 + 130, 'button');
		
		this.add.text(config.width / 2, config.height / 4 + 130, 'Play', {fontSize: 25}).setOrigin(0.5);
		
		playButton.setInteractive();
		
		playButton.on('pointerdown', () => { this.scene.start('gameScene'); });
		
		// credits button
		creditsButton = this.add.image(config.width / 2, config.height / 4 + 220, 'button');
		
		this.add.text(config.width / 2, config.height / 4 + 220, 'More Games', {fontSize: 25}).setOrigin(0.5);
		
		creditsButton.setInteractive();
		
		creditsButton.on('pointerdown', this.openExternalLink);
	}
	
	openExternalLink ()
	{
		
   const url = 'https://randomguy70.github.io/games_website/';

   var s = window.open(url, '_blank');
	
   if (s && s.focus)
   {
      s.focus();
   }
   else if (!s)
   {
      window.location.href = url;
   }
}
}

export default TitleScene;
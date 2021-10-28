var Entity = function(config) {
	this.lives = config.lives;
	this.hits = 0;
	
	this.sprite = config.sprite;
	
	this.x = config.x;
	this.y = config.y;
	
	this.x_vector = config.x_vector;
	this.y_vector = config.y_vector;
	
	// angle of rotation from regular orientation, counterclockwise
	this.theta = config.theta;
}

Entity.prototype.draw = function() {
	this.add.image(this.x, this.y, this.sprite);
}
Entity.prototype.move = function() {
	this.x += this.x_vector;
	this.y += this.y_vector;
}
Entity.prototype.left = function() {
	this.x_vector = -3;
}
Entity.prototype.right = function() {
	this.x_vector = 3;
}
Entity.protype.up = function() {
	this.y += this.y_vector;
}

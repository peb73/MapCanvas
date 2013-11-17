function Map(game){
	this.game = game;
	this.img = new Image();
	this.img.src = 'img/map.png';
};

Map.prototype.render = function(currentX, currentY){
	this.game.ctx.drawImage(this.img, currentX, currentY);
}
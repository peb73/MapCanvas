function Game(canvasId){

	this.mouseover = false;
	this.pointer = {x: 0, y:0};

	this.canvasId = canvasId;
	this.canvas = $('#'+canvasId);
	this.ctx=document.getElementById(canvasId).getContext("2d");

	this.addMouseEvent();

	this.loop = new Loop(_.bind(this.process,this));

	this.map = new Map(this);
	this.currentX = 0;
	this.currentY = 0;

	this.class='';
};

Game.prototype.start = function(){
	this.loop.start();
};

Game.prototype.stop = function(){
	this.loop.stop();
};

Game.prototype.addMouseEvent = function(){
	var that = this;
	that.canvas.on('mouseover',function(e){
		that.mouseover = true;
	});
	that.canvas.on('mouseout',function(e){
		that.mouseover = false;
	});

	that.canvas.on('mousemove',function(e){
		that.pointer = {x: e.offsetX, y: e.offsetY};
	});
};

Game.prototype.process = function(){
	
	this.class = '';

	if(this.mouseover && this.ctx!=null){

		var direction = '';

		//south
		if(this.pointer.y>this.canvas.height()*0.8 && this.currentY>this.canvas.height()-this.map.img.naturalHeight){
			this.currentY = this.currentY - 5;
			if(this.currentY<this.canvas.height()-this.map.img.naturalHeight) this.currentY = this.canvas.height()-this.map.img.naturalHeight;
			direction+='s';
		}

		//north
		if(this.pointer.y<this.canvas.height()*0.2 && this.currentY<0){
			this.currentY = this.currentY + 5;
			if(this.currentY>0) this.currentY = 0;
			direction+='n';
		}

		//east
		if(this.pointer.x>this.canvas.width()*0.8 && this.currentX>this.canvas.width()-this.map.img.naturalWidth){
			this.currentX = this.currentX - 5;
			if(this.currentX<this.canvas.width()-this.map.img.naturalWidth) this.currentX = this.canvas.width()-this.map.img.naturalWidth;
			direction+='e';
		}

		//west
		if(this.pointer.x<this.canvas.width()*0.2 && this.currentX<0){
			this.currentX = this.currentX + 5;
			if(this.currentX>0) this.currentX = 0;
			direction+='w';
		}

		if(direction!='')
			this.class += 'map-'+direction+' ';
	}


	this.render();

	this.canvas.attr('class',this.class);
};

Game.prototype.render = function(){
	this.map.render(this.currentX, this.currentY);
};
function Loop(process){
	this.interval = null;
	this.time = 16.66;
	this.process = process;
	if(process == undefined){
		process = function(){};
	}
}

Loop.prototype.start = function(){
	if(this.interval==null){
		this.interval = setInterval(this.process, this.time);
	}
};

Loop.prototype.stop = function(){
	clearInterval(this.interval);
};

Loop.prototype.setProcess = function(process){
	this.process = process;
};

Loop.prototype.getProcess = function(){
	return this.process;
};
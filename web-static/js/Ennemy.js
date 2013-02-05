var Ennemy = function(parent, direction)
{
	var _this = this;
	if(typeof(parent) == "undefined")
	{
		return;
	}
	this.parent = parent;
	
	this.elm = $("<div>").addClass("ennemy");
	
	this.elm.css("cursor", "url('/tp-static/img/aim-on.png'), auto");

	this.parent.append(this.elm);
	
	this.elm.on("click", function() {
		  _this.kill(_this);
	});
	
	this.positionListenerList = [];
	
	this.speed = 100;
	this.direction = direction;
	
	this.isDead = false;
};

Ennemy.prototype.addPositionListener = function(listener)
{
	this.positionListenerList.push(listener);
};

Ennemy.prototype.setPosition = function(x, y)
{
	this.x = parseFloat(x);
	this.y = parseFloat(y);

	this.elm.css("left", Math.round(x) + "px");
	this.elm.css("top", Math.round(y) + "px");
	for(var i = 0; i  < this.positionListenerList.length; i++)
	{
		this.positionListenerList[i](this.x, this.y);
	}
};
Ennemy.prototype.moveTo = function(x, y)
{
	var _this = this;
	if(this.animHandler)
	{
		this.animHandler.stop(false, false);
	}
	this.animHandler = $.ease({
		x: this.x,
		y: this.y
	}, {
		x: x, 
		y: y
	}, function(o){
		_this.setPosition(o.x, o.y);
	},
	{
		easing: "easeOutCirc",
		duration: 100
	});
};
Ennemy.prototype.move = function(x, y)
{
	if(Math.abs(x) + Math.abs(y) > 15)
	{
		this.moveTo(this.x + x, this.y + y);
	}
	else
	{
		this.setPosition(this.x + x, this.y + y);
	}
};

Ennemy.prototype.kill = function(_this)
{
	if(this.isDead)
		return;
	
	this.isDead = true;
};

Ennemy.prototype.destroy = function()
{
	//this.elm.remove();
	game.removeMob(this);
};

Ennemy.prototype.update = function(delta)
{
	var _this = this;
	var x = this.x;
	var y = this.y;
	
	if(this.isDead == false)
		x += this.speed * delta * this.direction;
	
	this.setPosition(x, y);
	
	switch(_this.direction)
	{
	case 1:
		if(_this.x >= 1024)
			_this.flee();
		break;
	case -1:
		if(_this.x <= -128)
			_this.flee();
		break;
	}
};

Ennemy.prototype.flee = function()
{
	if(this.isDead == true)
		return;

	game.decLife(1, this.x, this.y);
	game.removeMob(this);
	//this.destroy();
};
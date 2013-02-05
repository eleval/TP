var EnnemyFeedback = function(parent, x, y, value)
{
	if(typeof(parent) == "undefined")
	{
		return;
	}
	
	this.parent = parent;
	
	this.elm = $("<div>");
	
	this.value = value;
	
	if(value > 0)
	{
		this.elm.addClass("ScoreFeedBack");
		this.elm.append("+" + value);
	}
	else
		this.elm.addClass("LifeFeedBack");
	
	this.x = x + 64;
	this.y = y + 64;
	
	this.elm.css("left", this.x + "px");
	this.elm.css("top", this.y + "px");
	
	this.parent.append(this.elm);
	
	this.time = 1;
};

EnnemyFeedback.prototype.destroy = function()
{
	this.elm.remove();
};

EnnemyFeedback.prototype.update = function(delta)
{
	var _this = this;
	
	this.y -= delta * 100;
	
	this.elm.css("top", this.y + "px");
	
	this.time -= delta;
	
	if(this.time <= 0)
		game.removeFeedback(_this);
};
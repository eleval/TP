var Frelion = function(parent, direction)
{
	var _this = this;
	Ennemy.call(this, parent, direction);
	
	this.centerX = 64;
	this.centerY = 120;
	
	this.spriteList =
	{
			"idle": new Sprite(this.elm, "/tp-static/img/move.png", 2048, 128, 16, 1, 16, 16, true),
			"death": new Sprite(this.elm, "/tp-static/img/death.png", 640, 128, 5, 1, 5, 16, false),
	};
	
	for(var i in this.spriteList)
	{
		this.spriteList[i].setCenter(this.centerX, this.centerY);
	}
};

Frelion.prototype = new Ennemy();

Frelion.prototype.setPosition = function(x, y)
{
	var lastY = this.y;
	Ennemy.prototype.setPosition.call(this, x, y);
};
Frelion.prototype.setScale = function(scale)
{
	this.scale = scale;
	for(var i in this.spriteList)
	{
		this.spriteList[i].setScale(this.scale);
	}
};
Frelion.prototype.setSprite = function(anim, onComplete)
{
	this.lastAnimId = anim;
	var spriteId = anim;
	if(this.currentSprite != this.spriteList[spriteId])
	{
		if(!this.currentSprite || this.currentSprite.loop || this.currentSprite.currentFrame == this.currentSprite.frameCount - 1)
		{
			if(this.currentSprite)
			{
				this.currentSprite.stop();
				this.currentSprite.hide();
			}
			this.currentSprite = this.spriteList[spriteId];
			this.currentSprite.resetAnim();
			this.currentSprite.play(onComplete);
			this.currentSprite.show();
		}
		else
		{
			this.nextSprite = anim;
		}
	}
};

Frelion.prototype.kill = function(_this)
{
	if(this.isDead)
		return;
	
	Ennemy.prototype.kill.call(this, _this);
	
	game.incScore(Math.ceil(this.speed/25), this.x, this.y);
	_this.setSprite("death", function()
			{
				game.removeMob(_this);
			});
};

Frelion.prototype.destroy = function(_this)
{
	Ennemy.prototype.destroy.call(_this);
};
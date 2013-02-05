var Ghost = function(parent, direction)
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
	
	this.opacity = 1;
	this.incOpacity = false;
};

Ghost.prototype = new Ennemy();

Ghost.prototype.setPosition = function(x, y)
{
	var lastY = this.y;
	Ennemy.prototype.setPosition.call(this, x, y);
};
Ghost.prototype.setScale = function(scale)
{
	this.scale = scale;
	for(var i in this.spriteList)
	{
		this.spriteList[i].setScale(this.scale);
	}
};
Ghost.prototype.setSprite = function(anim, onComplete)
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

Ghost.prototype.update = function(delta)
{
	Ennemy.prototype.update.call(this, delta);
	
	this.elm.css("opacity", this.opacity);
	
	if(this.isDead == false)
	{
	
		if(this.incOpacity == true)
		{
			this.opacity += 0.1;
			
			if(this.opacity >= 1)
				this.incOpacity = false;
		}
		else
		{
			this.opacity -= 0.1;
			
			if(this.opacity <= 0)
				this.incOpacity = true;
		}
	}
	else
	{
		this.opacity = 1;
	}
};

Ghost.prototype.kill = function(_this)
{
	if(this.isDead)
		return;
	
	Ennemy.prototype.kill.call(this, _this);
	
	game.decLife(-1, this.x, this.y);
	_this.setSprite("death", function()
			{
				game.removeMob(_this);
			});
};

Ghost.prototype.destroy = function(_this)
{
	Ennemy.prototype.destroy.call(_this);
};
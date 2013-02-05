var Gui = function(parent, maxLife)
{
	this.parent = parent;
	
	this.elm = $("#gui");
	
	this.parent.append(this.elm);
	
	this.hearts = [];
	this.maxLife = maxLife;
	
	for(var i = 0 ; i < maxLife ; ++i)
	{
		var img = $("#heart" + i);
		
		this.hearts.push(img);
	}
	
	this.realScore = $("#RealScore");
	this.fakeScore = $("#FakeScore");
	
	this.oldScore = 0;
	
	this.score = 0;
	
	this.realY = 0;
	this.fakeY = 0;
};

Gui.prototype.updateLife = function(life)
{
	for(var i = 0 ; i < this.maxLife ; ++i)
	{
		if(i < life)
		{
			this.hearts[i].attr("src", "/tp-static/img/heart.png");
		}
		else
		{
			this.hearts[i].attr("src", "/tp-static/img/heart-off.png");
		}
	}
};

Gui.prototype.updateScore = function(score, animate)
{
	if(animate == true)
	{
		this.fakeScore.html(this.oldScore);
		this.realScore.html(score);
		this.score = score;
		
		this.realY = -20;
		this.fakeY = -18;
		
		this.realScore.css("top", "-20px");
		this.fakeScore.css("top", "-18px");
		
		this.animateScore();
	}
	else
	{
		this.oldScore = score;
		this.fakeScore.html(this.oldScore);
		this.realScore.html(score);
	}
};

Gui.prototype.animateScore = function()
{
	var _this = this;
	
	var dif = this.score - this.oldScore;
	
	if(dif == 0)
		return;
	
	setTimeout(function()
			{
				_this.realScore.css("top", _this.realY + "px");
				_this.fakeScore.css("top", _this.fakeY + "px");
				_this.realScore.html(_this.oldScore+1)
				_this.fakeScore.html(_this.oldScore);
				
				_this.realY += 1;
				_this.fakeY += 1;
				
				if(_this.realY >= 1)
				{
					_this.realY = -20;
					_this.fakeY = -18;
					++_this.oldScore;
				}
				
				if(_this.oldScore -1 < _this.score)
					_this.animateScore();
				else
				{
					_this.oldScore = _this.score;
					_this.realScore.html(_this.score)
					_this.fakeScore.html(_this.oldScore);
					_this.realScore.css("top", "0px");
					_this.fakeScore.css("top", "50px");
				}
				
			}, 1000/(dif*20));
};

Gui.prototype.show = function()
{
	this.elm.show();
};

Gui.prototype.hide = function()
{
	this.elm.hide();
};
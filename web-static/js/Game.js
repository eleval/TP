var Game = function(){
	var _this = this;
	this.localTime = 0;
	this.globalTime = 0;
	this.startTime = Date.now();
	
	this.difficultyTime = 0;
	
	this.scene = $("#main-scene");
	this.flash = $("#flash");
	
	this.mobList = [];
	this.feedbackList = [];
	
	this.maxLife = 5;
	this.currentLife = this.maxLife;
	
	this.score = 0;
	this.highScore = 0;
	
	this.wait = 0;

	this.mainMenu = new MainMenu(this.scene, this.score, this.highScore);
	
	this.gameStarted = false;
	
	this.gui = new Gui(this.scene, this.maxLife);
	
	this.gui.hide();
	
	this.flashScreen = false;
	this.flashOpacity = 0;
	
	requestAnimFrame(
			function loop() {
				_this.mainLoop();
				requestAnimFrame(loop);
			}					
		);
};

Game.prototype.startGame = function(difficulty)
{
	this.localTime = 0;
	this.globalTime = 0;
	this.startTime = Date.now();
	
	var _this = this;
	
	this.gui.show();
	
	this.mainMenu.hide();
	
	this.currentLife = 5;
	this.score = 0;
	
	this.gui.updateLife(this.currentLife);
	this.gui.updateScore(this.score, false);
	
	switch(difficulty)
	{
	case 0:
		this.difficultyTime = 0;
		break;
	case 1:
		this.difficultyTime = 240 * 1000;
		break;
	}
	
	this.gameStarted = true;
};

Game.prototype.gameOver = function()
{
	this.gameStarted = false;
	
	this.mainMenu.show();
	
	for(var i = 0 ; i < this.mobList.length ; ++i)
	{
		this.mobList[i].elm.remove();
		delete this.mobList[i];
	}
	
	this.mobList = [];
	
	for(var i = 0 ; i < this.feedbackList.length ; ++i)
	{
		this.feedbackList[i].elm.remove();
		delete this.feedbackList[i];
	}
	
	this.feedbackList = [];
	
	this.gui.hide();
	
	if(this.score > this.highScore)
		this.highScore = this.score;
	
	this.mainMenu.updateScore();
};

Game.prototype.mainLoop = function(){
	var now = Date.now();
	var globalTimeDelta = now - this.globalTime;
	this.globalTime = now;
	var localTimeDelta = Math.min(50, globalTimeDelta);
	this.localTime = (this.globalTime - this.startTime) + this.difficultyTime;
	
	if(this.gameStarted == false)
		return;
	
	this.spawnMobs(localTimeDelta / 1000);
	
	for(var i = 0 ; i < this.mobList.length ; ++i)
	{
		this.mobList[i].update(localTimeDelta / 1000);
	}
	
	for(var i = 0 ; i < this.feedbackList.length ; ++i)
	{
		this.feedbackList[i].update(localTimeDelta / 1000);
	}
	
	if(this.flashScreen)
	{
		this.flashOpacity += (localTimeDelta / 1000)*4;
		
		if(this.flashOpacity >= 0.5)
		{
			this.flashOpacity = 0.5;
			this.flashScreen = false;
		}
		
		this.flash.css("opacity", this.flashOpacity);
	}
	else
	{
		this.flashOpacity -= (localTimeDelta / 1000)*4;
		
		if(this.flashOpacity <= 0)
		{
			this.flashOpacity = 0;
		}
		
		this.flash.css("opacity", this.flashOpacity);
	}
};

Game.prototype.incScore = function(value, x, y)
{
	this.score += value;
	
	this.gui.updateScore(this.score, true);
	
	var feedback = new EnnemyFeedback(this.scene, x, y, value);
	
	this.feedbackList.push(feedback);
};

Game.prototype.decLife = function(value, x, y)
{
	this.currentLife -= value;
	
	this.gui.updateLife(this.currentLife);
	
	if(this.currentLife <= 0)
		this.gameOver();
	
	if(this.currentLife > this.maxLife)
		this.currentLife = this.maxLife;
	
	if(value == -1)
	{
		var feedback = new EnnemyFeedback(this.scene, x, y, 0);
		
		this.feedbackList.push(feedback);
	}
	else
	{
		this.flashScreen = true;
	}
};

Game.prototype.spawnMobs = function(delta)
{	
	var wait = 5 - (this.localTime / 100000);
	var speed = Math.random() * (this.localTime / 500) + (this.localTime / 50000);
	
	if(speed < 50)
		speed = 50;
	
	if(wait < 0.05)
		wait = 0.05;
	
	if(this.wait <= 0)
	{
		var x = 0;
		var dir = 1;
		//Below if : If we want the ennemies to randomly spawn on the left or right of the screen
		//Disabled it as it was not asked
		/*if(Math.random()*100 > 50)
		{
			x = -128;
			dir = 1;
		}
		else
		{
			x = 1024;
			dir = -1;
		}*/
		x = 1024;
		dir = -1;
		var y = Math.random() * (400 - 128);
		
		var frelion = null;
		
		if(Math.random()*100 > 20)
		{
			frelion = new Frelion(this.scene, dir);
		}
		else
		{
			frelion = new Ghost(this.scene, dir);
		}
		
		
		frelion.setSprite("idle", null)
		frelion.setPosition(x, y);
		frelion.speed = speed;
		
		this.mobList.push(frelion);
		
		this.wait = wait;
	}
	else
	{
		this.wait -= delta;
	}
};

Game.prototype.removeMob = function(mob)
{
	var _this = this;
	var newMobList = [];
	for(var i = 0; i < _this.mobList.length; i++)
	{
		if(_this.mobList[i] != mob)
		{
			newMobList.push(_this.mobList[i]);
		}
	}
	mob.elm.remove();
	delete mob;
	_this.mobList = newMobList;
};

Game.prototype.removeFeedback = function(feedback)
{
	var _this = this;
	var newfeedbackList = [];
	for(var i = 0; i < _this.feedbackList.length; i++)
	{
		if(_this.feedbackList[i] != feedback)
		{
			newfeedbackList.push(_this.feedbackList[i]);
		}
	}
	feedback.elm.remove();
	delete feedback;
	_this.feedbackList = newfeedbackList;
};
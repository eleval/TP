var MainMenu = function(parent, score, highScore)
{
	var _this = this;
	
	this.parent = parent;
	
	this.elm = $("#MainMenu");
	
	this.score = $("#MainScore");
	
	this.easyButton = $("#EasyButton");
	this.hardButton = $("#HardButton");
		
	this.easyButton.on("mouseover", function() {
		 _this.easyButton.addClass("MainButtonOver").removeClass("MainButton").removeClass("MainButtonPressed");
	});
	this.easyButton.on("mouseout", function() {
		_this.easyButton.addClass("MainButton").removeClass("MainButtonOver").removeClass("MainButtonPressed");
	});
	this.easyButton.on("mousedown", function() {
		_this.easyButton.addClass("MainButtonPressed").removeClass("MainButtonOver").removeClass("MainButton");
	});
	
	this.hardButton.on("mouseover", function() {
		 _this.hardButton.addClass("MainButtonOver").removeClass("MainButton").removeClass("MainButtonPressed");
	});
	this.hardButton.on("mouseout", function() {
		_this.hardButton.addClass("MainButton").removeClass("MainButtonOver").removeClass("MainButtonPressed");
	});
	this.hardButton.on("mousedown", function() {
		_this.hardButton.addClass("MainButtonPressed").removeClass("MainButtonOver").removeClass("MainButton");
	});
	
	this.easyButton.on("click", function() {
		game.startGame(0);
	});
	
	this.hardButton.on("click", function() {
		game.startGame(1);
	});
};

MainMenu.prototype.updateScore = function()
{
	this.score.html("SCORE = " + game.score + "<br/><br/><br/> MEILLEUR SCORE = " + game.highScore + "<br/>");
};

MainMenu.prototype.show = function()
{
	this.elm.show();
};

MainMenu.prototype.hide = function()
{
	this.elm.hide();
};
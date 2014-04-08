var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.font="20px Arial";
var FPS = 60;
var Mode =0;

/*
 * Assigns the audio files to variables bounce1 and 2
 */
var bounce1 = document.getElementById("blop");
var bounce2 = document.getElementById("tick");


var Ball={
	x:250.0,
	y:250.0,
	Speed:2.5, //The distance in pixels the Ball moves each tick diagonally from its previous positon
	Direction:45,
	sidebounce:false,
	paddlebounce:false,
	draw: function(){
		//draws box that will represent the ball
		ctx.fillStyle = "green";
		ctx.fillRect (this.x, this.y, 5, 5);
	},
	reset: function(){
		//resets ball position
		this.x=250;
		this.y=250;
		//this.Direction=Math.round(Math.random()*72)*5;
	},
	update: function(){
		var offsetX=0;
		var offsetY=0;
		
		//keeps Ball.Direction between 0 and 360
		if (this.Direction<0)
			this.Direction=this.Direction+360;
		else if (this.Direction>=360)
			this.Direction=this.Direction-360;
		
		//calculates the number of pixels, X and Y, to be added to current location
		offsetX=this.Speed*Math.cos(this.Direction*Math.PI/180);
		offsetY=this.Speed*Math.sin(this.Direction*Math.PI/180);
		//adds offset to x and y. y increases as you go down.
		this.x+=offsetX;
		this.y-=offsetY;
		
		//changes direction if it hits the side walls
		if (this.x>0 && this.x<495)
			this.sidebounce=false;
		else {
			if (this.sidebounce===false) {
				if (this.x<0)
					this.x=Math.abs(this.x);
				else if (this.x>495)
					this.x=495-(this.x-495);
				this.Direction=180-this.Direction;
				bounce2.pause();
				bounce2.currentTime = 0;
				bounce2.play();
			}
			this.sidebounce=true;
		}
		
		//if the ball isnt close to the paddles, it isn't bouncing
		if (this.y>=10 && this.y<=485)
			this.paddlebounce=false;
			
		//if Ball is close to PlayerPaddle, within range, and hasn't bounced yet, bounce
		else if (this.y>=485){
			if ((this.x+5)>=PlayerPaddle.x && this.x<=(PlayerPaddle.x + 50)){
				if (this.paddlebounce===false) {
					if (this.y>485)
						this.y=485-(this.y-485);
					this.Direction=360-this.Direction;
					bounce1.pause();
					bounce1.currentTime = 0;
					bounce1.play();
					OpponentPaddle.predict();
				}
				this.paddlebounce=true;
			}
			
		//if Ball is close to OpponentPaddle, within range, and hasn't bounced yet, bounce
		} else if (this.y<=10){
			if ((this.x+5)>OpponentPaddle.x && this.x<(OpponentPaddle.x + 50)){
				if (this.paddlebounce===false)
					if (this.y<10)
						this.y=10+(10-this.y);
					this.Direction=360-this.Direction;
					bounce1.pause();
					bounce1.currentTime = 0;
					bounce1.play();
				this.paddlebounce=true;
			}
		}
	}
};

var PlayerPaddle={
	x:225,
	y:490,
	testmode:false,
	draw: function(){
		//draws box that will represent the Player's paddle
		ctx.fillStyle = "red";
		ctx.fillRect (this.x, this.y, 50, 10);
	},
	reset: function(){
		//reset PlayerPaddle position
		this.x=225;
	},
	update: function(){
		//moves the player's paddle according to keys pressed
		if (this.testmode)
			//for testing
			this.x=Ball.x-22.5;
		else
			if (KeyPressed.Left && this.x>0)
				this.x-=10;
			else if (KeyPressed.Right && this.x<450)
				this.x+=10;
	}
};

var OpponentPaddle={
	x:225,
	y:0,
	destination:250,
	testmode:false,
	draw: function(){
		//draws box that will represent the Opponent's paddle (computer)
		ctx.fillStyle = "blue";
		ctx.fillRect (this.x, this.y, 50, 10);
	},
	reset: function(){
		//reset OpponentPaddle position
		this.x=225;
	},
	predict: function(){
		//calculates a rough estimate of where it should go to to deflect the ball
		this.destination=Ball.x+(Ball.y-10)/Math.tan(Ball.Direction*Math.PI/180);
		//account for wall reflection
		while (this.destination<0 || this.destination>495){
			this.destination=Math.abs(this.destination);
			if (this.destination>495)
				this.destination=Math.abs(990-this.destination);
		}
	},
	update: function(){
		if (this.x<0)
			this.x=0;
		else if (this.x>450)
			this.x=450;
		
		if (this.testmode)
			//for testing
			this.x=PlayerPaddle.x;
		else {
			//checks if destination is valid, ball is 75% within range and is headed towards the paddle
			if (this.destination>0 && this.destination<495)
				if (Ball.y<375 && Ball.Direction<180)
					//move the paddle closer to the destination
					if (this.x+30<this.destination && this.x<450)
						this.x+=10;
					else if (this.x+20>this.destination && this.x>0)
						this.x-=10;
		}
	}
};

var Score={
	Player:0,
	Opponent:0,
	testmode:false,
	draw: function(){
		//displays the score at the top left corner
		ctx.strokeText ("Player: " + this.Player, 10, 20);
		ctx.strokeText ("Computer: " + this.Opponent, 10, 40);
		if (this.testmode)
			ctx.strokeText("Opp dest: " + Math.round(OpponentPaddle.destination), 10, 60);
	},
	update: function(){
		//if the ball gets to these boundaries, scores are updated and positions reset
		if (Ball.y>500){
			Score.Opponent++;
			Ball.reset();
			OpponentPaddle.predict();
		} else if (Ball.y<0){
			Score.Player++;
			Ball.reset();
			OpponentPaddle.predict();
		}
	}
};

/*var Menu={
	Screen:enum(start, gameover),
	display: function() {
		switch (this.Screen){
			case start:Score.Opponent=100;
			case gameover:;
		}
		
	}
};*/






function Tick(){
	ctx.clearRect(0, 0, 500, 500);
	Ball.draw();
	PlayerPaddle.draw();
	OpponentPaddle.draw();
	Score.draw();
	if (KeyPressed.Space)
		Sound();
	//Menu.display;
	if (KeyPressed.Tab)
		paused=true;
	else
		paused=false;
	if (!paused){
		Ball.update();
		PlayerPaddle.update();
		Score.update();
		OpponentPaddle.update();
	}
	//if (Mode===0){
	//	Ball.draw();
	//} 
}

PlayerPaddle.testmode=false;
OpponentPaddle.testmode=false;
Score.testmode=false;
OpponentPaddle.predict();
//playbtn.onclick=sound();
//Menu.Screen=start;
window.setInterval(Tick, 1000/FPS);


//holds boolean values for keystrokes to be used in PlayerPaddle.update
var KeyPressed={
	Backspace:false,
	Tab:false,
	Enter:false,
	Shift:false,
	Control:false,
	Alt:false,
	Esc:false,
	Space:false,
	Left:false,
	Up:false,
	Right:false,
	Down:false,
	N0:false,
	N1:false,
	N2:false,
	N3:false,
	N4:false,
	N5:false,
	N6:false,
	N7:false,
	N8:false,
	N9:false,
	LA:false,
	LB:false,
	LC:false,
	LD:false,
	LE:false,
	LF:false,
	LG:false,
	LH:false,
	LI:false,
	LJ:false,
	LK:false,
	LL:false,
	LM:false,
	LN:false,
	LO:false,
	LP:false,
	LQ:false,
	LR:false,
	LS:false,
	LT:false,
	LU:false,
	LV:false,
	LW:false,
	LX:false,
	LY:false,
	LZ:false
};

//Handles the different keystrokes used and parses them as individual booleans
window.onkeydown =function(e) {
	e = e || window.event;
	var getKey = e.keyCode;
	switch (getKey) {
		case   8: KeyPressed.Backspace=true;
		case   9: KeyPressed.Tab=true;
		case  13: KeyPressed.Enter=true;
		case  16: KeyPressed.Shift=true;
		case  17: KeyPressed.Control=true;
		case  18: KeyPressed.Alt=true;
		case  27: KeyPressed.Esc=true;
		case  32: KeyPressed.Space=true;
		case  37: KeyPressed.Left=true;
		case  38: KeyPressed.Up=true;
		case  39: KeyPressed.Right=true;
		case  40: KeyPressed.Down=true;
		case  48: KeyPressed.N0=true;
		case  49: KeyPressed.N1=true;
		case  50: KeyPressed.N2=true;
		case  51: KeyPressed.N3=true;
		case  52: KeyPressed.N4=true;
		case  53: KeyPressed.N5=true;
		case  54: KeyPressed.N6=true;
		case  55: KeyPressed.N7=true;
		case  56: KeyPressed.N8=true;
		case  57: KeyPressed.N9=true;
		case  97: KeyPressed.LA=true;
		case  98: KeyPressed.LB=true;
		case  99: KeyPressed.LC=true;
		case 100: KeyPressed.LD=true;
		case 101: KeyPressed.LE=true;
		case 102: KeyPressed.LF=true;
		case 103: KeyPressed.LG=true;
		case 104: KeyPressed.LH=true;
		case 105: KeyPressed.LI=true;
		case 106: KeyPressed.LJ=true;
		case 107: KeyPressed.LK=true;
		case 108: KeyPressed.LL=true;
		case 109: KeyPressed.LM=true;
		case 110: KeyPressed.LN=true;
		case 111: KeyPressed.LO=true;
		case 112: KeyPressed.LP=true;
		case 113: KeyPressed.LQ=true;
		case 114: KeyPressed.LR=true;
		case 115: KeyPressed.LS=true;
		case 116: KeyPressed.LT=true;
		case 117: KeyPressed.LU=true;
		case 118: KeyPressed.LV=true;
		case 119: KeyPressed.LW=true;
		case 120: KeyPressed.LX=true;
		case 121: KeyPressed.LY=true;
		case 122: KeyPressed.LZ=true;
	}
};

//This essentially handles the compliment values of KeyPressed
window.onkeyup = function(e){
	e = e || window.event;
	var getKey = e.keyCode;
	switch (getKey){
		case   8: KeyPressed.Backspace=false;
		case   9: KeyPressed.Tab=false;
		case  13: KeyPressed.Enter=false;
		case  16: KeyPressed.Shift=false;
		case  17: KeyPressed.Control=false;
		case  18: KeyPressed.Alt=false;
		case  27: KeyPressed.Esc=false;
		case  32: KeyPressed.Space=false;
		case  37: KeyPressed.Left=false;
		case  38: KeyPressed.Up=false;
		case  39: KeyPressed.Right=false;
		case  40: KeyPressed.Down=false;
		case  48: KeyPressed.N0=false;
		case  49: KeyPressed.N1=false;
		case  50: KeyPressed.N2=false;
		case  51: KeyPressed.N3=false;
		case  52: KeyPressed.N4=false;
		case  53: KeyPressed.N5=false;
		case  54: KeyPressed.N6=false;
		case  55: KeyPressed.N7=false;
		case  56: KeyPressed.N8=false;
		case  57: KeyPressed.N9=false;
		case  97: KeyPressed.LA=false;
		case  98: KeyPressed.LB=false;
		case  99: KeyPressed.LC=false;
		case 100: KeyPressed.LD=false;
		case 101: KeyPressed.LE=false;
		case 102: KeyPressed.LF=false;
		case 103: KeyPressed.LG=false;
		case 104: KeyPressed.LH=false;
		case 105: KeyPressed.LI=false;
		case 106: KeyPressed.LJ=false;
		case 107: KeyPressed.LK=false;
		case 108: KeyPressed.LL=false;
		case 109: KeyPressed.LM=false;
		case 110: KeyPressed.LN=false;
		case 111: KeyPressed.LO=false;
		case 112: KeyPressed.LP=false;
		case 113: KeyPressed.LQ=false;
		case 114: KeyPressed.LR=false;
		case 115: KeyPressed.LS=false;
		case 116: KeyPressed.LT=false;
		case 117: KeyPressed.LU=false;
		case 118: KeyPressed.LV=false;
		case 119: KeyPressed.LW=false;
		case 120: KeyPressed.LX=false;
		case 121: KeyPressed.LY=false;
		case 122: KeyPressed.LZ=false;
	}
};

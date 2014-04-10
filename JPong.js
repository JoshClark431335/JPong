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


/* Start Particle Engine*/
function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}

var particleNumber = 10;
var particle = [];


for (var i=0; i<particleNumber; i++){		//define object and populates it with values (to keep game from crashing)
	particle[i] ={
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		radius: 0.5,
	};
};



var createParticle = function(){			//Create a particle affect (used when ball collides with wall)
	for (var i=0; i<particleNumber; i++){
		particle[i].radius = 1.0 ;
		particle[i].x = Ball.x;
		particle[i].y = Ball.y;
		particle[i].vx = randNum(0.2,1);
		particle[i].vy = randNum(-1,1);
		
		if (Ball.x >10)	{
			particle[i].vx = randNum(-1,-0.2);
			particle[i].x = Ball.x+5.5;
		}	
	}
};
	
var particleDraw = function(){				//draw and updating particles
	for (var i=0; i<particleNumber ; i++){
		if (particle[i].radius>0){
			var parti = particle[i];
			ctx.beginPath();
			ctx.arc(parti.x, parti.y, parti.radius, 0, 2*Math.PI);
			ctx.fillStyle = "black";
			ctx.fill();
			parti.vx = parti.vx*0.98;
			parti.vy = parti.vy*0.98;	
			parti.x += parti.vx;
			parti.y += parti.vy;
			parti.radius -= 0.01;
		}
	}
};

//End Particle Engine

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
				createParticle();
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
	particleDraw();
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

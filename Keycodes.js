var KeyPressed=
{
	Backspace:false,
	Tab:false,
	Enter:false,
	Shift:false,
	Control:false,
	Alt:false,
	Esc:false,
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

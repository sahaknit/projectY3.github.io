var positionX = 0, positionY = 0, gravity = 10, time = 0, pi = 3.1415, ang = 0, speed = 0, rad = 0, vox = 0, voy = 0, x = 0, y = 0, initialXPosition = 5, initialYPosition = 15;
var loop = false, moveLogic;

//Color table variables
var createTable = true;

var isPathOn = false;
var pathColor = "rgb(255,255,255)";

document.getElementById("startBtn").addEventListener('click',start, false);
document.getElementById("pauseBtn").addEventListener('click',pause,false);
document.getElementById("togglePathBtn").addEventListener('click',togglePath,false);
document.getElementById("setColorBtn").addEventListener('click',setColorTable,false);
document.getElementById("setSpeedBtn").addEventListener('click',setSpeed,false);
document.getElementById("setAngleBtn").addEventListener('click',setAngle,false);
document.getElementById("restartBtn").addEventListener('click',restart,false);
document.getElementById("clearScreenBtn").addEventListener('click',clearScreen,false);
document.getElementById("speedIncrement").addEventListener('click',speedIncrement,false);
document.getElementById("speedDecrement").addEventListener('click',speedDecrement,false);
document.getElementById("angleIncrement").addEventListener('click',angleIncrement,false);
document.getElementById("angleDecrement").addEventListener('click',angleDecrement,false);

function onLoad() {
	var ball = document.getElementById("ball");
	var posX = document.getElementById("posX");
	var posY = document.getElementById("posY");
	var wrapper = document.getElementById("wrapper");
	var floor = document.getElementById("floor");	
	var speedLabel = document.getElementById("speedLabel");
	var angleLabel = document.getElementById("angleLabel");
	var speedBox = document.getElementById("speedBox");
	var angleBox = document.getElementById("angleBox");
	var colorTable = document.getElementById("colorTable");
	var pathWrapper = document.getElementById("pathWrapper");
	var togglePathBtn = document.getElementById("togglePathBtn");
	var pauseBtn = document.getElementById("pauseBtn");
	var rgbView = document.getElementById("rgbView");
}

function start() {
	rad = ang * pi / 180;
	vox = speed * Math.cos(rad);
	voy = speed * Math.sin(rad);	
	moveLogic = setInterval(mainLoop, 80);
}

function pause() {	
	if(pauseBtn.innerHTML === "Pause") {		
		pauseBtn.innerHTML = "Resume";
		clearInterval(moveLogic);
	}
		
	else {		
		pauseBtn.innerHTML = "Pause";
		moveLogic = setInterval(mainLoop, 80);
	}
		
}

function restart() {	
	clearInterval(moveLogic);	
	ang = 0;
	speed = 0;	
	time = 0;		
	
	ball.style.left = "5px";
	ball.style.bottom = "15px";
	speedLabel.innerHTML = "Speed: 0";
	angleLabel.innerHTML = "Angle: 0";
	posX.innerHTML = "PositionX: 0";
	posY.innerHTML = "PositionY: 0";
}

function clearScreen() {
	speedBox.style.display = "none";
	angleBox.style.display = "none";
	colorTable.style.display = "none";
	pathWrapper.innerHTML = "";
}

function setSpeed() {
	speedBox.style.display = "block";	
}
function setAngle() {
	angleBox.style.display = "block";
}
function speedIncrement() {
	speed += 10;
	speedLabel.innerHTML = "Speed: " + speed;
}
function speedDecrement() {
	speed -= 10;
	speedLabel.innerHTML = "Speed: " + speed;
}
function angleIncrement() {
	ang += 10;
	angleLabel.innerHTML = "Angle: " + ang;
}
function angleDecrement() {
	ang -= 10;
	angleLabel.innerHTML = "Angle: " + ang;
}

function togglePath() {
	if(!isPathOn) {
		togglePathBtn.innerHTML = "Toggle Path (on)";
		isPathOn = true;
	}
	else {
		togglePathBtn.innerHTML = "Toggle Path (off)";
		isPathOn = false;
	}
}

function setColorTable() {
	if(colorTable.style.display === 'none')
		colorTable.style.display = "table";
	else
		colorTable.style.display = "none";

	if(createTable) {
		var r = 0;
		var g = 0;
		var b = 0;
		var idIndex = 0;
		var colorIndex = 0;		
		for(var i = 0; i < 117; i++) {				
			colorTable.innerHTML += '<div class="box" id="index' + idIndex +'" onclick="changeColor(this.style.backgroundColor)"></div>';
			document.getElementById("index" + idIndex).style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
			idIndex++;

			r = Math.floor((Math.random() * 255) + 1);
			g = Math.floor((Math.random() * 255) + 1);
			b = Math.floor((Math.random() * 255) + 1);
		}
		createTable = false;
	}
}

function changeColor(e) { //For color tiles
	//var color = e.style.backgroundColor;	
	var color = e;	

	if(document.getElementById("ballCheck").checked)
		ball.style.backgroundColor = color;
	if(document.getElementById("floorCheck").checked)
		floor.style.backgroundColor = color;
	if(document.getElementById("backgroundCheck").checked)  
		wrapper.style.background = color;	
	if(document.getElementById("pathCheck").checked)
		pathColor = color;	
}

function showRgbColor() {
	var rValue = document.getElementById("rValue").value;
	var gValue = document.getElementById("gValue").value;
	var bValue = document.getElementById("bValue").value;

	document.getElementById("rValueOutput").innerHTML = rValue;
	document.getElementById("gValueOutput").innerHTML = gValue;
	document.getElementById("bValueOutput").innerHTML = bValue;

	var backgroundRgbColor = "rgb(" + parseInt(rValue) + "," + parseInt(gValue) + "," + parseInt(bValue) + ")";

	rgbView.style.backgroundColor = backgroundRgbColor;

	changeColor(backgroundRgbColor);
}

function setBackgroundUrl() {
	var backgroundUrl = document.getElementById("backgroundUrlSet").value;
	wrapper.style.background = "url('" + backgroundUrl + "')";
}

function readImagesAndSetAsBackground(files) {
    for(var i=0; i < files.length; i++) {
        var f = files[i];
	      
        var reader = new FileReader();
	        
        reader.onload = function(e) {
          wrapper.style.backgroundImage = "url('" + e.target.result + "')";
       }
	      
       reader.readAsDataURL(f);
    }
}

function mainLoop() {		
	time += 0.2;
	x = vox * time;
	y = voy * time - 0.5 * gravity * (time * time);
	positionX = x;
	positionY = initialYPosition + y;		
		
	ball.style.left = positionX + "px";
	ball.style.bottom = positionY + "px";
	posX.innerHTML = "PositionX: " + Math.round(positionX);
	posY.innerHTML = "PositionY: " + Math.round(positionY);

	if(isPathOn) {			
		pathWrapper.innerHTML += '<span class="dot" style="left: ' + positionX + 'px; bottom: ' + positionY + 'px; background-color: ' + pathColor + '"></span>';
	}

	if(positionY <= 10) {		
		clearInterval(moveLogic);
	}	
}
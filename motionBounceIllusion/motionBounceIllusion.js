//Motion Bounce Illision Code by Christopher Biggs
// v2.0 1.15.19

//MyBackgound object
var thisBackground;

//header space
var header = 50; 
//workspace outline
var borders = [50, 50, 400, 700]; //upper corner, width, length
//circle size
var circleSize = 400;

//toggle objects and assignment variables
var toggleRun;
var toggleMakeClick;
var isRunning = true;
var isClicking = false;

//SelectSound graphic
var currentSound;

//slider objects
var sliderSize;
var sliderSpeed;
var sliderOpacity;
var sliderRotate;
var sliderQuantity;

//assignemnts variables from slider
var sz; //ball size
var sp; //ball speed
var bl; //ball blur
var rot; //ball rotation
var qn = 1; //ball quantity

//variables for slider return values
var minSize = 10; //min ball size
var maxSize = 40; //max ball size
var minSpeed = 1; //min ball speed
var maxSpeed = 6; //max ball speed

//variables for bouncing balls
//global variables
var dir = 1; //ball direction
var x = -200+maxSize/2; //initial ball x position
var y = 0; //initial ball y position
var moveBalls = [200+borders[0], 200+header+borders[1]];

//collision detection variable
var hit = false; 
var prevHit = false;
var changeHit = false;

//sound file player object
var sound1; 
var sound2;
var sound3;
var sound4;

function preload() {
  sound1 = loadSound('assets/click1.mp3');
  sound2 = loadSound('assets/click2.mp3');
  sound3 = loadSound('assets/click3.mp3');
  sound4 = loadSound('assets/click4.mp3');
}

function setup() {
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight);
  //create togle objects
  toggleRun = new Toggle("Run", isRunning); //name, default value
  toggleMakeClick = new Toggle("Sound", isClicking);
  //select sound object
  currentSound = new SelectSound(0, 200+borders[0], 5+borders[1], 150, 40); //default sound, rect params
  //create slider objects
  var sliderXpos = 50+borders[0];
  var sliderYposOffset = header + borders[1];
  sliderSize = new Slider(sliderXpos, 440+sliderYposOffset, borders[2], "Size", 50); //xpos, ypos, length, name, initial value
  sliderSpeed = new Slider(sliderXpos, 480+sliderYposOffset, borders[2], "Speed", 50);
  sliderOpacity = new Slider(sliderXpos, 520 + sliderYposOffset, borders[2], "Opacity", 75);
  sliderRotate = new Slider(sliderXpos, 560+sliderYposOffset, borders[2], "Rotate", 0);
  sliderQuantity = new Slider(sliderXpos, 600+sliderYposOffset, borders[2], "Quantity", 0);
  
  thisBackground = new MyBackground("MOTION-BOUNCE ILLUSION");
}

function draw() {
  thisBackground.shade(20);
  thisBackground.name(borders[0], borders[1]-5);
  //create workspace
  workspace(borders[0], borders[1], borders[2], borders[3]); //borders of workspace
  outline(borders[0], borders[1], borders[2], borders[3], header, circleSize); //size, header space, circlesize
  //create toggles and assign return values
  toggleRun.make(borders[0]+10, 25+borders[1], 20); //xpos, ypos, size
  isRunning = toggleRun.isChecked();
  toggleMakeClick.make(borders[0] + 50, 25+borders[1], 20);
  isClicking = toggleMakeClick.isChecked();
  //create selectSound
  currentSound.make();
  var s = currentSound.sound();
  //create sliders
  sliderSize.make();
  sliderSpeed.make();
  sliderOpacity.make();
  sliderRotate.make();
  sliderQuantity.make();
  //assign slider return values to variables and show slider values
  sz = sliderSize.value(minSize, maxSize); //returns current position and maps to value range
  sliderSize.post(0, 1, 5, "f", true); //range, number of characters to display, datetype (i || not), displayed normalized value
  sp = sliderSpeed.value(minSpeed, maxSpeed);
  sliderSpeed.post(0, 1, 5, "f", true);
  bl = sliderOpacity.value(255, 20);
  sliderOpacity.post(0, 1, 5, "f", true);
  rot = sliderRotate.value(0, 6.28);
  sliderRotate.post(0,360, 3, "i", false);
  qn = Math.floor(sliderQuantity.value(2, 9));
  //create balls
  bouncingBalls();
  //check for collision and play file
  collisionSound(s);
}

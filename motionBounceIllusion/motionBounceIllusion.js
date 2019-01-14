//toggle objects and assignment variables
var toggleRun;
var toggleMakeClick;
var isRunning = true;
var isClicking = false;

//SelectSound Object
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

//global variables
var dir = 1; //ball direction
var minSize = 10; //min ball size
var maxSize = 40; //max ball size
var minSpeed = 1; //min ball speed
var maxSpeed = 6; //max ball speed
var x = -200+maxSize/2; //initial ball x position
var y = 0; //initial ball y position
var header = 50; //header space

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
  var myCanvasBallClick = createCanvas(410, 700);
  myCanvasBallClick.parent('myContainerClick');
  
  toggleRun = new Toggle("Run", isRunning); //name, default value
  toggleMakeClick = new Toggle("Sound", isClicking);
  
  sliderSize = new Slider(50, 440+header, "Size", 50); //pad from left, ypos, name, initial value
  sliderSpeed = new Slider(50, 480+header, "Speed", 50);
  sliderOpacity = new Slider(50, 520 + header, "Opacity", 75);
  sliderRotate = new Slider(50, 560+header, "Rotate", 0);
  sliderQuantity = new Slider(50, 600+header, "Quantity", 0);

  currentSound = new SelectSound(0, 200, 5, 150, 40); //default sound, rect params
}

function draw() {
  background(0);
  outline(width, header); //draw visual segmentations
  
  //create toggles and assign return values
  toggleRun.make(50, 25, 20); //xpos, ypos, size
  isRunning = toggleRun.isChecked();
  toggleMakeClick.make(100, 25, 20);
  isClicking = toggleMakeClick.isChecked();
  
  //create sliders
  sliderSize.make();
  sliderSpeed.make();
  sliderOpacity.make();
  sliderRotate.make();
  sliderQuantity.make();
  
  //assign slider return values to variables and show slider values
  sz = sliderSize.value(minSize, maxSize); //returns current position and maps to value range
  sliderSize.post(0, 1, 5, "f"); //shows the current value based on range, display length, data type
  sp = sliderSpeed.value(minSpeed, maxSpeed);
  sliderSpeed.post(0, 1, 5, "f");
  bl = sliderOpacity.value(255, 20);
  sliderOpacity.post(0, 1, 5, "f");
  rot = sliderRotate.value(0, 6.28);
  sliderRotate.post(0,360, 3, "i");
  qn = Math.floor(sliderQuantity.value(2, 9));
  //sliderQuantity.post(2,18, 2, "I");
  
  //create selectSound
  currentSound.make();
  var s = currentSound.sound();
  
  //create balls
  bouncingBalls();
  
  //check for collision and play file
  collisionSound(s);
}

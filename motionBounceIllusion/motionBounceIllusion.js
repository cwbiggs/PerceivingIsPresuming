//Motion Bounce Illision Code by Christopher Biggs
// v2.0 5.15.19

//MyBackgound object – includes background color and name
var thisBackground;

//header space
var header = 50; 
//workspace outline
var borders = [50, 50, 400, 700]; //upper corner, size
//circle size
var circleSize = 400;

//toggle objects and assignment variables
var toggleRun;
var toggleMakeClick;
var isRunning = false;
var isClicking = false;

//SelectSound graphic
var currentSound;

//slider objects
var sliderSize;
var sliderSpeed;
var sliderOpacity;
var sliderRotate;
var sliderQuantity;

//assignemnt variables from slider
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

//sound file player objects
var sf = new Array(6);

//add button for reset values
var reset;
//frameRate variable
var fr = 60;
//link objects
var home;
var fixed;
//link to any example
var accessExamples;
var e = "Example";
var exampleNames = ['example 1', 'example 2', 'example 3'];

var yPosLinks = 20;

function preload(){
    for (var i = 0; i < sf.length; i++) {
    var name = "click" + i;
    var thisFile = "assets/"+name+ ".mp3";
    sf[i] = createAudio(thisFile);
    sf[i].autoplay(false);
  }
  
}

function setup() {
  //create a canvas the size of the window
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight); 
  //set framerate
  frameRate(fr);
  //create togle objects
  toggleRun = new Toggle("Run", false); //name, default value
  toggleMakeClick = new Toggle("Sound", false);
  //select sound object
  currentSound = new SelectSound(3, 120+borders[0], 5+borders[1], 150, 40); //default sound, rect params
  //create slider objects
  var sliderXpos = 50+borders[0];
  var sliderYposOffset = header + borders[1];
  sliderSize = new Slider(sliderXpos, 440+sliderYposOffset, borders[2], "Size", 80); //xpos, ypos, length, name, initial value along length - 400
  sliderSpeed = new Slider(sliderXpos, 480+sliderYposOffset, borders[2], "Speed", 50);
  sliderOpacity = new Slider(sliderXpos, 520 + sliderYposOffset, borders[2], "Opacity", 75);
  sliderRotate = new Slider(sliderXpos, 560+sliderYposOffset, borders[2], "Rotate", 0);
  sliderQuantity = new Slider(sliderXpos, 600+sliderYposOffset, borders[2], "Quantity", 0);
  //load sound files
  for (var i = 0; i < sf.length; i++) {
    sf[i].stop();
  }
  //create background and name
  thisBackground = new MyBackground("MOTION-BOUNCE ILLUSION");
  //a button to reset to the default parameters for the sliders
  reset = createButton('reset');
  //location of reset button
  reset.position(300+borders[0], 15+borders[1]);
  //function to call, if reset button is pressed
  reset.mousePressed(init);
  //create link objects
  home = new Link(borders[2]+borders[1]+20, yPosLinks, 50, 20, 12, "HOME");
  fixed = new Link(borders[2]+borders[1]+100, yPosLinks, 150, 20, 12, "PLAY STATIC EXAMPLE");
  //link to any examples
  accessExamples = createSelect();
  accessExamples.position(borders[2]+borders[1]+270, yPosLinks);
  for(var i = 0; i < exampleNames.length; i++) {
    accessExamples.option(exampleNames[i]);
  }
}

function draw() {
  //draw background and name
  thisBackground.shade(20);
  thisBackground.name(borders[0], borders[1]-5);

  //draw outline for workspace
  workspace(borders[0], borders[1], borders[2], borders[3]); //borders of workspace
  //draw specifics of workspace
  outline(borders[0], borders[1], borders[2], borders[3], header, circleSize); //size, header space, circlesize
  //draw outline and text for instructions
  instructions(borders[2]+borders[0], borders[1], borders[2], borders[3]);
  //draw links
  home.make();
  home.active("https://christopherbiggsmusic.com/");
  fixed.make();
  fixed.active("https://www.youtube.com/");
  //draw toggles and assign return values
  toggleRun.make(borders[0]+10, 25+borders[1], 20); //xpos, ypos, size
  isRunning = toggleRun.isChecked();
  toggleMakeClick.make(borders[0] + 50, 25+borders[1], 20);
  isClicking = toggleMakeClick.isChecked();
  //draw selectSound
  currentSound.make();
  //variable to hold current sound file number
  var s = currentSound.sound();
  //draw sliders
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
  sliderRotate.post(0, 360, 3, "i", false);
  qn = Math.floor(sliderQuantity.value(2, 9));
  //draw balls
  bouncingBalls();
  //check for collision and play file
  collisionSound(s);
}

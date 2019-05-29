//Motion Bounce Illision Code by Christopher Biggs
// v2.0 5.15.19

//Components object makes the background color, name, workspace outline, workspace divisions, instructions
var components;
//workspace outline, arguments for components object
var borders = [50, 50, 400, 700]; //upper corner, size
//header line division for parameter control at the top
var header = 50; 
//size of the circle in which the balls will collide
var circleSize = 400;
//help object to show help text
var helper;
//sound file player objects
var sf = new Array(6);
//var json file references
let insJson; //instruction files and separation values
let examples;

function preload() {
  insJson = loadJSON("assets/motionBounceInstructions.json");
  examples = loadJSON("assets/examplesMenu.json");
  for (var i = 0; i < sf.length; i++) {
    var name = "click" + i;
    var thisFile = "assets/"+name+ ".mp3";
    sf[i] = createAudio(thisFile);
    sf[i].autoplay(false);
  }
}

//hold calculated y positions for the instructions
var insYpos=[];

//frameRate variable
var fr = 60;

//toggle objects and assignment variables
var toggleRun;
var toggleMakeClick;
var isRunning = false;
var isClicking = false;

//SelectSound graphic
var currentSound;
//button to reset sounds
var reset;
//sliders
var sliders = new Array(5); //hold an array of sliders
var sliderNames = ["Size", "Speed", "Opacity", "Rotate", "Quantity"];
var sliderOffsetX = 50;
var sliderDefaults = [80, 50, 75, 0, 0];
var sliderHelp = ["increase ball size to see pass", "decrease ball speed to see pass", "decrease value to see pass", "roate ball position", "show more balls"]

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



function setup() {
  //create a canvas the size of the window
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight); 
  //set framerate
  frameRate(fr);
  //create major components standard for most sketches (name, workspace borders)
  components = new Components("MOTION-BOUNCE ILLUSION", borders[0], borders[1], borders[2], borders[3]);
  //create help region
  helper = new HelpRegion(borders[2]+borders[0], 5, borders[2], 40);
  instructionParams(); //calculate the final instruction parameters array
  //create togle objects
  toggleRun = new Toggle("Run", false); //name, default value
  toggleMakeClick = new Toggle("Sound", false);
  //select sound object
  currentSound = new RotateSelect(3, 110+borders[0], 5+borders[1], 150, 40, ["Click 0", "Click 1", "Click 2", "Click 3", "Click 4", "Click 5"]); //default sound, rect params, items
  //create button object
  reset = new Button("reset", 270+borders[0], 5+borders[1], 100, 40); //name, rectangle 
  var sliderXpos = sliderOffsetX+borders[0];
  var sliderYposOffset = header + borders[1];
  for(var i = 0; i < sliders.length; i++){
    sliders[i] = new Slider(sliderXpos, 440+i*40+sliderYposOffset, borders[2], sliderNames[i], sliderDefaults[i]); //xpos, ypos, length, name, initial value along length - 400
  }


  //create slider objects
/*   var sliderXpos = 50+borders[0];
  var sliderYposOffset = header + borders[1];
  sliderSize = new Slider(sliderXpos, 440+sliderYposOffset, borders[2], "Size", 80); //xpos, ypos, length, name, initial value along length - 400
  sliderSpeed = new Slider(sliderXpos, 480+sliderYposOffset, borders[2], "Speed", 50);
  sliderOpacity = new Slider(sliderXpos, 520 + sliderYposOffset, borders[2], "Opacity", 75);
  sliderRotate = new Slider(sliderXpos, 560+sliderYposOffset, borders[2], "Rotate", 0);
  sliderQuantity = new Slider(sliderXpos, 600+sliderYposOffset, borders[2], "Quantity", 0); */
  //load sound files
  for (var i = 0; i < sf.length; i++) {
    sf[i].stop();
  }
}

function draw() {
  //draw background and name
  components.background(50); //redraw background(shade 0-255)
  components.name(borders[0], borders[1]-5); //draw name(x position, y position) text allign is left, bottom
  components.workspace(); // draw workshop, workshop outline is defined with object
  components.workspaceDiv(header); //create a line accoss the workhsop at a y position relative to the workspace outline
  components.workshopCirc(circleSize, header); //create a circle(cs, y position relative to workspace outline)
  components.workspaceDiv(header+circleSize); //create a line accoss the workhsop at a y position relative to the workspace outline
  components.instructions(borders[2], borders[3], header); //create the outline, dividing line for "instructions" text, and "instructions" text (width, length, instructions title space)
  components.instructionsList(insJson.text, insJson.boundry, insYpos); //draw instructions list
  components.navigation(); //draw navigation too bar
  //draw toggles and assign return values
  toggleRun.make(borders[0]+10, 25+borders[1], 20, 20, ["flash", 15]); //xpos, ypos, xsize, ysize, behavior
  toggleRun.help("click to start or stop: will flash when running");
  isRunning = toggleRun.isChecked();
  toggleMakeClick.make(borders[0] + 50, 25+borders[1], 30, 20);
  toggleMakeClick.help("turn sound on and off: x indicates on");
  isClicking = toggleMakeClick.isChecked();
  //draw selectSound
  currentSound.make(50, 25); //x and y offset for text
  //variable to hold current sound file number
  var s = currentSound.rotate();
  currentSound.help("click to rotate through different sounds");
  //reset parameters
  reset.make(30, 25); //draw button(x and y offset for text)
  reset.help("click to load default settings"); //show help text
  if(reset.trigger()){
    init();
  }
  for(var i = 0; i < sliders.length; i++){
    sliders[i].make();
    sliders[i].help(sliderHelp[i]);
  }
     //assign slider return values to variables and show slider values
     sz = sliders[0].value(minSize, maxSize); //returns current position and maps to value range
     sliders[0].post(0, 1, 5, "f", true); //range, number of characters to display, datetype (i || not), displayed normalized value
     sp = sliders[1].value(minSpeed, maxSpeed);
     sliders[1].post(0, 1, 5, "f", true);
     bl = sliders[2].value(255, 20);
     sliders[2].post(0, 1, 5, "f", true);
     rot = sliders[3].value(0, 6.28);
     sliders[3].post(0, 360, 3, "i", false);
     qn = Math.floor(sliders[4].value(2, 9));
    


   //draw balls
   bouncingBalls();
   //check for collision and play file
   collisionSound(s);
   
}

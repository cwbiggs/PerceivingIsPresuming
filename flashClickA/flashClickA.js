//Components object makes the background color, name, workspace outline, workspace divisions, instructions
var components;
//workspace outline, arguments for components object
var borders = [50, 50, 400, 700]; //upper corner, size
//header line division for parameter control at the top
var header = 50;
//flash object
var f;
//help object to show help text
var helper; 
//sound file player objects
var sf = new Array(6);
var sfB = new Array(6);
//var json file references
let insJson; //instruction files and separation values
let examples; //examples list and links

function preload() {
  insJson = loadJSON("assets/flashClickAInstructions.json");
  examples = loadJSON("assets/examplesMenu.json");
  for (var i = 0; i < sf.length; i++) {
    var name = "click" + i;
    var thisFile = "assets/" + name + ".mp3";
    var thisFileB = "assets/" + name+"B"+ ".mp3";
    sf[i] = createAudio(thisFile);
    sfB[i] = createAudio(thisFileB);
    sf[i].autoplay(false);
    sfB[i].autoplay(false);
  }
}

//hold calculated y positions for the instructions
var insYpos = [];

//frameRate variable
var fr = 120;

//toggle objects and assignment variables
var toggleRun;
var toggleMakeClick;
var isRunning = false;
var isClicking = true;

//SelectSound graphic
var currentSound;
//button to reset sounds
var reset;
//sliders
var sliders = new Array(5); //hold an array of sliders
var sliderNames = ["Flash Size", "Flash Color", "Flash Transparency", "Event Separation", "Flash Duration"];
var sliderOffsetX = 50;
var sliderDefaults = [20, 0, 160, 80, 200];
var sliderHelp = ["increase flash size", "change flash color", "increase transparency of flash", "time between flashes", "length of flash"];

//assignemnt variables from slider
var flashSize; //ball size
var flashColor; //ball speed
var flashOpacity; //ball blur
var eventSep; //ball rotation
var flashDuration = 50; //ball quantity

//variables for slider return values
var minSize = 10; //min ball size
var maxSize = 400; //max ball size
var minEventSep = 1000; //min ball speed
var maxEventSep = 4000; //max ball speed
var flashDurationMin = 10;
var flashDurationMax = 200;

//timing
var loopLength;
var m;
var threshLow = [0, 750, 800];
threshLow[2] = threshLow[1]+flashDuration/2;
var threshHigh = new Array(3);


var trigger = new Array(3);
var triggerPrev = new Array(3);

for (var i = 0; i < threshLow.length; i++) {
  threshHigh[i] = threshLow[i] +flashDuration;
}

var playSound = new Array(3);

function setup() {
  //create a canvas the size of the window
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight);
  //set framerate
  frameRate(fr);
  //create major components standard for most sketches (name, workspace borders)
  components = new Components("Click-Flash A", borders[0], borders[1], borders[2], borders[3]);
  //create help region
  helper = new HelpRegion(borders[2] + borders[0], 5, borders[2], 40);
  instructionParams(); //calculate the final instruction parameters array
  //create togle objects
  toggleRun = new Toggle("Run", false); //name, default value
  toggleMakeClick = new Toggle("Sound", true);
  //select sound object
  currentSound = new RotateSelect(4, 110 + borders[0], 5 + borders[1], 150, 40, ["Click 0", "Click 1", "Click 2", "Click 3", "Click 4", "Click 5"]); //default sound, rect params, items
  //create button object
  reset = new Button("reset", 270 + borders[0], 5 + borders[1], 100, 40); //name, rectangle 
  var sliderXpos = sliderOffsetX + borders[0];
  var sliderYposOffset = header + borders[1];
  for (let i = 0; i < sliders.length; i++) {
    sliders[i] = new Slider(sliderXpos, 440 + i * 40 + sliderYposOffset, borders[2], sliderNames[i], sliderDefaults[i]); //xpos, ypos, length, name, initial value along length - 400
  }
  for (let p = 0; p < sf.length; p++) {
    sf[p].stop();
    sfB[p].stop();
  }

  for (let i = 0; i < trigger.length; i++) {
    trigger[i] = false;
    triggerPrev = false;
  }

  f = new Flash(borders[2]/2+borders[0], borders[1]+borders[3]/2-header*2);
}


function draw() {
  components.background(50); //redraw background(shade 0-255)
  components.name(borders[0], borders[1] - 5); //draw name(x position, y position) text allign is left, bottom
  components.workspace(); // draw workspace, workspace outline is defined with object
  components.workspaceDiv([header, header + 400]); //create lines accoss the workhsop at a y positions relative to the workspace outline

  components.instructions(borders[2], borders[3], header); //create the outline, dividing line for "instructions" text, and "instructions" text (width, length, instructions title space)
  components.instructionsList(insJson.text, insJson.boundry, insYpos); //draw instructions list
  components.navigation(); //draw navigation too bar
  //draw toggles and assign return values
  toggleRun.make(borders[0] + 10, 25 + borders[1], 20, 20, ["flash", 15]); //xpos, ypos, xsize, ysize, behavior
  toggleRun.help("click to start or stop: will flash when running");
  isRunning = toggleRun.isChecked();
  toggleMakeClick.make(borders[0] + 50, 25 + borders[1], 30, 20);
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
  if (reset.trigger()) {
    init();
  }
  for (var i = 0; i < sliders.length; i++) {
    sliders[i].make();
    sliders[i].help(sliderHelp[i]);
  }

  //assign slider return values to variables and show slider values
  flashSize = sliders[0].value(minSize, maxSize); //returns current position and maps to value range
  sliders[0].post(minSize, maxSize, 5, "i", false); //range, number of characters to display, datetype (i || not), displayed normalized value
  flashColor = sliders[1].value(0, 1); //returns current position and maps to value range
  sliders[1].post(0, 1, 5, "f", true); //range, number of characters to display, datetype (i || not), displayed normalized value
  flashOpacity = sliders[2].value(255, 0); //returns current position and maps to value range
  sliders[2].post(255, 0, 5, "i", false); //range, number of characters to display, datetype (i || not), displayed normalized value
  eventSep = int(sliders[3].value(minEventSep, maxEventSep)); //returns current position and maps to value range
  sliders[3].post(minEventSep, maxEventSep, 5, "i", false); //range, number of characters to display, datetype (i || not), displayed normalized value
  flashDuration = int(sliders[4].value(flashDurationMin, flashDurationMax)); //returns current position and maps to value range
  sliders[4].post(flashDurationMin, flashDurationMax, 5, "i", false); //range, number of characters to display, datetype (i || not), displayed normalized value


  loopLength = eventSep*2;
  m = millis() % loopLength;

  threshLow[1] = eventSep;
  var threshoff = max(flashDuration*0.5, 20)
    threshLow[2] = eventSep+threshoff;
  for (let i = 0; i < threshLow.length; i++) {
    threshHigh[i] = threshLow[i] +flashDuration;
  }

  if (isRunning) {
    for (let i = 0; i < trigger.length; i++) {
      trigger[i] = m>=threshLow[i] && m < threshHigh[i];

      playSound[i] = trigger[i] !=triggerPrev[i];
      if (trigger[i]) {
        f.make(flashSize, flashColor, flashOpacity);

        if (isClicking) {
          if (playSound[i] && i<2) {
            sf[s].play();
          } else if (playSound[i]) {
            sfB[s].play();
          }
        }
      }
    }
    triggerPrev[i] = trigger[i];
  }

  print(threshoff);
}

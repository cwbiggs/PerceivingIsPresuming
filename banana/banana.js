//Components object makes the background color, name, workspace outline, workspace divisions, instructions
var components;
//workspace outline, arguments for components object
var borders = [50, 50, 400, 700]; //upper corner, size
//header line division for parameter control at the top
var header = 50;
//help object to show help text
var helper; 
//sound file player objects
var sf = new Array(6);
//var json file references
let insJson; //instruction files and separation values
let examples; //examples list and links
//banana and background
var b; //banana object

var s; //color slider
var sReturn = 0.0; //hold color slider return value

var toYellowCurveSlider, pastYellowCurveSlider;
var toYellowCurve = 0.5;
var pastYellowCurve = 1.5;
var nValueToYellow, nValuePastYellow;

//hold values for selected color
var selectedColor = new Array(2);
//button to change shape
var changeShape;
var showBanana = true;
var reset;
//toggle to show values
var showValues;
var showValuesState = false;
//background color selector
var bc;
var gray = 100; //initial background color

function preload() {
  insJson = loadJSON("assets/bananaIns.json");
  examples = loadJSON("assets/examplesMenu.json");
}

//hold calculated y positions for the instructions
var insYpos = [];

//frameRate variable
var fr = 60;

function setup() {
  //create a canvas the size of the window
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight);
  //set framerate
  frameRate(fr);
  //create major components standard for most sketches (name, workspace borders)
  components = new Components("Banana Color", borders[0], borders[1], borders[2], borders[3]);
  //create help region
  helper = new HelpRegion(borders[2] + borders[0], 5, borders[2], 40);
  instructionParams(); //calculate the final instruction parameters array
  b = new BananaObject();
  s = new Slider(borders[0]+10, 540, borders[2], "color", 0); //xpos, ypos, length, name, initial value along length - 400
  bc = new Slider(borders[0]+10, 585, borders[2], "background color", (borders[2]-borders[0]+10)/2);
  toYellowCurveSlider = new Slider(borders[0]+10, 630, borders[2], "curve to yellow", map(toYellowCurve, 0.25, 4.0, borders[0]+10, borders[2]));
  pastYellowCurveSlider = new Slider(borders[0]+10, 675, borders[2], "curve past yellow", map(pastYellowCurve, 0.25, 4.0, borders[0]+10, borders[2]));
  changeShape = new Button("change shape", 220, 15, 100, 30);
  reset = new Button("reset", borders[0]+300, 700, 50, 30);
  showValues = new Toggle("Show Values", showValuesState); //name, default value
}


function draw() {
  components.background(50); //redraw background(shade 0-255)
  components.name(borders[0], borders[1] - 5); //draw name(x position, y position) text allign is left, bottom
  components.workspace(); // draw workspace, workspace outline is defined with object
  components.workspaceDiv([header + 400]); //create lines accoss the workhsop at a y positions relative to the workspace outline
  components.instructions(borders[2], borders[3], header); //create the outline, dividing line for "instructions" text, and "instructions" text (width, length, instructions title space)
  components.instructionsList(insJson.text, insJson.boundry, insYpos); //draw instructions list
  components.navigation(); //draw navigation too bar

  b.background(borders[0], borders[1], borders[2], header+400, gray);

  s.make();
  s.help("make the backgorund the same color as the banana");
  sReturn = s.value(0, 1);
  bc.make();
  bc.help("change background color");
  gray = int(bc.value(50, 150));
  toYellowCurveSlider.make();
  toYellowCurveSlider.help("change the rate of the change to yellow");
  nValueToYellow = toYellowCurveSlider.value(0, 1);
  if (nValueToYellow < 0.5) {
    toYellowCurve = map(nValueToYellow, 0, 0.5, 0.25, 1);
  } else {
    toYellowCurve = map(nValueToYellow, 0.5, 1, 1, 4);
  }
  pastYellowCurveSlider.make();
  pastYellowCurveSlider.help("change the rate of the change from yellow");
  nValuePastYellow = pastYellowCurveSlider.value(0, 1);
  if (nValuePastYellow < 0.5) {
    pastYellowCurve = map(nValuePastYellow, 0, 0.5, 0.25, 1);
  } else {
    pastYellowCurve = map(nValuePastYellow, 0.5, 1, 1, 4);
  }


  var sReturnDec = sReturn.toFixed(2);
  b.makeBanana(25, sReturnDec, gray, showBanana, toYellowCurve, pastYellowCurve);

  selectedColor = b.reportColor();

  changeShape.make(10, 20);
  changeShape.help("change between banana and geometric shape");
  if (changeShape.trigger()) {
    showBanana = !showBanana;
    s.reset();
    showValues.reset();
  }
  reset.make(10, 20);
  reset.help("click to reset values");
  if(reset.trigger()){
    showValues.reset();
    showBanana = true;
    s.reset();
    bc.reset();
    toYellowCurveSlider.reset();
    pastYellowCurveSlider.reset();
  }
  

  showValues.make(borders[0] + 300, 25, 70, 20, ["solid", 5, 164, 248, 150]); //xpos, ypos, xsize, ysize, behavior
  showValues.help("click to see if you matched");
  showValuesState = showValues.isChecked();

  if (showValuesState) {
    displayValues();
  }
}

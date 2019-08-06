//two grays illusion Code by Christopher Biggs
//add picture citation

//Components object makes the background color, name, workspace outline, workspace divisions, instructions
var components;
//workspace outline, arguments for components object
var borders = [50, 50, 400, 700]; //upper corner, size
//header line division for parameter control at the top
var header = 50;
//help object to show help text
var helper;
//var json file references
let insJson; //instruction files and separation values
let examples; //examples list and links

var tg;
var fr = 120;
var tgSize = new Array(2);

//hold calculated y positions for the instructions
var insYpos = [];

var r;

//button to reset sounds
var reset;

var drawConnectRect;
var rectDrawn = false;
var drawConnectStroke;
var strokeDrawn = false;

function preload() {
  insJson = loadJSON("assets/twoGraysInstructions.json");
  examples = loadJSON("assets/examplesMenu.json");
  tg = loadImage('assets/twoGrays.png');
}


function setup() {
  //create a canvas the size of the window
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight);
  //set framerate
  frameRate(fr);

  tgSize[0] = tg.width*0.5;
  tgSize[1] = tg.height*0.5;

  //create major components standard for most sketches (name, workspace borders)
  components = new Components("Two Grays Illusion", borders[0], borders[1], tgSize[0], tgSize[1]);
  //create help region
  helper = new HelpRegion(tgSize[0] + borders[0], 5, borders[2], 40);
  instructionParams(); //calculate the final instruction parameters array

  r = new MoveRect(60, 100, 100);

  reset = new Button("reset", 270 + borders[0], 5, 100, 40); //name, rectangle
  drawConnectRect = new Toggle("Show Connection", false); //name, default value
  drawConnectStroke = new Toggle("Show Outline", false); //name, default value
}


function draw() {
  components.background(50); //redraw background(shade 0-255)
  components.name(borders[0], borders[1] - 5); //draw name(x position, y position) text allign is left, bottom
  components.workspace(); // draw workspace, workspace outline is defined with object

  components.instructions(borders[2]+20, tgSize[1], header); //create the outline, dividing line for "instructions" text, and "instructions" text (width, length, instructions title space)
  components.instructionsList(insJson.text, insJson.boundry, insYpos); //draw instructions list
  components.navigation(); //draw navigation too bar
  image(tg, borders[0], borders[1], tgSize[0], tgSize[1]);
  r.make();
  r.help("Drag box over the A and B");
  reset.make(30, 25);
  reset.help("click to reset rectangle position");
  if (reset.trigger()) {
    r.reset();
  }

  drawConnectRect.make(borders[0] + 400, 25, 90, 20, ["solid", 5, 164, 248, 150]); //xpos, ypos, xsize, ysize, behavior
  drawConnectRect.help("click to see a bridge between upper and lower squares");
  rectDrawn = drawConnectRect.isChecked();

  if (rectDrawn) {

    drawConnectStroke.make(borders[0] + 520, 25, 70, 20, ["solid", 5, 164, 248, 150]); //xpos, ypos, xsize, ysize, behavior
    drawConnectStroke.help("click to an outline around the bridge");
    strokeDrawn = drawConnectStroke.isChecked();
  }

  if (rectDrawn) {
    rectMode(CORNER);

    noStroke();
    if (strokeDrawn) {
      strokeWeight(2);
      stroke(5, 164, 248, 150);
    }

    fill(137, 137, 137, 255);
    rect(410, 175, 100, 300);
  }
}

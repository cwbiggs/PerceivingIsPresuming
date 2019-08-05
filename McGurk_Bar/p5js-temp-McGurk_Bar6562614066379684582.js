//McGurk Illusion Code by Christopher Biggs
// v1.0 7.02.19

//Components object makes the background color, name, workspace outline, workspace divisions, instructions
var components;
//workspace outline, arguments for components object
var borders = [50, 50, 400, 700]; //upper corner, size
//header line division for parameter control at the top
var header = 50;
//help object to show help text
var helper;
//sound file player and video player objects
var sfMatched = new Array(3);
var sfMisMatched = new Array(3);
var videos = new Array(3);
//var json file references
let insJson; //instruction files and separation values
let examples; //examples list and links
//hold calculated y positions for the instructions
var insYpos = [];
//frameRate variable
var fr = 60;

function preload() {
  insJson = loadJSON("assets/motionBounceInstructions.json");
  examples = loadJSON("assets/examplesMenu.json");
  for (var i = 0; i < sfMatched.length; i++) {
    var vName = "assets/"+"v" + i+".mp4";

    videos[i] = createVideo(videos[i]);
    videos[i].hide();
    videos[i].loop();
    videos[i].stop();
    videos[i].autoplay(false);

    var aCorrect = "assets/"+"aCorrect"+i+".mp3";
    var aWrong = "assets/"+"aWrong"+i+".mp3";

    sfMatched[i] = createAudio(aCorrect);
    sfMatched[i].autoplay(false);
    sfMisMatched[i] = createAudio(aWrong);
    sfMisMatched[i].autoplay(false);
  }
}

function setup() {
  //create a canvas the size of the window
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight);
  //set framerate
  frameRate(fr);
  //create major components standard for most sketches (name, workspace borders)
  components = new Components("MOTION-BOUNCE ILLUSION", borders[0], borders[1], borders[2], borders[3]);
  //create help region
  helper = new HelpRegion(borders[2] + borders[0], 5, borders[2], 40);
  instructionParams(); //calculate the final instruction parameters array
}


function draw() {
}

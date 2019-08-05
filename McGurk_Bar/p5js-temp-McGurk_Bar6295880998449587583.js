//McGurk Illusion Code by Christopher Biggs
// v1.0 7.02.19

//Components object makes the background color, name, workspace outline, workspace divisions, instructions
var components;
//workspace outline, arguments for components object
var borders = [50, 50, 532, 700]; //upper corner, size
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
var fr = 30;

//interface control objects
var run, showVideo, changeAudio, showWords, selectPerson;
//variable for returns from interface objects
var isRunning, isShown, wordsShown;
var correctAudio = false;

function preload() {
  insJson = loadJSON("assets/McGurkIns.json");
  examples = loadJSON("assets/examplesMenu.json");
  for (var i = 0; i < sfMatched.length; i++) {
    var vName = "assets/"+"v" + i+".mp4";
    videos[i] = createVideo(videos[i]);
    videos[i].hide();
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
  components = new Components("McGurk Bar", borders[0], borders[1], borders[2], borders[3]);
  //create help region
  helper = new HelpRegion(borders[2] + borders[0], 5, borders[2], 40);
  instructionParams(); //calculate the final instruction parameters array 
   for (var i = 0; i < sfMatched.length; i++) {
    //videos[i].loop();
    videos[i].stop();
    videos[i].autoplay(false);
   }
   //create interface objects
   run = new Toggle("Run", false); 
   showVideo = new Toggle("Show Video", true);
   changeAudio = new Button("Change Audio",  120 + borders[0], 5 + borders[1], 120, 40);
   showWords = new Toggle("Show Words", false);
   selectPerson = new RotateSelect(0, 110 + borders[0], 5 + borders[1], 150, 40, ["Meredith", "David", "Rhea"]); //default sound, rect params, items

}


function draw() {
  components.background(50); //redraw background(shade 0-255)
  components.name(borders[0], borders[1] - 5); //draw name(x position, y position) text allign is left, bottom
  components.workspace(); // draw workspace, workspace outline is defined with object
  components.workspaceDiv(header); //create lines accoss the workhsop at a y positions relative to the workspace outline
  components.instructions(borders[2], borders[3], header); //create the outline, dividing line for "instructions" text, and "instructions" text (width, length, instructions title space)
  components.instructionsList(insJson.text, insJson.boundry, insYpos); //draw instructions list
  components.navigation(); //draw navigation too bar
  //draw inteface objects
  run.make(borders[0] + 10, 25 + borders[1], 20, 20, ["flash", 15]); //xpos, ypos, xsize, ysize, behavior
  run.help("click to start or stop: will flash when running");
  isRunning = run.isChecked();
  showVideo.make(borders[0] + 50, 25 + borders[1], 60, 20);
  showVideo.help("show and hide video and listen to what you hear");
  isShown = showVideo.isChecked();
  changeAudio.make(20, 25); //draw button(x and y offset for text)
  changeAudio.help("change the audio while watching and listen to what you hear while watching"); //show help text
   if (changeAudio.trigger()) {
    correctAudio = !correctAudio;
    //print(correctAudio);
   }
  showWords.make(borders[0] + 250, 25 + borders[1], 65, 20); //xpos, ypos, xsize, ysize, behavior
  showWords.help("show the actual words that match the audio");
  wordsShown = showWords.isChecked();
   //draw selectSound
  currentSound.make(50, 25); //x and y offset for text
  //variable to hold current sound file number
  var s = currentSound.rotate();
  currentSound.help("click to rotate through different sounds");
   
  
}

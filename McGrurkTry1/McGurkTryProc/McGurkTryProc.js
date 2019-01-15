//MyBackgound object
var thisBackground;

//header space
var header = 50; 
//workspace outline
var borders = [50, 50, 555, 610+header]; //upper corner, width, length

//toggle objects and assignment variables
var toggleRun;
var isRunning = false;
var prevIsRunning = isRunning;
var toggleHideVideo;
var isHidden = false;
var toggleAudio;
var rightAudio = false;
var prevAudio = rightAudio; //create change 
var toggleReveal;
var isRevealed = false;

//slider object
var degradeSlider;
var degrade;
var maxDegrade=2000;


//sound file player object
var correctAudio; 
var wrongAudio;
//video file player
var v;



function preload() {
  correctAudio = loadSound('assets/thatFatBatCaudio.mp3');
  wrongAudio = loadSound('assets/thatFatBatWaudio.mp3');
}

function setup() {
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight);
  correctAudio.loop();
  wrongAudio.loop();
  thisBackground = new MyBackground("WHAT DO YOU HEAR?");
  toggleRun = new Toggle("Play", isRunning); //name, default value
  toggleHideVideo = new Toggle("Hide Video", isHidden); 
  toggleAudio = new Toggle("Change Audio", rightAudio);
  toggleReveal = new Toggle("Reveal Words", isRevealed);

correctAudio.stop();
  wrongAudio.stop();

  v = createVideo('assets/thatFatBatvideo.mp4');
  v.hide();
  v.loop();
  v.stop();
  degradeSlider = new Slider(450+borders[0], borders[1]+33, 600, "Degrade", 0);
}

function draw() {
  thisBackground.shade(20);
  thisBackground.name(borders[0], borders[1]-5);
  //create workspace
  workspace(borders[0], borders[1], borders[2], borders[3]); //borders of workspace

  //create toggles and assign return values
  toggleRun.make(borders[0]+10, 25+borders[1], 20); //xpos, ypos, size
  isRunning = toggleRun.isChecked();
  toggleHideVideo.make(borders[0]+60, 25+borders[1], 20);
  isHidden = toggleHideVideo.isChecked();
  toggleAudio.make(borders[0]+130, 25+borders[1], 20);
  rightAudio = toggleAudio.isChecked();
  toggleReveal.make(borders[0]+220, 25+borders[1], 20);
  isRevealed = toggleReveal.isChecked();
  showWords(borders[0]+250, 45+borders[1]);
//  degradeSlider.make();
//  degrade = degradeSlider.value(0, 1);
//  degradeSlider.post(0, 1, 5, "f", true, -25);



  play();
  if (isHidden) {
    noStroke();
    fill(0, 255);
    rect(borders[0]+5, borders[1]+header+5, v.width, v.height);
  }

}

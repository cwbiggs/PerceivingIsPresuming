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
var selectVocalist;
var isSelected;
var toggleReveal;
var isRevealed = false;

//sound file player object
var correctAudio; 
var wrongAudio;
var correctAudioB;
var wrongAudioB;
//video file player
var v;
var v2;

function preload() {
  correctAudio = loadSound('assets/DavidThatFatBatCorrect.mp3');
  wrongAudio = loadSound('assets/DavidThatFatBatIncorrect.mp3');  
  correctAudioB = loadSound('assets/RheaThatFatBatCorrect.mp3');
  wrongAudioB = loadSound('assets/RheaThatFatBatIncorrect.mp3');
}

function setup() {
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight);
  correctAudio.loop();
  wrongAudio.loop();
  correctAudioB.loop();
  wrongAudioB.loop();
  correctAudio.stop();
  wrongAudio.stop();
  correctAudioB.stop();
  wrongAudioB.stop();
  thisBackground = new MyBackground("WHAT DO YOU HEAR?");
  toggleRun = new Toggle("Play", isRunning); //name, default value
  toggleHideVideo = new Toggle("Hide Video", isHidden); 
  toggleAudio = new Toggle("Change Audio", rightAudio);


  var randSelect;
  if (random(0, 2)>=1) {
    randSelect = true;
  } else {
    randSelect = false;
  }
  isSelectedPrev = randSelect;
  isSelected = randSelect;
  selectVocalist = new Toggle("Change Person", isSelected); 
  toggleReveal = new Toggle("Reveal Words", isRevealed);

  v = createVideo('assets/DavidThatFatBat.mp4');
  v2 = createVideo('assets/RheaThatFatBat.mp4');
  v.hide();
  v2.hide();
  v.loop();
  v2.loop();
  v.stop();
  v2.stop();
}

function draw() {
  thisBackground.shade(20);
  thisBackground.name(borders[0], borders[1]-5);
  //create workspace
  workspace(borders[0], borders[1], borders[2], borders[3]); //borders of workspace
  if (!isRevealed) {
    instructions(borders[2]+borders[0], borders[1], 500, borders[3]);
  }

  //create toggles and assign return values
  toggleRun.make(borders[0]+10, 25+borders[1], 20); //xpos, ypos, size
  isRunning = toggleRun.isChecked();
  toggleHideVideo.make(borders[0]+60, 25+borders[1], 20);
  isHidden = toggleHideVideo.isChecked();
  toggleAudio.make(borders[0]+130, 25+borders[1], 20);
  rightAudio = toggleAudio.isChecked();

  if (!isRunning) {
    selectVocalist.make(borders[0]+220, 25+borders[1], 20);
  } else {
    toggleReveal.make(borders[0]+220, 25+borders[1], 20);
  }

  if (isSelected) {
    play();
  } else {
    playB();
  }

  isSelected = selectVocalist.isChecked();
  isRevealed = toggleReveal.isChecked();
  if (isRevealed) {
    noStroke();
    fill(0);
    rectMode(CORNER);
    rect(borders[2]+borders[0]+5, borders[1]+header+10, 300+10, 200);
  }
  showWords(borders[2]+borders[0]+20, borders[1]+header+15, 300, 200);



  if (isHidden) {
    noStroke();
    fill(0, 255);
    rect(borders[0]+5, borders[1]+header+5, v.width, v.height);
  }
}

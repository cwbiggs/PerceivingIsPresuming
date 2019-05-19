let value = 0;
var song;

var fr= 60;

function setup() {
  //create a canvas the size of the window
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight); 
  //set framerate
  frameRate(fr);
  song = createAudio("assets/click.mp3");
    song.autoplay(false);
}


function draw() {
  fill(value);
  rect(25, 25, 200, 200);
  
}

function touchStarted() {
  if (clickRange(25, 200, 25, 200)) {
    if (value === 0) {
      value = 255;
         song.play();
   song.loop();
    } else {
      value = 0;
      song.stop();
    }
  }
}

function clickRange(xMin, xMax, yMin, yMax) {
  var state;
  if(mouseX >= xMin && mouseX <=xMax && mouseY >= yMin && mouseY<=yMax) {
     state = true; 
  } else {
    state = false; 
  }
  
  return state;
  print(state);
}

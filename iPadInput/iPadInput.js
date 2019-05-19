let value = 0;

var fr= 60;

function setup() {
  //create a canvas the size of the window
  var myCanvasBallClick = createCanvas(displayWidth, displayHeight); 
  //set framerate
  frameRate(fr);
}


function draw() {
  fill(value);
  rect(25, 25, 200, 200);
}

function touchStarted() {
  if (clickRange(25, 200, 25, 200)) {
    if (value === 0) {
      value = 255;
    } else {
      value = 0;
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
}

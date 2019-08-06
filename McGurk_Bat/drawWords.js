function drawWords() {
  var currentWords;

  if (correctAudio) {
    currentWords = 1;
  } else {
    currentWords = 0;
  }
  
  noStroke();
  fill(0);
  rect(60, 110, 180, 25);
  textSize(24);
  textAlign(LEFT, TOP);
  fill(54, 255, 0, 255);
  noStroke();
  text(words[currentWords], 60, 110);
}

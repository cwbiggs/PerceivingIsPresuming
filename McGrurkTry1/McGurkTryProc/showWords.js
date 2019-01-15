function showWords(x, y) {
  var words;
  if (isRevealed && isRunning) {
    if (rightAudio) {
      words = "THAT FAT BAT"
    } else {
      words = "BAT BAT BAT";
    }

    textSize(24);
    fill(54, 255, 0, 255);
    noStroke();
    text(words, x, y);
  }
}

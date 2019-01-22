function showWords(x, y, x1, y1) {
  var words;
  if (isRevealed && isRunning) {
    if (rightAudio) {
      words = "EMBER AND ELODIE FOUGHT A TERRIBLE MONSTER, FA-FAR, WHO FLEW HIMSELF UP, IN ORDER TO ESCAPE THEM.";
    } else {
      words = "EMBER AND ELODIE BOUGHT A TERRIBLE MONSTER, BA-BAR, WHO BLEW HIMSELF UP, IN ORDER TO ESCAPE THEM.";
    }

    textSize(24);
    fill(54, 255, 0, 255);
    noStroke();
    text(words, x, y, x1, y1);
  }
}

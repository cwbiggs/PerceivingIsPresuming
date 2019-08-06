function player(p) {
   if (correctAudio) {
    sfMatched[p].volume(1.0);
    sfMisMatched[p].volume(0.0);
  } else {
    sfMatched[p].volume(0.0);
    sfMisMatched[p].volume(1.0);
  }

  if (isRunning && prevIsRunning!=isRunning) {
    sfMatched[p].play();
    sfMisMatched[p].play();
    v[p].play();
  } else if (!isRunning && prevIsRunning!=isRunning) {
    sfMatched[p].stop();
    sfMisMatched[p].stop();
    v[p].stop();
  }
  image(v[p], borders[0]+5, borders[1]+header+5); 
}

function player(p) {
  print(p);
  // if (correctAudio) {
  //  sfMatched[p].setVolume(1.0, 0.1);
  //  sfMisMatched[p].setVolume(0.0, 0.1);
  //} else {
  //  sfMatched[p].setVolume(0.0, 0.1);
  //  sfMisMatched[p].setVolume(1.0, 0.1);
  //}

  if (isRunning && prevIsRunning!=isRunning) {
    //sfMatched[p].play();
    //sfMisMatched[p].play();
    v[p].play();
  } else if (!isRunning && prevIsRunning!=isRunning) {
    //sfMatched[p].stop();
    //sfMisMatched[p].stop();
    v[p].stop();
  }
  image(v[p], borders[0]+5, borders[1]+header+5); 
  
  //prevAudio = rightAudio;

}

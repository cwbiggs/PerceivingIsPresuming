function play() {
  if(rightAudio) {
    correctAudio.setVolume(1., .1);
    wrongAudio.setVolume(0, .1);
  } else {
    correctAudio.setVolume(0., .1);
    wrongAudio.setVolume(1, .1);
  }
  
  if (isRunning && prevIsRunning!=isRunning) {
    correctAudio.play();
    wrongAudio.play();
    v.play();
    
  } else if (!isRunning && prevIsRunning!=isRunning) {
    correctAudio.stop();
    wrongAudio.stop();
    v.stop();
  }
  image(v,borders[0]+5,borders[1]+header+5); 
  prevIsRunning = isRunning;
  prevAudio = rightAudio;
}

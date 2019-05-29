function playB() {
  if(rightAudio) {
    correctAudioB.setVolume(1., .1);
    wrongAudioB.setVolume(0, .1);
  } else {
    correctAudioB.setVolume(0., .1);
    wrongAudioB.setVolume(1, .1);
  }
  
  if (isRunning && prevIsRunning!=isRunning) {
    correctAudioB.play();
    wrongAudioB.play();
    v2.play();
    
  } else if (!isRunning && prevIsRunning!=isRunning) {
    correctAudioB.stop();
    wrongAudioB.stop();
    v2.stop();
  }
  image(v2,borders[0]+5,borders[1]+header+5); 
  prevIsRunning = isRunning;
  prevAudio = rightAudio;
}

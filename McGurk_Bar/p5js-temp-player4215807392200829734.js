function player(p) {
  print(p);

  var selectedVid;

  if (p==0) {
    selectedVid = 'm';
  }

  if (isRunning && prevIsRunning!=isRunning) {
    selectedVid.show();
    selectedVid.loop();
    selectedVid.play();
  } else if (!isRunning && prevIsRunning!=isRunning) {

    selectedVid.stop();
  }


  image(selectedVid, borders[0]+5, borders[1]+header+5);
}

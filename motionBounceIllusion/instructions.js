function instructions(x, y, w, l) {
  //background of workarea
  textAlign(LEFT, TOP);
  noStroke();
  fill(0);
  rect(x, y, w, l);
  noFill();
  stroke(20, 100, 255, 255);  
  //outline of workarea
  strokeWeight(2);
  rect(x, y, w, l);
  strokeWeight(1);
  line(x, y+50, w+x, y+50);
  textSize(36);
  fill(255);
  noStroke();
  text("INSTRUCTIONS", x+20, y+10);
  textSize(20);
  text("1. Click the box below 'Run' and watch the animation. Do you see the balls pass through each other or bounce off each other?", x+20, y+10+header, w-30, 100);
  text(" 2. If you see the balls pass through each other, change the size and transpency to their minimum values and the speed to the minimum value. If you see the balss bounce off set other, adjust the size and transparency to their minimum values and the speed to the maximum value. What do you see now?", 
      x+20, y+10+header+110, w-30, 300);
  text("3. Click 'Reset'", x+20, y+10+header+320, w-30, 30);
  text("4. Click the box below 'Sound' to turn on sound. Hopefully, when sound is on and the settings are reset, it will make it so that you see the balls bounce and with sound off you see the balls pass. If not, manipulate the size, speed, and opactity such that you see the balls pass with no sound and bounce with sound. ", 
  x+20, y+10+header+360, w-30, 200);
}

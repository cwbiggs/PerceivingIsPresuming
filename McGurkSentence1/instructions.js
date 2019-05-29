function instructions(x, y, w, l) {
  //background of workarea
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
  text("INSTRUCTIONS", x+20, y+35);
  textSize(24);
  text("1. Click 'Play' and watch the video. What do you hear?", x+20, y+10+header, w-30, 100);
  text(" 2. Click 'Hide video' and listen. Do you hear anything different?", x+20, y+10+header+100, w-30, 100);
  text("Additional options: You can change the audio. When the video is not playing, you can switch the person speaking. When the video is playing, you can reveal the actual words being spoken.", x+20, y+10+header+200, w-30, 200);
}

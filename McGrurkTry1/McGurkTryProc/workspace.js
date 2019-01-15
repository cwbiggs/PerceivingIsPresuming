function workspace(x, y, w, l) {
  //background of workarea
  noStroke();
  fill(0);
  rect(x, y, w, l);
  noFill();
  stroke(20, 100, 255, 255);  
  //outline of workarea
  strokeWeight(2);
  rect(x, y,w, l);
  strokeWeight(1);
  line(x, y+50, w+x, y+50);
}

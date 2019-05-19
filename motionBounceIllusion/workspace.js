function workspace(x, y, w, l) {
  //background of workarea
  noStroke();
  fill(0);
  rect(x, y, w, l);
  noFill();
  stroke(20, 100, 255, 255);  
  //outline of workarea
  strokeWeight(2);
  rect(x, y, w, l);
  //rect(w+x, y, w, l);
}

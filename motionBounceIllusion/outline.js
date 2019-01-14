function outline(s, h) {
  noFill();
  stroke(20, 100, 255, 255);
  strokeWeight(1);
  line(0, h, width, h);
  ellipseMode(CENTER);
  ellipse(s*.5, s*.5+h, s, s);
  line(0, h+s, width, h+s);
}

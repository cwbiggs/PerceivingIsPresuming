function outline(x, y, w, l, h, cs) {
  strokeWeight(1);
  stroke(20, 100, 255, 255);  
  //top line
  line(x, h+y, w+x, h+y);
  //line below ellipse
  line(x, h+cs+y, w+x, h+cs+y);
  ellipseMode(CENTER);
  ellipse(w*.5+x, cs*.5+y+h, cs, cs);
}

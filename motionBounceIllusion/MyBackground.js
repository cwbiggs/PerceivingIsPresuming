function MyBackground(n) {
  //color for background
  this.shade = function(s) {
    noStroke();
    fill(s);
    rect(0, 0, width, height);
  }
  //name of background
  this.name = function(x, y) {
    textSize(24);
    fill(54, 255, 0, 255);
    noStroke();
    text(n, x, y);
  }
}

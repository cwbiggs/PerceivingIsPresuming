function MyBackground(n) {

  this.shade = function(s) {
    noStroke();
    fill(s);
    rect(0, 0, width, height);
  }
  this.name = function(x, y) {
    textSize(24);
    fill(54, 255, 0, 255);
    noStroke();
    text(n, x, y);
  }
}

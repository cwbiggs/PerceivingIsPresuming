function bouncingBalls() {
  if (isRunning) {
    translate(200, 200+header);
    stroke(255, bl);
    strokeWeight(sz);
    rotate(rot);
    for (var i = 1; i <qn; i++) {
      var thisRot = PI/i;
      rotate(thisRot);
      point(x, y);
      point(x*-1, y);
    }

    x=x+sp*dir;

    if (x>200-sz/4 || x < -200+sz/4) {
      dir *= -1;
    }
  }
}

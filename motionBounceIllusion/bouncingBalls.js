function bouncingBalls() {
  if (isRunning) {
    translate(moveBalls[0], moveBalls[1]);
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

    if (x>200-sz/3 || x < -200+sz/3) {
      dir *= -1;
    }
  }
}

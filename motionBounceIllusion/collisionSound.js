function collisionSound(s) {
  if (Math.abs(x) < 0 + sz/2) {
    hit = true;
  } else { 
    hit = false;
  }

  if (hit != prevHit && hit == true) {
    changeHit = true;
  } else {
    changeHit = false;
  }

  if (changeHit && isClicking ) {
    sf[s].play();
  }
  prevHit = hit;
}

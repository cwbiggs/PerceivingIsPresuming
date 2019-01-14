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
    switch(s) {
    case 0: 
      sound1.play();
      break;
    case 1:
      sound2.play();
      break;
    case 2:
      sound3.play();
      break;
    case 3: 
      sound4.play();
      break;
    }
  }
  prevHit = hit;
}

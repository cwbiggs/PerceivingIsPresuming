function SelectSound(init, x, y, x1, y1) {

  var sound = init;
  var soundNames = ["click1", "click2", "click3", "click4"];
  var clicked = false;
  var frameClicked = 0;
  var prevClicked = false;

  this.make = function() {
    fill(155, 100);
    noStroke();
    rect(x, y, x1, y1);
    textSize(12);
    fill(255);
    noStroke();
    text(soundNames[sound], x+10, y+25);
  }

  this.sound = function() {
    clicked = mouseIsPressed;

    if (clicked) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }

    if (mouseX >=x && mouseX <=x1+x && mouseY >= y && mouseY <= y1+y) { 
      if (!clicked) {
        fill(255);
        noStroke();
        rect(x, y, x1, y1);
        textSize(12);
        fill(0);
        noStroke();
        text("click to change sound", x+10, y+25);
      }

      if (frameClicked > 0 && frameClicked < 2) {
        if (clicked != prevClicked) {
          if (clicked) {
            sound = (sound+1)%soundNames.length;
          }
        }
      }
    }
    return sound;
  }
}

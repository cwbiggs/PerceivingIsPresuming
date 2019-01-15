function Toggle(n, initialValue) {
  var clicked = initialValue;
  var prevClicked = initialValue;
  var on = initialValue;
  var frameClicked = 0;

  this.make = function(xpos, ypos, size) {
    noFill();
    stroke(255);
    strokeWeight(1);
    rect(xpos, ypos, size, size);
    clicked = mouseIsPressed;
    if (clicked) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }

    if (mouseX >=xpos && mouseX <=xpos+size && mouseY >= ypos && mouseY <= ypos+size && frameClicked > 0 && frameClicked < 2) { 
      if (clicked != prevClicked) {
        if (clicked) {
          on = !on;
        }
      }
    }
    if (on) {
      line(xpos, ypos, xpos+size, ypos + size);
      line(xpos, ypos+size, xpos+size, ypos);
    }

    prevClicked = clicked;
    textSize(12);
    fill(255);
    noStroke();
    text(n, xpos, ypos-10);
  }

  this.isChecked = function() {
    return on;
  }
}

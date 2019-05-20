//a toggle class
function Toggle(n, initialValue) {
  //initial state
  var clicked = initialValue;
  //history 
  var prevClicked = initialValue;
  //draw x when on
  var on = initialValue;
  //count mouse clicked duration in frames
  var frameClicked = 0;
  
  //draw toggle
  this.make = function(xpos, ypos, size) {
    noFill();
    stroke(255);
    strokeWeight(1);
    //outside
    rect(xpos, ypos, size, size);
    clicked = mouseIsPressed;
    if (clicked) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }
    //if all location and timing and location conditions are met, then switch the state of the toggle
    if (mouseX >=xpos && mouseX <=xpos+size && mouseY >= ypos && mouseY <= ypos+size && frameClicked > 0 && frameClicked < 2) { 
      if (clicked != prevClicked) {
        if (clicked) {
          on = !on;
        }
      }
    }
    //draw x, if on
    if (on) {
      line(xpos, ypos, xpos+size, ypos + size);
      line(xpos, ypos+size, xpos+size, ypos);
    }
    //update the state of the prevClicked value to test for changes on next frame
    prevClicked = clicked;
    //draw text
    textSize(12);
    fill(255);
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(n, xpos, ypos-5);
  }
  //return value for current state
  this.isChecked = function() {
    return on;
  }
}

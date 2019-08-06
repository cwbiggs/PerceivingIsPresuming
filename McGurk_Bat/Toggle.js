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
  //show help text
  var hover;
  
  
  //draw toggle
  this.make = function(xpos, ypos, xsize, ysize, b = "cross") {
    noFill();
    stroke(255);
    strokeWeight(1);
    //outside
    rect(xpos, ypos, xsize, ysize);
    clicked = mouseIsPressed;
    if (clicked) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }
    //if all location and timing and location conditions are met, then switch the state of the toggle
    hover = mouseX >=xpos && mouseX <=xpos+xsize && mouseY >= ypos && mouseY <= ypos+ysize;

    if (hover && frameClicked > 0 && frameClicked < 2) { 
      if (clicked != prevClicked) {
        if (clicked) {
          on = !on;
        }
      }
    }

    if(on) {
      switch(b[0]){
        case "solid":
            noStroke();
            fill(b[1], b[2], b[3], b[4]);
            rect(xpos+1, ypos+1, xsize-1, ysize-1);
            print("solid");
            break;
        case "cross":
            line(xpos, ypos, xpos+xsize, ypos + ysize);
            line(xpos, ypos+ysize, xpos+xsize, ypos);
            break;
        case "flash":
            if(frameCount%(b[1]*2) > b[1]){
              noStroke();
              fill(255, 10, 25, 255);
              rect(xpos+1, ypos+1, xsize-1, ysize-1);
            }
            break;
        default:
            line(xpos, ypos, xpos+xsize, ypos + ysize);
            line(xpos, ypos+ysize, xpos+xsize, ypos);
            break;
      } 

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

  //show help text when hovering
  this.help = function(helpText){
    if(hover){
    helper.make(helpText);
    }
  }

  //return value for current state
  this.isChecked = function() {
    return on;
  }
  
  this.reset = function() {
    on = initialValue;
  }
}

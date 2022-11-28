//Toggle Class
//created by Christopher Biggs
//updated 8/17/2022

//Class to draw and track cliking a rectangular rejion to switch the state of a behavior
//arguments: toggle name, initialize state (true or false)
function Toggle(n, initialValue) {
  //initial state
  var clicked = initialValue;
  //hold previous state to track changes
  var prevClicked = initialValue;
  //is it on
  var on = initialValue;
  //count mouse clicked duration in frames
  var frameClicked = 0;
  //show help text
  var hover;

  //draw the toggle
  //arguments: position and size, behavior with defaul of cross
  this.make = function (xpos, ypos, xsize, ysize, b = "cross") {
    //draw text above the toggle
    textSize(12);
    fill(255);
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(n, xpos, ypos - 5);
    //draw toggle outline
    noFill();
    stroke(255);
    strokeWeight(1);
    rect(xpos, ypos, xsize, ysize);
    //track if the mouseIsPressed
    clicked = mouseIsPressed;
    //if the mouse is pressed set frameClicked to 1, else 0
    if (clicked) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }
    //test for the mouse location being over the toggle graphic
    hover =
      mouseX >= xpos &&
      mouseX <= xpos + xsize &&
      mouseY >= ypos &&
      mouseY <= ypos + ysize;
    //if we are over the toggle are we click, invert the toggle state
    if (hover && frameClicked == 1) {
      if (clicked != prevClicked) {
        if (clicked) {
          on = !on;
        }
      }
    }
    //if the toggle is clicked, fill the toggle based on the last argument, i.e. the behavior
    if (on) {
      switch (b[0]) {
        case "solid":
          noStroke();
          fill(b[1], b[2], b[3], b[4]);
          rect(xpos + 1, ypos + 1, xsize - 1, ysize - 1);
          print("solid");
          break;
        case "cross":
          line(xpos, ypos, xpos + xsize, ypos + ysize);
          line(xpos, ypos + ysize, xpos + xsize, ypos);
          break;
        case "flash":
          if (frameCount % (b[1] * 2) > b[1]) {
            noStroke();
            fill(255, 10, 25, 255);
            rect(xpos + 1, ypos + 1, xsize - 1, ysize - 1);
          }
          break;
        default:
          line(xpos, ypos, xpos + xsize, ypos + ysize);
          line(xpos, ypos + ysize, xpos + xsize, ypos);
          break;
      }
    }

    //update the state of the prevClicked value to test for changes on next frame
    prevClicked = clicked;
  };

  //show help text when hovering
  this.help = function (helpText) {
    if (hover) {
      helper.make(helpText);
    }
  };

  //return value for current state
  this.isChecked = function () {
    return on;
  };

  this.reset = function () {
    on = initialValue;
  };
}

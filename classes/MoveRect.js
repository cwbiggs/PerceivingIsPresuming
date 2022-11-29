//MoveRect Class
//created by Christopher Biggs
//updated 10/12/2022

//inputs are the upper corner and the size
function MoveRect(x, y, s) {
  var xM = x; //upper left corner x pos
  var yM = y + header; //upper left corner y pos
  var hover = false; //variable to report if the move is over the rectangle

  //create the rectangle, test mouse location and click, and update position
  this.make = function () {
    //check if the mouse is over the rectangle
    hover =
      mouseX >= xM && mouseX <= xM + s && mouseY >= yM && mouseY <= yM + s;
    clicked = mouseIsPressed; //check if the mouse is pressed
    //if the mouse is in the correct position and pressed, run the code
    if (hover && mouseIsPressed) {
      //update the x and y positions based on the mouse movements
      xM = mouseX - s / 2; 
      yM = mouseY - s / 2;
    }
    //check if the mouse moves the rectangle off the picture, if so, set it inside the picture
    if (xM < borders[0]) {
      xM = borders[0];
    }
    if (xM + s > borders[0] + tgSize[0]) {
      xM = tgSize[0] - s / 2;
    }
    if (yM < borders[1] + 50) {
      yM = borders[1] + 50;
    }
    if (yM + s > tgSize[1] + borders[1] + header) {
      yM = tgSize[1] - s / 2 + header;
    }
    
    //when the mouse is pressed draw the rectangle with the border and when it is not, do not draw the border
    if (mouseIsPressed) {
      rectMode(CORNER);
      strokeWeight(2);
      stroke(5, 164, 248, 150);
      fill(137, 137, 137, 255);
      rect(xM, yM, s, s);
    } else {
      rectMode(CORNER);
      noStroke();
      stroke(137, 137, 137, 255);
      fill(137, 137, 137, 255);
      rect(xM, yM, s, s);
    }
    //draw text when it is in the starting position
    if (xM == x && yM == y + 50) {
      fill(255);
      text("CLICK AND DRAG ME OVER A AND B", xM, yM + header, s - 10);
    }
  };

  this.help = function (helpText) {
    if (hover) {
      helper.make(helpText);
    }
  };

  this.reInit = function () {
    xM = x;
    yM = y + header;
  };
}

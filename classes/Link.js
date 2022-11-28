//Link Class
//created by Christopher Biggs
//updated 8/17/2022

//Class to create links to external webpages
//arguments: none
function Link() {
  var frameClicked = 0; //count the clicks
  var hover = false; //true when hovering over the link area

  //define the link region, draw the text, and draw surrounding rect
  //arguments: text to display, text size, rect parameters, link text
  this.make = function (name, size, x, y, x1, y1, link) {
    //draw surrounding rectangle
    fill(155, 100);
    noStroke();
    rect(x, y, x1, y1);
    //draw text
    textSize(size);
    fill(255, 235, 5, 255);
    noStroke();
    textAlign(LEFT, TOP);
    text(name, x + size / 2, y + size / 2);
    
    //increment frameClicked when the mouse is pressed
    if (mouseIsPressed) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }
    //if we are hovering over the rectangle change hover to true
    if (mouseX >= x && mouseX <= x + x1 && mouseY >= y && mouseY <= y + y1) {
      hover = true;
      //if we clicked, than frameClicked will be 1
      if (frameClicked ==1) {
        window.location.href = link;
      }
    } else {
      hover = false;
    }
  };
  //this returns the hover variable in order to report it to the show the help text
  this.help = function () {
    return hover;
  };
}

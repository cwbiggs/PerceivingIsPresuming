//RotateSelect Class
//created by Christopher Biggs
//updated 8/17/2022

//Class to draw a labelled rectangle that changes text when clicked in a loop
//arguments: initial value in loop, rect params, item list
function RotateSelect(init, x, y, x1, y1, items) {
  var current = init; //initial sound file
  var clicked = false; //is the rectangle clicked
  var frameClicked = 0; //count the click
  var prevClicked = false; //hold the previous click value to track changes
  var hover=false; //test if the mouse is over the rectangle
  
  //method to draw and text hover location
  //arguments: text x and y position
  this.make = function(tx, ty) {
    //draw retangle and text
    textAlign(LEFT, BOTTOM);
    fill(155, 100);
    noStroke();
    rect(x, y, x1, y1);
    textSize(12);
    fill(255);
    noStroke();
    text(items[current], x+tx, y+ty);
    //test mouse location
    hover = mouseX >=x && mouseX <=x1+x && mouseY >= y && mouseY <= y1+y;
  }
  
  //method to change display text and return current index
  //arguments: na
  this.rotate = function() {
    clicked = mouseIsPressed;
    //if the mouse is pressed, set frameClicked to 1
    if (clicked) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }
    if (hover) { 
      if (frameClicked ==1) {
        if (clicked != prevClicked) {
          if (clicked) {
            current = (current+1)%items.length;
          }
        }
      }
    }
    return current;
  }

  //show help text when hovering
  this.help = function(helpText){
    if(hover){
    helper.make(helpText);
    }
  }
  // reset to init state
  this.reset=function(){
    current = init;
  }
  
  this.value=function(){
    return current;
  }
}

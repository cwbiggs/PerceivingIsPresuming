function RotateSelect(init, x, y, x1, y1, items) {

  var current = init;
  var clicked = false;
  var frameClicked = 0;
  var prevClicked = false;
  var hover=false;

  this.make = function() {
    textAlign(LEFT, BOTTOM);
    fill(155, 100);
    noStroke();
    rect(x, y, x1, y1);
    textSize(12);
    fill(255);
    noStroke();
    text(items[current], x+50, y+25);
    hover = mouseX >=x && mouseX <=x1+x && mouseY >= y && mouseY <= y1+y;
  }

  this.rotate = function() {
    clicked = mouseIsPressed;

    if (clicked) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }
    if (hover) { 
      if (frameClicked > 0 && frameClicked < 2) {
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

  this.reset=function(){
    current = init;
  }


}

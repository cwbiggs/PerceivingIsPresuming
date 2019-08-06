function MoveRect(x, y, s) {

  var xM = x;
  var yM = y;
  var hover=false;

  this.make = function() {


    hover = mouseX >=xM && mouseX <=xM+s && mouseY >= yM && mouseY <= yM+s;
    clicked = mouseIsPressed;

    if (hover && mouseIsPressed) { 
      xM = mouseX-s/2;  
      yM =mouseY-s/2;
    }

    if (xM < borders[0]) {
      xM =borders[0];
    }
    if(xM+s > borders[0]+tgSize[0]) {
      xM = tgSize[0]-s/2;
    }
    if(yM <borders[1]){
      yM=borders[1];
    }
    if(yM+s > tgSize[1]+borders[1]) {
     yM=tgSize[1]-s/2; 
    }

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
  }

  this.help = function(helpText) {
    if (hover) {
      helper.make(helpText);
    }
  }
  
  this.reset = function(){
   xM=x;
   yM=y;
  }
}

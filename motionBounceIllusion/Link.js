//the class declaration
function Link(x, y, x1, y1, size, name) {
  //position, textSize, name
   var pos = [x, y, x1, y1];
   var s = size;
   var n = name;
   var textLength = n.length;
   var frameClicked = 0;
       var upperRight = pos[0]+pos[2];
    var upperLeft = pos[1]+pos[3];

  this.make = function() {
    fill(155, 100);
    noStroke();
    rect(pos[0], pos[1], pos[2], pos[3]);

    textSize(s);
    fill(255, 235, 5, 255);
    noStroke();
    textAlign(LEFT, TOP);
    text(n, x+s/2, y+s/2);
  }
  
  this.active = function(goTo) { 
    if (mouseIsPressed) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }
    //if all location and timing and location conditions are met, then switch the state of the toggle
    if (mouseX >=pos[0] && mouseX <=upperRight && mouseY >= pos[1] && mouseY <= upperLeft && frameClicked > 0 && frameClicked < 2) { 
       window.open(goTo);
    } 
  }
  

}

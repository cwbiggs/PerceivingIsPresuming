//the class declaration
function Link() {
  //textSize, name   
   var frameClicked = 0;
   var hover = false;


  this.make = function(name, size, x, y, x1, y1, link) {
    fill(155, 100);
    noStroke();
    rect(x, y, x1, y1);

    textSize(size);
    fill(255, 235, 5, 255);
    noStroke();
    textAlign(LEFT, TOP);
    text(name, x+size/2, y+size/2);

    if (mouseIsPressed) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }
    //if all location and timing and location conditions are met, then switch the state of the toggle
    if (mouseX >=x && mouseX <=x+x1 && mouseY >= y && mouseY <= y+y1) { 
        hover = true;
        if(frameClicked > 0 && frameClicked < 2){
       window.location.href = link;
        }
    } else {
      hover = false;
    }
    
  }

  this.help = function(){
    
    return hover;
  }
}

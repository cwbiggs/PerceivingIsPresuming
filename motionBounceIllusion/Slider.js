//the class declaration
function Slider(x, y, l, n, initialValue) {
  //initial value for slider point position
  var mouseXpos = initialValue+x;
  var normVal;

  this.make = function() {
    //slider line
    stroke(255, 100);
    strokeWeight(1);
    line(x, y, l, y);
  //move slider
    if (mouseY > y-20 && mouseY <= y+15 && mouseX >=x && mouseX <=l && mouseIsPressed) {
      mouseXpos = constrain(mouseX, x, l);
      strokeWeight(15);
      stroke(54, 255, 0);
    } else {
      stroke(255, 255);
      strokeWeight(10);
    }
    //create slider point
    point(mouseXpos, y);
    textSize(12);
    fill(255);
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(n, x, y-15);
  }
  //return a normalized value
  this.value = function(min, max) {
    normValue = (mouseXpos-x)/(l-x);
    return normValue *(max-min) + min;
  }
  //show value
  this.post = function(min, max, displayLength, dataType, n) {
    var value; 
    if (!n) {
      if (dataType == "i" || dataType == "I") {
        value = Math.floor(normValue *(max-min) + min);
      } else {
        value = normValue *(max-min) + min;
      }
    } else {
       if (dataType == "i" || dataType == "I") {
        value = Math.floor(normValue);
      } else {
        value = normValue;
      }
    }
    var stringValue = value.toString();
    var shorten = stringValue.substr(0, displayLength);
    textSize(12);
    fill(255);
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(shorten, l, y-15);
  }
  //reset to initial value
  this.reset = function() {
    mouseXpos = initialValue+x;
  }
}

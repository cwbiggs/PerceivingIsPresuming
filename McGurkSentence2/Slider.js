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

    if (mouseY > y-20 && mouseY <= y+15 && mouseIsPressed && mouseX >=x && mouseX <= l) {
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
    text(n, x, y-15);
  }

  this.value = function(min, max) {
    normValue = (mouseXpos-x)/(l-x);
    return normValue *(max-min) + min;
  }

  this.post = function(min, max, displayLength, dataType, n, xOffset) {
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
    text(shorten, l+xOffset, y-15);
  }
}

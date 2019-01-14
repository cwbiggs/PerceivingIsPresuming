//the class declaration
function Slider(p, ypos, n, initialValue) {

  var xpos = initialValue+p;
  var pad = p
    var name = n;

  this.make = function() {

    if (mouseY > ypos-20 && mouseY <= ypos+15 && mouseIsPressed) {
      xpos = constrain(mouseX, pad, width-pad);
    }

    stroke(255, 100);
    strokeWeight(1);
    line(pad, ypos, width-pad, ypos);
    stroke(255, 255);
    strokeWeight(10);
    point(xpos, ypos);
    textSize(12);
    fill(255);
    noStroke();
    text(name, pad, ypos-15);
  }

  this.value = function(min, max) {
    return map(xpos, pad, width-pad, min, max);
  }

  this.post = function(min, max, displayLength, dataType) {
    var value; 
    if (dataType == "i" || dataType == "I") {
      value = Math.floor(map(xpos, pad, width-pad, min, max));
    } else {
      value = map(xpos, pad, width-pad, min, max);
    }
    var stringValue = value.toString();
    var shorten = stringValue.substr(0, displayLength);
    textSize(12);
    fill(255);
    noStroke();
    text(shorten, width-pad, ypos-15);
  }
}

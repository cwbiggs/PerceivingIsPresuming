//Slider Class
//created by Christopher Biggs
//version 2
//updated 8/18/2022

//Class to draw a slider, define and scale values based on position, and return values
//arguments: starting x/y, ending x, min and max return value, initial value
//step size for incrementing and decrementing value, data type i || f
function Slider(x, y, xEnd, n, min, max, initialValue, stepSize, dataType) {
  //convert initial value to the slider position in pixels and offset it
  var sliderPosition = initialValueToPixelPosition(initialValue) + x;
  var hover = false; //test hover position
  var scaledValue; //final value
  
  //function to covert the starting value to the pixel position for the slider
  function initialValueToPixelPosition(input){
    var pixelValue = map(input, min, max, 0, xEnd-x);
    return(pixelValue);
  }

  //draw the slider and slider indicator, move the slider, calculate the final value
  this.make = function () {
    //draw the slider line
    stroke(255, 100);
    strokeWeight(1);
    line(x, y, xEnd, y);
    //move slider
    //test the mouse position
    hover = mouseY > y - 20 && mouseY <= y + 15 && mouseX >= x && mouseX <= xEnd;
    //if mouse is in the right position and the mouse is pressed, change the sliderPosition value based on the mouse movements, also change the slider color
    if (hover && mouseIsPressed) {
      sliderPosition = constrain(mouseX, x, xEnd);
      strokeWeight(15);
      stroke(54, 255, 0);
    } else {
      stroke(255, 255);
      strokeWeight(10);
    }
    //draw slider point
    point(sliderPosition, y);
    //draw the slider text
    textSize(12);
    fill(255);
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(n, x, y - 15);
    //calculate the final value based on the slider position and input parameters
    calculateFinalValue(); 
  };
  
  //calculate the final value based on the slider position and input parameters
  function calculateFinalValue(){
        if (stepSize == 1) {
      scaledValue = map(sliderPosition, x, xEnd, min, max);
    } else {
      scaledValue =
        Math.floor(map(sliderPosition, x, xEnd, min, max) / stepSize) *
        stepSize;
    }
    if (dataType == "i" || dataType == "I") {
      scaledValue = Math.floor(scaledValue);
    } 
    
  }
  //based on an input value the initial slider posiiton can be overridden
  this.overridePositionAndValue = function(input){
    sliderPosition = initialValueToPixelPosition(input) + x;;
  }

  //return value for assignment
  this.value = function () {
      return scaledValue;   
  };
  
  //draw the returned value on the right side of the slider
  this.post = function (displayLength) {
    var stringValue = scaledValue.toString();
    var shorten = stringValue.substr(0, displayLength);
    textSize(12);
    fill(255);
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(shorten, xEnd, y - 15);
  };
  
  //reset to initial value
  this.reset = function () {
    sliderPosition = initialValueToPixelPosition(initialValue) + x;
  };

  //show help text when hovering
  this.help = function (helpText) {
    if (hover) {
      helper.make(helpText);
    }
  };
}

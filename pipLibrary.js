//Button Class
//created by Christopher Biggs
//updated 8/17/2022

//Class to draw a rectangle with text that is clicked to trigger something
//arguments: button name, rectangle parameters
function Button(n, x, y, x1, y1) {
    var clicked = false; //test mouse click
    var frameClicked = 0; //count when clicked
    var prevClicked = false; //track previous to check for changes
    var hover = false; //test mouse location
    var trigger = false; //is the button triggered

    //method to draw button and track clicks
    this.make = function (tx, ty) {
        //draw button and text
        textAlign(LEFT, BOTTOM);
        fill(155, 100);
        noStroke();
        rect(x, y, x1, y1);
        textSize(12);
        fill(255);
        noStroke();
        text(n, x + tx, y + ty);
        //text mouse location relative to button
        hover = mouseX >= x && mouseX <= x1 + x && mouseY >= y && mouseY <= y1 + y;
        //check for mouse clicks
        clicked = mouseIsPressed;
        //set trigger to false
        trigger = false;

        if (clicked) {
            frameClicked++;
        } else {
            frameClicked = 0;
        }
        if (hover) {
            if (frameClicked ==1) {
                if (clicked != prevClicked) {
                    if (clicked) {
                        trigger = true;
                        fill(255, 200);
                        noStroke();
                        rect(x, y, x1, y1);
                    }
                }
            }
        }
    }
    
    this.trigger = function () {
        return trigger;
    }

    //show help text when hovering
    this.help = function (helpText) {
        if (hover) {
            helper.make(helpText);
        }
    }
}

//HelpRegion Class
//created by Christopher Biggs
//updated 8/17/2022

//Class to create the area to display the help region when the mouse hovers over interface elements
//arguments: rect parameters
function HelpRegion(x, y, x1, y1) {

    this.make=function(t) {
        noStroke();
        fill(20, 100);
        rect(x, y, x1, y1);
        textSize(y1/2.5);
        fill(255, 235, 5, 255);
        noStroke();
        textAlign(LEFT, TOP);
        text(t, x+15, y+10);
    }
}

//Interface Class
//created by Christopher Biggs
//updated 8/17/2022

//Class to create the interface for all Perceiving is Presuming Interactive Examples
//arguments: name, borders
function Interface(n, x, y, x1, y1) {
  var iw; //variable to hold the width of instructions workspace, assigned in instructions method
  var il; //variable for length of instructions workspace, assigned in instructions method
  var home = new Link(); //home link for navigation
  var exampleLinks = new Menu(); //a menu with links to all examples, requires the Menu class
  var workspaceUpRightCorn = x + x1; //upper right corner of the workspace

  //draw the primary workspace, workspace divisions, example title
  //arguments: color for background, line divisions of workspace which is an array
  this.mainWorkspace = function (backgroundColor, workspaceDivisionsArray) {
    //fill entire background
    noStroke();
    fill(backgroundColor);
    rect(0, 0, width, height);

    //draw main workspace
    noStroke();
    fill(0);
    rect(x, y, x1, y1);
    noFill();
    stroke(20, 100, 255, 255);
    //outline of workarea
    strokeWeight(2);
    rect(x, y, x1, y1);

    //workspaceDivisions
    strokeWeight(1);
    stroke(20, 100, 255, 255);
    //top line
    for (var i = 0; i < workspaceDivisionsArray.length; i++) {
      var yPos = workspaceDivisionsArray[i] + y;
      line(x, yPos, workspaceUpRightCorn, yPos);
    }

    //example title
    textSize(24);
    fill(54, 255, 0, 255);
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(n, x, borders[1] - 5);
  };

  //create the instructions workspace
  //arguments: width of instructions box, length of instructions box, instructions title space
  //instructions text, instructions boundries, y position for instructions
  this.instructions = function (w, l, instructionsTitleSpace, instructionsText, instructionsBoundry, instructionsYposition) {
    iw = w; //assign iw to w to access w elsewhere
    il = l; //same with length
    //fill background opf the instruction's workspace
    noStroke();
    fill(0);
    rect(workspaceUpRightCorn, y, w, l);
    //outline of the instruction's workspace
    strokeWeight(2);
    stroke(20, 100, 255, 255);
    rect(workspaceUpRightCorn, y, w, l);

    //dividing line for "instructions" text
    strokeWeight(1);
    var offset = y + instructionsTitleSpace;
    line(workspaceUpRightCorn, offset, w + workspaceUpRightCorn, offset);
    //draw "instuctions" text
    textAlign(LEFT, BOTTOM);
    fill(255);
    noStroke();
    textSize(20);
    //20 is the pad from the rightside ofthe main workspace and 35 is the bottom ofthe text vertically
    text("INSTRUCTIONS", workspaceUpRightCorn + 20, y + 35);
    //draw the instructions

    for (var i = 0; i < instructionsText.length; i++) {
      interface.instructionsText(
        instructionsText[i], //text
        instructionsYposition[i], //y offset
        20, //x padding
        instructionsBoundry[i], //y boundry
        16 //text size
      );
    }
  };

  //function called by the instuctions method
  //arguments: text, y offset, x boundry, y boundy, text size
  this.instructionsText = function (t, ty, tw, tl, ts) {
    textAlign(LEFT, TOP);
    textSize(ts);
    text(t, x1 + x + 20, ty + 110, iw - tw, tl);
  };

  //draw the navigation elements
  this.navigation = function () {
    //draw divider for navigation header
    strokeWeight(1);
    stroke(20, 100, 255, 255);
    line(x1 + x, il + 50 - 75, iw + x1 + x, il + 50 - 75);
    
    //draw "navigation" text
    fill(255);
    textAlign(LEFT, TOP);
    textSize(16);
    text("NAVIGATATION", x1 + x + 5, il + 60 - 75);
    
    //"home" is an instance of the Link object
    //arguemnts: name, text size, rectangular parameters, link
    home.make(
      "HOME", //name
      12, //text size
      x1 + x + 5, //rectangle parameters
      il + 60 - 50,
      50,
      25,
      "https://perceivingispresuming.net/examples" //link text
    );
    if (home.help()) {
      helper.make("click to return to main page");
    }
    
    //example links is an instance of the Menu object
    //arguments; display text, text size, rectangle parameters
    exampleLinks.make(
      "Show/Hide Example List –––––––––––-––––––––––––––>",
      12,
      x1 + x + 60,
      il + 60 - 50,
      325,
      25,
      x1 + iw + 50
    );
    if (exampleLinks.help()) {
      helper.make("click to open or close links to each example");
    }
  };
  //calculates the positions for the instructions used above
  this.instructionParams = function () {
    var setYPad = 5; //separation between yboundry and next set of text instuctions
    var yBoundrySum = insJson.boundry[0];
    for (var i = 0; i < insJson.boundry.length; i++) {
      if (i > 0) {
        insYpos[i] = yBoundrySum + setYPad * i;
        yBoundrySum += insJson.boundry[i];
      } else {
        insYpos[i] = 0;
      }
    }
  };

  //circles in workspace, only used by the motion bounce illlusion
  this.workshopCirc = function (cs, o) {
    ellipseMode(CENTER);
    //calculate center for circle position and offset by x and y
    ellipse(x1 * 0.5 + x, cs * 0.5 + y + o, cs, cs);
  };
}

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

//Menu Class
//created by Christopher Biggs
//updated 8/17/2022

//Class to create a folding and unfolding vertical menu of options
//arguments: none
function Menu() {
  var items = examples.examples; //refers to the examples index of the examplesMenu json file
  var linkNames = examples.links; //refers to the links index index of the examplesMenu json file
  var count = items.length; //the number of menu items based on the length of the elements in the examples index of the examplesMenu json file
  var links = new Array(count); //hold an array of Link objects since each menu item interfaces with a link
  //create the Link objects
  for(var i = 0; i < count; i++) {
    links[i] = new Link();
  }
  var frameClicked = 0; //track if a click has occurred
  var menuOpen = false; //hold the state of the menu
  var hover = false; //are we hovering over the area to open/close the menu

  //function to draw the rectangle and text to click to open or close the menu
  //arguments: text to display, text size, rectangle parameters, starting horizontal position of menu list
  this.make = function(name, size, x, y, x1, y1, w){
    //draw the rectangle area
    fill(155, 100);
    noStroke();
    rect(x, y, x1, y1);
    //draw the text
    textSize(size);
    fill(255, 235, 5, 255);
    noStroke();
    textAlign(LEFT, TOP);
    text(name, x+size/2, y+size/2);
    //track if the mouse is pressed
    if (mouseIsPressed) {
        frameClicked++;
      } else {
        frameClicked = 0;
      }
    //set hover to true when the mouse is in the correct position
    if (mouseX >=x && mouseX <=x+x1 && mouseY >= y && mouseY <= y+y1) { 
        hover = true;
        //if we click with the mouse while in the right position open or close the menu
        if(frameClicked == 1){
            menuOpen = !menuOpen;
        }
    } else {
      hover = false;
    }
    
    //if the menu is open, generate all the link objects and help text
    if(menuOpen) {
        for(var i = 0; i < count; i++){
            //display text, text size, rect parameters, link location
            links[i].make(items[i], 12, w, 50+i*30, 200, 25, linkNames[i]);
            if(links[i].help()){
              helper.make("click to open example");
            }
        }
    }
  }
  
  this.help = function(){
    return hover;
  }
}

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
}

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

//Toggle Class
//created by Christopher Biggs
//updated 8/17/2022

//Class to draw and track cliking a rectangular rejion to switch the state of a behavior
//arguments: toggle name, initialize state (true or false)
function Toggle(n, initialValue) {
  //initial state
  var clicked = initialValue;
  //hold previous state to track changes
  var prevClicked = initialValue;
  //is it on
  var on = initialValue;
  //count mouse clicked duration in frames
  var frameClicked = 0;
  //show help text
  var hover;

  //draw the toggle
  //arguments: position and size, behavior with defaul of cross
  this.make = function (xpos, ypos, xsize, ysize, b = "cross") {
    //draw text above the toggle
    textSize(12);
    fill(255);
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(n, xpos, ypos - 5);
    //draw toggle outline
    noFill();
    stroke(255);
    strokeWeight(1);
    rect(xpos, ypos, xsize, ysize);
    //track if the mouseIsPressed
    clicked = mouseIsPressed;
    //if the mouse is pressed set frameClicked to 1, else 0
    if (clicked) {
      frameClicked++;
    } else {
      frameClicked = 0;
    }
    //test for the mouse location being over the toggle graphic
    hover =
      mouseX >= xpos &&
      mouseX <= xpos + xsize &&
      mouseY >= ypos &&
      mouseY <= ypos + ysize;
    //if we are over the toggle are we click, invert the toggle state
    if (hover && frameClicked == 1) {
      if (clicked != prevClicked) {
        if (clicked) {
          on = !on;
        }
      }
    }
    //if the toggle is clicked, fill the toggle based on the last argument, i.e. the behavior
    if (on) {
      switch (b[0]) {
        case "solid":
          noStroke();
          fill(b[1], b[2], b[3], b[4]);
          rect(xpos + 1, ypos + 1, xsize - 1, ysize - 1);
          print("solid");
          break;
        case "cross":
          line(xpos, ypos, xpos + xsize, ypos + ysize);
          line(xpos, ypos + ysize, xpos + xsize, ypos);
          break;
        case "flash":
          if (frameCount % (b[1] * 2) > b[1]) {
            noStroke();
            fill(255, 10, 25, 255);
            rect(xpos + 1, ypos + 1, xsize - 1, ysize - 1);
          }
          break;
        default:
          line(xpos, ypos, xpos + xsize, ypos + ysize);
          line(xpos, ypos + ysize, xpos + xsize, ypos);
          break;
      }
    }

    //update the state of the prevClicked value to test for changes on next frame
    prevClicked = clicked;
  };

  //show help text when hovering
  this.help = function (helpText) {
    if (hover) {
      helper.make(helpText);
    }
  };

  //return value for current state
  this.isChecked = function () {
    return on;
  };

  this.reset = function () {
    on = initialValue;
  };
}


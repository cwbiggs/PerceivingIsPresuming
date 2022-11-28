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

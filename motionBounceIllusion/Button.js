function Button(n, x, y, x1, y1) {
    var clicked = false;
    var frameClicked = 0;
    var prevClicked = false;
    var hover = false;
    var trigger = false;

    this.make = function (tx, ty) {
        textAlign(LEFT, BOTTOM);
        fill(155, 100);
        noStroke();
        rect(x, y, x1, y1);
        textSize(12);
        fill(255);
        noStroke();
        text(n, x + tx, y + ty);
        hover = mouseX >= x && mouseX <= x1 + x && mouseY >= y && mouseY <= y1 + y;
        clicked = mouseIsPressed;
        trigger = false;

        if (clicked) {
            frameClicked++;
        } else {
            frameClicked = 0;
        }
        if (hover) {
            if (frameClicked > 0 && frameClicked < 2) {
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

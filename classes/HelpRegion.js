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

function Components(n, x, y, x1, y1) {

  var iw; //variable to hold the width of instructions, assigned in instructions method
  var il; //variable for instructions length, assigned in instructions method
  var home = new Link(); //home link for navigation
  var static = new Link(); //link to static example for navigation
  var exampleLinks = new Menu(); //a menu with links to all examples
  var workspaceUpRightCorn = x + x1;

  //color for background
  this.background = function (s) {
    noStroke();
    fill(s);
    rect(0, 0, width, height);
  }
  //name of background, x/y position of the name
  this.name = function (nx, ny) {
    textSize(24);
    fill(54, 255, 0, 255);
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(n, nx, ny);
  }

  //workspace outline
  this.workspace = function () {
    //background of workarea
    noStroke();
    fill(0);
    rect(x, y, x1, y1);
    noFill();
    stroke(20, 100, 255, 255);
    //outline of workarea
    strokeWeight(2);
    rect(x, y, x1, y1);
  }
  //line divisions of workspace, o is offset for y position from top
  this.workspaceDiv = function (o) {
    strokeWeight(1);
    stroke(20, 100, 255, 255);
    //top line
    for (var i = 0; i < o.length; i++) {
      var yPos = o[i]+y;
      line(x, yPos, workspaceUpRightCorn, yPos);
    }
  }
  //circles in workspace
  this.workshopCirc = function (cs, o) {
    ellipseMode(CENTER);
    //calculate center for circle position and offset by x and y
    ellipse(x1 * 0.5 + x, cs * 0.5 + y + o, cs, cs);
  }

  this.instructions = function (w, l, instructionsTitleSpace) {
    iw = w; //assign iw to w to access w elsewhere
    il = l; //same with length
    //fill background with black
    noStroke();
    fill(0);
    rect(workspaceUpRightCorn, y, w, l);
    //outline of instructions
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
    //20 is the pad from the workshop and 35 is the pad from the left bottom of the text to the y value
    text("INSTRUCTIONS", workspaceUpRightCorn + 20, y + 35);
  }

  this.instructionsList = function (t, boundry, position) {
    for (var i = 0; i < t.length; i++) {
      components.instructionsText(t[i], position[i], 20, boundry[i], 16); //text, y offset, x padding, y boundry, text size
    }
  }

  //text, y offset, x boundry, y boundy, text size
  this.instructionsText = function (t, ty, tw, tl, ts) {
    textAlign(LEFT, TOP);
    textSize(ts);
    text(t, x1 + x + 20, ty + 110, iw - tw, tl);
  }

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
    //name, size, rectangular parameters, link
    home.make("HOME", 12, x1 + x + 5, il + 60 - 50, 50, 25, "https://christopherbiggsmusic.com/");
    //print(home.help);
    if (home.help()) {
      helper.make("click to return to main page");
    }
    static.make("VIEW STATIC EXAMPLE", 12, x1 + x + 60, il + 60 - 50, 150, 25, "https://www.youtube.com/watch?v=KQ6zr6kCPj8&list=RDMMKQ6zr6kCPj8&start_radio=1com");
    if (static.help()) {
      helper.make("click to view a fixed example");
    }
    exampleLinks.make("Show/Hide Example List", 12, x1 + x + 220, il + 60 - 50, 150, 25, x1 + iw + 50);
    if (exampleLinks.help()) {
      helper.make("click to open or close links to each example");
    }
  }
}


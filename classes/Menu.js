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

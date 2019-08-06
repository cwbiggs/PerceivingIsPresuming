function Menu() {
  var items = examples.examples;
  var linkNames = examples.links;
  var count = items.length;
  var links = new Array(count);
  for(var i = 0; i < count; i++) {
    links[i] = new Link();
  }
  var frameClicked = 0;
  var menuOpen = false;
  var hover = false;

  this.make = function(name, size, x, y, x1, y1, w){
    fill(155, 100);
    noStroke();
    rect(x, y, x1, y1);

    textSize(size);
    fill(255, 235, 5, 255);
    noStroke();
    textAlign(LEFT, TOP);
    text(name, x+size/2, y+size/2);

    if (mouseIsPressed) {
        frameClicked++;
      } else {
        frameClicked = 0;
      }

    if (mouseX >=x && mouseX <=x+x1 && mouseY >= y && mouseY <= y+y1) { 
        hover = true;
        if(frameClicked > 0 && frameClicked < 2){
            menuOpen = !menuOpen;
            print(menuOpen);
        }
    } else {
      hover = false;
    }
    if(menuOpen) {
        for(var i = 0; i < count; i++){
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

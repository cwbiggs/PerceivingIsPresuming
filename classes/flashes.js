function Flash(x, y) {
   
  var r = 255;
  var g = 255;
  var b = 255;
  
  var fx = x;
  var fy = y;

  this.move = function(oX, oY) {
    fx = x+ oX;
    fy = y + oY;
  }
  
  
  this.make = function(size, c, o) {
    noStroke();
    
    if(c>=0.0 && c<0.25) {
       r = 255;
       g = map(c, 0, 0.25, 255, 0);
       b = g;
    } else if(c>=0.25&&c<0.5){
      r = map(c, 0.25, 0.5, 255, 0);
      g = 255-r;
      b = 0;
    } else if(c>=0.5&&c<0.75){
      r = 0;
      g = map(c, 0.5, 0.75, 255, 0);
      b = 255-g;
    } else {
     r = map(c, 0.75, 1.0, 0, 255);
     g = r;
     b = 255-g;
    }  
    fill(r, g, b, o);
   ellipse(fx, fy, size, size);
  } 
}

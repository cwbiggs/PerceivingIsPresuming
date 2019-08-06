function BananaObject() {

  var yl=255;
  var bl = 0;
  var cArray = new Array(2);
  
  this.background = function (x, y, x1, y1, f) {
    rectMode(CORNER);
    noStroke();

    fill(f);
    rect(x, y, x1, y1);
  }
  //top position, color from slider, gray value, banana or shape, to yellow curve, past yellow curve
  this.makeBanana=function(top, c, g, sb, tyc, pyc) {
    stroke(0, 0, 0, 255);
    strokeWeight(2);
    
    var yM, bM;
    
    if(c >= 0.0 && c<0.5) {
      
      var cCurve = pow(c*2, tyc);
      
      yl = int((1-cCurve)*(255-g)+g);
      bl = int(cCurve*g);
    } else {
      var cCurve2 = pow((c-0.5)*1.0, pyc);
      //bl = int((1-cCurve2)*g);
      bl = int(g+cCurve2*155);
      //yl =bl;
      yl = int(g-cCurve2*g);
    }
    
   
    
    
    fill(yl, yl, bl, 255);
    var halfTop = top/2;
    
    if(sb) {
    push();
    translate(borders[0]+borders[2]/2.5, borders[1]+20);
    beginShape();
    vertex(-halfTop, top);
    vertex(-halfTop, 0);
    vertex(halfTop, 0);
    vertex(halfTop, top);
    bezierVertex(halfTop, top, 300, 100, halfTop, 400);
    vertex(-halfTop, 400);   
    bezierVertex(-halfTop, 400, 100, 200, -halfTop, top);
    vertex(-halfTop, top);
    endShape();
    pop();
    } else {
     rect(borders[0]+borders[2]/2.5, borders[1]+20, 100, 400); 
      
    }
  }
  
  
  this.reportColor = function(a) {
    
    cArray[0] = yl;
    cArray[1] = bl;
   return cArray; 
  }
  
}

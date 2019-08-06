function displayValues() {
   var difference = selectedColor[1]-gray;
   var m;
   var textColor;
   if(difference==0) {
     m = "MATCHED";
     textColor = [255, 255, 255];
   } else if(difference<0) {
     m = "STILL YELLOW";
     textColor = [200, 200, 0];
   } else {
    m="PAST YELLOW"; 
    textColor = [100, 100, 200];
   }
    textAlign(LEFT, BOTTOM);
    textSize(24);
    fill(textColor);
    text(m + " ("+abs(difference)+")", borders[0]+10, 720);
}

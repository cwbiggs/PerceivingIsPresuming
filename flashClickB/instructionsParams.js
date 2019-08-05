function instructionParams() {
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
}

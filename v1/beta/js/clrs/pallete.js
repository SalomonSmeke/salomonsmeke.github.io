var generatedColors = [];

var base = [255,255,255];

var steps = 2;
var strength = 100;
var pivot = 0;

function LWGenPallete() {
}
LWGenPallete.prototype.setBase = function(hex) {
  if (hex.length == 6){
    base = colorToInts(hex);
    return true;
  }
  return false;
};
LWGenPallete.prototype.setBaseS = function(hex) {
  if (hex.length == 6){
    var big = 0;
    base = colorToInts(hex);
    for (var i = 0; i < base.length; i++){
      if (base[i]>big){
        big = base[i];
        pivot = i;
      }
    }
    return true;
  }
  return false;
};
LWGenPallete.prototype.setSteps = function(s) {
  if (s>=2 && s<256){
    steps = s;
    return true;
  }
  return false;
};
LWGenPallete.prototype.setStrength = function(s) {
  if (s <= 100 && s >= 0){
    strength = s;
    return true;
  }
  return false;
};
LWGenPallete.prototype.setPivot = function(p) {
  if (p <= 2 && p >= 0){
    pivot = p;
    return true;
  }
  return false;
};
LWGenPallete.prototype.getGenerated = function() {
  return generatedColors;
};
LWGenPallete.prototype.getBase = function() {
  return base;
};
LWGenPallete.prototype.getSteps = function() {
  return steps;
};
LWGenPallete.prototype.getStrength = function() {
  return strength;
};
LWGenPallete.prototype.getPivot = function() {
  return pivot;
};
LWGenPallete.prototype.getPivotO = function() {
  var sma = 256;
  var tempPivot;
  for (var i = 0; i < base.length; i++){
    if (base[i]<sma){
      sma = base[i];
      tempPivot = i;
    }
  }
  return tempPivot;
};


LWGenPallete.prototype.toString = function() {
  var out = "";
  var temp;
  for (var i = 0; i < generatedColors.length; i++){
    temp = intsToColor(generatedColors[i]);
    out += temp + '\n';
  }
  return out;
};
LWGenPallete.prototype.clear = function() {
  generatedColors = [];
  base = [255,255,255];
  steps = 2;
  strength = 100;
  pivot = 0;
};

function intervals(input) {
  var out = [];
  for (var i = 0; i < steps; i++) out[i] = Math.round(input - ((input*strength/100.0)/(steps-1))*i);
  return out;
}
function intervalsR(input) {
  var out = [];
  for (var i = 0; i < steps; i++) out[i] = Math.round(input + (((255-input)*strength/100.0)/(steps-1))*i);
  return out;
}

LWGenPallete.prototype.linear = function() {
  generatedColors = [];
  var clrs = intervals(base[pivot]);

  for (var i = 0; i < steps; i++){
    switch (pivot){
      case (0):
      generatedColors[i] = (intsToColor([clrs[i],base[1],base[2]]));
      break;
      case (1):
      generatedColors[i] = (intsToColor([base[0],clrs[i],base[2]]));
      break;
      case (2):
      generatedColors[i] = (intsToColor([base[0],base[1],clrs[i]]));
      break;
      default:
    }
  }
  return toString();
};
LWGenPallete.prototype.linearR = function() {
  generatedColors = [];
  var clrs = intervalsR(base[pivot]);

  for (var i = 0; i < steps; i++){
    switch (pivot){
      case (0):
      generatedColors[i] = (intsToColor([clrs[i],base[1],base[2]]));
      break;
      case (1):
      generatedColors[i] = (intsToColor([base[0],clrs[i],base[2]]));
      break;
      case (2):
      generatedColors[i] = (intsToColor([base[0],base[1],clrs[i]]));
      break;
      default:
    }
  }
  return toString();
};
LWGenPallete.prototype.distill = function(input) {
  generatedColors = [];
  var one = 0;
  var two = 0;
  switch (pivot){
    case (0):
    one = 1; //g
    two = 2; //b
    break;
    case (1):
    one = 0; //r
    two = 2; //b
    break;
    case (2):
    one = 0; //r
    two = 1; //g
    break;
    default:
  }

  var clrs = intervals(base[one]);
  var clrs2 = intervals(base[two]);

  for (var i = 0; i < steps; i++){
    switch (pivot){
      case (0):
      generatedColors [i] = (intsToColor([base[0],clrs[i],clrs2[i]]));
      break;
      case (1):
      generatedColors [i] = (intsToColor([clrs[i],base[1],clrs2[i]]));
      break;
      case (2):
      generatedColors [i] = (intsToColor([clrs[i],clrs2[i],base[2]]));
      break;
      default:
    }
  }
  return toString();
};
LWGenPallete.prototype.distillR = function(input) {
  generatedColors = [];
  var one = 0;
  var two = 0;
  switch (pivot){
    case (0):
    one = 1; //g
    two = 2; //b
    break;
    case (1):
    one = 0; //r
    two = 2; //b
    break;
    case (2):
    one = 0; //r
    two = 1; //g
    break;
    default:
  }

  var clrs = intervalsR(base[one]);
  var clrs2 = intervalsR(base[two]);

  for (var i = 0; i < steps; i++){
    switch (pivot){
      case (0):
      generatedColors [i] = (intsToColor([base[0],clrs[i],clrs2[i]]));
      break;
      case (1):
      generatedColors [i] = (intsToColor([clrs[i],base[1],clrs2[i]]));
      break;
      case (2):
      generatedColors [i] = (intsToColor([clrs[i],clrs2[i],base[2]]));
      break;
      default:
    }
  }
  return toString();
};
LWGenPallete.prototype.shade = function(input) {
  generatedColors = [];
  //Create intervals on each value
  var clrs0 = intervals(base[0]);
  var clrs1 = intervals(base[1]);
  var clrs2 = intervals(base[2]);

  for (var i = 0; i < steps; i++){
    generatedColors [i] = (intsToColor([clrs0[i],clrs1[i],clrs2[i]]));
  }
  return toString();
};
LWGenPallete.prototype.shadeR = function(input) {
  generatedColors = [];
  //Create intervals on each value
  var clrs0 = intervalsR(base[0]);
  var clrs1 = intervalsR(base[1]);
  var clrs2 = intervalsR(base[2]);

  for (var i = 0; i < steps; i++){
    generatedColors [i] = (intsToColor([clrs0[i],clrs1[i],clrs2[i]]));
  }
  return toString();
};

function colorToInts(hex) {
  var out = [];
  for (var i = 0; i < 3; i++){
    out[i] = toInt(hex.substring(2*i, 2*(i+1)));
  }
  return out;
}
function intsToColor(color) {
  var out = "";
  for (var i = 0; i < 3; i++){
    out += toHex(color[i],2);
  }
  return out;
}
function toInt(hex) {
  return parseInt(hex, 16);
}
function toHex(decimal, minLength) {
  var out = decimal.toString(16);
  while (out.length<minLength){
    out = "0" + out;
  }
  return out;
}

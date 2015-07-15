var elem, elemR, two, twoR, gen, height, width, params, gene, geneR, rects, rectsR, topOffset, pivot;
var steps, base, str, type;
var onlyL, onlyLR, timeRunning, clrsUp;
var bodyHeight, bodyWidth;

// LOADED FUNCTIONS
document.addEventListener("DOMContentLoaded", function() {
  $('#down').click(function(){ scrollClrs(); return false; });
  $('#clock').click(function(){ clockToggle(); return false; });
  $('#clrslinear').click(function(){ clrsToggle(); return false; });
  $('#clrslinearR').click(function(){ clrsRToggle(); return false; });

  var bw = document.getElementById('biowrapper');

  topOffset = (document.getElementById('header').offsetHeight*2)+bw.offsetHeight;

  initialize();

  elem = document.getElementById('clrslinear');
  elemR = document.getElementById('clrslinearR');
  params = {
    width: bw.offsetWidth/2, height: bw.offsetHeight
  };
  two = new Two(params).appendTo(elem);
  twoR = new Two(params).appendTo(elemR);
  runMe();

  if (window.attachEvent) {
    window.attachEvent('onresize', function() {
      resizeAttach();
    });
  }
  else if (window.addEventListener) {
    window.addEventListener('resize', function() {
      resizeAttach();
    }, true);
  }
  else {
    //The browser does not support Javascript event binding
  }

  var cw = document.getElementById('clrswrapper');

  cw.style.opacity = "0";
  cw.style.filter  = 'alpha(opacity=0)'; // IE fallback
  var div = $("#clrswrapper");
  div.animate({top: bw.offsetHeight+34+"px"});
});

function resizeAttach(){
    var bw = document.getElementById('biowrapper');
    var cw = document.getElementById('clrswrapper');
    bodyHeight = bw.offsetHeight;
    bodyWidth = bw.offsetWidth;

    two.renderer.setSize(bodyWidth, bodyHeight);
    two.width = two.renderer.width;
    two.height = two.renderer.height;

    twoR.renderer.setSize(bodyWidth, bodyHeight);
    twoR.width = twoR.renderer.width;
    twoR.height = twoR.renderer.height;
    runMe(top);
    if(!clrsUp){
          cw.style.top = bodyHeight + 34 + "px";
    } else {
          cw.style.top = 34 + "px";
    }
}

// SCROLL MANAGEMENT

// lock scroll position, but retain settings for later
var scrollPosition = [
0,0
];
var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
html.data('scroll-position', scrollPosition);
html.data('previous-overflow', html.css('overflow'));
html.css('overflow', 'hidden');

//SCROLL CLRS
function scrollClrs(){
  var cw = document.getElementById('clrswrapper');
  cw.style.opacity = "100";
  cw.style.filter  = 'alpha(opacity=100)'; // IE fallback
  var doc = document.documentElement;
  clrsUp = !clrsUp;
  if (clrsUp){
    $('#down').toggleClass('up');
    var div = $("#clrswrapper");
    div.animate({top: "34px"});
  } else {
    $('#down').toggleClass('up');
    var div = $("#clrswrapper");
    div.animate({top: document.getElementById('biowrapper').offsetHeight+34+"px"});
  }
}

// CLOCK TOGGLE
function clockToggle(){
  timeRunning = !timeRunning;
  if (!timeRunning){
    $('#clock').toggleClass('toggledClock');
  } else {
    $('#clock').toggleClass('toggledClock');
  }
}

// CLRS EXPANDER
function clrsToggle(){
  onlyL = !onlyL;
  var e = document.getElementById('clrslinear');
  if (onlyL){
    e.style.width = bodyWidth + "px";
    $("#clrslinearR").hide();
  } else {
    e.style.width = bodyWidth/2 + "px";
    $("#clrslinearR").show();
  }
  two.renderer.setSize(bodyWidth, bodyHeight);
  two.width = two.renderer.width;
  two.height = two.renderer.height;
  twoR.renderer.setSize(bodyWidth, bodyHeight);
  twoR.width = twoR.renderer.width;
  twoR.height = twoR.renderer.height;
  runMe();
}
function clrsRToggle(){
  onlyLR = !onlyLR;
  var e = document.getElementById('clrslinearR');
  if (onlyLR){
    $("#clrslinear").hide();
    e.style.width = bodyWidth + "px";
  } else {
    e.style.width = bodyWidth/2 + "px";
    $("#clrslinear").show();
  }
  two.renderer.setSize(bodyWidth, bodyHeight);
  two.width = two.renderer.width;
  two.height = two.renderer.height;
  twoR.renderer.setSize(bodyWidth, bodyHeight);
  twoR.width = twoR.renderer.width;
  twoR.height = twoR.renderer.height;
  runMe();
}

//OLD CLRS GENERATOR
function morePerc(){
  str += 5;
  if (str>100){
    str = 100;
  }
  runMe();
}

function lessPerc(){
  str -= 5;
  if (str<0){
    str = 0;
  }
  runMe();
}

function moreC(){
  if (steps<window.innerHeight/35){
    steps++;
  }
  runMe();
}

function lessC(){
  if (steps>2){
    steps--;
  }
  runMe();
}

function moreV(){
  var value = getV();
  value += 5;
  if (value > 255){
    value=255;
  }
  base = setV(value);
  runMe();
}

function lessV(){
  var value = getV();
  value -= 5;
  if (value < 0){
    value=0;
  }
  base = setV(value);
  runMe();
}

function getV(){
  var value =base[pivot];
  return value;
}

function setV(value){
  var v1 = base[0].toString(16);
  var v2 = base[1].toString(16);
  var v3 = base[2].toString(16);
  value = value.toString(16);
  while (value.length != 2){
    value =  "0"+value;
  }
  while (v1.length != 2){
    v1 = "0"+v1;
  }
  while (v2.length != 2){
    v2 = "0"+v2;
  }
  while (v3.length != 2){
    v3 = "0"+v3;
  }
  if (pivot == 0){
    return ""+value+v2+v3;
  }
  if (pivot == 1){
    return ""+v1+value+v3;
  }
  if (pivot == 2){
    return ""+v1+v2+value;
  }
}

function R(){
  pivot = 0;
  runMe();
}

function G(){
  pivot = 1;
  runMe();
}

function B(){
  pivot = 2;
  runMe();
}

function initialize(){
  clrsUp=false;
  var ic = document.getElementById('innerclock');
  var today=new Date();
  var h=checkTime(today.getHours());
  var m=checkTime(today.getMinutes());
  var s=checkTime(today.getSeconds());
  if (s%2==0){
    ic.innerHTML = h + ':' + m + ':' + s;
  } else {
    ic.innerHTML = h + ':' + m + ' ' + s;
  }
  var twentyFour = 10.625;
  var sixty = 4.25;
  var c1 = Math.round(twentyFour*h).toString(16);
  var c2 = Math.round(sixty*m).toString(16);
  var c3 = Math.round(sixty*s).toString(16);
  while (c1.length!=2){
    c1 = "0"+c1;
  }
  while (c2.length!=2){
    c2 = "0"+c2;
  }
  while (c3.length!=2){
    c3 = "0"+c3;
  }
  gen = new LWGenPallete();
  base = c1 + c2 + c3;
  steps = 5;
  str = 90;
  type = 0;

  gen.setBaseS(base);
  pivot = gen.getPivot();
  gen.setSteps(steps);
  gen.setStrength(str);
  onlyL, onlyLR = false;
  timeRunning = true;
}

function checkTime(i) {
  if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function generate(){
  gen.setBase(base);
  gen.setSteps(steps);
  gen.setStrength(str);
  gen.setPivot(pivot);
  if (type==0){
    gen.linear();
  }
  if (type==1){
    gen.linearR();
  }
  if (type==2){
    gen.distill();
  }
  if (type==3){
    gen.distillR();
  }
  if (type==4){
    gen.shade();
  }
  if (type==5){
    gen.shadeR();
  }

}

function runMe() {
  var ic = document.getElementById('innerclock');
  var bw = document.getElementById('biowrapper');
  //document.getElementById('interactions-container').style.top = window.innerHeight/2 - (document.getElementById('interactions-container').offsetHeight/2) + topOffset/2 + 'px';
  bodyHeight = bw.offsetHeight;
  bodyWidth = bw.offsetWidth;
  var today=new Date();
  var h=checkTime(today.getHours());
  var m=checkTime(today.getMinutes());
  var s=checkTime(today.getSeconds());
  if (timeRunning){
    if (s%2==0){
      ic.innerHTML = h + ':' + m + ':' + s;
    } else {
      ic.innerHTML = h + ':' + m + '   ' + s;
    }
  }
  var twentyFour = 10.625;
  var sixty = 4.25;
  var c1 = Math.round(twentyFour*h).toString(16);
  var c2 = Math.round(sixty*m).toString(16);
  var c3 = Math.round(sixty*s).toString(16);
  while (c1.length!=2){
    c1 = "0"+c1;
  }
  while (c2.length!=2){
    c2 = "0"+c2;
  }
  while (c3.length!=2){
    c3 = "0"+c3;
  }
  gen = new LWGenPallete();
  base = c1 + c2 + c3;
  steps = 5;
  str = 90;
  type = 0;
  gen.setBaseS(base);
  pivot = gen.getPivot();
  gen.setSteps(steps);
  gen.setStrength(str);

  two.clear();
  twoR.clear();

  generate();

  if (timeRunning){
    gene = gen.getGenerated();
  }
  type = 1;
  var tempPivot = gen.getPivot();
  gen.setPivot(gen.getPivotO());
  generate();
  if (timeRunning){
    geneR = gen.getGenerated();
  }
  gen.setPivot(tempPivot);
  type = 0;

  var ehovers = bodyHeight / steps;
  var whalf = bodyWidth /2;

  if (onlyL){
    rects = [];
    for (var i = 0; i < steps; i++) {
      rects[i] = two.makeRectangle(0, (ehovers * (i+.5)), bodyWidth*2, ehovers);
      rects[i].fill = '#' + gene[i];
      rects[i].opacity = 1;
      rects[i].stroke = '#' + gene[i];
      rects[i].lineWidth = 1;
    }
    two.update();
  }
  if (onlyLR){
    rectsR = [];
    for (var i = 0; i < steps; i++) {
      rectsR[i] = twoR.makeRectangle(0, (ehovers * (i+.5)), bodyWidth*2, ehovers);
      rectsR[i].fill = '#' + geneR[i];
      rectsR[i].opacity = 1;
      rectsR[i].stroke = '#' + geneR[i];
      rectsR[i].lineWidth = 1;
    }
    twoR.update();
  }
  if (!onlyL && !onlyLR){
    rects = [];
    for (var i = 0; i < steps; i++) {
      rects[i] = two.makeRectangle(0, (ehovers * (i+.5)), bodyWidth, ehovers);
      rects[i].fill = '#' + gene[i];
      rects[i].opacity = 1;
      rects[i].stroke = '#' + gene[i];
      rects[i].lineWidth = 1;
    }
    two.update();
    rectsR = [];
    for (var i = 0; i < steps; i++) {
      rectsR[i] = twoR.makeRectangle(whalf, (ehovers * (i+.5)), bodyWidth, ehovers);
      rectsR[i].fill = '#' + geneR[i];
      rectsR[i].opacity = 1;
      rectsR[i].stroke = '#' + geneR[i];
      rectsR[i].lineWidth = 1;
    }
    twoR.update();
  }
  var t = setTimeout(function(){runMe()},1000);
}

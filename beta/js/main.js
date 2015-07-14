var elem, elemR, two, twoR, gen, height, width, params, gene, geneR, rects, rectsR, topOffset, pivot;
var steps, base, str, type;
var onlyL, onlyLR, timeRunning;

// LOADED FUNCTIONS
document.addEventListener("DOMContentLoaded", function() {
  $('#down').click(function(){ scrollStub(); return false; });
  $('#clock').click(function(){clockToggle(); return false;});

  topOffset = (document.getElementById('header').offsetHeight*2)+document.getElementById('biowrapper').offsetHeight;
  initialize();
  elem = document.getElementById('clrslinear');
  elemR = document.getElementById('clrslinearR');
  params = {
    width: document.getElementById('biowrapper').offsetWidth/2, height: document.getElementById('biowrapper').offsetHeight
  };
  two = new Two(params).appendTo(elem);
  twoR = new Two(params).appendTo(elemR);
  runMe();
  if (window.attachEvent) {
    window.attachEvent('onresize', function() {
      runMe(top);
    });
  }
  else if (window.addEventListener) {
    window.addEventListener('resize', function() {
      runMe(top);
    }, true);
  }
  else {
    //The browser does not support Javascript event binding
  }
      window.scrollTo(0, 0);
});

// SCROLL MANAGEMENT

//lock scroll position, but retain settings for later
var scrollPosition = [
0,0
];
var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
html.data('scroll-position', scrollPosition);
html.data('previous-overflow', html.css('overflow'));
html.css('overflow', 'hidden');

//SCROLL POSITIONS *currently a stub, just one position anyways*
function scrollStub(){
  var doc = document.documentElement;
  if ((window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)!= 0){
      window.scrollTo(0, 0);
      $('#down').toggleClass('up');

  } else {
        $('#down').toggleClass('up');
  window.scrollTo(0, document.getElementById("clrswrapper").offsetTop);
}
}

// CLOCK TOGGLE
function clockToggle(){
    timeRunning = !timeRunning;
    clockElem = document.getElementById('clock');
    if (!timeRunning){
      $('#clock').toggleClass('toggledClock');
    } else {
      $('#clock').toggleClass('toggledClock');
    }
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
  var today=new Date();
  var h=checkTime(today.getHours());
  var m=checkTime(today.getMinutes());
  var s=checkTime(today.getSeconds());
  if (s%2==0){
        document.getElementById('innerclock').innerHTML = h + ':' + m + ':' + s;
      } else {
        document.getElementById('innerclock').innerHTML = h + ':' + m + ' ' + s;
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
  height = document.getElementById('biowrapper').offsetHeight;
  width = document.body.scrollWidth/2;
  //document.getElementById('interactions-container').style.top = window.innerHeight/2 - (document.getElementById('interactions-container').offsetHeight/2) + topOffset/2 + 'px';

  var today=new Date();
  var h=checkTime(today.getHours());
  var m=checkTime(today.getMinutes());
  var s=checkTime(today.getSeconds());
  if (timeRunning){
  if (s%2==0){
        document.getElementById('innerclock').innerHTML = h + ':' + m + ':' + s;
      } else {
        document.getElementById('innerclock').innerHTML = h + ':' + m + '   ' + s;
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

  two.appendTo(elem);
  twoR.appendTo(elemR);
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

  var ehovers = height / steps
  var edoublew = width *2;

  if (onlyL){
    edoublew*=2;
    rects = [];
    for (var i = 0; i < steps; i++) {
      rects[i] = two.makeRectangle(0, (ehovers * (i+.5)), edoublew, ehovers);
      rects[i].fill = '#' + gene[i];
      rects[i].opacity = 1;
      rects[i].stroke = '#' + gene[i];
      rects[i].lineWidth = 1;
    }
    two.update();
  }
  if (onlyLR){
    edoublew*=2;
    rectsR = [];
    for (var i = 0; i < steps; i++) {
      rectsR[i] = twoR.makeRectangle(width, (ehovers * (i+.5)), edoublew, ehovers);
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
      rects[i] = two.makeRectangle(0, (ehovers * (i+.5)), edoublew, ehovers);
      rects[i].fill = '#' + gene[i];
      rects[i].opacity = 1;
      rects[i].stroke = '#' + gene[i];
      rects[i].lineWidth = 1;
    }
    two.update();
    rectsR = [];
    for (var i = 0; i < steps; i++) {
      rectsR[i] = twoR.makeRectangle(width, (ehovers * (i+.5)), edoublew, ehovers);
      rectsR[i].fill = '#' + geneR[i];
      rectsR[i].opacity = 1;
      rectsR[i].stroke = '#' + geneR[i];
      rectsR[i].lineWidth = 1;
    }
    twoR.update();
  }
  var t = setTimeout(function(){runMe()},500);
}

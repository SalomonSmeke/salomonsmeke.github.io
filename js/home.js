document.addEventListener("DOMContentLoaded", function() {
    elem = document.getElementById('main-box');
    startTime();
    runMe();
    if (window.attachEvent) {
        window.attachEvent('onresize', function() {
            runMe();
        });
    }
    else if (window.addEventListener) {
        window.addEventListener('resize', function() {
            runMe();
        }, true);
    }
    else {
        //The browser does not support Javascript event binding
    }

});

function runMe() {
    var height = window.innerHeight;
    var width = window.innerWidth;

    document.getElementById('main-box').style.height = height+'px';
    document.getElementById('main-box').style.width = width+'px';

    document.getElementById('center-container').style.height = (height - document.getElementById('about-me').offsetHeight) + "px";
    document.getElementById('top').style.height = (document.getElementById('center-container').offsetHeight/2 - document.getElementById('time').offsetHeight) + "px";
}


function startTime() {
    var today=new Date();
    var h=checkTime(today.getHours());
    var m=checkTime(today.getMinutes());
    var s=checkTime(today.getSeconds());
    if (s%2==0){
      document.getElementById('time').innerHTML = h + ':' + m + ':' + s;
    } else {
      document.getElementById('time').innerHTML = h + ':' + m + ' ' + s;
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
    document.getElementById('center-container').style.backgroundColor = "#" + c1 + c2 + c3;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

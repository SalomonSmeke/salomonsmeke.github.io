var elem, two, gen, height, width, params, gene, rects, topOffset;

document.addEventListener("DOMContentLoaded", function() {
    topOffset = document.getElementById('links').offsetHeight;
    gen = new LWGenPallete();
    elem = document.getElementById('background-box');
    params = {
        fullscreen: true
    };
    two = new Two(params).appendTo(elem);
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
});

function runMe() {
    height = document.body.scrollHeight-topOffset;
    width = document.body.scrollWidth*2;
    two.appendTo(elem);
    two.clear();

    gen.setBase("df54FF");
    gen.setSteps(5);
    gen.linear();
    gene = gen.getGenerated();

    rects = [];
    for (var i = 0; i < 5; i++) {
        rects[i] = two.makeRectangle(0, (height / 5 * (i+.5))+topOffset, width, height/5);
        rects[i].fill = '#' + gene[i];
        rects[i].opacity = 1;
        rects[i].stroke = '#' + gene[i];
        rects[i].lineWidth = 1;
    }
    two.update();
}

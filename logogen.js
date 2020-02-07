var ltcbox = document.getElementById("locktop");
var lrcbox = document.getElementById("lockright");
var llcbox = document.getElementById("lockleft");
var afbox = document.getElementById("areafactor");

function generate() {
    paint(192, 108);
}

function paint(w, h) {
    var draw = SVG().addTo('#logodiv').size(w, h);
    draw.clear();

    // debug rect
    var rect = draw.rect(w, h).attr({ fill: '#EEEEEE' });

    // TEXT
    var text = draw.text("KEIL");
    text.attr({
        'font-size': w * 0.15,
        'font-family': 'keilschrift'
    });
    var textbb = text.bbox();
    // pad bottom durch 2 weil die schriftart so eine hohe box verursacht
    text.attr({
        x: w - textbb.width,
        y: h - textbb.height
    });

    var t = getTriangleWithMinArea(w, h);

    var clippath = draw.path(`M${t.Ax},${t.Ay} L${t.Bx},${t.By} L${t.Cx},${t.Cy} Z`);
    clippath.attr({
        id: "clippy",
        fill: "red",
    });

    var triangle = draw.path(`M${t.Ax},${t.Ay} L${t.Bx},${t.By} L${t.Cx},${t.Cy} Z`);
    triangle.attr({
        fill: "none",
        stroke: "black",
        'stroke-width': 8,
    });

    var clip = draw.clip().add(clippath);
    var final = triangle.clipWith(clip);
    var bb = final.bbox(); // perfect box


    //style = ";;;stroke-dasharray:none;stroke-opacity:1"


    //textbb = text.getBBox();

    //var x = textbb.x;
    //var y = textbb.y;
    //document.getElementById("dbg").innerHTML = x;
}

function getTriangleInRect(w, h) {
    var top = 0;
    if (!(ltcbox && ltcbox.checked))
        top = Math.random() * h;

    var right = w;
    if (!(lrcbox && lrcbox.checked))
        right = Math.random() * w;

    var left = 0;
    if (!(llcbox && llcbox.checked))
        left = Math.random() * w;

    return {
        Ax: Math.random() * w,
        Ay: top,
        Bx: right,
        By: Math.random() * h,
        Cx: left,
        Cy: Math.random() * h
    };
}

function getTriangleWithMinArea(w, h) {
    var t;

    var minarea = w * h * 0.15;
    if (afbox)
        minarea = w * h * afbox.value;

    var i = 100;
    do {
        t = getTriangleInRect(w, h);
        i--;
    } while (GetTriangleArea(t) < minarea || i > 0);

    return t;
}

function GetTriangleArea(t) {
    var A = Math.sqrt((t.Bx - t.Ax) * (t.Bx - t.Ax) + (t.By - t.Ay) * (t.By - t.Ay));
    var B = Math.sqrt((t.Cx - t.Bx) * (t.Cx - t.Bx) + (t.Cy - t.By) * (t.Cy - t.By));
    var C = Math.sqrt((t.Ax - t.Cx) * (t.Ax - t.Cx) + (t.Ay - t.Cy) * (t.Ay - t.Cy));
    var side = (A + B + C) / 2;
    var area = Math.sqrt(side * (side - A) * (side - B) * (side - C));
    return area;
}

generate();
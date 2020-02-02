var s = Snap("#paper");

function generate() {
    paint(192, 108);
}

function paint(w, h) {
    s.clear();

    // debug rect
    s.rect(0, 0, w, h).attr({ fill: "#EEEEEE" });

    var text = s.text(0, 0, "KEIL");
    text.attr({ "font-size": 18 });

    var textbb = text.getBBox();
    // text padding
    var tpadl = 0.05;
    var tpadb = 0.05;
    text.attr({ x: w - textbb.width - w * tpadl, y: h - w * tpadb });

    var t = getTriangleWithMinArea(w, h);
    var triangle = s.polyline(t.Ax, t.Ay, t.Bx, t.By, t.Cx, t.Cy);
    textbb = text.getBBox();

    var x = textbb.x;
    var y = textbb.y;
    document.getElementById("dbg").innerHTML = x;
}

function getTriangleInRect(w, h) {
    return {
        Ax: Math.random() * w,
        Ay: Math.random() * h,
        Bx: Math.random() * w,
        By: Math.random() * h,
        Cx: Math.random() * w,
        Cy: Math.random() * h
    };
}

function getTriangleWithMinArea(w, h) {
    var t;
    do {
        t = getTriangleInRect(w, h);
    } while (GetTriangleArea(t) < 100);

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
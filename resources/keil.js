var s = Snap("#paper");

function generate() {
  paint(192,108);
}

function paint(w, h){  
  s.clear();
  
  // debug rect
  s.rect(0, 0, w, h).attr({ fill: "#EEEEEE" });
  
  var text = s.text(0, 0, "rötlicher KELI");
  text.attr(
    {'font-size' : 18,
    'font-family' : 'Mutka'});
  
  //font-family: 'Mukta', sans-serif;
  
  var textbb = text.getBBox();  
  // text padding
  var tpadl = 0.05;
  var tpadb = 0.05;
  text.attr({x : w-textbb.width-(w*tpadl),
             y : h-(w*tpadb)});
  
  var t = getTriangleWithMinArea(w,h);
  var triangle = s.polygon(t.Ax,t.Ay,t.Bx,t.By,t.Cx,t.Cy).attr({ fill: "red" });
  var triangleBB = triangle.getBBox();
  textbb = text.getBBox();
  var intersect = Snap.path.isBBoxIntersect(textbb, triangleBB)
}

function getTriangleInRect(w,h){
      return ({Ax: Math.random() * w,
  Ay: Math.random() * h,
  Bx: Math.random() * w,
  By: Math.random() * h,
  Cx: Math.random() * w,
  Cy: Math.random() * h});
}

function getTriangleWithMinArea(w,h){
  while(true){
    var t = getTriangleInRect(w,h);
    
    var A = Math.sqrt(((t.Bx-t.Ax)*(t.Bx-t.Ax))+((t.By-t.Ay)*(t.By-t.Ay)));
    var B = Math.sqrt(((t.Cx-t.Bx)*(t.Cx-t.Bx))+((t.Cy-t.By)*(t.Cy-t.By)));
    var C = Math.sqrt(((t.Ax-t.Cx)*(t.Ax-t.Cx))+((t.Ay-t.Cy)*(t.Ay-t.Cy)));
    var side = ((A+B+C)/2);
    area = Math.sqrt(side*(side-A)*(side-B)*(side-C));
    if(area > 100) // todo min area von faktor und w/h ableiten
      return t;
  }
}

generate();
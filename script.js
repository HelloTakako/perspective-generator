// Get values
var slider = document.getElementById("numOfLines");
var output = document.getElementById("numOfLinesShow");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

// Canvas

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//default grids

for (x=50; x < 1000; x += 50){
ctx.beginPath();
ctx.moveTo(x, 0);
ctx.lineTo(x, 500);
ctx.lineWidth = 1;
ctx.strokeStyle = "#ccc";
ctx.stroke();
}

for (y=50; y < 500; y += 50){
ctx.beginPath();
ctx.moveTo(0, y);
ctx.lineTo(1000, y);
ctx.lineWidth = 1;
ctx.strokeStyle = "#ccc";
ctx.stroke();
}

//drawing function

function generate_pers(){
var el = document.getElementById("el").value;
var xpoint = document.getElementById("xpoint").value;

ctx.beginPath();
ctx.moveTo(0, el);
ctx.lineTo(1000, el);
ctx.strokeStyle = "#fd344f";
ctx.stroke();

for(x=0; x<=1000; x+=50){
ctx.beginPath();
ctx.moveTo(xpoint,el);
ctx.lineTo(x,0);
ctx.strokeStyle = "#e2cbb2";
ctx.globalAlpha=0.7;
ctx.stroke();
}
for(y=0; y<=500; y+=50){
ctx.beginPath();
ctx.moveTo(xpoint,el);
ctx.lineTo(0,y);
ctx.strokeStyle = "#e2cbb2";
ctx.globalAlpha=0.7;
ctx.stroke();
}
for(x=0; x<=1000; x+=50){
ctx.beginPath();
ctx.moveTo(xpoint,el);
ctx.lineTo(x,500);
ctx.strokeStyle = "#e2cbb2";
ctx.globalAlpha=0.7;
ctx.stroke();
}
for(y=0; y<=500; y+=50){
ctx.beginPath();
ctx.moveTo(xpoint,el);
ctx.lineTo(1000,y);
ctx.strokeStyle = "#e2cbb2";
ctx.globalAlpha=0.7;
ctx.stroke();
}

ctx.beginPath();
ctx.arc(xpoint,el,2,0,360*Math.PI/180,false);
ctx.fillStyle = "#fd344f";
ctx.fill();

}

//clear_canvas
function clear_canvas(){
ctx.clearRect(0,0,1000,500);

for (x=50; x < 1000; x += 50){
ctx.beginPath();
ctx.moveTo(x, 0);
ctx.lineTo(x, 500);
ctx.lineWidth = 1;
ctx.strokeStyle = "#ccc";
ctx.stroke();
}

for (y=50; y < 500; y += 50){
ctx.beginPath();
ctx.moveTo(0, y);
ctx.lineTo(1000, y);
ctx.lineWidth = 1;
ctx.strokeStyle = "#ccc";
ctx.stroke();
}
}

function export_img(){
    var img = canvas.toDataURL("image/png");
    document.write('<img src="'+img+'"/>');
}

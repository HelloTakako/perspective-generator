// Get values
const slider = document.getElementById("numOfLines")
const output = document.getElementById("numOfLinesShow");


/*------------------------------
Number of perspective lines
------------------------------*/

// show value of total lines
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

/*------------------------------
Canvas and the settings
------------------------------*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Preview, Vertical or Horizontal

const vertical = document.getElementById("vertical");
const horizontal = document.getElementById("horizontal");

vertical.addEventListener("change", function(){
    canvas.width = 180;
    canvas.height = 320;    
});
horizontal.addEventListener("change", function(){
    canvas.width = 320;
    canvas.height = 180;
});


//------------------------
//Eye level

const eyeLevel = document.getElementById("eyeLevel");
eyeLevel.addEventListener("change", function(){
    let x = (eyeLevel.value / 100) * canvas.height;
    // draw eye level line on canvas preview
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, x);
    ctx.lineTo(canvas.width, x);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ccc";
    ctx.stroke();
})

//------------------------
//Vanishing points

const vp1Select = document.getElementById("vp1-select");
const vp2Select = document.getElementById("vp2-select");
const vp3Select = document.getElementById("vp3-select");

const vp1 = document.getElementById("vp1");
const vp2 = document.getElementById("vp2");
const vp3X = document.getElementById("vp3-x");
const vp3Y = document.getElementById("vp3-y");

vp1Select.addEventListener("change", function(){
    vp2.disabled = true;
    vp3X.disabled = true;
    vp3Y.disabled = true;
});
vp2Select.addEventListener("change", function(){
    vp2.disabled = false;
});
vp3Select.addEventListener("change", function(){
    vp2.disabled = false;
    vp3X.disabled = false;
    vp3Y.disabled = false;
})

//default grids

for (x=20; x < 320; x += 20){
ctx.beginPath();
ctx.moveTo(x, 0);
ctx.lineTo(x, 320);
ctx.lineWidth = 1;
ctx.strokeStyle = "#ccc";
ctx.stroke();
}

for (y=20; y < 180; y += 20){
ctx.beginPath();
ctx.moveTo(0, y);
ctx.lineTo(320, y);
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

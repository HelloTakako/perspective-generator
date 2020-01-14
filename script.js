/*------------------------------
Canvas and the settings
------------------------------*/

const canvasEyeLevel = document.getElementById('canvas-eye-level');
const ctxEL = canvasEyeLevel.getContext('2d');
const canvasVp1 = document.getElementById('canvas-vp1');
const ctxVp1 = canvasVp1.getContext('2d');
const canvasVp2 = document.getElementById('canvas-vp2');
const ctxVp2 = canvasVp2.getContext('2d');
const canvasVp3 = document.getElementById('canvas-vp3');
const ctxVp3 = canvasVp3.getContext('2d');

// Preview, Vertical or Horizontal

const vertical = document.getElementById("vertical");
const horizontal = document.getElementById("horizontal");

vertical.addEventListener("change", function(){
    canvasEyeLevel.width = 180;
    canvasEyeLevel.height = 320;    
});
horizontal.addEventListener("change", function(){
    canvasEyeLevel.width = 320;
    canvasEyeLevel.height = 180;
});


//------------------------
//Eye level

const eyeLevel = document.getElementById("eyeLevel");
eyeLevel.addEventListener("change", function(){
    let x = (eyeLevel.value / 100) * canvasEyeLevel.height;
    // draw eye level line on canvas preview
    ctxEL.clearRect(0,0,canvasEyeLevel.width,canvasEyeLevel.height);
    ctxEL.beginPath();
    ctxEL.moveTo(0, x);
    ctxEL.lineTo(canvasEyeLevel.width, x);
    ctxEL.lineWidth = 1;
    ctxEL.strokeStyle = "red";
    ctxEL.stroke();
})

//------------------------
//Number of perspective lines

const numOfLines = document.getElementById("numOfLines");
// get numbers of lines
// numOfLines.addEventListener("click", function(){
//     const numOfLinesVal = numOfLines.value;
//     console.log(numOfLinesVal);
// })

//------------------------
//Vanishing points

const vp1Select = document.getElementById("vp1-select");
const vp2Select = document.getElementById("vp2-select");
const vp3Select = document.getElementById("vp3-select");

const vp1 = document.getElementById("vp1");
const vp2 = document.getElementById("vp2");
const vp3 = document.getElementById("vp3");


// enable/disable sliders
vp1Select.addEventListener("change", function(){
    vp2.disabled = true;
    vp3.disabled = true;
    ctxVp2.clearRect(0,0,320,180);
    ctxVp3.clearRect(0,0,320,180);
});
vp2Select.addEventListener("change", function(){
    vp2.disabled = false;
    vp3.disabled = true;
    ctxVp3.clearRect(0,0,320,180);
});
vp3Select.addEventListener("change", function(){
    vp2.disabled = false;
    vp3.disabled = false;
})


// draw lines from vanishing point, according to user input

const drawVP = function(ctx, vpEach,eyeLevel){
    const vp = vpEach.value;
    let x = (eyeLevel.value / 100) * canvasEyeLevel.height;
    ctx.clearRect(0,0,canvasEyeLevel.width,canvasEyeLevel.height);
    for( let i = 0; i <= canvasEyeLevel.width; i += 80 ){
        
        ctx.beginPath();
        ctx.moveTo(vp, x);
        ctx.lineTo(i , 0);
        ctx.moveTo(vp, x);
        ctx.lineTo(i , canvasEyeLevel.height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ddd";
        ctx.stroke();
    }
    for( let i = 0; i <= canvasEyeLevel.height; i += 20 ){
        
        ctx.beginPath();
        ctx.moveTo(vp, x);
        ctx.lineTo(0 , i);
        ctx.moveTo(vp, x);
        ctx.lineTo(canvasEyeLevel.width , i);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ddd";
        ctx.stroke();
    }
};

vp1.addEventListener("click", function(){
    drawVP(ctxVp1, vp1, eyeLevel);
});

vp2.addEventListener("click", function(){
    drawVP(ctxVp2, vp2, eyeLevel);
});

vp3.addEventListener("click", function(){
    const vp = vp3.value;
    const cwCenter = canvasEyeLevel.width / 2;
    ctxVp3.clearRect(0,0,canvasEyeLevel.width,canvasEyeLevel.height);
    if (vp < 0){
        for( let i = 0; i <= canvasEyeLevel.width; i += 40 ){
            
            ctxVp3.beginPath();
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(i , canvasEyeLevel.height);
            ctxVp3.lineWidth = 1;
            ctxVp3.strokeStyle = "#ddd";
            ctxVp3.stroke();
        }
        for( let i = 0; i <= canvasEyeLevel.height; i += 80 ){
            
            ctxVp3.beginPath();
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(0 , i);
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(canvasEyeLevel.width , i);
            ctxVp3.lineWidth = 1;
            ctxVp3.strokeStyle = "#ddd";
            ctxVp3.stroke();
        }
    } else if( 0 <= vp <= canvasEyeLevel.height ){
        for( let i = 0; i <= canvasEyeLevel.width; i += 40 ){   
            ctxVp3.beginPath();
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(i , 0);
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(i , canvasEyeLevel.height);
            ctxVp3.lineWidth = 1;
            ctxVp3.strokeStyle = "#ddd";
            ctxVp3.stroke();
        }
        for( let i = 0; i <= canvasEyeLevel.height; i += 80 ){
            
            ctxVp3.beginPath();
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(0 , i);
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(canvasEyeLevel.width , i);
            ctxVp3.lineWidth = 1;
            ctxVp3.strokeStyle = "#ddd";
            ctxVp3.stroke();
        }
    } else if( vp < canvasEyeLevel.height){
        for( let i = 0; i <= canvasEyeLevel.width; i += 40 ){   
            ctxVp3.beginPath();
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(i , 0);
            ctxVp3.lineWidth = 1;
            ctxVp3.strokeStyle = "#ddd";
            ctxVp3.stroke();
        }
        for( let i = 0; i <= canvasEyeLevel.height; i += 80 ){
            
            ctxVp3.beginPath();
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(0 , i);
            ctxVp3.moveTo(cwCenter, vp);
            ctxVp3.lineTo(canvasEyeLevel.width , i);
            ctxVp3.lineWidth = 1;
            ctxVp3.strokeStyle = "#ddd";
            ctxVp3.stroke();
        }
    }
});


//default grids

// for (x=20; x < 320; x += 20){
// ctx.beginPath();
// ctx.moveTo(x, 0);
// ctx.lineTo(x, 320);
// ctx.lineWidth = 1;
// ctx.strokeStyle = "#ddd";
// ctx.stroke();
// }

// for (y=20; y < 180; y += 20){
// ctx.beginPath();
// ctx.moveTo(0, y);
// ctx.lineTo(320, y);
// ctx.lineWidth = 1;
// ctx.strokeStyle = "#ddd";
// ctx.stroke();
// }


//clear_canvas
function clear_canvas(){
ctxEL.clearRect(0,0,320,180);
ctxVp1.clearRect(0,0,320,180);
ctxVp2.clearRect(0,0,320,180);
ctxVp3.clearRect(0,0,320,180);
}

function export_img(){
    var img = canvasEyeLevel.toDataURL("image/png");
    document.write('<img src="'+img+'"/>');
}

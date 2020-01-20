'use strict';

/* ------------------------------
Slide menu & menu toggle button
------------------------------*/
const menuButton = document.getElementById("menu-toggle-button");
const menu = document.getElementById("slide-menu");

let isMenuHidden;

menuButton.addEventListener("click",function(){
    if(!isMenuHidden){
        menu.classList.add("menu-hidden");
        isMenuHidden = true;
    }
    if(isMenuHidden){
        menu.classList.remove("menu-hidden");
        isMenuHidden = false;
    }
})


/* ------------------------------
Canvas and the settings
------------------------------*/

const canvasEyeLevel = document.getElementById('canvas-eye-level');
const ctxEL = canvasEyeLevel.getContext('2d');
const canvasGrid = document.getElementById('canvas-grid');
const ctxGrid = canvasGrid.getContext('2d');
const canvasVp1 = document.getElementById('canvas-vp1');
const ctxVp1 = canvasVp1.getContext('2d');
const canvasVp2 = document.getElementById('canvas-vp2');
const ctxVp2 = canvasVp2.getContext('2d');
const canvasVp3 = document.getElementById('canvas-vp3');
const ctxVp3 = canvasVp3.getContext('2d');

// Integers next to each slider
const intEL = document.getElementById('eyeLevel-int');
const intVp1 = document.getElementById('vp1-int');
const intVp2 = document.getElementById('vp2-int');
const intVp3 = document.getElementById('vp3-int');
const intNoL = document.getElementById('numOfLines-int');


// Vertical or Horizontal

// client's device width, height

const displayWidth = window.innerWidth * window.devicePixelRatio;
const displayHeight = window.innerHeight * window.devicePixelRatio;


const canvasPreview = document.getElementById("canvas-preview");
const vertical = document.getElementById('vertical');
const horizontal = document.getElementById('horizontal');

/**
 * @param {string} canvas - canvas object *
 */
function canvasVertical(canvas) {
    canvasPreview.classList.remove("rotate-horizontal");
    canvas.width = displayWidth;
    canvas.height = displayHeight;
}

/**
 * @param {string} canvas - canvas object *
 */
function canvasHorizontal(canvas) {
    canvasPreview.classList.add("rotate-horizontal");
    canvas.width = displayHeight;
    canvas.height = displayWidth;
}

// canvas size initialize
  canvasHorizontal(canvasEyeLevel);
  canvasHorizontal(canvasGrid);
  canvasHorizontal(canvasVp1);
  canvasHorizontal(canvasVp2);
  canvasHorizontal(canvasVp3);

// change canvas orientation
vertical.addEventListener('change', function() {
  canvasVertical(canvasEyeLevel);
  canvasVertical(canvasGrid);
  canvasVertical(canvasVp1);
  canvasVertical(canvasVp2);
  canvasVertical(canvasVp3);
});
horizontal.addEventListener('change', function() {
  canvasHorizontal(canvasEyeLevel);
  canvasHorizontal(canvasGrid);
  canvasHorizontal(canvasVp1);
  canvasHorizontal(canvasVp2);
  canvasHorizontal(canvasVp3);
});


// ------------------------
// Eye level

const eyeLevel = document.getElementById('eyeLevel');
eyeLevel.addEventListener('change', function() {
  intEL.value = eyeLevel.value;
  const x = (eyeLevel.value / 100) * canvasEyeLevel.height;
  // draw eye level line on canvas preview
  ctxEL.clearRect(0, 0, canvasEyeLevel.width, canvasEyeLevel.height);
  ctxEL.beginPath();
  ctxEL.moveTo(0, x);
  ctxEL.lineTo(canvasEyeLevel.width, x);
  ctxEL.lineWidth = 1;
  ctxEL.strokeStyle = 'red';
  ctxEL.stroke();
});


// ------------------------
// Vanishing points

const vp1Select = document.getElementById('vp1-select');
const vp2Select = document.getElementById('vp2-select');
const vp3Select = document.getElementById('vp3-select');

const vp1 = document.getElementById('vp1');
const vp2 = document.getElementById('vp2');
const vp3 = document.getElementById('vp3');


// enable/disable sliders
vp1Select.addEventListener('change', function() {
  vp2.disabled = true;
  vp3.disabled = true;
  ctxVp2.clearRect(0, 0, 320, 180);
  ctxVp3.clearRect(0, 0, 320, 180);
});
vp2Select.addEventListener('change', function() {
  vp2.disabled = false;
  vp3.disabled = true;
  ctxVp3.clearRect(0, 0, 320, 180);
});
vp3Select.addEventListener('change', function() {
  vp2.disabled = false;
  vp3.disabled = false;
});


// draw lines from vanishing point, according to user input

const drawVP = function(ctx, vpEach, eyeLevel) {
  const vp = vpEach.value;
  const x = (eyeLevel.value / 100) * canvasEyeLevel.height;
  ctx.clearRect(0, 0, canvasEyeLevel.width, canvasEyeLevel.height);
  for ( let i = 0; i <= canvasEyeLevel.width; i += 80 ) {
    ctx.beginPath();
    ctx.moveTo(vp, x);
    ctx.lineTo(i, 0);
    ctx.moveTo(vp, x);
    ctx.lineTo(i, canvasEyeLevel.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
  }
  for ( let i = 0; i <= canvasEyeLevel.height; i += 20 ) {
    ctx.beginPath();
    ctx.moveTo(vp, x);
    ctx.lineTo(0, i);
    ctx.moveTo(vp, x);
    ctx.lineTo(canvasEyeLevel.width, i);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
  }
};

vp1.addEventListener('change', function() {
  intVp1.value = vp1.value;
  drawVP(ctxVp1, vp1, eyeLevel);
});

vp2.addEventListener('change', function() {
  intVp2.value = vp2.value;
  drawVP(ctxVp2, vp2, eyeLevel);
});

vp3.addEventListener('change', function() {
  intVp3.value = vp3.value;
  const vp = vp3.value;
  const cwCenter = canvasEyeLevel.width / 2;
  ctxVp3.clearRect(0, 0, canvasEyeLevel.width, canvasEyeLevel.height);
  if (vp < 0) {
    for ( let i = 0; i <= canvasEyeLevel.width; i += 40 ) {
      ctxVp3.beginPath();
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(i, canvasEyeLevel.height);
      ctxVp3.lineWidth = 1;
      ctxVp3.strokeStyle = '#ddd';
      ctxVp3.stroke();
    }
    for ( let i = 0; i <= canvasEyeLevel.height; i += 80 ) {
      ctxVp3.beginPath();
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(0, i);
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(canvasEyeLevel.width, i);
      ctxVp3.lineWidth = 1;
      ctxVp3.strokeStyle = '#ddd';
      ctxVp3.stroke();
    }
  } else if ( 0 <= vp <= canvasEyeLevel.height ) {
    for ( let i = 0; i <= canvasEyeLevel.width; i += 40 ) {
      ctxVp3.beginPath();
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(i, 0);
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(i, canvasEyeLevel.height);
      ctxVp3.lineWidth = 1;
      ctxVp3.strokeStyle = '#ddd';
      ctxVp3.stroke();
    }
    for ( let i = 0; i <= canvasEyeLevel.height; i += 80 ) {
      ctxVp3.beginPath();
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(0, i);
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(canvasEyeLevel.width, i);
      ctxVp3.lineWidth = 1;
      ctxVp3.strokeStyle = '#ddd';
      ctxVp3.stroke();
    }
  } else if ( vp < canvasEyeLevel.height) {
    for ( let i = 0; i <= canvasEyeLevel.width; i += 40 ) {
      ctxVp3.beginPath();
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(i, 0);
      ctxVp3.lineWidth = 1;
      ctxVp3.strokeStyle = '#ddd';
      ctxVp3.stroke();
    }
    for ( let i = 0; i <= canvasEyeLevel.height; i += 80 ) {
      ctxVp3.beginPath();
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(0, i);
      ctxVp3.moveTo(cwCenter, vp);
      ctxVp3.lineTo(canvasEyeLevel.width, i);
      ctxVp3.lineWidth = 1;
      ctxVp3.strokeStyle = '#ddd';
      ctxVp3.stroke();
    }
  }
});


// grids
function drawGrid(canvas, ctx) {
  for (let x=20; x < canvas.width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.width);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'aqua';
    ctx.stroke();
  }

  for (let y=20; y < canvas.height; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'aqua';
    ctx.stroke();
  }
}

const gridOn = document.getElementById('grid-on');
const gridOff = document.getElementById('grid-off');

gridOn.addEventListener('click', function() {
  drawGrid(canvasGrid, ctxGrid);
  gridOn.checked = true;
});
gridOff.addEventListener('click', function() {
  clearCanvas(canvasGrid, ctxGrid);
  gridOn.checked = false;
});


// clear_canvas / clear all button
function clearCanvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const clearAllButton = document.getElementById('clear-all-button');
clearAllButton.addEventListener('click', function() {
  clearCanvas(canvasEyeLevel, ctxEL);
  clearCanvas(canvasGrid, ctxGrid);
  clearCanvas(canvasVp1, ctxVp1);
  clearCanvas(canvasVp2, ctxVp2);
  clearCanvas(canvasVp3, ctxVp3);
});

// export as PNG
// const canvasToExport = document.getElementById('canvasToExport');
// const ctxCanvasToExport = canvasToExport.getContext('2d');


// function export_img() {
//   clearCanvas(canvasToExport, ctxCanvasToExport);

//   if(horizontal.checked){
//     canvasToExport.width = canvasEyeLevel.width;
//     canvasToExport.height = canvasEyeLevel.height;

//     ctxCanvasToExport.rotate(90*(Math.PI/180));
//     ctxCanvasToExport.drawImage(canvasEyeLevel, 0, 0);
//     ctxCanvasToExport.drawImage(canvasGrid, 0, 0);
//     ctxCanvasToExport.drawImage(canvasVp1, 0, 0);
//     ctxCanvasToExport.drawImage(canvasVp2, 0, 0);
//     ctxCanvasToExport.drawImage(canvasVp3, 0, 0);
//   }
//   if(vertical.checked){
//     canvasToExport.width = canvasEyeLevel.width;
//     canvasToExport.height = canvasEyeLevel.height;

//     ctxCanvasToExport.drawImage(canvasEyeLevel, 0, 0);
//     ctxCanvasToExport.drawImage(canvasGrid, 0, 0);
//     ctxCanvasToExport.drawImage(canvasVp1, 0, 0);
//     ctxCanvasToExport.drawImage(canvasVp2, 0, 0);
//     ctxCanvasToExport.drawImage(canvasVp3, 0, 0);
//   }
// }

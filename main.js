'use strict';

let canvas;                   // canvas element
let context;                  // drawing context for canvas element
let step;                     // how big is the grid
let halfWidth;                // half the screen width - avoids recalculating
let halfHeight;               // half the screen width - avoids recalculating
let balls = [];                     // Arraylist of Balls
let noBalls;
let angle;
let height = window.innerHeight;
let width = window.innerWidth;


class Ball{
constructor(){
this.width = 25;
this.size = window.innerHeight / 50;
  this.x = window.innerWidth / 2;
  this.y = window.innerHeight - window.innerHeight / 20;
  this.speed =10;
  this.angle = 45;
}

  draw(ctx){
    ctx.beginPath();
  ctx.arc(this.x,this.y,this.size,0,Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();

}

  move(){

    // console.log(5/3);


    if(this.x - this.size < 0 ||  this.x + this.size > window.innerWidth){
          this.angle = 180 - this.angle;
          // alert("yhis");
    }
    if(this.y - this.size < 0 || this.y + this.size > window.innerHeight){
          this.angle = -this.angle;
          // alert("yhssis")
    }
    this.angle+= Math.random()*10;
    this.x += Math.cos(this.angle * Math.PI / 180)* this.speed;
    this.y += Math.sin(this.angle * Math.PI / 180)*this.speed;
    //  OR

}

}




function drawCircle(){
  let x = window.innerWidth / 2;
  let y = window.innerHeight - window.innerHeight / 20;
  let circleSize = window.innerHeight/50;
  console.log(x);
  if (canvas.getContext) {
  var ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.arc(x,y,circleSize,0,Math.PI * 2, true); // Outer circle
      ctx.closePath();
      ctx.stroke();

}
}



function newCanvas() {
canvas = document.createElement('canvas');

canvas.id = "CursorLayer";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";

var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);
}











function loop() {
    // redraw();
    redraw();
    context.stroke();
    balls.forEach(function(element) {
  element.move();
});
		window.requestAnimationFrame( loop );

}

function launch(){
  for (var i = 0; i < noBalls; i++) {

    // setTimeout('newBall()', width/50*i);
    newBall();
      // console.log("hfh");
  }
}

function newBall(i){
console.log();
balls.push(new Ball());
// balls[i].draw(context);
}

function redraw(){
  context.beginPath();
  context.clearRect(0, 0, width, height);
  context.closePath();
  context.stroke;
  // context.endPath();
  // console.log(console.width);
  balls.forEach(function(element) {
    element.draw(context);
});
}


function init() {

  newCanvas();
  context = canvas.getContext("2d");
  noBalls = 1000;
  angle = 45;

  // let ballus = new Ball();
  // ballus.draw(context);
  // context.stroke();
  launch();

  window.requestAnimationFrame( loop );

}

window.addEventListener("load", init);

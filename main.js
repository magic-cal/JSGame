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
let play = false;
let blocks =[];


class Ball{
constructor(){
this.width = 25;
this.size = (window.innerHeight / 50);
  this.x = (window.innerWidth / 2);
  this.y = window.innerHeight - window.innerHeight / 20;
  this.speed =10;
  this.angle = 90;
  this.hitWall = true;
}

  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();

}



circleBlock(cx,cy,radius,rx,ry,rw,rh) {

  // temporary variables to set edges for testing
  let testX = cx;
  let testY = cy;
  let sidex = 0;
  let sidey = 0;
  // which edge is closest?
  if (cx < rx){
    testX = rx;
    sidex = 1;
  }             // test left edge
  else if (cx > rx+rw){
    testX = rx+rw;   // right edge
    sidex = 2;
  }
  if (cy < ry){
    testY = ry;      // top edge
    sidey = 3;
  }
  else if (cy > ry+rh){
    testY = ry+rh;   // bottom edge
    sidey = 4;
  }

  // get distance from closest edges
  let distX = cx-testX;
  let distY = cy-testY;
  let distance = Math.sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the radius, collision!
  if (distance <= radius) {
      if (distY<distX){
        console.log(sidey);
        return sidey;

      }else{
        console.log(sidex);
        return sidex;

      }
  }
  console.log("nope");
  return 0;
}

// changeAngle(angleChange){
//   this.angle+= angleChange;
//   if(this.angle>360){}
// }
blockCollision(){
  for (let block of blocks) {
    // console.log(block);
    if (this.circleBlock(this.x,this.y,this.width,block.x,block.y,block.width,block.height)){
      // block.colour = "red";
      if(this.x-block.x > this.y-block.y){
        block.colour = "blue";
      }else{
        block.colour = "green";
      }
    }
  }

}

  move(){
    // console.log(5/3);
    this.hitWall = false;
    if(this.x - this.size < 0 ||  this.x + this.size > window.innerWidth){
          this.angle = 180 - this.angle;
              this.hitWall = true;
          // alert("yhis");
    }
    if(this.y - this.size < 0 || this.y + this.size > window.innerHeight){
          this.angle = 360 -this.angle;
          this.hitWall = true;
    }
    if (this.angle<360) this.angle+=360;
    if (this.angle>360) this.angle -=360;
    this.x -= Math.cos(this.angle * Math.PI / 180)* this.speed;
    this.y -= Math.sin(this.angle * Math.PI / 180)*this.speed;
    //  OR
    this.blockCollision();
}



}


class Block{
constructor(){
this.width = 50;
this.height = 50;
// this.size = window.innerHeight / 50;
this.x = window.innerWidth / 2 -(this.width/2);
this.y = (0 + this.height*2)-(this.height/2);
this.colour = "black";
}

    draw(ctx){
      ctx.beginPath();
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.closePath();
      ctx.stroke();

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

function drawRec(){
  if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.rect(0, 0, 100, 100);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
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
blocks.forEach(function(element) {
  element.draw(context);
});
 if (balls[0].hitWall)displayStats();
}

function displayStats(){
  window.currentAngle.textContent = balls[0].angle;
}

function init() {

  newCanvas();
  context = canvas.getContext("2d");
  noBalls = 1 ;
  angle = 0;
  blocks.push(new Block());
  blocks[0].draw(context);
  // let ballus = new Ball();
  // ballus.draw(context);
  // context.stroke();
  launch();

  window.requestAnimationFrame( loop );

}



//

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

//
function resume(){
  play=true;
}
function pause(){
  play=false;
}

  window.addEventListener("load", init);
// window.play.addEventListener("click",play);
// window.pause.addEventListener("click",pause);

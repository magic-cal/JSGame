class Ball{

constructor(window){

this.width = 25px;
this.size = window.innerHeight / 50;
this.position ={
  x = window.innerWidth / 2,
  y = window.innerHeight - window.innerHeight / 20,
}

}
draw(ctx){
  ctx.arc(this.position.x,this.position.y,this.size,0,Math.PI * 2, true); // Outer circle
}


}

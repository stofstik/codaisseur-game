class Player {
  constructor(ctx, startPosX){
    this.ctx = ctx
    this.step = 800 / 10
    this.x = startPosX
    this.start = startPosX - this.step * 2
    this.end = startPosX + this.step * 2
    this.radius = 30
  }

  hit(){
    if(this.radius > 2){
      this.radius -= 4
    }
  }

  grow(){
    if(this.radius < 38) {
      this.radius += 4
    }
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.lineWidth = 3
    this.ctx.arc(this.x, 600 - 20, this.radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
  }
}

export default Player

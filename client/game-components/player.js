class Player {
  constructor(ctx, startPosX){
    this.ctx = ctx
    this.step = 800 / 10
    this.x = startPosX
    this.start = startPosX - this.step * 2
    this.end = startPosX + this.step * 2
  }

  moveLeft() {
    if(this.x > this.start) {
      this.x -= 400 / 5;
    }
  };

  moveRight() {
    if(this.x < this.end) {
      this.x += 400 / 5;
    }
  };

  draw(){
    console.log('player got drawn at ', this.x)
    this.ctx.beginPath();
    this.ctx.lineWidth = 3
    this.ctx.arc(this.x, 600 - 20, 10, 0, Math.PI * 2, true);
    this.ctx.stroke();
  }
}

export default Player

class VerticalLine {
  constructor(ctx, x, lineWidth){
    this.ctx = ctx
    this.x   = x
    this.lineWidth = lineWidth
    this.opacity = 1
  }

  draw(){
    this.ctx.strokeStyle = 'rgba(' + '0,0,0' + ',' + this.opacity + ')';
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + 0.5, 0); // Canvas calcs form .5 pixel... FUHHHH
    this.ctx.lineTo(this.x + 0.5, 600);
    this.ctx.stroke();
    this.ctx.lineWidth = 0
  }
}

export default VerticalLine

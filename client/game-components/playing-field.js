import VerticalLine from './vertical-line'

/*
 * This draws a simple playing field with some vertical lines for us
 */
class PlayingField {
  constructor(ctx){
    this.ctx = ctx
    this.middle = new VerticalLine(this.ctx, 800 / 2, 3)
    this.line1 = new VerticalLine(this.ctx, 800 / 10 * 1, 1)
    this.line2 = new VerticalLine(this.ctx, 800 / 10 * 2, 1)
    this.line3 = new VerticalLine(this.ctx, 800 / 10 * 3, 1)
    this.line4 = new VerticalLine(this.ctx, 800 / 10 * 4, 1)
    this.line5 = new VerticalLine(this.ctx, 800 / 10 * 6, 1)
    this.line6 = new VerticalLine(this.ctx, 800 / 10 * 7, 1)
    this.line7 = new VerticalLine(this.ctx, 800 / 10 * 8, 1)
    this.line8 = new VerticalLine(this.ctx, 800 / 10 * 9, 1)
  }

  draw(){
    this.middle.draw()
    this.line1.draw()
    this.line2.draw()
    this.line3.draw()
    this.line4.draw()
    this.line5.draw()
    this.line6.draw()
    this.line7.draw()
    this.line8.draw()
  }
}

export default PlayingField

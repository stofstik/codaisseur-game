import getRandomInt from './helpers/random-int'

const colors = ['#ff0000', '#00ff00']

class FallingStuff {
  constructor(ctx){
    this.ctx = ctx
    this.createdAt = new Date().getTime();
    this.step = 800 / 10
    this.x = this.step * getRandomInt(1, 11) - 800 / 20
    this.y = 1
    // The amount of time it takes in milliseconds for this object to fall
    this.velocity = 1000 * getRandomInt(1, 5);
    this.danger = false
    this.color = colors[getRandomInt(0, 2)]
  }

  animate() {
    if(this.y > 580) {
      this.danger = true
    }

    if(this.y > 585) {
      this.danger = false
    }
    if(this.y < 620){
      const timeElapsed = (new Date().getTime() - this.createdAt)
      this.y = timeElapsed * (600 / this.velocity)
    }
  };

  draw(){
    this.animate()
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true)
    this.ctx.fill()
  }
}

export default FallingStuff

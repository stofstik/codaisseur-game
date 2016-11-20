import getRandomInt from './helpers/random-int'

const colors = ['#ff0000', '#00ff00']

class FallingStuff {
  constructor(ctx, createdAt, x, velocity) {
    this.ctx = ctx
    this.createdAt = createdAt
    // this.x = (800 / 10) * getRandomInt(1, 11) - 800 / 20
    this.x = x
    this.y = 1
    // The amount of time it takes in milliseconds for this object to fall
    // this.velocity = getRandomInt(1000, 5000);
    this.velocity = velocity
    this.hitZone = false
    this.color = colors[getRandomInt(0, 2)]
  }

  reset() {}

  animate() {
    if (this.y > 580) {
      this.hitZone = true
    }
    if (this.y > 585) {
      this.hitZone = false
    }
    if (this.y < 620) {
      const timeElapsed = (new Date().getTime() - this.createdAt)
      this.y = timeElapsed * (600 / this.velocity)
    }
    if (this.y > 621) {
      this.reset()
    }
  };

  draw() {
    this.animate()
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true)
    this.ctx.fill()
  }
}

export default FallingStuff

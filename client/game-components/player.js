class Player {
  constructor(ctx, startPosX, isPlayerOne, game, updateGame){
    this.ctx = ctx
    this.step = 800 / 10
    this.x = startPosX
    this.start = startPosX - this.step * 2
    this.end = startPosX + this.step * 2
    this.radius = 20
    this.justHit = false
    this.justGrown = false

    this.isPlayerOne = isPlayerOne
    this.game = game
    this.updateGame = updateGame
  }

  moveLeft() {
    if(this.isPlayerOne){
      if(this.game.pOnePos > 40) {
        this.updateGame(this.game, { pOnePos: this.game.pOnePos -= 80 })
      }
    } else {
      if(this.game.pTwoPos > 440) {
        this.updateGame(this.game, { pTwoPos: this.game.pTwoPos -= 80 })
      }
    }
  }

  moveRight() {
    if(this.isPlayerOne){
      if(this.game.pOnePos < 360) {
        this.updateGame(this.game, { pOnePos: this.game.pOnePos += 80 })
      }
    } else {
      if(this.game.pTwoPos < 760) {
        this.updateGame(this.game, { pTwoPos: this.game.pTwoPos += 80 })
      }
    }
  }

  hit(){
    if(this.justHit) return
    if(this.isPlayerOne) {
      if(this.game.pOneSize > 4){
        this.updateGame(this.game, { pOneSize: this.game.pOneSize -= 4 })
      }
    } else {
      if(this.game.pTwoSize > 4){
        this.updateGame(this.game, { pTwoSize: this.game.pTwoSize -= 4 })
      }
    }
    this.justHit = true
    window.setTimeout(() => {
      this.justHit = false
    }, 200)
  }

  grow(){
    if(this.justGrown) return
    if(this.isPlayerOne) {
      if(this.game.pOneSize < 38){
        this.updateGame(this.game, { pOneSize: this.game.pOneSize += 4 })
      }
    } else {
      if(this.game.pTwoSize < 38){
        this.updateGame(this.game, { pTwoSize: this.game.pTwoSize += 4 })
      }
    }
    this.justGrown = true
    window.setTimeout(() => {
      this.justGrown = false
    }, 200)
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.lineWidth = 3
    this.ctx.arc(this.x, 600 - 20, this.radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
  }
}

export default Player

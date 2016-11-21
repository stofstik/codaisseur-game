/*
 * OMG This is soooo hacky : /
 */

class Player {
  constructor(ctx, isPlayerOne, game, updateGame){
    this.ctx = ctx
    this.isPlayerOne = isPlayerOne
    this.game = game
    this.updateGame = updateGame
    this.justHit = false
    this.justGrown = false
  }

  moveLeft() {
    if(this.isPlayerOne){
      if(this.game.pOnePos > 40) {
        this.updateGame(this.game, { pOnePos: this.game.pOnePos - 80 })
      }
    } else {
      if(this.game.pTwoPos > 440) {
        this.updateGame(this.game, { pTwoPos: this.game.pTwoPos - 80 })
      }
    }
  }

  moveRight() {
    if(this.isPlayerOne){
      if(this.game.pOnePos < 360) {
        this.updateGame(this.game, { pOnePos: this.game.pOnePos + 80 })
      }
    } else {
      if(this.game.pTwoPos < 760) {
        this.updateGame(this.game, { pTwoPos: this.game.pTwoPos + 80 })
      }
    }
  }

  hit() {
    if(this.justHit) return
    if(this.isPlayerOne) {
      if(this.game.pOneSize >= 4){
        this.updateGame(this.game, { pOneSize: this.game.pOneSize - 4 })
      }
    } else {
      if(this.game.pTwoSize >= 4){
        this.updateGame(this.game, { pTwoSize: this.game.pTwoSize - 4 })
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
        this.updateGame(this.game, { pOneSize: this.game.pOneSize + 3 })
      }
    } else {
      if(this.game.pTwoSize < 38){
        this.updateGame(this.game, { pTwoSize: this.game.pTwoSize + 3 })
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
    if(this.isPlayerOne) {
      this.ctx.arc(this.game.pOnePos, 600 - 20, this.game.pOneSize, 0, Math.PI * 2, true);
    } else {
      this.ctx.arc(this.game.pTwoPos, 600 - 20, this.game.pTwoSize, 0, Math.PI * 2, true);
    }
    this.ctx.stroke();
  }
}

export default Player

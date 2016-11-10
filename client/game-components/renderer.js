import Player from './player'
import PlayingField from './playing-field'
import FallingStuff from './falling-stuff'
import saveGame from '../actions/update-game'
import getRandomInt from './helpers/random-int'

const WIDTH = 800
const HEIGHT = 600
let ctx
let playingField
let player1
let fallingStuff = []

class Renderer {

  constructor(context, window){
    ctx = context

    // init objects
    playingField = new PlayingField(ctx)
    player1 = new Player(ctx, WIDTH / 10 * 3 - WIDTH / 20)
    // spawner()
    // garbageCollector()

    window.requestAnimationFrame(draw)
  }
}

const garbageCollector = function() {
  window.setInterval(() => {
    console.log(fallingStuff.length)
  }, 1000)

}

const spawner = function() {
  window.setTimeout(() => {
    fallingStuff = fallingStuff.filter((fs) => {
      return fs.y < 610
    })
    fallingStuff.push(new FallingStuff(ctx))
    return spawner()
  }, getRandomInt(10,500))
}

const draw = function() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  playingField.draw()
  player1.draw()
  fallingStuff.map((fs) => fs.draw())

  window.requestAnimationFrame(draw)
}


export default Renderer

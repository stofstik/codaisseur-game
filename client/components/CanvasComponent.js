import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import updateGame from '../actions/update-game'
import { browserHistory } from 'react-router'

// Import game components
import Player from '../game-components/player'
import PlayingField from '../game-components/playing-field'
import FallingStuff from '../game-components/falling-stuff'
import getRandomInt from '../game-components/helpers/random-int'

const WIDTH = 800
const HEIGHT = 600
let ctx
let playingField
let player1
let player2
let gameOver = false

class CanvasComponent extends Component {
  componentDidMount() {
    const { updateGame, game, currentUser } = this.props

    ctx = this.refs.canvas.getContext('2d');
    // init objects
    playingField = new PlayingField(ctx)
    player1 = new Player(ctx, game.pOnePos, true, game, updateGame)
    player2 = new Player(ctx, game.pTwoPos, false, game, updateGame)
    this.updateCanvas();

    // Player one is in charge of spawning objects
    if (isPlayerOne && game.players.length === 2) {
      const initialFallingStuff = []
      for(let i = 0; i < 30; i++){
        initialFallingStuff[i] = {
          createdAt: new Date().getTime(),
          x: (800 / 10) * getRandomInt(1, 11) - 800 / 20,
          velocity: getRandomInt(500, 5000),
          color: getRandomInt(0, 8)
        }
      }
      updateGame(game, {
        fallingStuff: initialFallingStuff
      })
      this.spawner()
    }
    this.draw()

    const isPlayerOne = game.players[0].userId === currentUser._id || false
    const isPlayerTwo = game.players[1].userId === currentUser._id || false
    // Listen for keystrokes
    window.addEventListener('keydown', function(e) {
      if(e.key === 'a') {
        if(isPlayerOne) player1.moveLeft()
        if(isPlayerTwo) player2.moveLeft()
      } else if (e.key === 'd') {
        if(isPlayerOne) player1.moveRight()
        if(isPlayerTwo) player2.moveRight()
      }
    })

  }

  // Spawn stuff at random intervals
  spawner() {
    window.setTimeout(() => {
      const {
        updateGame,
        game
      } = this.props
      updateGame(game, {
        fallingStuff: game.fallingStuff.map((f) => {
          const nfs = new FallingStuff(ctx, f.createdAt, f.x, f.velocity, f.color)
          nfs.animate()
          if (nfs.y < 600 + getRandomInt(10, 100)) return f
          return {
            createdAt: new Date().getTime(),
            x: (800 / 10) * getRandomInt(1, 11) - 800 / 20,
            velocity: getRandomInt(750, 5000),
            color: getRandomInt(0, 8)
          }
        })
      });
      return this.spawner()
    }, getRandomInt(500, 1500))
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  updateCanvas() {
    const { game } = this.props

    player1.x = game.pOnePos
    player2.x = game.pTwoPos
    player1.radius = game.pOneSize
    player2.radius = game.pTwoSize

  }

  draw(){
    const { game, currentUser } = this.props
    ctx.clearRect(0,0,WIDTH,HEIGHT)
    playingField.draw()
    player1.draw()
    player2.draw()
    const isPlayerOne = game.players[0].userId === currentUser._id || false
    game.fallingStuff.map((f) => {
      const fs = new FallingStuff(ctx, f.createdAt, f.x, f.velocity, f.color)
      fs.draw()
      // Player one is in charge of collision detection. Sorry p2...
      if(isPlayerOne) {
        if(game.pOnePos === fs.x && fs.hitZone) {
          if(fs.color === '#ff0000' ){
            player1.hit()
          } else {
            player1.grow()
          }
        }
        if(game.pTwoPos === fs.x && fs.hitZone) {
          if(fs.color === '#ff0000' ){
            player2.hit()
          } else {
            player2.grow()
          }
        }
      }
    })
    if(player1.radius <= 4) {
      console.log('game over!')
      updateGame(game, { winner: 1 })
      return
    }
    if(player2.radius <= 4) {
      console.log('game over!')
      updateGame(game, { winner: 0 })
      return
    }
    window.requestAnimationFrame(this.draw.bind(this))
  }

  render() {
    return (
      <canvas ref="canvas" width={WIDTH} height={HEIGHT}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.games.reduce((currentGame, nextGame) => {
      return nextGame._id === state.currentGame ? nextGame : currentGame
    }, {}),
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, {updateGame})(CanvasComponent)

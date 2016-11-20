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

class CanvasComponent extends Component {
  componentDidMount() {
    console.log('componentDidMount called')
    const { updateGame, game, currentUser } = this.props

    const isPlayerOne = game.players[0].userId === currentUser._id || false
    const isPlayerTwo = game.players[1].userId === currentUser._id || false

    ctx = this.refs.canvas.getContext('2d');
    // init objects
    playingField = new PlayingField(ctx)
    player1 = new Player(ctx, game.pOnePos, isPlayerOne, game, updateGame)
    player2 = new Player(ctx, game.pTwoPos, isPlayerOne, game, updateGame)
    this.updateCanvas();

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

    // Player one is in charge of spawning objects
    if (isPlayerOne) {
      this.spawner()
    }
    this.draw()
  }

  // Spawn stuff at random intervals
  spawner(){
    window.setTimeout(() => {
      const { updateGame, game } = this.props
      const fs = {createdAt: new Date().getTime(), x: 200, velocity: 5000}
      updateGame(game, { fallingStuff: game.fallingStuff.concat([fs]) } );
      return this.spawner()
    }, getRandomInt(500, 1500))
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  updateCanvas() {
    console.log('update canvas called')
    const { game } = this.props

    player1.x = game.pOnePos
    player2.x = game.pTwoPos
  }

  draw(){
    const { game } = this.props
    ctx.clearRect(0,0,WIDTH,HEIGHT)
    playingField.draw()
    player1.draw()
    player2.draw()
    const fallingStuff = game.fallingStuff.map((fs) => {
      return new FallingStuff(ctx, fs.createdAt, fs.x, fs.velocity)
    })
    fallingStuff.map((fs) => {
      fs.draw()
      // Player one is in charge of collision detection. Sorry p2...
      if(player1.x === fs.x && fs.hitZone) {
        console.log('player 1 hit')
        if(fs.color === '#ff0000' ){
          player1.hit()
        } else {
          player1.grow()
        }
      }
      if(player2.x === fs.x && fs.hitZone) {
        console.log('player 2 hit')
        if(fs.color === '#ff0000' ){
          player2.hit()
        } else {
          player2.grow()
        }
      }
    })
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

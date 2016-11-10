import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'

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
let fallingStuff = []

class CanvasComponent extends Component {
  componentDidMount() {
    console.log('componentDidMount called')
    const { saveGame, game, currentUser } = this.props

    const isPlayerOne = game.players[0].userId === currentUser._id

    ctx = this.refs.canvas.getContext('2d');
    // init objects
    playingField = new PlayingField(ctx)
    player1 = new Player(ctx, game.pOnePos)
    player2 = new Player(ctx, game.pTwoPos)
    this.updateCanvas();
    //
    // Listen for keystrokes
    window.addEventListener('keydown', function(e) {
      if(e.key === 'a') {
        if(isPlayerOne) {
          if(game.pOnePos > 40) {
            saveGame(game, { pOnePos: game.pOnePos -= 80 })
          }
        } else {
          if(game.pTwoPos > 440) {
            saveGame(game, { pTwoPos: game.pTwoPos -= 80 })
          }
        }
      } else if (e.key === 'd') {
        if(isPlayerOne) {
          if(game.pOnePos < 360) {
            saveGame(game, { pOnePos: game.pOnePos += 80 })
          }
        } else {
          if(game.pTwoPos < 760) {
            saveGame(game, { pTwoPos: game.pTwoPos += 80 })
          }
        }
      }
    });

    this.spawner()
    this.draw()
  }

  spawner(){
    window.setInterval(() => {
      fallingStuff = fallingStuff.filter((fs) => fs.y < 610)
      fallingStuff.push(new FallingStuff(ctx))
      console.log(fallingStuff.length)
    }, 750)
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
    ctx.clearRect(0,0,WIDTH,HEIGHT)
    playingField.draw()
    fallingStuff.map((fs) => fs.draw())
    player1.draw()
    player2.draw()
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

export default connect(mapStateToProps, {saveGame})(CanvasComponent)

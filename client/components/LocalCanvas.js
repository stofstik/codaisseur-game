import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateGame } from '../actions/local-game'
import { browserHistory } from 'react-router'

// Import game components
import Player from '../game-components/player'
import PlayingField from '../game-components/playing-field'
import FallingStuff from '../game-components/falling-stuff'
import getRandomInt from '../game-components/helpers/random-int'

import './CanvasComponent.sass'

const WIDTH = 800
const HEIGHT = 600
let ctx
let playingField
let player1
let player2

class LocalCanvas extends Component {
  componentDidMount() {
    const { updateGame, game } = this.props

    ctx = this.refs.canvas.getContext('2d');
    // init objects
    playingField = new PlayingField(ctx)
    player1 = new Player(ctx, true, game, updateGame)
    player2 = new Player(ctx, false, game, updateGame)

    const initialFallingStuff = []
    for(let i = 0; i < 40; i++){
      initialFallingStuff[i] = {
        createdAt: new Date().getTime(),
        x: (WIDTH / 10) * getRandomInt(1, 11) - WIDTH / 20,
        velocity: getRandomInt(1500, 5000),
        color: getRandomInt(0, 8)
      }
    }
    updateGame(game, {
      started: true,
      fallingStuff: initialFallingStuff
    })
    this.spawner()

    // Listen for keystrokes
    window.addEventListener('keyup', (e) => {
      e.preventDefault()
      if(e.key === 'a') {
        player1.moveLeft()
      } else if (e.key === 'd') {
        player1.moveRight()
      }
      if(e.keyCode === 37) {
        player2.moveLeft()
      } else if (e.keyCode === 39) {
        player2.moveRight()
      }
    })

    this.draw()
  }

  // Spawn stuff at random intervals
  spawner() {
    window.setTimeout(() => {
      const { updateGame, game, currentGame } = this.props
      updateGame(game, {
        fallingStuff: game.fallingStuff.map((f) => {
          const nfs = new FallingStuff(ctx, f.createdAt, f.x, f.velocity, f.color)
          nfs.animate()
          if (nfs.y < HEIGHT) return f
          return {
            createdAt: new Date().getTime(),
            x: (WIDTH / 10) * getRandomInt(1, 11) - WIDTH / 20,
            velocity: getRandomInt(1500, 5000),
            color: getRandomInt(0, 8)
          }
        })
      });
      // Stop spawning if we have a winner or if we are not in current game
      if(game.winner > -1) return
      return this.spawner()
    }, getRandomInt(500, 1000))
  }

  draw() {
    const { game, currentUser, updateGame } = this.props
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    playingField.draw()
    player1.game = game
    player2.game = game
    player1.draw()
    player2.draw()

    game.fallingStuff.map((f) => {
    const fs = new FallingStuff(ctx, f.createdAt, f.x, f.velocity, f.color)
    fs.draw()
      if (game.pOnePos === fs.x && fs.hitZone) {
        if (fs.color === '#ff0000') {
          player1.hit()
        }
        if (fs.color === '#00ff00') {
          player1.grow()
        }
      }
      if (game.pTwoPos === fs.x && fs.hitZone) {
        if (fs.color === '#ff0000') {
          player2.hit()
        }
        if (fs.color === '#00ff00') {
          player2.grow()
        }
      }
    })
    if(game.pOneSize <= 4) {
      console.log('game over!')
      updateGame(game, { winner: 1 })
      return
    }
    if(game.pTwoSize <= 4) {
      console.log('game over!')
      updateGame(game, { winner: 0 })
      return
    }
    window.requestAnimationFrame(this.draw.bind(this))
  }

  renderWinner() {
    const { game } = this.props
    if(!game) return null
    if(game.winner < 0) return null
    return (
      <div className="winner-wrapper">
        <h1>{ `PLAYER ${game.winner + 1}` } WINS!</h1>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.renderWinner() }
        <canvas ref="canvas" width={WIDTH} height={HEIGHT}/>
        <div style={{marginTop: 8, fontWeight: 'bold', fontSize: 20, display: 'flex', justifyContent: 'space-between'}}>
          <span>Play with: A-D</span>
          <span>Play with: Arrow Keys</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.localGame,
  }
}

export default connect(mapStateToProps, { updateGame })(LocalCanvas)


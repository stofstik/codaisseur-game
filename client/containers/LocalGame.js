import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { createGame, updateGame } from '../actions/local-game'
import LocalCanvas from '../components/LocalCanvas'
import './Game.sass'

class LocalGame extends Component {

  countDown(){
    window.setTimeout(() => {
      const { game, updateGame } = this.props
      updateGame(game, {
        startsIn: game.startsIn - 1
      })
      if(game.startsIn === 1) return
      return this.countDown()
    }, 1000)
  }

  componentDidMount() {
    const { createGame } = this.props
    createGame()
    this.countDown()
  }

  render() {
    const { game } = this.props
    if(game.startsIn === 0) {
      return (
        <div className="game">
          <div className="header">
            <span>Player 1</span>
            <span>Player 2</span>
          </div>
          <Paper style={{width: 800, height: 600, margin: 0}} zDepth={2}>
            <LocalCanvas />
          </Paper>
        </div>
      )
    }

    return (
      <Paper className="count-down" style={{width: 800, height: 600, margin: 0}} zDepth={2}>
        <h1 className="huge-number">
          { game.startsIn }
        </h1>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.localGame
  }
}

export default connect(mapStateToProps, { createGame, updateGame })(LocalGame)

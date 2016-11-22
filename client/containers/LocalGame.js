import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import setUpGames from '../actions/setup-games'
import setGameId from '../actions/set-current-game'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import updateGame from '../actions/update-game'
import CanvasComponent from '../components/CanvasComponent'
import './Game.sass'

class LocalGame extends Component {
  componentWillMount() {
  }

  componentDidUpdate() {
  }

  render() {
    if(game.startsIn === 0) {
      return (
        <div className="game">
          <div className="header">
            <span>Player 1</span>
            <span>Player 2</span>
          </div>
          <Paper style={{width: 800, height: 600, margin: 0}} zDepth={2}>
            <CanvasComponent />
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

export default connect(mapStateToProps, { setUpGames, setGameId, updateGame })(LocalGame)


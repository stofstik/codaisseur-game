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

class Game extends Component {
  componentWillMount() {
    this.props.setGameId(this.props.routeParams.gameId)
    this.props.setUpGames()
  }

  componentDidUpdate() {
    const { game, updateGame, currentUser} = this.props
    const isPlayerOne = game.players[0] ? game.players[0].userId === currentUser._id || false : false
    if(!game.started && game.players.length >= 2 && game.startsIn > 0 && isPlayerOne) {
      window.setTimeout(() => {
        updateGame(game, {
          startsIn: game.startsIn -= 1
        })
      }, 1000)
    }
  }

  isPlayer() {
    const { game, currentUser } = this.props
    return game.players.filter((player) =>
      player.userId === currentUser._id).length > 0
  }

  canJoin() {
    if (this.isPlayer()) { return false }
    const { game } = this.props
    return game.players.length <= 2
  }

  joinGame() {
    const { game, updateGame, currentUser } = this.props
    updateGame(game, { players: game.players.concat({
      userId: currentUser._id,
      name: currentUser.name,
    })})
  }

  render() {
    const { game } = this.props
    if (!!!game._id) { return null }

    if (this.canJoin()) {
      return (
        <Paper zDepth={3} className="join-game">
          <h3>Join this Game?</h3>
          <p>Join { game.players.map((player) => player.name).join(' and ') } in this game.</p>
          <RaisedButton label="Join" primary={true} onClick={ this.joinGame.bind(this) } />
          <Link to="/"><FlatButton label="Back to the Lobby" /></Link>
        </Paper>
      )
    }

    if(game.players.length < 2) {
      return (
        <div className="game">
          <div className="header">
            <span>{ game.players[0].name.toUpperCase() }</span>
            <span>Waiting for P2</span>
          </div>
          <Paper style={{width: 800, height: 600, margin: 0}} zDepth={2}>
          </Paper>
        </div>
      )
    }

    if(game.startsIn === 0) {
      return (
        <div className="game">
          <div className="header">
            {
              game.players.map((p, i) => {
                return <span key={i} >{p.name.toUpperCase()}</span>
              })
            }
          </div>
          <Paper style={{width: 800, height: 600, margin: 0}} zDepth={2}>
            <CanvasComponent />
          </Paper>
        </div>
      )
    }

    return (
      <span>
        { game.startsIn }
      </span>
    )
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    game: state.games.reduce((currentGame, nextGame) => {
      return nextGame._id === state.currentGame ? nextGame : currentGame
    }, {}),
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { setUpGames, setGameId, updateGame })(Game)

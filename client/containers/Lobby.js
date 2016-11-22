import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import setUpGames from '../actions/setup-games'
import createGame from '../actions/create-game'
import deleteGame from '../actions/delete-game'

class Lobby extends Component {
  componentDidMount() {
    this.props.setUpGames()
  }

  render() {
    const { games, signedIn, createGame, deleteGame, currentUser } = this.props

    return (
      <div className="lobby">
        <div style={{width: 450, display: 'flex', justifyContent: 'space-between'}}>
          <RaisedButton label="omg teh lagz!" primary={ true } onClick={ createGame } />
          <RaisedButton label="No lag plx : )" primary={ true } onClick={ createGame } />
        </div>
        <List>
          { games.map((game) => {
            return <ListItem key={ game._id }
              primaryText={ `${ game.createdBy.name }'s Game` }
              style={{width: 450}}
              leftAvatar={<Avatar src={ game.createdBy.avatar }/> }
              rightIcon={
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 7}} >
                  <Link to={ `/game/${game._id}` }>
                    <RaisedButton label="Join" />
                  </Link>
                  { game.createdBy._id === currentUser._id ? <RaisedButton label="Delete" style={{marginLeft: 8}} onClick={ deleteGame.bind(this, game) }/> : null }
                </div>
              }/>
          })}
        </List>
      </div>
    )
  }
}

Lobby.propTypes = {
  games: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { setUpGames, createGame, deleteGame })(Lobby)

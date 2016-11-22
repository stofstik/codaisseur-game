import model from '../models/game-model.js'

export const GAME_REMOVED = 'GAME_REMOVED'

export default (game) => {
  return dispatch => {
    model.dispatch = dispatch
    model.app.authenticate()
      .then((response) => {
        model.destroy(game)
    }).catch((error) => {
      console.log(error)
    })
  }
}


export function deleteGame(game) {
  return {
    type: GAME_REMOVED,
    payload: game
  }
}

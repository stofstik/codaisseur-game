export const CREATE_LOCAL_GAME = 'CREATE_LOCAL_GAME'
export function createGame() {
  return {
    type: CREATE_LOCAL_GAME,
  }
}

export const UPDATE_LOCAL_GAME = 'UPDATE_LOCAL_GAME'
export function updateGame(game, updates) {
  return {
    type: UPDATE_LOCAL_GAME,
    payload: updates
  }
}

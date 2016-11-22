export default (state = {}, { type, payload } = {}) => {
  switch(type) {
    case 'CREATE_LOCAL_GAME' :
      return {
        fallingStuff: [],
        pOnePos: 200,
        pOneSize: 20,
        pTwoPos: 600,
        pTwoSize: 20,
        started: false,
        winner: -1,
        startsIn: 3,
      }
    case 'UPDATE_LOCAL_GAME':
      return Object.assign({}, state, payload)
    default :
      return state
  }
}


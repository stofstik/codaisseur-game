import BaseModel from 'feathersjs-redux-model/build/models/base-model'
import feathers from 'feathers-client'

class GameModel extends BaseModel {
  defaults() {
    return {
      players: [],
      fallingStuff: [],
      pOnePos: 200,
      pOneSize: 20,
      pTwoPos: 600,
      pTwoSize: 20,
      started: false,
      winner: -1,
      startsIn: 3,
      createdAt: Date.now,
      updatedAt: Date.now,
    };
  }

  findParams() {
    return {
      query: {
        $sort: { createdAt: -1 },
        $limit: 10
      }
    };
  }

  constructor(dispatch, onError) {
    super('game', dispatch, onError);
    this.app.configure(feathers.authentication({
      type: 'local',
      storage: window.localStorage,
    }))
  }
}

const gameModel = new GameModel()

export default gameModel

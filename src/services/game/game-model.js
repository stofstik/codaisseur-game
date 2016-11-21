'use strict';

// game-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fallingStuffSchema = new Schema({
  x: { type: Number, required: true },
  createdAt: { type: Number, required: true },
  velocity: { type: Number, required: true },
  color: { type: Number, required: true },
});

const playerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
});

const gameSchema = new Schema({
  fallingStuff: [fallingStuffSchema],
  players: [playerSchema],
  pOnePos: { type: Number, required: true, 'default': 200 },
  pOneSize: { type: Number, required: true, 'default': 20 },
  pTwoPos: { type: Number, required: true, 'default': 600 },
  pTwoSize: { type: Number, required: true, 'default': 20 },
  started: { type: Boolean, required: true, 'default': false },
  winner: { type: Number, required: true, 'default': -1 },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
});

const gameModel = mongoose.model('game', gameSchema);

module.exports = gameModel;

import { createReducer } from '@reduxjs/toolkit'

import * as actions from './actions'
import { Bullpen, SquadBuild, StartingPitchingRotation, Positions } from './types'

import staticSquad from './fixtures'

const BULLPEN_PLACEHOLDER = [
  { position: Positions.RP, player: null },
  { position: Positions.RP, player: null },
  { position: Positions.RP, player: null },
  { position: Positions.RP, player: null },
  { position: Positions.RP, player: null },
  { position: Positions.RP, player: null },
  { position: Positions.RP, player: null },
  { position: Positions.CP, player: null },
]
const STARTING_ROTATION = [
  { position: Positions.SP, player: null },
  { position: Positions.SP, player: null },
  { position: Positions.SP, player: null },
  { position: Positions.SP, player: null },
  { position: Positions.SP, player: null },
] as StartingPitchingRotation

const initialState = {
  squad: {
    LF: null,
    CF: null,
    RF: null,
    ['3B']: null,
    SS: null,
    ['2B']: null,
    ['1B']: null,
    C: null,
    MAIN_SP: null,
    BENCH: [],
  } as SquadBuild,
  startingPitchingRotation: STARTING_ROTATION,
  bullpen: BULLPEN_PLACEHOLDER as Bullpen,
  loading: false,
  savedPlayers: staticSquad,
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateSquadBuild, (state, { payload }) => ({
      ...state,
      loading: true,
      player: payload.player,
      position: payload.position,
      isMainSP: payload.isMainSP,
    }))
    .addCase(actions.updateSquadBuildResult, (state, { payload }) => ({
      ...state,
      loading: false,
      squad: payload.squad,
      startingPitchingRotation: payload.startingPitchingRotation,
    }))
    .addCase(actions.updateBullpen, (state, { payload }) => ({
      ...state,
      loading: true,
      player: payload.player,
      index: payload.index,
      type: payload.type,
    }))
    .addCase(actions.updateBullpenResult, (state, { payload }) => ({
      ...state,
      loading: false,
      bullpen: payload.bullpen,
    }))
    .addDefaultCase((state) => state)
})

export default reducer

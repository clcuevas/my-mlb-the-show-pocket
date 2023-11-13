import { createReducer } from '@reduxjs/toolkit'

import * as actions from './actions'
import { StartingPitchingRotation, Positions, SquadBuildState, SquadBuildPlayer } from './types'

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
const BENCH_PLACEHOLDER = new Array(5).fill(null) as Array<SquadBuildPlayer | null>

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
    BENCH: BENCH_PLACEHOLDER,
  },
  startingPitchingRotation: STARTING_ROTATION,
  bullpen: BULLPEN_PLACEHOLDER,
  savedPlayers: [],
  loading: false,
  error: null,
} as SquadBuildState

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateSquadBuild, (state, { payload }) => ({
      ...state,
      error: null,
      player: payload.player,
      position: payload.position,
      isMainSP: payload.isMainSP,
      loading: true,
    }))
    .addCase(actions.updateSquadBuildResult, (state, { payload }) => ({
      ...state,
      error: null,
      squad: payload.squad,
      startingPitchingRotation: payload.startingPitchingRotation,
      loading: false,
    }))
    .addCase(actions.updateSquadBuildError, (state, { payload }) => ({
      ...state,
      error: payload.error,
      loading: false,
    }))
    .addCase(actions.updateBullpen, (state, { payload }) => ({
      ...state,
      error: null,
      player: payload.player,
      index: payload.index,
      type: payload.type,
      loading: true,
    }))
    .addCase(actions.updateBullpenResult, (state, { payload }) => ({
      ...state,
      bullpen: payload.bullpen,
      error: null,
      loading: false,
    }))
    .addCase(actions.updateBullpenError, (state, { payload }) => ({
      ...state,
      error: payload.error,
      loading: false,
    }))
    .addCase(actions.updateStartingRotation, (state, { payload }) => ({
      ...state,
      error: null,
      player: payload.player,
      index: payload.index,
      type: payload.type,
      loading: true,
    }))
    .addCase(actions.updateStartingRotationResult, (state, { payload }) => ({
      ...state,
      error: null,
      squad: payload.squad,
      startingPitchingRotation: payload.startingPitchingRotation,
      loading: false,
    }))
    .addCase(actions.updateStartingRotationError, (state, { payload }) => ({
      ...state,
      error: payload.error,
      loading: false,
    }))
    .addCase(actions.savePlayer, (state, { payload }) => ({
      ...state,
      error: null,
      loading: true,
      player: payload,
    }))
    .addCase(actions.savePlayerResult, (state, { payload }) => ({
      ...state,
      error: null,
      loading: false,
      savedPlayers: payload.savedPlayers,
    }))
    .addCase(actions.savePlayerError, (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addDefaultCase((state) => state)
})

export default reducer

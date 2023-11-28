import {
  SquadBuild,
  Position,
  Bullpen,
  SquadBuildPlayer,
  StartingPitchingRotation,
  UPDATE_SQUAD_BUILD,
  UPDATE_SQUAD_BUILD_ERROR,
  UPDATE_SQUAD_BUILD_RESULT,
  UPDATE_SQUAD_BENCH,
  UPDATE_SQUAD_BENCH_ERROR,
  UPDATE_SQUAD_BENCH_RESULT,
  UPDATE_SQUAD_BULLPEN,
  UPDATE_SQUAD_BULLPEN_ERROR,
  UPDATE_SQUAD_BULLPEN_RESULT,
  UPDATE_STARTING_ROTATION,
  UPDATE_STARTING_ROTATION_ERROR,
  UPDATE_STARTING_ROTATION_RESULT,
  SAVE_PLAYER,
  SAVE_PLAYER_ERROR,
  SAVE_PLAYER_RESULT,
} from './types'
import { createActionWithPayload } from '../helpers'

// TODO: Rename to "updateMainSquad"
export const updateSquadBuild = createActionWithPayload<{
  player: SquadBuildPlayer
  position: Position
  isMainSP: boolean
  type?: 'remove'
}>(UPDATE_SQUAD_BUILD)
export const updateSquadBuildResult = createActionWithPayload<{
  squad: SquadBuild
  startingPitchingRotation: StartingPitchingRotation
}>(UPDATE_SQUAD_BUILD_RESULT)
export const updateSquadBuildError = createActionWithPayload<{ error: unknown }>(
  UPDATE_SQUAD_BUILD_ERROR
)

export const updateBench = createActionWithPayload<{
  player: SquadBuildPlayer
  index: number
  type?: 'remove'
}>(UPDATE_SQUAD_BENCH)
export const updateBenchResult = createActionWithPayload<{ squad: SquadBuild }>(
  UPDATE_SQUAD_BENCH_RESULT
)
export const updateBenchError = createActionWithPayload<{ error: unknown }>(
  UPDATE_SQUAD_BENCH_ERROR
)

export const updateBullpen = createActionWithPayload<{
  player: SquadBuildPlayer
  index: number
  type?: 'remove'
}>(UPDATE_SQUAD_BULLPEN)
export const updateBullpenResult = createActionWithPayload<{ bullpen: Bullpen }>(
  UPDATE_SQUAD_BULLPEN_RESULT
)
export const updateBullpenError = createActionWithPayload<{ error: unknown }>(
  UPDATE_SQUAD_BULLPEN_ERROR
)

export const updateStartingRotation = createActionWithPayload<{
  player: SquadBuildPlayer
  index: number
  type?: 'remove'
}>(UPDATE_STARTING_ROTATION)
export const updateStartingRotationResult = createActionWithPayload<{
  squad: SquadBuild
  startingPitchingRotation: StartingPitchingRotation
}>(UPDATE_STARTING_ROTATION_RESULT)
export const updateStartingRotationError = createActionWithPayload<{ error: unknown }>(
  UPDATE_STARTING_ROTATION_ERROR
)

export const savePlayer = createActionWithPayload<SquadBuildPlayer>(SAVE_PLAYER)
export const savePlayerResult = createActionWithPayload<{
  savedPlayers: SquadBuildPlayer[]
}>(SAVE_PLAYER_RESULT)
export const savePlayerError = createActionWithPayload<{ error: unknown }>(SAVE_PLAYER_ERROR)

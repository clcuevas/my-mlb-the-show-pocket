import { SquadBuild, Position, Bullpen, SquadBuildPlayer, StartingPitchingRotation } from './types'
import { createActionWithPayload } from '../helpers'

export const updateSquadBuild = createActionWithPayload<{
  player: SquadBuildPlayer
  position: Position
  isMainSP: boolean
  type?: 'remove'
}>('UPDATE_SQUAD_BUILD')
export const updateSquadBuildResult = createActionWithPayload<{
  squad: SquadBuild
  startingPitchingRotation: StartingPitchingRotation
}>('UPDATE_SQUAD_BUILD__RESULT')

export const updateBullpen = createActionWithPayload<{
  player: SquadBuildPlayer
  index: number
  type?: 'remove'
}>('UPDATE_SQUAD_BULLPEN')
export const updateBullpenResult = createActionWithPayload<{ bullpen: Bullpen }>(
  'UPDATE_SQUAD_BULLPEN__RESULT'
)

export const updateStartingRotation = createActionWithPayload<{
  player: SquadBuildPlayer
  index: number
  type?: 'remove'
}>('UPDATE_STARTING_ROTATION')
export const updateStartingRotationResult = createActionWithPayload<{
  squad: SquadBuild
  startingPitchingRotation: StartingPitchingRotation
}>('UPDATE_STARTING_ROTATION__RESULT')

export const savePlayer = createActionWithPayload<SquadBuildPlayer>('SAVE_PLAYER')
export const savePlayerResult = createActionWithPayload<{
  savedPlayers: SquadBuildPlayer[]
}>('SAVE_PLAYER__RESULT')

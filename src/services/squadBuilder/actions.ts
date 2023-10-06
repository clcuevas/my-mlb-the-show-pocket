import { SquadBuild, Position, Bullpen, StartingPitchingRotation } from './types'
import { createActionWithPayload } from '../helpers'
import { MarketPlayerItemListing } from '../marketListings'

export const updateSquadBuild = createActionWithPayload<{
  player: MarketPlayerItemListing
  position: Position
  isMainSP: boolean
  type?: 'remove'
}>('UPDATE_SQUAD_BUILD')
export const updateSquadBuildResult = createActionWithPayload<{
  squad: SquadBuild
  startingPitchingRotation: StartingPitchingRotation
}>('UPDATE_SQUAD_BUILD__RESULT')

export const updateBullpen = createActionWithPayload<{
  player: MarketPlayerItemListing
  index: number
  type?: 'remove'
}>('UPDATE_SQUAD_BULLPEN')
export const updateBullpenResult = createActionWithPayload<{ bullpen: Bullpen }>(
  'UPDATE_SQUAD_BULLPEN__RESULT'
)

export const updateStartingRotation = createActionWithPayload<{
  player: MarketPlayerItemListing
  index: number
  type?: 'remove'
}>('UPDATE_STARTING_ROTATION')
export const updateStartingRotationResult = createActionWithPayload<{
  squad: SquadBuild
  startingPitchingRotation: StartingPitchingRotation
}>('UPDATE_STARTING_ROTATION__RESULT')

export const savePlayer = createActionWithPayload<MarketPlayerItemListing>('SAVE_PLAYER')
export const savePlayerResult = createActionWithPayload<{
  savedPlayers: MarketPlayerItemListing[]
}>('SAVE_PLAYER__RESULT')

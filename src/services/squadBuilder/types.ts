import { MarketPlayerItemListing } from '../marketListings'
import { DetailedPlayerItem } from '../types'

export enum Positions {
  'LF' = 'LF',
  CF = 'CF',
  RF = 'RF',
  '3B' = '3B',
  SS = 'SS',
  '2B' = '2B',
  '1B' = '1B',
  C = 'C',
  MAIN_SP = 'MAIN_SP',
  SP = 'SP',
  CP = 'CP',
  RP = 'RP',
  BENCH = 'BENCH',
}

export type Position = keyof typeof Positions
export type SquadType = 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench'

export type SquadBuildPlayer = {
  marketItem: MarketPlayerItemListing
  detailedItem: DetailedPlayerItem
}

export type SquadBuild = {
  [Positions.LF]: SquadBuildPlayer | null
  [Positions.CF]: SquadBuildPlayer | null
  [Positions.RF]: SquadBuildPlayer | null
  ['3B']: SquadBuildPlayer | null
  [Positions.SS]: SquadBuildPlayer | null
  ['2B']: SquadBuildPlayer | null
  ['1B']: SquadBuildPlayer | null
  [Positions.C]: SquadBuildPlayer | null
  [Positions.MAIN_SP]: SquadBuildPlayer | null
  [Positions.BENCH]: (SquadBuildPlayer | null)[]
}

type BullpenItem = {
  position: Position
  player: SquadBuildPlayer | null
}

export type Bullpen = BullpenItem[]

export type StartingRotationItem = {
  position: Positions.SP
  player: SquadBuildPlayer | null
}
export type StartingPitchingRotation = StartingRotationItem[]

export interface SquadBuildState {
  squad: SquadBuild
  startingPitchingRotation: StartingPitchingRotation
  bullpen: Bullpen
  savedPlayers: SquadBuildPlayer[]
  loading: boolean
  error: unknown
}

// Constants
export const UPDATE_SQUAD_BUILD = 'UPDATE_SQUAD_BUILD' as const
export const UPDATE_SQUAD_BUILD_RESULT = 'UPDATE_SQUAD_BUILD__RESULT' as const
export const UPDATE_SQUAD_BUILD_ERROR = 'UPDATE_SQUAD_BUILD__ERROR' as const

export const UPDATE_SQUAD_BENCH = 'UPDATE_SQUAD_BENCH' as const
export const UPDATE_SQUAD_BENCH_RESULT = 'UPDATE_SQUAD_BENCH__RESULT' as const
export const UPDATE_SQUAD_BENCH_ERROR = 'UPDATE_SQUAD_BENCH__ERROR' as const

export const UPDATE_SQUAD_BULLPEN = 'UPDATE_SQUAD_BULLPEN' as const
export const UPDATE_SQUAD_BULLPEN_RESULT = 'UPDATE_SQUAD_BULLPEN__RESULT' as const
export const UPDATE_SQUAD_BULLPEN_ERROR = 'UPDATE_SQUAD_BULLPEN__ERROR' as const

export const UPDATE_STARTING_ROTATION = 'UPDATE_STARTING_ROTATION' as const
export const UPDATE_STARTING_ROTATION_RESULT = 'UPDATE_STARTING_ROTATION__RESULT' as const
export const UPDATE_STARTING_ROTATION_ERROR = 'UPDATE_STARTING_ROTATION__ERROR' as const

export const SAVE_PLAYER = 'SAVE_PLAYER' as const
export const SAVE_PLAYER_RESULT = 'SAVE_PLAYER__RESULT' as const
export const SAVE_PLAYER_ERROR = 'SAVE_PLAYER__ERROR' as const

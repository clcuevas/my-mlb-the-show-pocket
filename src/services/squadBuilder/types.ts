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
  [Positions.BENCH]: SquadBuildPlayer[]
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

import { MarketPlayerItemListing } from '../marketListings'

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

export type SquadBuild = {
  [Positions.LF]: MarketPlayerItemListing | null
  [Positions.CF]: MarketPlayerItemListing | null
  [Positions.RF]: MarketPlayerItemListing | null
  ['3B']: MarketPlayerItemListing | null
  [Positions.SS]: MarketPlayerItemListing | null
  ['2B']: MarketPlayerItemListing | null
  ['1B']: MarketPlayerItemListing | null
  [Positions.C]: MarketPlayerItemListing | null
  [Positions.MAIN_SP]: MarketPlayerItemListing | null
  [Positions.BENCH]: MarketPlayerItemListing[]
}

type BullpenItem = {
  position: Position
  player: MarketPlayerItemListing | null
}

export type Bullpen = BullpenItem[]

export type StartingRotationItem = {
  position: Positions.SP
  player: MarketPlayerItemListing | null
}
export type StartingPitchingRotation = StartingRotationItem[]

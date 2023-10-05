import { type Position } from '../squadBuilder'
import { CommonPlayerInfo } from '../types'

export type MarketPlayerItem = CommonPlayerInfo

export type MarketPlayerItemListing = {
  ['best_buy_price']: number
  ['best_sell_price']: number
  ['listing_name']: string
  item: MarketPlayerItem
}

export type MarketPlayerItemListingsPayloadResponse = {
  listings: MarketPlayerItemListing[]
  page: number
  ['per_page']: number
  ['total_pages']: number
}

export type MarketListingsPayloadResponse = {
  // Eventually, the data may also be searches for equipment, quirks, etc (i.e. anything outside of player
  // cards)
  data: MarketPlayerItemListingsPayloadResponse
}

export type MarketListingsType = 'mlb_card' | 'stadium' | 'equipment' | 'sponsorship' | 'unlockable'

export type MLBTeam =
  | 'FA'
  | 'BAL'
  | 'BOS'
  | 'NYY'
  | 'TB'
  | 'TOR'
  | 'CWS'
  | 'CLE'
  | 'DET'
  | 'KC'
  | 'MIN'
  | 'HOU'
  | 'LAA'
  | 'OAK'
  | 'SEA'
  | 'TEX'
  | 'ATL'
  | 'MIA'
  | 'NYM'
  | 'PHI'
  | 'WAS'
  | 'CHC'
  | 'CIN'
  | 'MIL'
  | 'PIT'
  | 'STL'
  | 'ARI'
  | 'COL'
  | 'LAD'
  | 'SD'
  | 'SF'

export type MLBCardSet = 'legend' | 'flashback'

export enum MLBCardSeries {
  LIVE = 1337,
  ROOKIE = 10001,
  BREAKOUT = 10002,
  VETERAN = 10003,
  ALL_STAR = 10004,
  AWARDS = 10005,
  POST_SEASON = 10006,
  MONTHLY_AWARDS = 10007,
  FUTURE_STARS = 10008,
  SIGNATURE = 10009,
  PRIME = 10013,
  TOPPS_NOW = 10017,
  FINEST = 10018,
  '2ND_HALF_HEROES' = 10020,
  MILESTONE = 10022,
  SANFORD_GREENE = 10025,
  CAPTAIN = 10026,
  CHARISMA = 10027,
  WORLD_BASEBALL_CLASSIC = 10028,
  ALL_STAR_GAME = 10029,
  HOME_RUN_DERBY = 10030,
  INCOGNITO = 10031,
  KAIJU = 10032,
  MEXICO_CITY = 10033,
  LONDON = 10034,
  JIN_KIM = 10035,
  '2023_ALL_STAR' = 10036,
  '2023_DRAFT' = 10037,
  '2023_HOME_RUN_DERBY' = 10038,
  SNAPSHOT = 10039,
  'GREAT_RACE_OF_98' = 10040,
}

export type MLBCardSeriesOptions = keyof typeof MLBCardSeries

interface BasicParams {
  page: number
  type: MarketListingsType
  sort: 'rank' | 'best_sell_price' | 'best_buy_price'
  rarity: 'diamond' | 'gold' | 'silver' | 'bronze' | 'common'
  order: 'desc' | 'asc'
  name?: string
  ['min_best_sell_price']?: number
  ['max_best_sell_price']?: number
  ['min_best_buy_price']?: number
  ['max_best_buy_price']?: number
}

export interface MarketListingMLBCardParams extends BasicParams {
  ['display_position']?: Position
  ['min_rank']?: number
  ['max_rank']?: number
  team?: MLBTeam
  set?: MLBCardSet
  ['series_id']?: MLBCardSeriesOptions
}

export const FETCH_MARKET_LISTINGS = 'FETCH_MARKET_LISTINGS' as const
export const FETCH_MARKET_LISTINGS_RESULT = 'FETCH_MARKET_LISTINGS__RESULT' as const
export const FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION =
  'FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION' as const
export const FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION_RESULT =
  'FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION__RESULT' as const

import { type Position } from '@services/squadBuilder'

export type Pitches = {
  name: string
  speed: number
  control: number
  movement: number
}

export type Quirks = {
  name: string
  description: string
  img: string
}

type CommonPlayerInfo = {
  uuid: string
  type: string
  img: string
  ['augmented_end_date']: string | null | undefined
  ['augmented_text']: string | null | undefined
  ['baked_img']: string
  ['display_position']: string
  event: boolean
  ['has_augment']: boolean
  ['has_matchup']: boolean
  ['has_rank_change']: boolean
  ['is_live_set']: boolean
  name: string
  ['new_rank']: number
  ovr: number
  rarity: 'Diamond' | 'Gold' | 'Silver' | 'Bronze' | 'Common'
  ['sc_baked_img']: string | null | undefined
  series: string
  ['series_texture_name']: string
  ['series_year']: number
  ['set_name']: string
  stars: string | null | undefined
  team: string
  ['team_short_name']: string
  trend: string | null | undefined
  ['ui_anim_index']: number
}

export interface DetailedPlayerItem extends CommonPlayerInfo {
  ['display_secondary_positions']: string
  ['jersey_number']: string
  age: number
  ['bat_hand']: 'L' | 'R' | 'S'
  ['throw_hand']: 'L' | 'R'
  weight: string
  height: string
  born: string
  ['is_hitter']: boolean
  stamina: number
  ['pitching_clutch']: number
  ['hits_per_bf']: number
  ['k_per_bf']: number
  ['bb_per_bf']: number
  ['hr_per_bf']: number
  ['pitch_velocity']: number
  ['pitch_control']: number
  ['pitch_movement']: number
  ['contact_left']: number
  ['contact_right']: number
  ['power_left']: number
  ['power_right']: number
  ['plate_vision']: number
  ['plate_discipline']: number
  ['batting_clutch']: number
  ['bunting_ability']: number
  ['drag_bunting_ability']: number
  ['hitting_durability']: number
  ['fielding_durability']: number
  ['fielding_ability']: number
  ['arm_strength']: number
  ['arm_accuracy']: number
  ['reaction_time']: number
  ['blocking']: number
  ['speed']: number
  ['baserunning_ability']: number
  ['baserunning_aggression']: number
  ['hit_rank_image']: string
  ['fielding_rank_image']: string
  pitches: Pitches[]
  quirks: Quirks[]
  ['is_sellable']: boolean
}

export type MarketPlayerItem = CommonPlayerInfo

export type MarketPlayerItemListing = {
  ['best_buy_price']: number
  ['best_sell_price']: number
  ['listing_name']: string
  item: MarketPlayerItem
}

export type PayloadResponseMarketPlayerListings = {
  listings: MarketPlayerItemListing[]
  page: number
  ['per_page']: number
  ['total_pages']: number
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

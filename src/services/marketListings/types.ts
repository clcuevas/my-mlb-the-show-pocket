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

export const FETCH_MARKET_LISTINGS = 'FETCH_MARKET_LISTINGS' as const
export const FETCH_MARKET_LISTINGS_RESULT = 'FETCH_MARKET_LISTINGS__RESULT' as const
export const FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION =
  'FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION' as const
export const FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION_RESULT =
  'FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION__RESULT' as const

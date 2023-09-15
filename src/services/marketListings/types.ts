export type PlayerItem = {
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
  rarity: string
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

export type MarketPlayerItemListing = {
  ['best_buy_price']: number
  ['best_sell_price']: number
  ['listing_name']: string
  item: PlayerItem
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

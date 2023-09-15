import type { MarketPlayerItemListing } from '@services/marketListings'

export type DropItem = {
  id: string
  player: MarketPlayerItemListing
}

export type PositionType = 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench'

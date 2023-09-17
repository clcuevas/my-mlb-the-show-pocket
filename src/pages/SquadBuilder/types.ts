import type { MarketPlayerItemListing } from '@services/marketListings'
import type { Position } from '@services/squadBuilder'

export type DropItem = {
  id: string
  player: MarketPlayerItemListing
}
export type OnDrop = {
  item: DropItem
  position: Position
  type: SquadType
  actionType?: 'remove'
  index?: number
}

export type SquadType = 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench'

export type OnRemove = {
  player: MarketPlayerItemListing
  pos: Position
  squadType: SquadType
  index?: number
}

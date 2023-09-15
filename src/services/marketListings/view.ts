import { State } from '@reducers'

import { PlayerItem } from './types.ts'

export const getMarketListings = (state: State) => state.marketListings

export const findPlayerMarketListing = (state: State, platerItem: PlayerItem) => {
  const listings = getMarketListings(state).listings
  const player = listings.find((listing) => listing.item.uuid === platerItem.uuid)

  return player
}

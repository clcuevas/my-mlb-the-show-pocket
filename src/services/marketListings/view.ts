import { State } from '@reducers'

import { MarketPlayerItem } from './types.ts'

export const getMarketListings = (state: State) => state.marketListings

export const findPlayerMarketListing = (state: State, playerItem: MarketPlayerItem) => {
  const listings = getMarketListings(state).listings
  return listings.find((listing) => listing.item.uuid === playerItem.uuid)
}

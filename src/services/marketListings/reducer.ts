import { createReducer } from '@reduxjs/toolkit'

import * as actions from './actions'
import { MarketPlayerItemListing } from './types'

const initialState = { loading: false, listings: [] as MarketPlayerItemListing[] }

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.fetchPlayerMarketListingsByPosition, (state, { payload }) => ({
      ...state,
      loading: true,
      position: payload.position,
    }))
    .addCase(actions.fetchPlayerMarketListingsByPositionResult, (state, { payload }) => ({
      ...state,
      loading: false,
      listings: payload.listings,
    }))
    .addDefaultCase((state) => state)
})

export default reducer

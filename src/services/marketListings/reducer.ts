import { createReducer } from '@reduxjs/toolkit'

import { MarketPlayerItemListing } from './types'

const initialState = { loading: false, listings: [] as MarketPlayerItemListing[] }

const reducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state) => state)
})

export default reducer

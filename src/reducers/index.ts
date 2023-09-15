import { combineReducers } from '@reduxjs/toolkit'

// Import reducers here and assign them to "reducers" Object
import marketListingsReducer from '@services/marketListings/reducer'
import squadBuilderReducer from '@services/squadBuilder/reducer'
import { marketListingsApi } from '@services/marketListings/api'

const reducers = combineReducers({
  marketListings: marketListingsReducer,
  squad: squadBuilderReducer,
  [marketListingsApi.reducerPath]: marketListingsApi.reducer,
})

export type State = ReturnType<typeof reducers>

export default reducers

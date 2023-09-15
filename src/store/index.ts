import { configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/query'
import createSagaMiddleware from 'redux-saga'

import { marketListingsApi } from '@services/marketListings/api'

import rootSaga from '../sagas'
import reducers from '../reducers'

const sagaMiddleware = createSagaMiddleware()
const middlewareList = [sagaMiddleware, marketListingsApi.middleware]

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewareList),
  devTools: !import.meta.env.PROD,
})

sagaMiddleware.run(rootSaga)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

export default store

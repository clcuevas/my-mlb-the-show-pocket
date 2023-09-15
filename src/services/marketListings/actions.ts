import {
  FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION,
  FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION_RESULT,
  PayloadResponseMarketPlayerListings,
} from './types'
import { createActionWithPayload } from '../helpers'

export const fetchPlayerMarketListingsByPosition = createActionWithPayload<{ position: string }>(
  FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION
)
export const fetchPlayerMarketListingsByPositionResult =
  createActionWithPayload<PayloadResponseMarketPlayerListings>(
    FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION_RESULT
  )

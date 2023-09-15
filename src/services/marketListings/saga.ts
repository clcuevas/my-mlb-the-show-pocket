import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

import * as actions from './actions'
import {
  FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION,
  PayloadResponseMarketPlayerListings,
} from './types'
import { API_URL } from '../helpers'

type FetchPlayerMarketListingsByPosition = ReturnType<
  typeof actions.fetchPlayerMarketListingsByPosition
>

// TODO: Think about how to make the code more DRY

function* fetchPlayerMarketListingsByPosition(
  action: FetchPlayerMarketListingsByPosition
): SagaIterator {
  try {
    const { position } = action.payload

    const response = yield call(() =>
      fetch(`${API_URL}market-listings?type=mlb_card&display_position=${position}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    )
    const data: PayloadResponseMarketPlayerListings = yield call(() => response.json())

    yield put(actions.fetchPlayerMarketListingsByPositionResult(data))
  } catch (e) {
    console.log(e)
  }
}

export default function* saga(): SagaIterator<void> {
  yield takeEvery(FETCH_PLAYER_MARKET_LISTINGS_BY_POSITION, fetchPlayerMarketListingsByPosition)
}

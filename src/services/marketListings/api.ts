import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { DetailedPlayerItem, PayloadResponseMarketPlayerListings } from './types'
import { API_URL } from '../helpers'

export const marketListingsApi = createApi({
  reducerPath: 'marketListingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPlayerMarketListings: builder.query<PayloadResponseMarketPlayerListings, void>({
      // TODO: Add by position support. Right now, there is a Saga we can use for this,
      // but we should use this instead so we can cache the data
      query: () => 'market-listings/?type=mlb_card',
    }),
    fetchPlayerItemDetails: builder.mutation<DetailedPlayerItem, string>({
      query: (playerUUID: string) => ({ url: `player-item?uuid=${playerUUID}`, method: 'GET' }),
    }),
  }),
})

export const { useFetchPlayerItemDetailsMutation, useGetPlayerMarketListingsQuery } =
  marketListingsApi

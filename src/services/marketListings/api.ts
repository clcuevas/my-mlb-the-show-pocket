import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type {
  DetailedPlayerItem,
  MarketListingsPayloadResponse,
  PayloadResponseMarketPlayerListings,
} from './types'
import { API_URL } from '../helpers'

export const marketListingsApi = createApi({
  reducerPath: 'marketListingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPlayerMarketListings: builder.query<PayloadResponseMarketPlayerListings, void>({
      query: () => 'market-listings/?type=mlb_card',
    }),
    fetchPlayerItemDetails: builder.mutation<DetailedPlayerItem, string>({
      query: (playerUUID: string) => ({ url: `player-item?uuid=${playerUUID}`, method: 'GET' }),
    }),
    fetchMarketListing: builder.mutation<
      MarketListingsPayloadResponse,
      { type: string; queryParams: string }
    >({
      query: ({ type, queryParams }) => ({
        url: `market-listings/?type=${type}&${queryParams}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useFetchPlayerItemDetailsMutation,
  useGetPlayerMarketListingsQuery,
  useFetchMarketListingMutation,
} = marketListingsApi

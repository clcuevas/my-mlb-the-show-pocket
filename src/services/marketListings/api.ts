import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { MarketListingsPayloadResponse, MarketPlayerItemListingsPayloadResponse } from './types'
import { API_URL } from '../helpers'
import { DetailedPlayerItem } from '../types'

export const marketListingsApi = createApi({
  reducerPath: 'marketListingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPlayerMarketListings: builder.query<MarketPlayerItemListingsPayloadResponse, number>({
      query: (page = 1) => `market-listings/?type=mlb_card&page=${page}`,
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

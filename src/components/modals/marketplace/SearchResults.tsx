import { Box, ButtonBase, Stack } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import {
  MarketPlayerItemListing,
  MarketPlayerItemListingsPayloadResponse,
} from '@services/marketListings'

import SmallCard from '../../cards/SmallCard'

const Style = {
  CardButton: styled(ButtonBase)`
    &.selected {
      .MuiPaper-outlined {
        border: 2px solid gray;
      }
    }
  `,
}

type Props = {
  marketListings: MarketPlayerItemListingsPayloadResponse | null
  selectedPlayerUUID: string | undefined
  onPlayerSelect: (player: MarketPlayerItemListing) => void
}

const SearchResults = ({ marketListings, selectedPlayerUUID, onPlayerSelect }: Props) => (
  <Stack direction="row" flexWrap="wrap" justifyContent="space-between" sx={{ mt: '20px' }}>
    {marketListings != null &&
      marketListings.listings.map((player) => (
        <Box key={`market-listing-result-${player.item.uuid}`} sx={{ mt: '10px' }}>
          <Style.CardButton
            type="button"
            className={`${selectedPlayerUUID === player.item.uuid ? 'selected' : ''}`}
            onClick={() => onPlayerSelect(player)}>
            <SmallCard player={player} />
          </Style.CardButton>
        </Box>
      ))}
  </Stack>
)

export default SearchResults

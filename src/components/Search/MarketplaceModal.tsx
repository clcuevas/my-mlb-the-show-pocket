import {
  Alert,
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import * as React from 'react'

import {
  useFetchMarketListingMutation,
  type PayloadResponseMarketPlayerListings,
} from '@services/marketListings'
import { type Position } from '@services/squadBuilder'

import CloseIconButton from '../CloseIconButton'
import SmallCard from '../cards/SmallCard'
import MarketplaceSearch, { type Form as MarketplaceSearchForm } from '../forms/MarketplaceSearch'

type Props = {
  isOpen: boolean
  position: Position | string
  onModalClose: () => void
}

const MarketplaceModal = ({ isOpen, position, onModalClose }: Props) => {
  const [fetchMarketListings] = useFetchMarketListingMutation()

  const [formErrors, setFormErrors] = React.useState<string[]>([])
  const [marketListings, setMarketListings] =
    React.useState<PayloadResponseMarketPlayerListings | null>(null)
  const [searchedPlayer, setSearchedPlayer] = React.useState<unknown | null>(null)

  const handleOnPlayerSearch = React.useCallback(
    async (data: MarketplaceSearchForm) => {
      try {
        const queryParams = [] as string[][]

        Object.entries(data).forEach(([key, value]) => {
          if (value && value !== '') {
            queryParams.push([key, value])
          }
        })

        const qp = queryParams.map(([key, value]) => `${key}=${value}`).join('&')
        // NOTE: Only supporting MLB Card listings for now so we're being explicit
        // about the type in the queryParams
        const response = await fetchMarketListings({
          type: 'mlb_card',
          queryParams: qp,
        }).unwrap()

        // RTKQuery handles responses in an opinionated format. When making network requests
        // (i.e. fetching, etc.) the opinionated format in which a successful response body
        // should be is { data: NetworkResponseData }. So, what this means is that when unwrap
        // is called it returns the data key/value which is why we need to update the type
        // here from unknown to PayloadResponse*
        //
        // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-query-and-mutation-endpoints
        //
        // TODO: Should investigate this a bit more
        setMarketListings(response as unknown as PayloadResponseMarketPlayerListings)
      } catch (e) {
        console.log('NOOOOOOO')
        console.log(e)
      }
    },
    [fetchMarketListings]
  )

  return (
    <>
      {isOpen && (
        <Dialog open={isOpen} onClose={onModalClose} fullScreen>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6">Marketplace Position Search</Typography>
              <CloseIconButton onClose={onModalClose} />
            </Toolbar>
          </AppBar>
          <DialogContent>
            {formErrors.length > 0 && (
              <Alert severity="error">
                <List>
                  {formErrors.map((error, index) => (
                    <ListItem key={`error-${index}`}>{error}</ListItem>
                  ))}
                </List>
              </Alert>
            )}
            <MarketplaceSearch
              position={position}
              onError={setFormErrors}
              onSubmit={handleOnPlayerSearch}
            />
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              sx={{ mt: '20px' }}>
              {marketListings != null &&
                marketListings.listings.map((player, index) => (
                  <Box key={`market-listing-result-${index}`} sx={{ mt: '10px' }}>
                    <SmallCard player={player} />
                  </Box>
                ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="button" variant="outlined" onClick={onModalClose}>
              CANCEL
            </Button>
            <Button
              type="button"
              variant="contained"
              disabled={formErrors.length > 0 || searchedPlayer == null}>
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default MarketplaceModal
import { Alert, Dialog, DialogContent, List, ListItem } from '@mui/material'
import * as React from 'react'

import {
  useFetchMarketListingMutation,
  useFetchPlayerItemDetailsMutation,
  type MarketPlayerItemListing,
  type MarketPlayerItemListingsPayloadResponse,
} from '@services/marketListings'
import { type SquadBuildPlayer, type Position, Positions } from '@services/squadBuilder'

import ModalActions from './ModalActions'
import ModalHeader from './ModalHeader'
import SearchResults from './SearchResults'
import MarketplaceSearch, {
  type Form as MarketplaceSearchForm,
} from '../../forms/MarketplaceSearch'

type Props = {
  isOpen: boolean
  position: Position | string
  onAdd: (selectedPlayer: SquadBuildPlayer) => void
  onModalClose: () => void
}

const isBullpenPosition = (value: string) => [Positions.CP, Positions.RP].some((p) => p === value)

const canAddPlayerToPosition = (searchedPlayerPosition: string, position: string) => {
  // TODO: See if this can be converted to util method and if logic is repeated elsewhere
  switch (position) {
    case Positions.MAIN_SP:
      return searchedPlayerPosition === Positions.SP
    case Positions.SP:
      return searchedPlayerPosition === Positions.SP
    case Positions.BENCH:
      return !isBullpenPosition(searchedPlayerPosition)
    default: {
      return isBullpenPosition(position) ? isBullpenPosition(searchedPlayerPosition) : true
    }
  }
}

const MarketplaceModal = ({ isOpen, position, onAdd, onModalClose }: Props) => {
  const [
    fetchMarketListings,
    { isError: isFetchMarketListingError, isLoading: isFetchMarketListingsLoading },
  ] = useFetchMarketListingMutation()
  const [fetchPlayerItemDetails, { isError: isFetchPlayerItemError }] =
    useFetchPlayerItemDetailsMutation()

  const [canAddPlayer, setCanAddPlayer] = React.useState(true)
  const [formErrors, setFormErrors] = React.useState<string[]>([])
  const [marketListings, setMarketListings] =
    React.useState<MarketPlayerItemListingsPayloadResponse | null>(null)
  const [selectedPlayer, setSelectedPlayer] = React.useState<MarketPlayerItemListing | null>(null)

  const handleOnPlayerSearch = React.useCallback(
    async (data: MarketplaceSearchForm) => {
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
      setMarketListings(response as unknown as MarketPlayerItemListingsPayloadResponse)
    },
    [fetchMarketListings]
  )
  const handleOnAddSelectedPlayer = React.useCallback(async () => {
    if (selectedPlayer == null) {
      return
    }

    const playerDetails = await fetchPlayerItemDetails(selectedPlayer.item.uuid).unwrap()

    if (!isFetchPlayerItemError) {
      onAdd({ marketItem: selectedPlayer, detailedItem: playerDetails })
      // Clear everything
      setMarketListings(null)
      setSelectedPlayer(null)
      setFormErrors([])
      // Close Modal
      onModalClose()
    }
    // TODO: Think about what to do in the event of an error
  }, [isFetchPlayerItemError, selectedPlayer, fetchPlayerItemDetails, onAdd, onModalClose])

  React.useEffect(() => {
    if (formErrors.length > 0 || selectedPlayer == null) {
      setCanAddPlayer(false)
      return
    }

    const searchedPlayerPosition = selectedPlayer?.item.display_position
    const isValid = canAddPlayerToPosition(searchedPlayerPosition, position)

    setCanAddPlayer(isValid)
  }, [formErrors, position, selectedPlayer])

  return (
    <>
      {isOpen && (
        <Dialog open={isOpen} onClose={onModalClose} fullScreen>
          <ModalHeader onModalClose={onModalClose} />
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
            {isFetchMarketListingError ? (
              <div>Could not fetch market listings. Try again.</div>
            ) : (
              <SearchResults
                isLoading={isFetchMarketListingsLoading}
                marketListings={marketListings}
                selectedPlayerUUID={selectedPlayer?.item.uuid}
                onPlayerSelect={(player) => setSelectedPlayer(player)}
              />
            )}
          </DialogContent>
          <ModalActions
            isDisabled={!canAddPlayer}
            onModalClose={onModalClose}
            onPlayerAdd={handleOnAddSelectedPlayer}
          />
        </Dialog>
      )}
    </>
  )
}

export default MarketplaceModal

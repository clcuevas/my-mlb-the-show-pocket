import { Alert, AlertColor, Snackbar } from '@mui/material'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import {
  MarketPlayerItemListing,
  useFetchPlayerItemDetailsMutation,
} from '@services/marketListings'
import * as squadBuilderService from '@services/squadBuilder'

import Listing from './Listing'

const Style = {
  CardListingsContainer: styled.div`
    display: flex;
    flex-wrap: wrap;

    margin-top: 30px;
    margin-bottom: 30px;
  `,
}

type Props = {
  listings: MarketPlayerItemListing[] | undefined
}

const Listings = ({ listings }: Props) => {
  const dispatch = useDispatch()
  const [fetchPlayerItemDetails] = useFetchPlayerItemDetailsMutation()

  const [displayAlert, setDisplayAlert] = React.useState(false)
  const [alert, setAlert] = React.useState<{ type: AlertColor; msg: string }>({
    type: 'success',
    msg: '',
  })

  const handleOnViewPlayerDetailClick = React.useCallback(
    async (player: MarketPlayerItemListing) => {
      try {
        const playerDetails = await fetchPlayerItemDetails(player.item.uuid).unwrap()

        dispatch(
          squadBuilderService.savePlayer({ marketItem: player, detailedItem: playerDetails })
        )
        setAlert({ type: 'success', msg: 'Saved successfully!' })
      } catch (e) {
        setAlert({ type: 'error', msg: 'Could not save player' })
      } finally {
        setDisplayAlert(true)
      }
    },
    [dispatch, fetchPlayerItemDetails]
  )

  return (
    <>
      <Snackbar open={displayAlert} autoHideDuration={6000} onClose={() => setDisplayAlert(false)}>
        <Alert severity={alert.type}>{alert.msg}</Alert>
      </Snackbar>
      <Style.CardListingsContainer>
        {listings?.map((player, index) => (
          <Listing
            key={`player-item-${player.item.uuid}-${index}`}
            player={player}
            onPlayerSave={handleOnViewPlayerDetailClick}
          />
        ))}
      </Style.CardListingsContainer>
    </>
  )
}

export default Listings

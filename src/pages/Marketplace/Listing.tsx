import { Button, CardContent, Typography } from '@mui/material'
import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import CardWithActions from '@components/cards/CardWithActions'
import { State } from '@reducers'
import { MarketPlayerItemListing } from '@services/marketListings'
import * as squadBuilderService from '@services/squadBuilder'

const Style = {
  QuickView: styled.div`
    background: white;
    border-radius: 5%;
    padding: 10px;
    margin-bottom: 10px;
    width: 70%;

    display: flex;
    flex-direction: column;
  `,
  QuickViewInfoItem: styled.div`
    display: flex;

    .label {
      flex: 0;
    }

    .data {
      flex: 1;
      text-align: right;
    }
  `,
}

type ActionProps = {
  disableSave: boolean
  marketListing: MarketPlayerItemListing | null
  handleOnClick: () => void
}
type Props = {
  player: MarketPlayerItemListing
  onPlayerSave: (player: MarketPlayerItemListing) => void
}

const Action = ({ disableSave, marketListing, handleOnClick }: ActionProps) => {
  const buyNow = marketListing?.best_buy_price ?? 0
  const sellNow = marketListing?.best_sell_price ?? 0
  const afterSellTax = Number(sellNow) - Number(sellNow * 0.1)
  const difference = afterSellTax - Number(buyNow)

  return (
    <div className="action">
      <Style.QuickView className="market-quick-view">
        <Style.QuickViewInfoItem>
          <div className="label">Buy: </div>
          <div className="data">{marketListing?.best_buy_price}</div>
        </Style.QuickViewInfoItem>
        <Style.QuickViewInfoItem>
          <div className="label">Sell: </div>
          <div className="data">{marketListing?.best_sell_price}</div>
        </Style.QuickViewInfoItem>
        {difference > 0 && (
          <Style.QuickViewInfoItem>
            <div className="label">&#42;Profit: </div>
            <div className="data">{difference.toFixed(0)}</div>
          </Style.QuickViewInfoItem>
        )}
      </Style.QuickView>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className="action-btn"
        disabled={disableSave}
        onClick={handleOnClick}>
        Save
      </Button>
    </div>
  )
}

const Listing = ({ player, onPlayerSave }: Props) => {
  const isSavedPlayer = useSelector((state: State) =>
    squadBuilderService.isSavedPlayer(state, player)
  )

  return (
    <div>
      <CardWithActions
        stylingProps={{ width: 210, margin: '10px' }}
        player={player}
        actionComponent={
          <Action
            marketListing={player}
            handleOnClick={() => onPlayerSave(player)}
            disableSave={isSavedPlayer}
          />
        }>
        <CardContent sx={{ paddingBottom: '10px !important' }}>
          <Typography variant="body1" sx={{ lineHeight: { md: 'normal' } }}>
            {player.item.name}, {player.item.ovr}
          </Typography>
          <Typography variant="body2">{player.item.series} Series</Typography>
        </CardContent>
      </CardWithActions>
    </div>
  )
}

export default Listing

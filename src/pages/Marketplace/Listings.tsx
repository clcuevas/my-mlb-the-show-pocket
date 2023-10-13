import { Button, CardContent, Typography } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import CardWithActions from '@components/cards/CardWithActions'
import { MarketPlayerItemListing } from '@services/marketListings'

const Style = {
  CardListingsContainer: styled.div`
    display: flex;
    flex-wrap: wrap;

    margin-top: 30px;
    margin-bottom: 30px;
  `,
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

type Props = {
  listings: MarketPlayerItemListing[] | undefined
}

const Action = ({
  marketListing,
  handleOnClick,
}: {
  marketListing: MarketPlayerItemListing | null
  handleOnClick: () => void
}) => {
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
        onClick={handleOnClick}>
        Save
      </Button>
    </div>
  )
}

const Listings = ({ listings }: Props) => {
  const handleOnViewPlayerDetailClick = React.useCallback((player: MarketPlayerItemListing) => {
    // TODO: Save player to SquadBuild Saved Players list
  }, [])

  return (
    <Style.CardListingsContainer>
      {listings?.map((player, index) => (
        <div key={`player-item-${player.item.uuid}-${index}`}>
          <CardWithActions
            stylingProps={{ width: 210, margin: '10px' }}
            player={player}
            actionComponent={
              <Action
                marketListing={player}
                handleOnClick={() => handleOnViewPlayerDetailClick(player)}
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
      ))}
    </Style.CardListingsContainer>
  )
}

export default Listings

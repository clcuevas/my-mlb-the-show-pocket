import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import * as React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import { MarketPlayerItemListing } from '@services/marketListings'
import { Position as PositionType } from '@services/squadBuilder'

import type { DropItem, OnDrop, OnRemove } from './types'

const Style = {
  Position: styled(Grid)`
    text-align: center;
  `,
  Card: styled(Card)`
    position: relative;

    &:hover .action {
      display: flex;

      align-items: center;
      flex-direction: column;
      justify-content: center;

      .action-btn {
        flex: 0 1 auto;
        margin-bottom: 10px;
        width: 80px;
      }
    }
  `,
  CardContent: styled(CardContent)`
    padding: 0;
  `,
  CardActionArea: styled.div`
    background: rgba(0, 0, 0, 0.6);
    display: none;
    opacity: 1;
    position: absolute;

    height: 275px;
    width: 200px;
  `,
}

type Props = {
  player: MarketPlayerItemListing | null
  position: PositionType
  type: 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench'
  index?: number
  onDrop: (onDropParam: OnDrop) => void
  onRemove: (onRemoveParam: OnRemove) => void
}

const Position = ({ player, position, index, type, onDrop, onRemove }: Props) => {
  const [selectedPosition, setSelectedPosition] = React.useState('')

  const [_, dropRef] = useDrop(() => ({
    accept: [type, ...(position === 'MAIN_SP' ? ['starting_rotation'] : [])],
    drop: (item: DropItem) => {
      onDrop({ index, item, position, type })
    },
    collect: (monitor) => ({
      didDrop: monitor.didDrop(),
    }),
  }))

  React.useEffect(() => {
    const _position = position === 'MAIN_SP' ? 'SP' : position
    setSelectedPosition(_position)
  }, [])

  return (
    <Style.Position ref={dropRef} item xs="auto">
      <Style.Card
        sx={{ width: { md: '150px', lg: '200px' }, height: { md: '225px', lg: '275px' } }}>
        {player != null ? (
          <>
            <Style.CardActionArea className="action">
              <Button type="button" variant="contained" className="action-btn">
                Detail
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className="action-btn"
                onClick={() => onRemove({ player, pos: position, squadType: type, index })}>
                Remove
              </Button>
            </Style.CardActionArea>
            <img src={player.item.img} alt={player.item.name} height="210px" width="200px" />
            <Style.CardContent>
              <Typography>
                {player.listing_name}, {player.item.display_position}
              </Typography>
              <Typography>
                Buy: {player.best_buy_price}, Sell: {player.best_sell_price}
              </Typography>
            </Style.CardContent>
          </>
        ) : (
          <CardContent>{selectedPosition}</CardContent>
        )}
      </Style.Card>
    </Style.Position>
  )
}

export default Position

import { Button, Card, CardContent, Typography } from '@mui/material'
import * as React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import { MarketPlayerItemListing } from '@services/marketListings'
import { Position as PositionType } from '@services/squadBuilder'

import type { DropItem } from './types'

const Style = {
  Position: styled.div`
    border: 1px dotted gray;
    text-align: center;
  `,
  Card: styled(Card)`
    position: relative;

    height: 275px;
    width: 200px;

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
  onDrop: (
    item: DropItem,
    pos: PositionType,
    type: 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench',
    index?: number
  ) => void
  onRemove: (player: MarketPlayerItemListing, pos: PositionType) => void
}

const Position = ({ player, position, type, onDrop, onRemove }: Props) => {
  const [selectedPosition, setSelectedPosition] = React.useState('')

  const [_, dropRef] = useDrop(() => ({
    accept: [type, ...(position === 'MAIN_SP' ? ['starting_rotation'] : [])],
    drop: (item: DropItem) => {
      onDrop(item, position, type)
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
    <Style.Position ref={dropRef}>
      <Style.Card>
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
                onClick={() => onRemove(player, position)}>
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

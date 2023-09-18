import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import * as React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import { MarketPlayerItemListing } from '@services/marketListings'
import { Position as PositionType, Positions } from '@services/squadBuilder'

import type { DropItem, OnDrop, OnRemove } from './types'

const CardResponsiveSettings = {
  width: { md: '150px', lg: '200px' },
  height: { md: '225px', lg: '275px' },
}

const Style = {
  Position: styled(Grid)`
    text-align: center;
  `,
  Card: styled(Card)`
    display: flex;
    flex-direction: column;

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
    flex: 0;

    padding: 10px 10px 0 10px;
    text-align: left;
  `,
  CardActionArea: styled.div`
    background: rgba(0, 0, 0, 0.6);
    display: none;
    opacity: 1;
    position: absolute;

    height: 100%;
    width: 100%;
  `,
  CardMedia: styled(CardMedia)`
    flex: 2;

    background-size: 100% 100%;
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

  const [_collectObj, dropRef] = useDrop(
    () => ({
      accept: [type, ...(position === 'MAIN_SP' ? ['starting_rotation'] : [])],
      canDrop: ({ player }: DropItem) => {
        const playerPosition = player.item.display_position
        const bullpenPositions = [Positions.CP, Positions.RP] as PositionType[]

        switch (position) {
          case Positions.MAIN_SP:
            return playerPosition === Positions.SP && type === 'main_squad'
          case Positions.SP:
            return playerPosition === Positions.SP && type === 'starting_rotation'
          case Positions.RP:
            return type === 'bullpen' && bullpenPositions.includes(playerPosition as PositionType)
          case Positions.CP:
            return type === 'bullpen' && bullpenPositions.includes(playerPosition as PositionType)
          default:
            return true
        }
      },
      drop: (item: DropItem) => {
        onDrop({ index, item, position, type })
      },
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [player]
  )

  React.useEffect(() => {
    const _position = position === 'MAIN_SP' ? 'SP' : position
    setSelectedPosition(_position)
  }, [])

  return (
    <Style.Position ref={dropRef} item xs="auto">
      <Style.Card sx={CardResponsiveSettings}>
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
            <Style.CardMedia
              image={player.item.img}
              sx={{ position: 'center', height: { md: 200 } }}
            />
            <Style.CardContent sx={{ display: { sx: 'none' } }}>
              <Typography>
                {player.listing_name}, {player.item.display_position}
              </Typography>
              <Typography variant="body2">
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

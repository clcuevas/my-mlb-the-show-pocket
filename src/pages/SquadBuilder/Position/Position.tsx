import { Grid, Typography } from '@mui/material'
import * as React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import CardWithActions from '@components/cards/CardWithActions'
import { MarketPlayerItemListing } from '@services/marketListings'
import { Position as PositionType, Positions } from '@services/squadBuilder'

import ActionArea from './ActionArea'
import type { DropItem, OnDrop, OnRemove } from '../types'

const CardResponsiveSettings = {
  width: { md: '150px', lg: '200px' },
  height: { md: '225px', lg: '275px' },
}

const Style = {
  Position: styled(Grid)`
    text-align: center;
  `,
}

type Props = {
  player: MarketPlayerItemListing | null
  position: PositionType
  type: 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench'
  index?: number
  onDrop: (onDropParam: OnDrop) => void
  onRemove: (onRemoveParam: OnRemove) => void
  onSearch: (position: PositionType) => void
  onShowPlayerDetail: (handleType: 'show' | 'close', player: MarketPlayerItemListing) => void
}

const Position = ({
  player,
  position,
  index,
  type,
  onDrop,
  onRemove,
  onSearch,
  onShowPlayerDetail,
}: Props) => {
  const [selectedPosition, setSelectedPosition] = React.useState<PositionType | string>('')

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
      <CardWithActions
        stylingProps={CardResponsiveSettings}
        player={player}
        mediaStylingProps={{
          height: { sm: '100px', md: '200px' },
          objectFit: 'contain',
          flex: '2 1 auto',
        }}
        actionComponent={
          <ActionArea
            index={index}
            player={player}
            position={position}
            type={type}
            onRemovePlayer={onRemove}
            onSearchPlayer={onSearch}
            onShowPlayerDetail={onShowPlayerDetail}
          />
        }>
        {player != null ? (
          <>
            <Typography>
              {player.listing_name}, {player.item.display_position}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Buy: {player.best_buy_price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sell: {player.best_sell_price}
            </Typography>
          </>
        ) : (
          <>{selectedPosition}</>
        )}
      </CardWithActions>
    </Style.Position>
  )
}

export default Position

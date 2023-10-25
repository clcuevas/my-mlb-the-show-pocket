import { CardContent, Grid, Typography } from '@mui/material'
import * as React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import CardWithActions from '@components/cards/CardWithActions'
import {
  Bullpen,
  Position as PositionType,
  SquadBuild,
  SquadBuildPlayer,
  SquadType,
  StartingPitchingRotation,
} from '@services/squadBuilder'
import Color from '@styles/Color'

import ActionArea from './ActionArea'
import { canDrop } from './utils'
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
  bullpen?: Bullpen
  player: SquadBuildPlayer | null
  position: PositionType
  type: SquadType
  index?: number
  squad?: SquadBuild
  startingPitchers?: StartingPitchingRotation
  onDrop: (onDropParam: OnDrop) => void
  onRemove: (onRemoveParam: OnRemove) => void
  onSearch: (position: PositionType, squadType: SquadType, index?: number) => void
  onShowPlayerDetail: (handleType: 'show' | 'close', player: SquadBuildPlayer) => void
}

const Position = ({
  bullpen,
  player,
  position,
  index,
  squad,
  startingPitchers,
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
      canDrop: (droppedPlayer: DropItem) =>
        canDrop({ droppedItem: droppedPlayer, position, type, bullpen, squad, startingPitchers }),
      drop: (item: DropItem) => {
        onDrop({ index, item, position, type })
      },
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [bullpen, player, squad, startingPitchers, type]
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
          backgroundColor: Color.PRIMARY_LIGHT,
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
        <CardContent sx={{ padding: { md: '10px 0 0 7px' }, height: { md: '55px' } }}>
          {player != null ? (
            <>
              <Typography>
                {player.marketItem.listing_name}, {player.marketItem.item.display_position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Buy: {player.marketItem.best_buy_price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sell: {player.marketItem.best_sell_price}
              </Typography>
            </>
          ) : (
            <>{selectedPosition}</>
          )}
        </CardContent>
      </CardWithActions>
    </Style.Position>
  )
}

export default Position

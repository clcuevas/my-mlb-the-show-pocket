import { List, ListItem } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import { Position as PositionType, SquadBuildPlayer, SquadType } from '@services/squadBuilder'

import { MemoizedPosition as Position } from '../Position'
import type { OnDrop, OnRemove } from '../types'

const Style = {
  Container: styled.div`
    grid-area: bench;
  `,
}

type Props = {
  benchPlayers: SquadBuildPlayer[]
  onDrop: (onDropParam: OnDrop) => void
  onPositionSearch: (positionSelected: PositionType, squadType: SquadType, index?: number) => void
  onRemove: (onRemoveParam: OnRemove) => void
  onShowPlayerDetail: (handleType: 'show' | 'close', player: SquadBuildPlayer) => void
}

const MainBench = ({
  benchPlayers,
  onDrop,
  onPositionSearch,
  onRemove,
  onShowPlayerDetail,
}: Props) => (
  <Style.Container>
    <List disablePadding>
      {benchPlayers.map((player, index) => {
        const key = player == null ? index : player.marketItem.item.uuid

        return (
          <ListItem key={`bench-player-${key}`}>
            <Position
              player={player}
              position="BENCH"
              index={index}
              type="main_squad"
              onDrop={onDrop}
              onRemove={onRemove}
              onSearch={onPositionSearch}
              onShowPlayerDetail={onShowPlayerDetail}
            />
          </ListItem>
        )
      })}
    </List>
  </Style.Container>
)

export default MainBench

import { Stack } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import type { MarketPlayerItemListing } from '@services/marketListings'
import { Positions, type Position as PositionType, type SquadBuild } from '@services/squadBuilder'

import type { DropItem } from '../types'
import Position from '../Position'

const Style = {
  CatcherContainer: styled(Stack)`
    margin-top: 10px;
  `,
  OutfieldContainer: styled(Stack)`
    margin-bottom: 10px;
  `,
  SecondShortContainer: styled(Stack)`
    margin-top: 10px;
    margin-bottom: 10px;
  `,
  SquadContainer: styled(Stack)`
    margin-top: 30px;
  `,
  ThirdPitcherFirstContainer: styled(Stack)`
    margin-top: 10px;
    margin-bottom: 10px;
  `,
}

type Props = {
  squad: SquadBuild
  onDrop: (
    item: DropItem,
    pos: PositionType,
    type: 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench'
  ) => void
  onRemove: (player: MarketPlayerItemListing, pos: PositionType) => void
}

const Squad = ({ squad, onDrop, onRemove }: Props) => {
  return (
    <Style.SquadContainer alignItems="center">
      <Style.OutfieldContainer direction="row" spacing={22}>
        <Position
          onDrop={onDrop}
          position={Positions.LF}
          player={squad.LF}
          type="main_squad"
          onRemove={onRemove}
        />
        <Position
          onDrop={onDrop}
          position={Positions.CF}
          player={squad.CF}
          type="main_squad"
          onRemove={onRemove}
        />
        <Position
          onDrop={onDrop}
          position={Positions.RF}
          player={squad.RF}
          type="main_squad"
          onRemove={onRemove}
        />
      </Style.OutfieldContainer>
      <Style.SecondShortContainer direction="row" spacing={12}>
        <Position
          onDrop={onDrop}
          position={Positions.SS}
          player={squad.SS}
          type="main_squad"
          onRemove={onRemove}
        />
        <Position
          onDrop={onDrop}
          position={Positions['2B']}
          player={squad['2B']}
          type="main_squad"
          onRemove={onRemove}
        />
      </Style.SecondShortContainer>
      <Style.ThirdPitcherFirstContainer direction="row" spacing={16}>
        <Position
          onDrop={onDrop}
          position={Positions['3B']}
          player={squad['3B']}
          type="main_squad"
          onRemove={onRemove}
        />
        <Position
          onDrop={onDrop}
          position={Positions.MAIN_SP}
          player={squad.MAIN_SP}
          type="main_squad"
          onRemove={onRemove}
        />
        <Position
          onDrop={onDrop}
          position={Positions['1B']}
          player={squad['1B']}
          type="main_squad"
          onRemove={onRemove}
        />
      </Style.ThirdPitcherFirstContainer>
      <Style.CatcherContainer>
        <Position
          onDrop={onDrop}
          position={Positions.C}
          player={squad.C}
          type="main_squad"
          onRemove={onRemove}
        />
      </Style.CatcherContainer>
    </Style.SquadContainer>
  )
}

export default Squad

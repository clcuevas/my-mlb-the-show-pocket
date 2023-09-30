import { Grid } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import { type MarketPlayerItemListing } from '@services/marketListings'
import { type Position as PositionType, Positions, type SquadBuild } from '@services/squadBuilder'

import type { OnDrop, OnRemove } from '../types'
import Position from '../Position'

const Style = {
  CatcherContainer: styled(Grid)`
    margin-top: 10px;
  `,
  OutfieldContainer: styled(Grid)`
    margin-bottom: 10px;
  `,
  SecondShortContainer: styled(Grid)`
    margin-top: 10px;
    margin-bottom: 10px;
  `,
  SquadContainer: styled(Grid)`
    margin-top: 30px;
  `,
  ThirdPitcherFirstContainer: styled(Grid)`
    margin-top: 10px;
    margin-bottom: 10px;
  `,
}

type Props = {
  squad: SquadBuild
  onDrop: (onDropParam: OnDrop) => void
  onPositionSearch: (positionSelected: PositionType) => void
  onRemove: (onRemoveParam: OnRemove) => void
  onShowPlayerDetail: (handleType: 'show' | 'close', player: MarketPlayerItemListing) => void
}

const MainSquad = ({ squad, onDrop, onPositionSearch, onRemove, onShowPlayerDetail }: Props) => {
  return (
    <Style.SquadContainer container justifyContent="center" direction="column" alignItems="center">
      <Style.OutfieldContainer
        item
        container
        xs="auto"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 6 }}>
        <Position
          onDrop={onDrop}
          position={Positions.LF}
          player={squad.LF}
          type="main_squad"
          onRemove={onRemove}
          onSearch={onPositionSearch}
          onShowPlayerDetail={onShowPlayerDetail}
        />
        <Position
          onDrop={onDrop}
          position={Positions.CF}
          player={squad.CF}
          type="main_squad"
          onRemove={onRemove}
          onSearch={onPositionSearch}
          onShowPlayerDetail={onShowPlayerDetail}
        />
        <Position
          onDrop={onDrop}
          position={Positions.RF}
          player={squad.RF}
          type="main_squad"
          onRemove={onRemove}
          onSearch={onPositionSearch}
          onShowPlayerDetail={onShowPlayerDetail}
        />
      </Style.OutfieldContainer>
      <Style.SecondShortContainer
        item
        container
        xs="auto"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 6 }}>
        <Position
          onDrop={onDrop}
          position={Positions.SS}
          player={squad.SS}
          type="main_squad"
          onRemove={onRemove}
          onSearch={onPositionSearch}
          onShowPlayerDetail={onShowPlayerDetail}
        />
        <Position
          onDrop={onDrop}
          position={Positions['2B']}
          player={squad['2B']}
          type="main_squad"
          onRemove={onRemove}
          onSearch={onPositionSearch}
          onShowPlayerDetail={onShowPlayerDetail}
        />
      </Style.SecondShortContainer>
      <Style.ThirdPitcherFirstContainer
        item
        container
        xs="auto"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 9 }}>
        <Position
          onDrop={onDrop}
          position={Positions['3B']}
          player={squad['3B']}
          type="main_squad"
          onRemove={onRemove}
          onSearch={onPositionSearch}
          onShowPlayerDetail={onShowPlayerDetail}
        />
        <Position
          onDrop={onDrop}
          position={Positions.MAIN_SP}
          player={squad.MAIN_SP}
          type="main_squad"
          onRemove={onRemove}
          onSearch={onPositionSearch}
          onShowPlayerDetail={onShowPlayerDetail}
        />
        <Position
          onDrop={onDrop}
          position={Positions['1B']}
          player={squad['1B']}
          type="main_squad"
          onRemove={onRemove}
          onSearch={onPositionSearch}
          onShowPlayerDetail={onShowPlayerDetail}
        />
      </Style.ThirdPitcherFirstContainer>
      <Style.CatcherContainer item container xs="auto" rowSpacing={1}>
        <Position
          onDrop={onDrop}
          position={Positions.C}
          player={squad.C}
          type="main_squad"
          onRemove={onRemove}
          onSearch={onPositionSearch}
          onShowPlayerDetail={onShowPlayerDetail}
        />
      </Style.CatcherContainer>
    </Style.SquadContainer>
  )
}

export default MainSquad

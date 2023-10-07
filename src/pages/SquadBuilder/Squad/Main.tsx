import { Grid } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import {
  type Position as PositionType,
  Positions,
  type SquadBuild,
  type SquadBuildPlayer,
} from '@services/squadBuilder'

import type { OnDrop, OnRemove, SquadType } from '../types'
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

const outfieldPositions = [
  { position: Positions.LF, type: 'main_squad' },
  { position: Positions.CF, type: 'main_squad' },
  { position: Positions.RF, type: 'main_squad' },
] as { position: keyof SquadBuild; type: SquadType }[]
const secondShortPositions = [
  { position: Positions.SS, type: 'main_squad' },
  { position: Positions['2B'], type: 'main_squad' },
] as { position: keyof SquadBuild; type: SquadType }[]
const thirdMainSPFirstPositions = [
  { position: Positions['3B'], type: 'main_squad' },
  { position: Positions['MAIN_SP'], type: 'main_squad' },
  { position: Positions['1B'], type: 'main_squad' },
] as { position: keyof SquadBuild; type: SquadType }[]

type Props = {
  squad: SquadBuild
  onDrop: (onDropParam: OnDrop) => void
  onPositionSearch: (positionSelected: PositionType, squadType: SquadType) => void
  onRemove: (onRemoveParam: OnRemove) => void
  onShowPlayerDetail: (handleType: 'show' | 'close', player: SquadBuildPlayer) => void
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
        {outfieldPositions.map(({ position, type }) => (
          <Position
            key={`main-squad-position-${position}`}
            onDrop={onDrop}
            position={position}
            player={squad[position] as SquadBuildPlayer}
            type={type}
            onRemove={onRemove}
            onSearch={onPositionSearch}
            onShowPlayerDetail={onShowPlayerDetail}
          />
        ))}
      </Style.OutfieldContainer>
      <Style.SecondShortContainer
        item
        container
        xs="auto"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 6 }}>
        {secondShortPositions.map(({ position, type }) => (
          <Position
            key={`main-squad-position-${position}`}
            onDrop={onDrop}
            position={position}
            player={squad[position] as SquadBuildPlayer}
            type={type}
            onRemove={onRemove}
            onSearch={onPositionSearch}
            onShowPlayerDetail={onShowPlayerDetail}
          />
        ))}
      </Style.SecondShortContainer>
      <Style.ThirdPitcherFirstContainer
        item
        container
        xs="auto"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 9 }}>
        {thirdMainSPFirstPositions.map(({ position, type }) => (
          <Position
            key={`main-squad-position-${position}`}
            onDrop={onDrop}
            position={position}
            player={squad[position] as SquadBuildPlayer}
            type={type}
            onRemove={onRemove}
            onSearch={onPositionSearch}
            onShowPlayerDetail={onShowPlayerDetail}
          />
        ))}
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

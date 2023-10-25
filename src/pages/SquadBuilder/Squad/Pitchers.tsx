import { Divider, Grid, Typography } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import {
  StartingPitchingRotation,
  type Bullpen,
  type Position as PositionType,
  SquadBuildPlayer,
  SquadType,
} from '@services/squadBuilder'

import Position from '../Position'
import type { OnDrop, OnRemove } from '../types'

const Style = {
  Container: styled.div``,
  Section: styled.div`
    margin-top: 25px;
    margin-bottom: 25px;
  `,
  SectionHeader: styled(Typography)`
    margin-top: 15px;
    margin-bottom: 15px;
  `,
}

type Props = {
  bullpen: Bullpen
  mainSP: SquadBuildPlayer | null
  startingPitchingRotation: StartingPitchingRotation
  onDrop: (onDropParam: OnDrop) => void
  onPositionSearch: (position: PositionType, squadType: SquadType, index?: number) => void
  onRemove: (onRemoveParam: OnRemove) => void
  onShowPlayerDetail: (handleType: 'show' | 'close', player: SquadBuildPlayer) => void
}

const Pitchers = ({
  bullpen,
  startingPitchingRotation,
  onDrop,
  onPositionSearch,
  onRemove,
  onShowPlayerDetail,
}: Props) => {
  return (
    <Style.Container>
      <Style.Section>
        <Style.SectionHeader variant="h5">Starting Rotation</Style.SectionHeader>
        <Grid container spacing={2}>
          {startingPitchingRotation.map(({ position, player }, index) => (
            <Grid key={`starting-rotation-pitcher-${index}`} item xs="auto">
              <Position
                player={player}
                position={position}
                type="starting_rotation"
                index={index}
                startingPitchers={startingPitchingRotation}
                onDrop={onDrop}
                onRemove={onRemove}
                onSearch={onPositionSearch}
                onShowPlayerDetail={onShowPlayerDetail}
              />
            </Grid>
          ))}
        </Grid>
      </Style.Section>
      <Divider />
      <Style.Section>
        <Style.SectionHeader variant="h5">Bullpen</Style.SectionHeader>
        <Grid container spacing={2}>
          {bullpen.map(({ position, player }, index) => (
            <Grid key={`bullpen-pitcher-${index}`} item xs="auto">
              <Position
                bullpen={bullpen}
                player={player}
                position={position}
                type="bullpen"
                index={index}
                onDrop={onDrop}
                onRemove={onRemove}
                onSearch={onPositionSearch}
                onShowPlayerDetail={onShowPlayerDetail}
              />
            </Grid>
          ))}
        </Grid>
      </Style.Section>
    </Style.Container>
  )
}

export default Pitchers

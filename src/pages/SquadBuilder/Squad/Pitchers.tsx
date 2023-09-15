import { Divider, Grid, Typography } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import type { MarketPlayerItemListing } from '@services/marketListings'
import {
  StartingPitchingRotation,
  type Bullpen,
  type Position as PositionType,
} from '@services/squadBuilder'

import Position from '../Position'
import type { DropItem } from '../types'

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
  mainSP: MarketPlayerItemListing | null
  startingPitchingRotation: StartingPitchingRotation
  onDrop: (
    item: DropItem,
    pos: PositionType,
    type: 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench',
    index?: number
  ) => void
  onRemove: (player: MarketPlayerItemListing, pos: PositionType) => void
}

const Pitchers = ({ bullpen, startingPitchingRotation, mainSP, onDrop, onRemove }: Props) => {
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
                onDrop={onDrop}
                onRemove={onRemove}
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
                player={player}
                position={position}
                type="bullpen"
                index={index}
                onDrop={onDrop}
                onRemove={onRemove}
              />
            </Grid>
          ))}
        </Grid>
      </Style.Section>
    </Style.Container>
  )
}

export default Pitchers

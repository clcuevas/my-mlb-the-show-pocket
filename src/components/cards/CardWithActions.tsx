import { Card as MuiCard, CardContent, CardMedia } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import { MarketPlayerItemListing } from '@services/marketListings'

const Style = {
  Card: styled(MuiCard)`
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

    .action {
      background: rgba(0, 0, 0, 0.6);
      display: none;
      opacity: 1;
      position: absolute;

      height: 100%;
      width: 100%;
    }
  `,
}

type DynamicObject = { [key: string]: unknown }
type Props = {
  children: React.ReactNode
  player: MarketPlayerItemListing | null
  actionComponent: React.ReactNode
  stylingProps?: DynamicObject
  mediaStylingProps?: DynamicObject
}

const CardWithActions = ({
  children,
  player,
  stylingProps,
  mediaStylingProps,
  actionComponent: ActionComponent,
  ...rest
}: Props) => {
  return (
    <Style.Card sx={{ ...(stylingProps ? stylingProps : {}) }} {...rest}>
      {ActionComponent}
      {player != null && (
        <CardMedia
          component="img"
          image={player.item.img}
          alt={player.item.name}
          sx={{ ...(mediaStylingProps ? mediaStylingProps : {}) }}
        />
      )}
      <CardContent sx={{ padding: 0 }}>{children}</CardContent>
    </Style.Card>
  )
}

export default CardWithActions

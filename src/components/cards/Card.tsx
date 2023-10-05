import { Card as MuiCard, CardContent, CardMedia } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import { MarketPlayerItemListing } from '@services/marketListings'

const Style = {
  Card: styled(MuiCard)`
    display: flex;
    flex-direction: column;
  `,
}

type DynamicObject = { [key: string]: unknown }
type Props = {
  children: React.ReactNode
  player: MarketPlayerItemListing | null
  stylingProps?: DynamicObject
  mediaStylingProps?: DynamicObject
}

const Card = ({ children, player, stylingProps, mediaStylingProps, ...rest }: Props) => {
  return (
    <Style.Card sx={{ ...(stylingProps ? stylingProps : {}) }} {...rest}>
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

export default Card

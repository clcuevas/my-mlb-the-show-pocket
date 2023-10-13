import { Card as MuiCard, CardMedia } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import { MarketPlayerItemListing } from '@services/marketListings'
import { SquadBuildPlayer } from '@services/squadBuilder'

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
  player: SquadBuildPlayer | MarketPlayerItemListing | null
  actionComponent: React.ReactNode
  stylingProps?: DynamicObject
  mediaStylingProps?: DynamicObject
}

const CardWithActions = ({
  children,
  player: _player,
  stylingProps,
  mediaStylingProps,
  actionComponent: ActionComponent,
  ...rest
}: Props) => {
  const [player, setPlayer] = React.useState<MarketPlayerItemListing | null>(null)

  React.useEffect(() => {
    if (player == null && _player != null) {
      const p = 'marketItem' in _player ? _player.marketItem : _player
      setPlayer(p)
    }
  }, [_player, player])

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
      {children}
    </Style.Card>
  )
}

export default CardWithActions

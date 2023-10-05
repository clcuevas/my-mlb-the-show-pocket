import { Button } from '@mui/material'
import * as React from 'react'

import { MarketPlayerItemListing } from '@services/marketListings'
import { Position as PositionType } from '@services/squadBuilder'

import type { OnRemove } from '../types'

type Props = {
  player: MarketPlayerItemListing | null
  position: PositionType
  type: 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench'
  index?: number
  onRemovePlayer: (onRemoveParam: OnRemove) => void
  onSearchPlayer: (position: PositionType) => void
  onShowPlayerDetail: (handleType: 'show' | 'close', player: MarketPlayerItemListing) => void
}

const ActionArea = ({
  index,
  player,
  position,
  type,
  onRemovePlayer,
  onSearchPlayer,
  onShowPlayerDetail,
}: Props) => (
  <div className="action">
    {player != null ? (
      <>
        <Button
          type="button"
          variant="contained"
          className="action-btn"
          onClick={() => onShowPlayerDetail('show', player)}>
          Detail
        </Button>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className="action-btn"
          onClick={() => onRemovePlayer({ player, pos: position, squadType: type, index })}>
          Remove
        </Button>
      </>
    ) : (
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={() => onSearchPlayer(position)}>
        Search
      </Button>
    )}
  </div>
)

export default ActionArea

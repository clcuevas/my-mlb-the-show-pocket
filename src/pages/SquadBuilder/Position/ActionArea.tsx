import { Button } from '@mui/material'
import * as React from 'react'

import { Position as PositionType, SquadBuildPlayer } from '@services/squadBuilder'

import type { OnRemove, SquadType } from '../types'

type Props = {
  player: SquadBuildPlayer | null
  position: PositionType
  type: 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench'
  index?: number
  onRemovePlayer: (onRemoveParam: OnRemove) => void
  onSearchPlayer: (position: PositionType, squadType: SquadType, index?: number) => void
  onShowPlayerDetail: (handleType: 'show' | 'close', player: SquadBuildPlayer) => void
}

const ActionArea = ({
  index,
  player,
  position,
  type,
  onRemovePlayer,
  onSearchPlayer,
  onShowPlayerDetail,
}: Props) => {
  const handleOnSearch = React.useCallback(() => {
    if (['starting_rotation', 'bullpen'].includes(type)) {
      onSearchPlayer(position, type, index)
    } else {
      onSearchPlayer(position, type)
    }
  }, [index, position, type, onSearchPlayer])

  return (
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
        <Button type="button" variant="contained" color="secondary" onClick={handleOnSearch}>
          Search
        </Button>
      )}
    </div>
  )
}

export default ActionArea

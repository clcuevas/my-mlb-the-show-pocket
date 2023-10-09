import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import * as React from 'react'

import { SquadBuildPlayer } from '@services/squadBuilder'

import CloseIconButton from '../CloseIconButton'
import PlayerDetail from '../PlayerDetail'

type Props = {
  isOpen: boolean
  player: SquadBuildPlayer | null
  onClose: () => void
}

const PlayerDetailModal = ({ isOpen, player, onClose }: Props) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth="lg">
    <DialogTitle>{`${player?.detailedItem.name} ` ?? ''}Player Details</DialogTitle>
    <CloseIconButton onClose={onClose} />
    <DialogContent dividers>
      <PlayerDetail player={player} />
    </DialogContent>
  </Dialog>
)

export default PlayerDetailModal

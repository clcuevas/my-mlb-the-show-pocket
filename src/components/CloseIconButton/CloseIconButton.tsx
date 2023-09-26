import { Close as CloseIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import * as React from 'react'

type Props = {
  color?: string
  onClose: () => void
}

const CloseIconButton = ({ color, onClose }: Props) => (
  <IconButton
    aria-label="close-icon-button"
    onClick={onClose}
    sx={{
      position: 'absolute',
      right: 8,
      top: 8,
      color: (theme) => color ?? theme.palette.grey[500],
    }}>
    <CloseIcon />
  </IconButton>
)

export default CloseIconButton

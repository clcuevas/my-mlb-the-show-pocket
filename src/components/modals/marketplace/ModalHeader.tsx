import { AppBar, Toolbar, Typography } from '@mui/material'
import * as React from 'react'

import CloseIconButton from '../../CloseIconButton'

type Props = {
  onModalClose: () => void
}

const ModalHeader = ({ onModalClose }: Props) => (
  <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6">Marketplace Position Search</Typography>
      <CloseIconButton onClose={onModalClose} />
    </Toolbar>
  </AppBar>
)

export default ModalHeader

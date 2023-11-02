import { Button, DialogActions } from '@mui/material'
import * as React from 'react'

type Props = {
  isDisabled: boolean
  onModalClose: () => void
  onPlayerAdd: () => void
}

const ModalActions = ({ isDisabled, onModalClose, onPlayerAdd }: Props) => (
  <DialogActions>
    <Button type="button" variant="outlined" onClick={onModalClose}>
      CANCEL
    </Button>
    <Button type="button" variant="contained" disabled={isDisabled} onClick={onPlayerAdd}>
      ADD
    </Button>
  </DialogActions>
)

export default ModalActions

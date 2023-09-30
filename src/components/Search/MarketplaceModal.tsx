import {
  Alert,
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'

import CloseIconButton from '@components/CloseIconButton'
import { Positions, type Position } from '@services/squadBuilder'

const filteredPositions = Object.values(Positions).filter(
  (p) => p !== Positions.MAIN_SP && p !== Positions.BENCH
)

type Form = {
  ['display_position']: string
  ['min_rank']: string
  ['max_rank']: string
}

type Props = {
  isOpen: boolean
  position: Position | string
  onModalClose: () => void
}

const MarketplaceModal = ({ isOpen, position, onModalClose }: Props) => {
  const {
    control,
    formState: { defaultValues: formStateDefaultValues, errors },
    handleSubmit,
    reset,
  } = useForm<Form>({
    defaultValues: { ['display_position']: position, ['min_rank']: '', ['max_rank']: '' },
  })

  const handleOnFormSubmit = React.useCallback((data: Form) => {
    console.log(data)
  }, [])

  React.useEffect(() => {
    if (position !== formStateDefaultValues?.display_position) {
      reset({
        ['display_position']: position,
        ['min_rank']: '',
        ['max_rank']: '',
      })
    }
  }, [position, formStateDefaultValues?.display_position, reset])

  return (
    <>
      {isOpen && (
        <Dialog open={isOpen} onClose={onModalClose} fullScreen>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6">Marketplace Position Search</Typography>
              <CloseIconButton onClose={onModalClose} />
            </Toolbar>
          </AppBar>
          <DialogContent>
            {Object.keys(errors).length > 0 && (
              <Alert severity="error">
                <List>
                  {Object.entries(errors).map(([key, value]) => (
                    <ListItem key={`error-${key}`}>{value.message}</ListItem>
                  ))}
                </List>
              </Alert>
            )}
            <form onSubmit={handleSubmit(handleOnFormSubmit)}>
              <FormControl>
                <Controller
                  control={control}
                  name="display_position"
                  defaultValue={formStateDefaultValues?.display_position}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Select onChange={onChange} value={value} error={error != null}>
                      {filteredPositions.map((p) => (
                        <MenuItem key={`position-${p}`} value={p}>
                          {p}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="min_rank"
                  defaultValue={formStateDefaultValues?.min_rank}
                  rules={{ pattern: /\d*/ }}
                  render={({ field: { name, value, onBlur, onChange }, fieldState: { error } }) => (
                    <TextField
                      type="text"
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={error != null}
                      placeholder="Min Rank"
                    />
                  )}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button type="button" variant="outlined" onClick={onModalClose}>
              CANCEL
            </Button>
            <Button type="button" variant="contained">
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default MarketplaceModal

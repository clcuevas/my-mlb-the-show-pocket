import { Button, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material'
import * as React from 'react'
import { Controller, FieldErrors, SubmitErrorHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { Positions, type Position } from '@services/squadBuilder'

const Style = {
  Label: styled.label``,
}

export type Form = {
  ['display_position']: string
  ['min_rank']: string
  ['max_rank']: string
}
export type FormErrors = SubmitErrorHandler<Form>

type Props = {
  position: Position | string
  onError: (errors: string[]) => void
  onSubmit: (data: Form) => void
}

const filteredPositions = Object.values(Positions).filter(
  (p) => p !== Positions.MAIN_SP && p !== Positions.BENCH
)

const MarketplaceSearch = ({ position, onError, onSubmit }: Props) => {
  const {
    control,
    formState: { defaultValues: formStateDefaultValues },
    handleSubmit,
    reset,
  } = useForm<Form>({
    defaultValues: { ['display_position']: position, ['min_rank']: '', ['max_rank']: '' },
  })

  const handleOnFormSubmit = React.useCallback((data: Form) => onSubmit(data), [onSubmit])

  const handleOnFormError = React.useCallback(
    (errors: FieldErrors<Form>) => {
      const errorMessages = Object.entries(errors)
        .filter(([_key, value]) => value.message != null)
        .map(([_key, value]) => value.message)
      onError(errorMessages as string[])
    },
    [onError]
  )

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
    <form onSubmit={handleSubmit(handleOnFormSubmit, handleOnFormError)}>
      <Stack direction="row" spacing={2}>
        <FormControl>
          <Style.Label>Position</Style.Label>
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
        </FormControl>
        <FormControl>
          <Style.Label>Minimum Rank</Style.Label>
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
        <FormControl>
          <Style.Label>Maximum Rank</Style.Label>
          <Controller
            control={control}
            name="max_rank"
            defaultValue={formStateDefaultValues?.max_rank}
            rules={{ pattern: /\d*/ }}
            render={({ field: { name, value, onBlur, onChange }, fieldState: { error } }) => (
              <TextField
                type="text"
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={error != null}
                placeholder="Max Rank"
              />
            )}
          />
        </FormControl>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button type="button" variant="outlined" color="secondary">
            Reset
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            Search
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default MarketplaceSearch

import { Button, Stack } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import PlayerDetailFull from './PlayerDetailFull'
import PlayerDetailSummary from './PlayerDetailSummary'
import { SelectedPlayer } from './types'

const Style = {
  Actions: styled(Stack)``,
}

type Props = {
  player: SelectedPlayer | null
}

const PlayerDetail = ({ player }: Props) => {
  const [showFullDetails, setShowFullDetails] = React.useState(false)

  const handleShowFullDetailsToggle = React.useCallback(() => {
    setShowFullDetails(!showFullDetails)
  }, [showFullDetails])

  return (
    <>
      {showFullDetails ? (
        <PlayerDetailFull player={player} />
      ) : (
        <PlayerDetailSummary player={player} />
      )}
      <Style.Actions direction="row" justifyContent="space-between">
        <Button type="button" variant="outlined" onClick={handleShowFullDetailsToggle}>
          Show {showFullDetails ? 'Less' : 'More'}
        </Button>
        <Stack direction="row" spacing={1}>
          <Button type="button" variant="outlined">
            SAVE
          </Button>
          <Button type="button" variant="contained">
            ADD
          </Button>
        </Stack>
      </Style.Actions>
    </>
  )
}

export default PlayerDetail

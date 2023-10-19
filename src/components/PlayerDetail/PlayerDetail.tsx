import { Button, Stack } from '@mui/material'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { State } from '@reducers'
import * as squadBuilderService from '@services/squadBuilder'

import PlayerDetailFull from './PlayerDetailFull'
import PlayerDetailSummary from './PlayerDetailSummary'

const Style = {
  Actions: styled(Stack)``,
}

type Props = {
  player: squadBuilderService.SquadBuildPlayer | null
  canAddPlayer?: boolean
}

const PlayerDetail = ({ canAddPlayer, player }: Props) => {
  const dispatch = useDispatch()

  const [showFullDetails, setShowFullDetails] = React.useState(false)

  const hasBeenSaved = useSelector((state: State) =>
    squadBuilderService.isSavedPlayer(state, player?.marketItem)
  )

  const handleShowFullDetailsToggle = React.useCallback(() => {
    setShowFullDetails(!showFullDetails)
  }, [showFullDetails])

  const handleOnSavePlayer = React.useCallback(() => {
    if (player != null && !hasBeenSaved) {
      dispatch(squadBuilderService.savePlayer(player))
    }
  }, [hasBeenSaved, player, dispatch])

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
          <Button
            type="button"
            variant="outlined"
            disabled={hasBeenSaved}
            onClick={handleOnSavePlayer}>
            SAVE
          </Button>
          <Button
            type="button"
            variant="contained"
            disabled={canAddPlayer == null || !canAddPlayer}>
            ADD
          </Button>
        </Stack>
      </Style.Actions>
    </>
  )
}

export default PlayerDetail

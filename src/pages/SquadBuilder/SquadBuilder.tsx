import { Grid } from '@mui/material'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { State } from '@reducers'
import type { MarketPlayerItemListing } from '@services/marketListings'
import * as squadBuilderService from '@services/squadBuilder'

import RightPanel from './RightPanel'
import Squad from './Squad'
import type { OnDrop, OnRemove } from './types'

const Style = {
  Container: styled(Grid)`
    margin-bottom: 30px;
  `,
}

const SquadBuilder = () => {
  const dispatch = useDispatch()

  const { bullpen, squad, savedPlayers, startingPitchingRotation } = useSelector((state: State) =>
    squadBuilderService.getSquadBuild(state)
  )

  const handleOnPositionClear = React.useCallback(
    ({ squadType, player, index, pos: position }: OnRemove) => {
      switch (squadType) {
        case 'bullpen':
          dispatch(squadBuilderService.updateBullpen({ player, index: index ?? 0, type: 'remove' }))
          return
        case 'starting_rotation':
          dispatch(
            squadBuilderService.updateStartingRotation({
              player,
              index: index ?? 0,
              type: 'remove',
            })
          )
          return
        default:
          dispatch(
            squadBuilderService.updateSquadBuild({
              player,
              position,
              isMainSP: position === 'MAIN_SP',
              type: 'remove',
            })
          )
      }
    },
    [dispatch]
  )
  const handleOnCardDrop = React.useCallback(
    ({ item, index, type, actionType, position }: OnDrop) => {
      switch (type) {
        case 'bullpen':
          dispatch(squadBuilderService.updateBullpen({ player: item.player, index: index ?? 0 }))
          return
        case 'starting_rotation':
          dispatch(
            squadBuilderService.updateStartingRotation({
              player: item.player,
              index: index ?? 0,
              type: actionType,
            })
          )
          return
        default:
          dispatch(
            squadBuilderService.updateSquadBuild({
              player: item.player,
              position,
              isMainSP: position === 'MAIN_SP', // TODO: Do not allow non-SP players
            })
          )
          return
      }
    },
    [dispatch]
  )
  const handleOnCardAdd = React.useCallback(
    (player: MarketPlayerItemListing, position: squadBuilderService.Position) => {
      dispatch(
        squadBuilderService.updateSquadBuild({
          player,
          position,
          isMainSP: position === 'MAIN_SP', // TODO: Do not allow non-SP players
        })
      )
    },
    [dispatch]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Style.Container container spacing={2}>
        <Grid item xs={7} md={9} lg={10}>
          <Squad
            bullpen={bullpen}
            squad={squad}
            startingPitchingRotation={startingPitchingRotation}
            onAdd={handleOnCardAdd}
            onDrop={handleOnCardDrop}
            onRemove={handleOnPositionClear}
          />
        </Grid>
        <Grid item xs={5} md={3} lg={2}>
          <RightPanel savedPlayers={savedPlayers} />
        </Grid>
      </Style.Container>
    </DndProvider>
  )
}

export default SquadBuilder

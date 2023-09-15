import { Grid } from '@mui/material'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { State } from '@reducers'
import type { MarketPlayerItemListing } from '@services/marketListings'
import type { Position as PositionType } from '@services/squadBuilder'
import * as squadBuilderService from '@services/squadBuilder'

import SavedPlayers from './SavedPlayers'
import Squad from './Squad'

type DropItem = {
  id: string
  player: MarketPlayerItemListing
}

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
    (player: MarketPlayerItemListing, position: PositionType) => {
      dispatch(
        squadBuilderService.updateSquadBuild({
          player,
          position,
          isMainSP: position === 'SP',
          type: 'remove',
        })
      )
    },
    [dispatch]
  )
  const handleOnCardDrop = React.useCallback(
    (
      item: DropItem,
      position: PositionType,
      type: 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench',
      index?: number
    ) => {
      switch (type) {
        case 'bullpen':
          dispatch(squadBuilderService.updateBullpen({ player: item.player, index: index ?? 0 }))
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

  return (
    <DndProvider backend={HTML5Backend}>
      <Style.Container container spacing={2}>
        <Grid item xs={7} md={9} lg={10}>
          <Squad
            bullpen={bullpen}
            squad={squad}
            startingPitchingRotation={startingPitchingRotation}
            onDrop={handleOnCardDrop}
            onRemove={handleOnPositionClear}
          />
        </Grid>
        <Grid item xs={5} md={3} lg={2}>
          <SavedPlayers savedPlayers={savedPlayers as MarketPlayerItemListing[]} />
        </Grid>
      </Style.Container>
    </DndProvider>
  )
}

export default SquadBuilder

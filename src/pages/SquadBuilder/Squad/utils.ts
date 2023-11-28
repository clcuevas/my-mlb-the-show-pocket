import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'

import * as squadBuilderService from '@services/squadBuilder'

import type { OnDrop, OnRemove } from '../types'

type OnPlayerCardAdd = {
  player: squadBuilderService.SquadBuildPlayer
  positionSelected: squadBuilderService.Position
  squadType: squadBuilderService.SquadType
  index?: number
}

export const onPlayerCardAdd = (
  dispatch: Dispatch<AnyAction>,
  { player, squadType, positionSelected, index }: OnPlayerCardAdd
) => {
  switch (squadType) {
    case 'bullpen':
      dispatch(squadBuilderService.updateBullpen({ player, index: index ?? 0 }))
      return
    case 'starting_rotation':
      dispatch(
        squadBuilderService.updateStartingRotation({
          player,
          index: index ?? 0,
        })
      )
      return
    default: {
      const isBenchPosition = positionSelected === squadBuilderService.Positions.BENCH

      if (isBenchPosition) {
        dispatch(squadBuilderService.updateBench({ player, index: index ?? 0 }))
      } else {
        dispatch(
          squadBuilderService.updateSquadBuild({
            player,
            position: positionSelected,
            isMainSP: positionSelected === 'MAIN_SP', // TODO: Do not allow non-SP players
          })
        )
      }

      return
    }
  }
}

export const onPlayerCardDrop = (
  dispatch: Dispatch<AnyAction>,
  { item, index, type, actionType, position }: OnDrop
) => {
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
}

export const onPositionClear = (
  dispatch: Dispatch<AnyAction>,
  { squadType, player, index, pos: position }: OnRemove
) => {
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
}

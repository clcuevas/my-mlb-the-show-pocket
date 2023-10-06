import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'

import { MarketPlayerItemListing } from '@services/marketListings'
import * as squadBuilderService from '@services/squadBuilder'

import type { OnDrop, OnRemove } from '../types'

export const onPlayerCardAdd = (
  dispatch: Dispatch<AnyAction>,
  player: MarketPlayerItemListing,
  selectedPosition: squadBuilderService.Position
) => {
  dispatch(
    squadBuilderService.updateSquadBuild({
      player,
      position: selectedPosition,
      isMainSP: selectedPosition === 'MAIN_SP', // TODO: Do not allow non-SP players
    })
  )
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

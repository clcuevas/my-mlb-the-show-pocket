import { SagaIterator } from 'redux-saga'
import { put, takeEvery, select } from 'redux-saga/effects'

import * as actions from './actions'
import * as view from './view'
import {
  Bullpen,
  Position,
  Positions,
  SquadBuild as SquadBuildType,
  SquadBuildPlayer,
  StartingPitchingRotation,
  UPDATE_SQUAD_BUILD,
  UPDATE_SQUAD_BULLPEN,
  UPDATE_STARTING_ROTATION,
  SAVE_PLAYER,
} from './types'
import { isObjKey } from '../helpers'

type UpdateSquadBuild = ReturnType<typeof actions.updateSquadBuild>
type UpdateSquadBullpen = ReturnType<typeof actions.updateBullpen>
type UpdateStartingRotation = ReturnType<typeof actions.updateStartingRotation>
type UpdateSavedPlayers = ReturnType<typeof actions.savePlayer>

type SquadBuildState = {
  bullpen: Bullpen
  squad: SquadBuildType
  startingPitchingRotation: StartingPitchingRotation
  savedPlayers: SquadBuildPlayer[]
}

function* updateSquadBuild(action: UpdateSquadBuild): SagaIterator {
  try {
    const { player, position, isMainSP, type } = action.payload

    const squadBuild: SquadBuildState = yield select(view.getSquadBuild)
    const squad = { ...squadBuild.squad }
    const shouldRemove = type && type === 'remove'

    if (position === Positions.BENCH) {
      const bench = shouldRemove
        ? squad.BENCH.filter((p) => player.marketItem.item.uuid !== p.marketItem.item.uuid)
        : squad.BENCH

      squad.BENCH = [...bench, ...(shouldRemove ? [] : [player])]
    } else if (isObjKey(position, squad)) {
      const key = isMainSP ? Positions.MAIN_SP : position
      squad[key] = shouldRemove ? null : player
    }

    const startingRotation = [...squadBuild.startingPitchingRotation]

    if (isMainSP) {
      startingRotation[0] = { ...startingRotation[0], player: shouldRemove ? null : player }
    }

    yield put(actions.updateSquadBuildResult({ squad, startingPitchingRotation: startingRotation }))
  } catch (e) {
    console.log(e)
    yield put(actions.updateSquadBuildError({ error: (e as Error).message }))
  }
}

function* updateSquadBullpen(action: UpdateSquadBullpen): SagaIterator {
  try {
    const { player, index, type } = action.payload

    const squadBuild: SquadBuildState = yield select(view.getSquadBuild)
    const bullpen = [...squadBuild.bullpen]

    bullpen[index] = {
      position: player.marketItem.item.display_position as Position,
      player: type === 'remove' ? null : player,
    }

    yield put(actions.updateBullpenResult({ bullpen }))
  } catch (e) {
    console.log(e)
    yield put(actions.updateBullpenError({ error: (e as Error).message }))
  }
}

function* updateStartingRotation(action: UpdateStartingRotation): SagaIterator {
  try {
    const { player, index, type } = action.payload

    const squadBuild: SquadBuildState = yield select(view.getSquadBuild)
    const startingRotation = [...squadBuild.startingPitchingRotation]
    const squad = { ...squadBuild.squad }

    const isMainSP = index === 0
    const removePlayer = type && type === 'remove'

    startingRotation[index] = { position: Positions.SP, player: removePlayer ? null : player }
    squad[Positions.MAIN_SP] = isMainSP ? (removePlayer ? null : player) : squad[Positions.MAIN_SP]

    yield put(
      actions.updateStartingRotationResult({ squad, startingPitchingRotation: startingRotation })
    )
  } catch (e) {
    console.log(e)
    yield put(actions.updateStartingRotationError({ error: (e as Error).message }))
  }
}

function* updateSavedPlayers(action: UpdateSavedPlayers): SagaIterator {
  try {
    const { payload: player } = action

    const squadBuild: SquadBuildState = yield select(view.getSquadBuild)
    const isSavedPlayer = squadBuild.savedPlayers.some(
      (p) => p.detailedItem.uuid === player.detailedItem.uuid
    )

    if (isSavedPlayer) {
      throw new Error('Player already exists. Cannot save.')
    }
    // Let's append it to the top of the list so it's more visible
    const updatedSavedPlayers = [player, ...squadBuild.savedPlayers]

    yield put(actions.savePlayerResult({ savedPlayers: updatedSavedPlayers }))
  } catch (e) {
    console.log(e)
    // redux-saga best practices is not pass/assign non-serializable data into
    // state which includes Promises, Symbols, Maps/Sets, functions, or class
    // instances. Error object is a class instance. It should be enough to
    // console.log the entire error and just pass the Error.message to state.
    yield put(actions.savePlayerError({ error: (e as Error).message }))
  }
}

export default function* saga(): SagaIterator<void> {
  yield takeEvery(UPDATE_SQUAD_BUILD, updateSquadBuild)
  yield takeEvery(UPDATE_SQUAD_BULLPEN, updateSquadBullpen)
  yield takeEvery(UPDATE_STARTING_ROTATION, updateStartingRotation)
  yield takeEvery(SAVE_PLAYER, updateSavedPlayers)
}

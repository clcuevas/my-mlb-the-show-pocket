import { createSelector } from '@reduxjs/toolkit'

import { State } from '@reducers'
import { MarketPlayerItemListing } from '@services/marketListings'

import { Positions, SquadBuild, SquadBuildPlayer } from './types'

export const getSquadBuild = (state: State) => state.squad

// Check if a player has been added to the "savedPlayers" list
export const isSavedPlayer = (
  state: State,
  player: MarketPlayerItemListing | null | undefined
): boolean => {
  if (player == null) {
    return false
  }

  const savedPlayers = getSquadBuild(state).savedPlayers
  // Immediately exits when it finds the first match (i.e. truthy)
  return savedPlayers.some((savedPlayer) => savedPlayer.detailedItem.uuid === player.item.uuid)
}

export const isError = (state: State) => getSquadBuild(state).error != null

const calcBattingAverages = (players: SquadBuildPlayer[]) => {
  let leftContactTotal = 0
  let rightContactTotal = 0
  let leftPowerTotal = 0
  let rightPowerTotal = 0

  let clutch = 0
  let discipline = 0
  let vision = 0

  let bunting = 0
  let dragBunting = 0

  let playersEvaluated = 0

  players.forEach((player) => {
    const detail = player.detailedItem

    leftContactTotal += detail[`contact_left`]
    rightContactTotal += detail[`contact_right`]
    leftPowerTotal += detail['power_left']
    rightPowerTotal += detail['power_right']

    clutch += detail['batting_clutch']
    discipline += detail['plate_discipline']
    vision += detail['plate_vision']

    bunting += detail['bunting_ability']
    dragBunting += detail['drag_bunting_ability']

    playersEvaluated += 1
  })

  return {
    ['left_contact']: leftContactTotal / playersEvaluated,
    ['right_contact']: rightContactTotal / playersEvaluated,
    ['left_power']: leftPowerTotal / playersEvaluated,
    ['right_power']: rightPowerTotal / playersEvaluated,
    ['clutch']: clutch / playersEvaluated,
    ['plate_discipline']: discipline / playersEvaluated,
    ['plate_vision']: vision / playersEvaluated,
    ['bunting']: bunting / playersEvaluated,
    ['drag_bunting']: dragBunting / playersEvaluated,
  }
}

const calcBaserunningAverages = (players: SquadBuildPlayer[]) => {
  let speed = 0
  let baseAbility = 0
  let baseAggression = 0

  let playersEvaluated = 0

  players.forEach((player) => {
    const detail = player.detailedItem

    speed += detail['speed']
    baseAbility += detail['baserunning_ability']
    baseAggression += detail['baserunning_aggression']

    playersEvaluated += 1
  })

  return {
    speed: speed / playersEvaluated,
    aggression: baseAggression / playersEvaluated,
    stealing: baseAbility / playersEvaluated,
  }
}

const calcFieldingAverages = (players: SquadBuildPlayer[]) => {
  let fielding = 0
  let reaction = 0
  let armStrength = 0
  let armAccuracy = 0
  let blocking = 0

  let playersEvaluated = 0

  players.forEach((player) => {
    const detail = player.detailedItem

    fielding += detail['fielding_ability']
    reaction += detail['reaction_time']
    armAccuracy += detail['arm_accuracy']
    armStrength += detail['arm_strength']
    blocking += detail['blocking']

    playersEvaluated += 1
  })

  return {
    ['fielding']: fielding / playersEvaluated,
    ['arm_strength']: armStrength / playersEvaluated,
    ['arm_accuracy']: armAccuracy / playersEvaluated,
    ['reaction']: reaction / playersEvaluated,
    ['blocking']: blocking / playersEvaluated,
  }
}

// Using the "createSelector" method to memoize the results being
// calculated for better performance and to follow best practices
export const squadBuildOverall = createSelector(
  (state: State) => getSquadBuild(state),
  (squad) => {
    const {
      squad: { BENCH: bench },
      squad: mainSquad,
    } = squad

    const main = Object.entries(mainSquad)
      .map(([key, value]) => {
        if (key !== Positions.BENCH) {
          return value
        }

        return null
      })
      .filter((player) => player != null) as SquadBuildPlayer[]

    const players = [...main, ...bench]

    const battingAvgerages = calcBattingAverages(players)
    const baserunningAverages = calcBaserunningAverages(players)
    const fieldingAverages = calcFieldingAverages(players)

    return {
      batting: { ...battingAvgerages },
      baserunning: { ...baserunningAverages },
      fielding: { ...fieldingAverages },
    }
  }
)

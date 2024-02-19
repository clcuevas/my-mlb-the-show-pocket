import {
  Bullpen,
  Position as PositionType,
  Positions,
  SquadBuild,
  SquadType,
  StartingPitchingRotation,
} from '@services/squadBuilder'

import { DropItem } from '../types'

type SquadFieldPositions = 'LF' | 'RF' | 'CF' | '3B' | '2B' | 'SS' | '1B' | 'C'

type Props = {
  droppedItem: DropItem
  position: PositionType
  type: SquadType
  bullpen?: Bullpen
  squad?: SquadBuild
  startingPitchers?: StartingPitchingRotation
}

export const canDrop = ({
  bullpen,
  droppedItem: { player: droppedPlayer },
  position,
  squad,
  startingPitchers,
  type,
}: Props): boolean => {
  const droppedPlayerID = droppedPlayer.marketItem.item.uuid
  const playerPosition = droppedPlayer.marketItem.item.display_position
  const bullpenPositions = [Positions.CP, Positions.RP] as PositionType[]

  switch (position) {
    case Positions.MAIN_SP:
      return playerPosition === Positions.SP && type === 'main_squad'
    case Positions.SP: {
      const positionMatches = playerPosition === Positions.SP && type === 'starting_rotation'
      const notInRotation = !startingPitchers?.some(
        (p) => p.player?.marketItem.item.uuid === droppedPlayerID
      )

      return positionMatches && notInRotation
    }
    case Positions.RP: {
      const positionMatches =
        type === 'bullpen' && bullpenPositions.includes(playerPosition as PositionType)
      const notInBullpen = !bullpen?.some((p) => p.player?.marketItem.item.uuid === droppedPlayerID)

      return positionMatches && notInBullpen
    }
    case Positions.CP: {
      const positionMatches =
        type === 'bullpen' && bullpenPositions.includes(playerPosition as PositionType)
      const notInBullpen = !bullpen?.some((p) => p.player?.marketItem.item.uuid && droppedPlayerID)

      return positionMatches && notInBullpen
    }
    default: {
      const _position = position as SquadFieldPositions
      const squadPlayers = squad != null ? Object.values(squad) : []

      const isFound = squadPlayers.some((p) => {
        if (p == null) {
          return false
        } else if (Array.isArray(p)) {
          return p.some((benchPlayer) => benchPlayer?.marketItem.item.uuid === droppedPlayerID)
        }

        return p.marketItem.item.uuid === droppedPlayerID
      })

      if (position === Positions.BENCH) {
        return !isFound
      }

      const squadPlayerID = squad?.[_position]?.marketItem.item.uuid
      return (squadPlayerID == null || squadPlayerID !== droppedPlayerID) && !isFound
    }
  }
}

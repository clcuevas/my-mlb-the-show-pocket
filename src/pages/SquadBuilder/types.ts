import type { Position, SquadBuildPlayer } from '@services/squadBuilder'

export type DropItem = {
  id: string
  player: SquadBuildPlayer
}
export type OnDrop = {
  item: DropItem
  position: Position
  type: SquadType
  actionType?: 'remove'
  index?: number
}

export type SquadType = 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench'

export type OnRemove = {
  player: SquadBuildPlayer
  pos: Position
  squadType: SquadType
  index?: number
}

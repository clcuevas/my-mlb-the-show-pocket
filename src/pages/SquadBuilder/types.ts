import type { Position, SquadBuildPlayer, SquadType } from '@services/squadBuilder'

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

export type OnRemove = {
  player: SquadBuildPlayer
  pos: Position
  squadType: SquadType
  index?: number
}

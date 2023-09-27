import { DetailedPlayerItem } from '@services/marketListings'

export interface SelectedPlayer extends DetailedPlayerItem {
  ['buy_now']: number
  ['sell_now']: number
}

import { DetailedPlayerItem } from '@services/types'

export interface SelectedPlayer extends DetailedPlayerItem {
  ['buy_now']: number
  ['sell_now']: number
}

export type Stat = Array<(string | number)[]>

type Data = { x: string; y: number }
type DataSet = {
  data: Data[]
  backgroundColor: string
  label: string
  barThickness: number
}

export type Chart = {
  labels: string[]
  datasets: DataSet[]
}

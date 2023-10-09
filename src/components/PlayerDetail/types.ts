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

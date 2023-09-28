import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'

import { buildDatasets } from './utils'
import type { Chart, SelectedPlayer } from './types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Style = {
  ChartContainer: styled.div`
    margin-bottom: 20px;
    min-width: 900px;
  `,
}

type Props = {
  player: SelectedPlayer | null
}

const PlayerDetailFull = ({ player }: Props) => {
  const [chartData, setChartData] = React.useState<Chart | null>(null)

  React.useEffect(() => {
    if (chartData == null && player != null) {
      const datasets = buildDatasets(player)
      const data = { datasets }

      setChartData(data as Chart)
    }
  }, [chartData, player])

  return (
    <Style.ChartContainer>
      {chartData != null && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: { y: { min: 0, max: 125, ticks: { stepSize: 25 } } },
          }}
        />
      )}
    </Style.ChartContainer>
  )
}

export default PlayerDetailFull

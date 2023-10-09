import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import { SquadBuildPlayer } from '@services/squadBuilder'

import { constructStatLabel, getTopStats } from './utils'
import type { Stat } from './types'

const Style = {
  Container: styled.div`
    min-width: 400px;
  `,
}

type Props = {
  player: SquadBuildPlayer | null
}

const PlayerDetailSummary = ({ player }: Props) => {
  const [stats, setStats] = React.useState<Stat>([])

  React.useEffect(() => {
    if (player) {
      const data = getTopStats(player.detailedItem)
      setStats(data as Stat)
    }
  }, [])

  return (
    <Style.Container>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Stack flex="1">
          <Typography variant="h6">Top Stats</Typography>
          <List>
            {stats.map(([key, value], index) => (
              <ListItem key={`${key}-${index}`} disablePadding>
                <ListItemText primary={constructStatLabel(key as string)} />
                <ListItemText
                  secondary={value}
                  secondaryTypographyProps={{ variant: 'h6', textAlign: 'right' }}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack justifyContent="flex-start" spacing={1} flex="1">
          <Typography variant="h6">Current Prices</Typography>
          <Typography>Buy Now: {player?.marketItem.best_buy_price}</Typography>
          <Typography>Sell Now: {player?.marketItem.best_sell_price}</Typography>
        </Stack>
      </Stack>
    </Style.Container>
  )
}

export default PlayerDetailSummary

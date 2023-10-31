import { Typography } from '@mui/material'
import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { State } from '@reducers'
import * as squadBuilderService from '@services/squadBuilder'
import Color from '@styles/Color'

const Style = {
  Container: styled.div`
    padding: 15px;
  `,
  StatContainer: styled.div`
    border-bottom: 1px solid ${Color.GRAY};
    margin-bottom: 10px;
  `,
  StatHeader: styled(Typography)`
    font-weight: 300;
    margin-bottom: 7px;
  `,
  StatLabel: styled(Typography)`
    color: ${Color.GRAY_DARKER};
  `,
  Stat: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  `,
  StatValue: styled(Typography)`
    color: ${Color.GRAY_DARKER};
  `,
}

const Overall = () => {
  const { batting, baserunning, fielding } = useSelector((state: State) =>
    squadBuilderService.squadBuildOverall(state)
  )

  return (
    <Style.Container>
      <Style.StatContainer>
        <Style.StatHeader variant="h6">Batting Averages</Style.StatHeader>
        {Object.entries(batting).map(([key, value], index) => (
          <Style.Stat key={`avg-batting-stat-${index}`}>
            <Style.StatLabel variant="body2">
              {key.replace(/_/g, ' ').toLocaleUpperCase()}
            </Style.StatLabel>
            <Style.StatValue variant="body2">{value.toFixed(0)}</Style.StatValue>
          </Style.Stat>
        ))}
      </Style.StatContainer>
      <Style.StatContainer>
        <Style.StatHeader variant="h6">Baserunning Averages</Style.StatHeader>
        {Object.entries(baserunning).map(([key, value], index) => (
          <Style.Stat key={`avg-baserunning-stat-${index}`}>
            <Style.StatLabel variant="body2">
              {key.replace(/_/g, ' ').toLocaleUpperCase()}
            </Style.StatLabel>
            <Style.StatValue variant="body2">{value.toFixed(0)}</Style.StatValue>
          </Style.Stat>
        ))}
      </Style.StatContainer>
      <Style.StatContainer>
        <Style.StatHeader variant="h6">Fielding Averages</Style.StatHeader>
        {Object.entries(fielding).map(([key, value], index) => (
          <Style.Stat key={`avg-fielding-stat-${index}`}>
            <Style.StatLabel variant="body2">
              {key.replace(/_/g, ' ').toLocaleUpperCase()}
            </Style.StatLabel>
            <Style.StatValue variant="body2">{value.toFixed(0)}</Style.StatValue>
          </Style.Stat>
        ))}
      </Style.StatContainer>
    </Style.Container>
  )
}

export default Overall

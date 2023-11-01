import { Typography } from '@mui/material'
import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import Dropdown from '@components/Dropdown'
import { State } from '@reducers'
import * as squadBuilderService from '@services/squadBuilder'
import Color from '@styles/Color'

const Style = {
  Container: styled.div`
    padding: 15px;
  `,
  StatContainer: styled.div`
    margin-bottom: 10px;
  `,
  StatLabel: styled(Typography)`
    color: ${Color.GRAY_DARKER};
  `,
  Stat: styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: 5px;
    padding: 5px;
  `,
  StatValue: styled(Typography)`
    color: ${Color.GRAY_DARKER};
  `,
}

const Overall = () => {
  const { batting, baserunning, fielding, pitching } = useSelector((state: State) =>
    squadBuilderService.squadBuildOverall(state)
  )

  return (
    <Style.Container>
      <Style.StatContainer>
        <Dropdown title="Batting Averages">
          {Object.entries(batting).map(([key, value], index) => (
            <Style.Stat key={`avg-batting-stat-${index}`}>
              <Style.StatLabel variant="body2">
                {key.replace(/_/g, ' ').toLocaleUpperCase()}
              </Style.StatLabel>
              <Style.StatValue variant="body2">{value.toFixed(0)}</Style.StatValue>
            </Style.Stat>
          ))}
        </Dropdown>
      </Style.StatContainer>
      <Style.StatContainer>
        <Dropdown title="Baserunning Averages">
          {Object.entries(baserunning).map(([key, value], index) => (
            <Style.Stat key={`avg-baserunning-stat-${index}`}>
              <Style.StatLabel variant="body2">
                {key.replace(/_/g, ' ').toLocaleUpperCase()}
              </Style.StatLabel>
              <Style.StatValue variant="body2">{value.toFixed(0)}</Style.StatValue>
            </Style.Stat>
          ))}
        </Dropdown>
      </Style.StatContainer>
      <Style.StatContainer>
        <Dropdown title="Fielding Averages">
          {Object.entries(fielding).map(([key, value], index) => (
            <Style.Stat key={`avg-fielding-stat-${index}`}>
              <Style.StatLabel variant="body2">
                {key.replace(/_/g, ' ').toLocaleUpperCase()}
              </Style.StatLabel>
              <Style.StatValue variant="body2">{value.toFixed(0)}</Style.StatValue>
            </Style.Stat>
          ))}
        </Dropdown>
      </Style.StatContainer>
      <Style.StatContainer>
        <Dropdown title="Pitching Averages">
          {Object.entries(pitching).map(([key, value], index) => (
            <Style.Stat key={`avg-pitching-stat-${index}`}>
              <Style.StatLabel variant="body2">
                {key.replace(/_/g, ' ').toLocaleUpperCase()}
              </Style.StatLabel>
              <Style.StatValue variant="body2">{value.toFixed(0)}</Style.StatValue>
            </Style.Stat>
          ))}
        </Dropdown>
      </Style.StatContainer>
    </Style.Container>
  )
}

export default Overall

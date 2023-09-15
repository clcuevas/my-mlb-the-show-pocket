import { Container as MuiContainer, Typography } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import Color from '@styles/Color'

import NavigationItems from './NavigationItems'

const Style = {
  Container: styled.div`
    border-bottom: 1px solid ${Color.WHITE};
    box-shadow: ${Color.GRAY_LIGHT} 1px 1px 3px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
  `,
  Layout: styled.div`
    display: flex;
    flow-direction: row;
  `,
  LogoContainer: styled.div`
    flex: 1 1 auto;

    font-style: italic;
    font-weight: 300;
  `,
  NavContainer: styled.div`
    flex: 2 1 auto;
  `,
  BoldText: styled.strong`
    font-style: normal;
  `,
}

const Header = () => (
  <Style.Container>
    <MuiContainer>
      <Style.Layout>
        <Style.LogoContainer>
          <Typography>
            <Style.BoldText>My</Style.BoldText> MLB The Show <Style.BoldText>Pocket</Style.BoldText>
          </Typography>
        </Style.LogoContainer>
        <Style.NavContainer>
          <NavigationItems />
        </Style.NavContainer>
      </Style.Layout>
    </MuiContainer>
  </Style.Container>
)

export default Header

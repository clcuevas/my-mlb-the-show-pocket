import { Typography } from '@mui/material'
import React from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import styled from 'styled-components'

import Color from '@styles/Color'

import NavigationItems from './NavigationItems'

const Style = {
  Container: styled.div`
    display: grid;

    grid-template-columns: 15% 1fr 15% 1fr 15%;
    grid-template-rows: 1;
    grid-template-areas: '. home . items .';

    border-bottom: 1px solid ${Color.WHITE};
    box-shadow: ${Color.GRAY_LIGHT} 1px 1px 3px;
    padding-top: 20px;
    padding-bottom: 20px;
  `,
  HomeLink: styled(RRNavLink)`
    grid-area: home;

    color: ${Color.PRIMARY_MAIN};
    text-decoration: none;

    &:visited {
      color: ${Color.PRIMARY_MAIN};
    }
  `,
  LogoContainer: styled.div`
    font-style: italic;
    font-weight: 300;
  `,
  NavItemsContainer: styled.div`
    grid-area: items;
  `,
  BoldText: styled.strong`
    font-style: normal;
  `,
}

const Header = () => (
  <Style.Container>
    <Style.HomeLink to="/">
      <Style.LogoContainer>
        <Typography>
          <Style.BoldText>My</Style.BoldText> MLB The Show <Style.BoldText>Pocket</Style.BoldText>
        </Typography>
      </Style.LogoContainer>
    </Style.HomeLink>
    <Style.NavItemsContainer>
      <NavigationItems />
    </Style.NavItemsContainer>
  </Style.Container>
)

export default Header

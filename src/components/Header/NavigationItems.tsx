import * as React from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import styled from 'styled-components'

import Color from '@styles/Color'

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  NavLink: styled(RRNavLink)`
    color: ${Color.PRIMARY_MAIN};
    margin-left: 10px;
    text-decoration: none;

    &:visited {
      color: ${Color.PRIMARY_MAIN};
    }

    &.active,
    &:hover {
      color: ${Color.SECONDARY_MAIN};
    }

    &.active {
      font-weight: 500;
      text-decoration: underline;
    }
  `,
}

const navItems = [
  { label: 'Marketplace', routeTo: '/marketplace', key: 'marketplace' },
  { label: 'Rosters', routeTo: '/rosters', key: 'rosters' },
  { label: 'Squad Builder', routeTo: '/squad-builder', key: 'squad-builder' },
]

const NavigationItems = () => {
  return (
    <Style.Container>
      {navItems.map((item) => (
        <Style.NavLink
          to={item.routeTo}
          key={`navigation-item-${item.key}`}
          className={({ isActive }) => (isActive ? 'active' : '')}>
          {item.label}
        </Style.NavLink>
      ))}
    </Style.Container>
  )
}

export default NavigationItems

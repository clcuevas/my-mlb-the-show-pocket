import CopyrightIcon from '@mui/icons-material/Copyright'
import { Typography } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import Color from '@styles/Color'

const Style = {
  Container: styled.div`
    display: grid;

    grid-template-columns: 15% 1fr 15% 1fr 15%;
    grid-template-rows: 1;
    grid-template-areas: '. logo . info .';

    background-color: ${Color.PRIMARY_MAIN};
    border-top: 1px solid ${Color.GRAY_DARK};
    color: ${Color.WHITE};
    min-height: 200px;
    padding-top: 30px;
  `,
  LogoContainer: styled.div`
    grid-area: logo;
  `,
  InfoContainer: styled.div`
    grid-area: info;
  `,
}

const Footer = () => {
  return (
    <Style.Container>
      <Style.LogoContainer>
        <Typography variant="h5">My</Typography>
        <Typography variant="h5">MLB The Show</Typography>
        <Typography variant="h5">Pocket</Typography>
      </Style.LogoContainer>
      <Style.InfoContainer>
        <Typography>
          <CopyrightIcon sx={{ verticalAlign: 'bottom' }} /> OMORDN, LLC. All rights reserved.
        </Typography>
      </Style.InfoContainer>
    </Style.Container>
  )
}

export default Footer

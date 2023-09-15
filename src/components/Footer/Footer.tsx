import CopyrightIcon from '@mui/icons-material/Copyright'
import { Container as MuiContainer, Typography } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import Color from '@styles/Color'

const Style = {
  Container: styled.div`
    background-color: ${Color.PRIMARY_MAIN};
    border-top: 1px solid ${Color.GRAY_DARK};
    min-height: 200px;
    padding-top: 30px;
    color: ${Color.WHITE};
  `,
  Layout: styled.div`
    display: flex;

    flow-direction: row;
  `,
  LogoContainer: styled.div`
    flex: 1 1 auto;
  `,
  InfoContainer: styled.div`
    flex: 2 1 auto;

    text-align: end;
  `,
}

const Footer = () => {
  return (
    <Style.Container>
      <MuiContainer>
        <Style.Layout>
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
        </Style.Layout>
      </MuiContainer>
    </Style.Container>
  )
}

export default Footer

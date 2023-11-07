import { Button, Typography } from '@mui/material'
import React from 'react'
import styled, { css } from 'styled-components'

import Color from '@styles/Color'

const secondary = css`
  display: flex;
  flex-direction: column;

  button {
    flex: 0;
    margin-top: auto;
    max-width: 210px;
  }
`

const Style = {
  Container: styled.div`
    display: grid;

    grid-template-columns: 100%;
    grid-template-rows: auto;
    grid-template-areas: 'section' 'secondary' 'section2';
  `,
  Button: styled(Button)`
    margin-top: 15px;
  `,
  Section: styled.section`
    display: grid;

    grid-area: section;
    grid-template-columns: 15% 1fr 15% 1fr 15%;
    grid-template-rows: 1;
    grid-template-areas: '. left . right .';

    height: 350px;
  `,
  Section2: styled.section`
    display: grid;

    grid-area: section2;
    grid-template-columns: 15% 1fr 15% 1fr 15%;
    grid-template-rows: 1;
    grid-template-areas: '. left . right .';

    height: 350px;
  `,
  SectionLeft: styled.div<{ $isSecondary?: boolean }>`
    grid-area: left;
    align-self: center;

    min-height: 200px;

    ${({ $isSecondary }) => ($isSecondary ? secondary : '')};
  `,
  SectionRight: styled.div<{ $isSecondary?: boolean }>`
    grid-area: right;
    align-self: center;

    min-height: 200px;

    ${({ $isSecondary }) => ($isSecondary ? secondary : '')};
  `,
  Secondary: styled.section`
    display: grid;

    grid-area: secondary;
    grid-template-columns: 15% 1fr 15% 1fr 15%;
    grid-template-rows: 1;
    grid-template-areas: '. left . right .';

    background-color: ${Color.GRAY_LIGHT};
    min-height: 350px;
  `,
  SecondaryText: styled(Typography)<{ $isSubHeader?: boolean }>`
    color: ${({ $isSubHeader }) => ($isSubHeader ? Color.GRAY_DARKER : Color.BLACK)};
    font-size: ${({ $isSubHeader }) => ($isSubHeader ? '16px' : '18px')};
    font-style: ${({ $isSubHeader }) => ($isSubHeader ? 'italic' : 'normal')};
    font-weight: ${({ $isSubHeader }) => ($isSubHeader ? 500 : 300)};
    margin-top: ${({ $isSubHeader }) => ($isSubHeader ? '0px' : '5px')};
  `,
}

const Home = () => {
  return (
    <Style.Container>
      <Style.Section>
        <Style.SectionLeft>
          <Typography variant="h3">Build your Diamond Dynasty squad</Typography>
          <Typography>With our easy-to-use Squad Builder tool</Typography>
        </Style.SectionLeft>
        <Style.SectionRight>
          <Typography>Create and share your created squad</Typography>
          <Style.Button type="button" variant="contained">
            Start Building
          </Style.Button>
        </Style.SectionRight>
      </Style.Section>
      <Style.Secondary>
        <Style.SectionLeft $isSecondary>
          <Typography variant="h5">Marketplace</Typography>
          <Style.SecondaryText $isSubHeader>
            Search for player cards in real-time
          </Style.SecondaryText>
          <Style.SecondaryText>
            Uses The Show's current marketplace to search for new player cards added, a card's buy
            now and sell now prices, and more!
          </Style.SecondaryText>
          <Style.Button type="button" variant="contained" color="secondary">
            Search Marketplace
          </Style.Button>
        </Style.SectionLeft>
        <Style.SectionRight $isSecondary>
          <Typography variant="h5">Roster Updates</Typography>
          <Style.SecondaryText $isSubHeader>View roster updates in real-time</Style.SecondaryText>
          <Style.SecondaryText>
            Easily look through all the roster updates with more filter opetions.
          </Style.SecondaryText>
          <Style.Button
            type="button"
            variant="contained"
            color="secondary"
            className="secondary-btn">
            View Roster Updates
          </Style.Button>
        </Style.SectionRight>
      </Style.Secondary>
      <Style.Section2>
        <Style.SectionLeft>
          <Typography variant="h3">Create an account</Typography>
          <Typography>
            Save your squads without losing them as you exit. Compare the squads you have built for
            better evaluation. And more...
          </Typography>
        </Style.SectionLeft>
        <Style.SectionRight>
          <Typography>For a more personalized experience create an account with us.</Typography>
          <Style.Button type="button" variant="outlined">
            Sign Up
          </Style.Button>
        </Style.SectionRight>
      </Style.Section2>
    </Style.Container>
  )
}

export default Home

import { Button, Container as MuiContainer, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

import Color from '@styles/Color'

const Style = {
  Section: styled(MuiContainer)`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 350px;
  `,
  SquadBuilderMessaging: styled.div`
    flex: 1 1 250px;
  `,
  SquadBuilderActions: styled.div`
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  SquadBuilderButton: styled(Button)`
    margin-top: 15px;
  `,
  SecondarySection: styled(MuiContainer)`
    display: flex;

    background-color: ${Color.GRAY_LIGHT};
    margin-top: 15px;
    padding-top: 95px;
    padding-bottom: 95px;
  `,
  Feature: styled.div<{ $first?: boolean; $last?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    flex: 1 1 125px;

    margin-right: ${({ $first }) => ($first ? '25px' : '0px')};
    margin-left: ${({ $last }) => ($last ? '25px' : '0px')};
  `,
  FeatureTitle: styled(Typography)`
    flex: 0 1 auto;
  `,
  FeatureInfo: styled(Typography)<{ $isSubHeader?: boolean }>`
    flex: ${({ $isSubHeader }) => ($isSubHeader ? '0 1 auto' : '2 1 auto')};

    color: ${({ $isSubHeader }) => ($isSubHeader ? Color.GRAY_DARKER : Color.BLACK)};
    font-size: ${({ $isSubHeader }) => ($isSubHeader ? '16px' : '18px')};
    font-style: ${({ $isSubHeader }) => ($isSubHeader ? 'italic' : 'normal')};
    font-weight: ${({ $isSubHeader }) => ($isSubHeader ? 500 : 300)};
    margin-top: ${({ $isSubHeader }) => ($isSubHeader ? '0px' : '5px')};
  `,
  FeatureButton: styled(Button)`
    flex: 1 1 auto;

    align-self: flex-start;
    margin-top: 15px;
  `,
}

const Home = () => {
  return (
    <>
      <Style.Section>
        <Style.SquadBuilderMessaging>
          <Typography variant="h3">Build your Diamond Dynasty squad</Typography>
          <Typography>With our easy-to-use Squad Builder tool</Typography>
        </Style.SquadBuilderMessaging>
        <Style.SquadBuilderActions>
          <Typography>Create and share your created squad</Typography>
          <Style.SquadBuilderButton type="button" variant="contained">
            Start Building
          </Style.SquadBuilderButton>
        </Style.SquadBuilderActions>
      </Style.Section>
      <Style.SecondarySection>
        <Style.Feature $first>
          <Style.FeatureTitle variant="h5">Marketplace</Style.FeatureTitle>
          <Style.FeatureInfo $isSubHeader>Search for player cards in real-time</Style.FeatureInfo>
          <Style.FeatureInfo>
            Uses The Show's current marketplace to search for new player cards added, a card's buy
            now and sell now prices, and more!
          </Style.FeatureInfo>
          <Style.FeatureButton type="button" variant="contained" color="secondary">
            Search Marketplace
          </Style.FeatureButton>
        </Style.Feature>
        <Style.Feature $last>
          <Style.FeatureTitle variant="h5">Roster Updates</Style.FeatureTitle>
          <Style.FeatureInfo $isSubHeader>View roster updates in real-time</Style.FeatureInfo>
          <Style.FeatureInfo>
            Easily look through all the roster updates with more filter opetions.
          </Style.FeatureInfo>
          <Style.FeatureButton type="button" variant="contained" color="secondary">
            View Roster Updates
          </Style.FeatureButton>
        </Style.Feature>
      </Style.SecondarySection>
      <Style.Section>
        <Style.SquadBuilderMessaging>
          <Typography variant="h3">Create an account</Typography>
          <Typography>
            Save your squads without losing them as you exit. Compare the squads you have built for
            better evaluation. And more...
          </Typography>
        </Style.SquadBuilderMessaging>
        <Style.SquadBuilderActions>
          <Typography>For a more personalized experience</Typography>
          <Typography>create an account with us.</Typography>
          <Style.SquadBuilderButton type="button" variant="outlined">
            Sign Up
          </Style.SquadBuilderButton>
        </Style.SquadBuilderActions>
      </Style.Section>
    </>
  )
}

export default Home

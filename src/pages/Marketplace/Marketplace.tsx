import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import {
  Container,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import { useGetPlayerMarketListingsQuery } from '@services/marketListings'
import Color from '@styles/Color'

const Style = {
  CardListingsContainer: styled.div`
    display: flex;
    flex-wrap: wrap;

    margin-top: 30px;
    margin-bottom: 30px;
  `,
  LoadingContainer: styled(Grid)`
    margin-top: 80px;
  `,
  ErrorContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: 20%;
  `,
  ErrorHeader: styled.div`
    display: flex;
    flex-direction: column;

    margin-left: 30px;
    width: 500px;
  `,
}

const Marketplace = () => {
  const { data, error, isLoading } = useGetPlayerMarketListingsQuery()

  if (error) {
    return (
      <Container>
        <Style.ErrorContainer>
          <SentimentVeryDissatisfiedIcon
            sx={{ height: '150px', width: '150px', color: Color.PRIMARY_MAIN }}
          />
          <Style.ErrorHeader>
            <Typography variant="h5">
              Oh, no! Something went wrong while fetching the market listings.
            </Typography>
            <Typography>Please try again.</Typography>
          </Style.ErrorHeader>
        </Style.ErrorContainer>
      </Container>
    )
  }

  return (
    <Container>
      {isLoading ? (
        <Style.LoadingContainer
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item key={`loading-skeleton-${index}`} xs={2} sm={4} md={4}>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </Grid>
          ))}
        </Style.LoadingContainer>
      ) : (
        <Style.CardListingsContainer>
          {data?.listings?.map((listing) => (
            <div key={`plater-item-${listing.item.uuid}`}>
              <Card sx={{ width: 210, margin: '10px' }}>
                <CardActionArea onClick={() => console.log('clicking list item')}>
                  <img src={listing.item.img} alt={listing.item.name} />
                  <CardContent>
                    <Typography variant="h6">
                      {listing.item.name}, {listing.item.ovr}
                    </Typography>
                    <Typography>{listing.item.series} Series</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </Style.CardListingsContainer>
      )}
    </Container>
  )
}

export default Marketplace

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import { Container, Grid, Pagination, Skeleton, Stack, Typography } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import { useGetPlayerMarketListingsQuery } from '@services/marketListings'
import Color from '@styles/Color'

import Listings from './Listings'

const Style = {
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
  const [pageCounter, setPageCounter] = React.useState(1)

  const { data, error, isLoading, isFetching } = useGetPlayerMarketListingsQuery(pageCounter)

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageCounter(value)
  }

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
      {isLoading || isFetching ? (
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
        <>
          <Listings listings={data?.listings} />
          <Stack alignItems="center" mb="30px">
            <Pagination
              count={data?.total_pages}
              page={pageCounter}
              shape="rounded"
              onChange={handleChange}
            />
          </Stack>
        </>
      )}
    </Container>
  )
}

export default Marketplace

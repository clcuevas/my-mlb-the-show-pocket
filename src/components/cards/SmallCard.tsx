import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import * as React from 'react'

import { MarketPlayerItemListing } from '@services/marketListings'

type Props = {
  player: MarketPlayerItemListing
}

const SmallCard = ({ player }: Props) => {
  return (
    <Card sx={{ display: 'flex', width: '235px' }} variant="outlined">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pl: '10px',
          pt: '10px',
          pr: '10px',
          flex: '1 1 auto',
        }}>
        <CardContent sx={{ flex: '1 0 auto', pl: 0, pb: 0, pt: 0, pr: 0 }}>
          <Typography component="div" variant="body1">
            {player.listing_name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {player.item.team_short_name} - {player.item.display_position}, {player.item.ovr}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', pb: 1 }}>
          <Typography component="div" variant="body2">
            Buy now: {player.best_buy_price}
          </Typography>
          <Typography component="div" variant="body2">
            Sell now: {player.best_sell_price}
          </Typography>
        </Box>
      </Box>
      <CardMedia
        component="img"
        alt="Card Image"
        sx={{ width: 100, objectFit: 'contain', alignSelf: 'flex-end' }}
        image={player.item.img}
      />
    </Card>
  )
}

export default SmallCard

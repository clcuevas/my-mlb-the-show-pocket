import { Box } from '@mui/material'
import * as React from 'react'
import { Outlet as RouterOutlet } from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'

const Outlet = () => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: '90vh', overflow: 'auto' }}>
        <RouterOutlet />
      </Box>
      <Footer />
    </>
  )
}

export default Outlet

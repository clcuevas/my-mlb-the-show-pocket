import { Box, Tab, Tabs } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

import CustomTabPanel from '@components/CustomTabPanel'
import { a11yProps } from '@components/helpers'
import { MarketPlayerItemListing } from '@services/marketListings'

import Overall from './Overall'
import SavedPlayers from './SavedPlayers'

type Props = {
  savedPlayers: MarketPlayerItemListing[]
}
const RightPanel = ({ savedPlayers }: Props) => {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <Box>
      <Box>
        <Tabs value={activeTab} onChange={(_e, value) => setActiveTab(value)}>
          <Tab label="Saved Players" {...a11yProps(0)} />
          <Tab label="Squad Info" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={activeTab} index={0}>
        <SavedPlayers savedPlayers={savedPlayers} />
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        <Overall />
      </CustomTabPanel>
    </Box>
  )
}

export default RightPanel

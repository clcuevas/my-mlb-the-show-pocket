import { Tab, Tabs } from '@mui/material'
import * as React from 'react'

import CustomTabPanel from '@components/CustomTabPanel'
import { a11yProps } from '@components/helpers'
import type { MarketPlayerItemListing } from '@services/marketListings'
import type {
  Bullpen,
  Position as PositionType,
  SquadBuild,
  StartingPitchingRotation,
} from '@services/squadBuilder'

import Main from './Main'
import Pitchers from './Pitchers'

type DropItem = {
  id: string
  player: MarketPlayerItemListing
}

type Props = {
  bullpen: Bullpen
  squad: SquadBuild
  startingPitchingRotation: StartingPitchingRotation
  onDrop: (
    item: DropItem,
    pos: PositionType,
    type: 'main_squad' | 'starting_rotation' | 'bullpen' | 'bench',
    index?: number
  ) => void
  onRemove: (player: MarketPlayerItemListing, pos: PositionType) => void
}

const Squad = ({ bullpen, squad, startingPitchingRotation, onDrop, onRemove }: Props) => {
  const [activeTab, setActiveTab] = React.useState(0)

  const handleChange = React.useCallback(
    (_e: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue)
    },
    [setActiveTab]
  )

  return (
    <>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="Main Squad" {...a11yProps(0)} />
        <Tab label="Pitchers" {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={activeTab} index={0}>
        <Main squad={squad} onDrop={onDrop} onRemove={onRemove} />
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        <Pitchers
          bullpen={bullpen}
          startingPitchingRotation={startingPitchingRotation}
          mainSP={squad['MAIN_SP']}
          onDrop={onDrop}
          onRemove={onRemove}
        />
      </CustomTabPanel>
    </>
  )
}

export default Squad

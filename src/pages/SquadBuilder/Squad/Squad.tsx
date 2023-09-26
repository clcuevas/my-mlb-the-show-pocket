import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material'
import * as React from 'react'

import CloseIconButton from '@components/CloseIconButton'
import CustomTabPanel from '@components/CustomTabPanel'
import { a11yProps } from '@components/helpers'
import {
  useFetchPlayerMarketListingMutation,
  MarketPlayerItemListing,
  DetailedPlayerItem,
} from '@services/marketListings'
import type { Bullpen, SquadBuild, StartingPitchingRotation } from '@services/squadBuilder'

import Main from './Main'
import Pitchers from './Pitchers'
import type { OnDrop, OnRemove } from '../types'

type Props = {
  bullpen: Bullpen
  squad: SquadBuild
  startingPitchingRotation: StartingPitchingRotation
  onDrop: (onDropParam: OnDrop) => void
  onRemove: (onRemoveParam: OnRemove) => void
}

const Squad = ({ bullpen, squad, startingPitchingRotation, onDrop, onRemove }: Props) => {
  const [fetchPlayer, { isError: isPlayerDetailError, isLoading: isFetchingå }] =
    useFetchPlayerMarketListingMutation()

  const [activeTab, setActiveTab] = React.useState(0)
  const [selectedPlayer, setSelectedPlayer] = React.useState<DetailedPlayerItem | null>(null)
  const [shouldShowPlayerDetail, setShouldShowPlayerDetail] = React.useState(false)

  const handleChange = React.useCallback(
    (_e: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue)
    },
    [setActiveTab]
  )

  const handleShowPlayerDetail = React.useCallback(
    async (handleType: 'show' | 'close', player?: MarketPlayerItemListing) => {
      const open = handleType === 'show'
      let playerDetail = null

      if (open && player) {
        playerDetail = await fetchPlayer(player.item.uuid).unwrap()
      }

      setShouldShowPlayerDetail(open)
      setSelectedPlayer(playerDetail)
    },
    [fetchPlayer]
  )

  return (
    <>
      <Box sx={{ pl: '55px', pr: '15px' }}>
        <Tabs value={activeTab} onChange={handleChange} centered>
          <Tab label="Main Squad" {...a11yProps(0)} />
          <Tab label="Pitchers" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={activeTab} index={0}>
          <Main
            squad={squad}
            onDrop={onDrop}
            onRemove={onRemove}
            onShowPlayerDetail={handleShowPlayerDetail}
          />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>
          <Pitchers
            bullpen={bullpen}
            startingPitchingRotation={startingPitchingRotation}
            mainSP={squad['MAIN_SP']}
            onDrop={onDrop}
            onRemove={onRemove}
            onShowPlayerDetail={handleShowPlayerDetail}
          />
        </CustomTabPanel>
      </Box>
      <Dialog
        open={shouldShowPlayerDetail && !isPlayerDetailError}
        onClose={() => handleShowPlayerDetail('close')}>
        {isFetchingå ? (
          <DialogContent>Loading...</DialogContent>
        ) : (
          <>
            <DialogTitle>{`${selectedPlayer?.name} ` ?? ''}Player Details</DialogTitle>
            <CloseIconButton onClose={() => handleShowPlayerDetail('close')} />
            <DialogContent dividers>
              {selectedPlayer?.name}, {selectedPlayer?.ovr}
            </DialogContent>
            <DialogActions></DialogActions>
          </>
        )}
      </Dialog>
    </>
  )
}

export default Squad

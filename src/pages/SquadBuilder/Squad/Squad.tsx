import { Box, Dialog, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material'
import * as React from 'react'

import CloseIconButton from '@components/CloseIconButton'
import CustomTabPanel from '@components/CustomTabPanel'
import PlayerDetail from '@components/PlayerDetail'
import { SelectedPlayer } from '@components/PlayerDetail/types'
import MarketplaceModal from '@components/Search/MarketplaceModal'
import { a11yProps } from '@components/helpers'
import {
  useFetchPlayerItemDetailsMutation,
  MarketPlayerItemListing,
} from '@services/marketListings'
import type {
  Bullpen,
  Position,
  SquadBuild,
  StartingPitchingRotation,
} from '@services/squadBuilder'

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
  const [fetchPlayerItemDetails, { isError: isPlayerDetailError, isLoading: isFetchingå }] =
    useFetchPlayerItemDetailsMutation()

  const [activeTab, setActiveTab] = React.useState(0)
  const [selectedPlayer, setSelectedPlayer] = React.useState<SelectedPlayer | null>(null)
  const [selectedPosition, setSelectedPosition] = React.useState<Position | string>('')
  const [shouldShowPlayerDetail, setShouldShowPlayerDetail] = React.useState(false)
  const [shouldShowMarketplaceSearch, setShouldShowMarketplaceSearch] = React.useState(false)

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
        playerDetail = await fetchPlayerItemDetails(player.item.uuid).unwrap()
      }

      setShouldShowPlayerDetail(open)
      setSelectedPlayer({
        ...(playerDetail ?? {}),
        ['buy_now']: player?.best_buy_price ?? 0,
        ['sell_now']: player?.best_buy_price ?? 0,
      } as SelectedPlayer)
    },
    [fetchPlayerItemDetails]
  )

  const handleOnPositionSearch = React.useCallback(
    (positionSelected: Position) => {
      if (selectedPosition !== positionSelected) {
        setSelectedPosition(positionSelected)
      }

      setShouldShowMarketplaceSearch(true)
    },
    [selectedPosition]
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
            onPositionSearch={handleOnPositionSearch}
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
            onPositionSearch={handleOnPositionSearch}
            onRemove={onRemove}
            onShowPlayerDetail={handleShowPlayerDetail}
          />
        </CustomTabPanel>
      </Box>
      <Dialog
        open={shouldShowPlayerDetail && !isPlayerDetailError && !shouldShowMarketplaceSearch}
        onClose={() => handleShowPlayerDetail('close')}
        maxWidth="lg">
        {isFetchingå ? (
          <DialogContent>Loading...</DialogContent>
        ) : (
          <>
            <DialogTitle>{`${selectedPlayer?.name} ` ?? ''}Player Details</DialogTitle>
            <CloseIconButton onClose={() => handleShowPlayerDetail('close')} />
            <DialogContent dividers>
              <PlayerDetail player={selectedPlayer} />
            </DialogContent>
          </>
        )}
      </Dialog>
      <MarketplaceModal
        position={selectedPosition}
        isOpen={shouldShowMarketplaceSearch && !shouldShowPlayerDetail}
        onModalClose={() => setShouldShowMarketplaceSearch(false)}
      />
    </>
  )
}

export default Squad

import { Box, Dialog, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CloseIconButton from '@components/CloseIconButton'
import CustomTabPanel from '@components/CustomTabPanel'
import PlayerDetail from '@components/PlayerDetail'
import { SelectedPlayer } from '@components/PlayerDetail/types'
import MarketplaceModal from '@components/modals/MarketplaceModal'
import { a11yProps } from '@components/helpers'
import { State } from '@reducers'
import {
  useFetchPlayerItemDetailsMutation,
  MarketPlayerItemListing,
} from '@services/marketListings'
import type { Position } from '@services/squadBuilder'
import * as squadBuilderService from '@services/squadBuilder'

import Main from './Main'
import Pitchers from './Pitchers'
import { onPlayerCardAdd, onPlayerCardDrop, onPositionClear } from './utils'
import type { OnDrop, OnRemove } from '../types'

const Squad = () => {
  const dispatch = useDispatch()

  const [fetchPlayerItemDetails, { isError: isPlayerDetailError, isLoading: isFetchingå }] =
    useFetchPlayerItemDetailsMutation()

  const { bullpen, squad, startingPitchingRotation } = useSelector((state: State) =>
    squadBuilderService.getSquadBuild(state)
  )

  const [activeTab, setActiveTab] = React.useState(0)
  const [selectedPlayer, setSelectedPlayer] = React.useState<SelectedPlayer | null>(null)
  const [selectedPosition, setSelectedPosition] = React.useState<Position | string>('')
  const [shouldShowPlayerDetail, setShouldShowPlayerDetail] = React.useState(false)
  const [shouldShowMarketplaceSearch, setShouldShowMarketplaceSearch] = React.useState(false)

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
        marketItem: player,
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

  const handleOnCardAdd = React.useCallback(
    (player: MarketPlayerItemListing) => {
      if (selectedPosition !== '') {
        onPlayerCardAdd(dispatch, player, selectedPosition as Position)
      }
    },
    [selectedPosition, dispatch]
  )
  const handleOnCardDrop = React.useCallback(
    (onDropProp: OnDrop) => {
      onPlayerCardDrop(dispatch, onDropProp)
    },
    [dispatch]
  )
  const handleOnPositionClear = React.useCallback(
    (onRemoveProp: OnRemove) => {
      onPositionClear(dispatch, onRemoveProp)
    },
    [dispatch]
  )

  return (
    <>
      <Box sx={{ pl: '55px', pr: '15px' }}>
        <Tabs value={activeTab} onChange={(_e, value) => setActiveTab(value)} centered>
          <Tab label="Main Squad" {...a11yProps(0)} />
          <Tab label="Pitchers" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={activeTab} index={0}>
          <Main
            squad={squad}
            onDrop={handleOnCardDrop}
            onPositionSearch={handleOnPositionSearch}
            onRemove={handleOnPositionClear}
            onShowPlayerDetail={handleShowPlayerDetail}
          />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>
          <Pitchers
            bullpen={bullpen}
            startingPitchingRotation={startingPitchingRotation}
            mainSP={squad['MAIN_SP']}
            onDrop={handleOnCardDrop}
            onPositionSearch={handleOnPositionSearch}
            onRemove={handleOnPositionClear}
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
        onAdd={handleOnCardAdd}
        onModalClose={() => setShouldShowMarketplaceSearch(false)}
      />
    </>
  )
}

export default Squad

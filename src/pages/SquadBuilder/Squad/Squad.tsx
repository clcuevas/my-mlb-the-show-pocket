import { Box, Tab, Tabs } from '@mui/material'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CustomTabPanel from '@components/CustomTabPanel'
import PlayerDetailModal from '@components/modals/PlayerDetailModal'
import MarketplaceSearchModal from '@components/modals/marketplace/MarketplaceSearchModal'
import { a11yProps } from '@components/helpers'
import { State } from '@reducers'
import type { Position } from '@services/squadBuilder'
import * as squadBuilderService from '@services/squadBuilder'

import Main from './Main'
import Pitchers from './Pitchers'
import { onPlayerCardAdd, onPlayerCardDrop, onPositionClear } from './utils'
import type { OnDrop, OnRemove } from '../types'

const Squad = () => {
  const dispatch = useDispatch()

  const { bullpen, squad, startingPitchingRotation } = useSelector((state: State) =>
    squadBuilderService.getSquadBuild(state)
  )

  const [activeTab, setActiveTab] = React.useState(0)
  // This state variable is used to display a player card's details and the player
  // data is passed to the PlayerDetailModal. It is set by the callback we pass to
  // the <Position /> component to view additional player details when the "details"
  // button is clicked which is made available during a player onHover event.
  const [selectedPlayer, setSelectedPlayer] =
    React.useState<squadBuilderService.SquadBuildPlayer | null>(null)
  // Maybe a better name for this state variable is "selectedPositionSearchParams" since
  // we're using this object or data to apply the appropriate Marketplace search params
  // in the form and using this data to also add the player card to a certain position.
  const [selectedPositionSquadType, setSelectedPositionSquadType] = React.useState<{
    positionSelected: Position
    squadType: squadBuilderService.SquadType
    index?: number
  } | null>(null)

  const [shouldShowPlayerDetail, setShouldShowPlayerDetail] = React.useState(false)
  const [shouldShowMarketplaceSearch, setShouldShowMarketplaceSearch] = React.useState(false)

  const handleShowPlayerDetail = React.useCallback(
    async (handleType: 'show' | 'close', player?: squadBuilderService.SquadBuildPlayer) => {
      const open = handleType === 'show'

      if (player != null && open) {
        setSelectedPlayer(player)
      }

      setShouldShowPlayerDetail(open)
    },
    []
  )

  const handleOnPositionSearch = React.useCallback(
    (positionSelected: Position, squadType: squadBuilderService.SquadType, index?: number) => {
      if (
        selectedPositionSquadType?.positionSelected !== positionSelected ||
        selectedPositionSquadType?.index !== index
      ) {
        setSelectedPositionSquadType({
          positionSelected,
          squadType,
          ...(index != null ? { index } : {}),
        })
      }

      setShouldShowMarketplaceSearch(true)
    },
    [
      selectedPositionSquadType?.index,
      selectedPositionSquadType?.positionSelected,
      setSelectedPositionSquadType,
    ]
  )

  const handleOnCardAdd = React.useCallback(
    (player: squadBuilderService.SquadBuildPlayer) => {
      if (selectedPositionSquadType !== null) {
        onPlayerCardAdd(dispatch, { ...selectedPositionSquadType, player })
      }
    },
    [selectedPositionSquadType, dispatch]
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
      <PlayerDetailModal
        isOpen={shouldShowPlayerDetail && !shouldShowMarketplaceSearch}
        onClose={() => handleShowPlayerDetail('close')}
        player={selectedPlayer}
      />
      <MarketplaceSearchModal
        position={selectedPositionSquadType?.positionSelected ?? ''}
        isOpen={shouldShowMarketplaceSearch && !shouldShowPlayerDetail}
        onAdd={handleOnCardAdd}
        onModalClose={() => setShouldShowMarketplaceSearch(false)}
      />
    </>
  )
}

export default Squad

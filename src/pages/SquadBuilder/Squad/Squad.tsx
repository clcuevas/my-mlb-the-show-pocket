import { Box, Tab, Tabs } from '@mui/material'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CustomTabPanel from '@components/CustomTabPanel'
import PlayerDetailModal from '@components/modals/PlayerDetailModal'
import MarketplaceModal from '@components/modals/MarketplaceModal'
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
  const [selectedPlayer, setSelectedPlayer] =
    React.useState<squadBuilderService.SquadBuildPlayer | null>(null)
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
      <MarketplaceModal
        position={selectedPositionSquadType?.positionSelected ?? ''}
        isOpen={shouldShowMarketplaceSearch && !shouldShowPlayerDetail}
        onAdd={handleOnCardAdd}
        onModalClose={() => setShouldShowMarketplaceSearch(false)}
      />
    </>
  )
}

export default Squad

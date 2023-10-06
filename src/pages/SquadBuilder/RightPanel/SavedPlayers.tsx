import { List, ListItem, Typography } from '@mui/material'
import * as React from 'react'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import SmallCard from '@components/cards/SmallCard'
import { State } from '@reducers'
import type { MarketPlayerItemListing } from '@services/marketListings'
import * as squadBuilderService from '@services/squadBuilder'

const Style = {
  Container: styled.div`
    height: 90vh;
    margin-top: 25px;
    overflow-y: scroll;
  `,
  ListItem: styled(ListItem)`
    flex-direction: column;
    align-items: flex-start;

    padding-left: 0px;

    &:hover .MuiPaper-root {
      cursor: grab;
    }
  `,
}

const calculatePlayerType = (player: MarketPlayerItemListing): string => {
  const position = player.item.display_position

  if (['RP', 'CP'].includes(position)) {
    return 'bullpen'
  } else if (position === 'SP') {
    return 'starting_rotation'
  }

  return 'main_squad'
}

const Player = ({ player }: { player: MarketPlayerItemListing }) => {
  const [_collectObj, dragRef] = useDrag(
    () => ({
      type: calculatePlayerType(player),
      item: { id: player.item.uuid, player },
      collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }),
    []
  )

  return (
    <Style.ListItem ref={dragRef}>
      <SmallCard player={player} />
    </Style.ListItem>
  )
}

const SavedPlayers = () => {
  const { savedPlayers } = useSelector((state: State) => squadBuilderService.getSquadBuild(state))

  return (
    <Style.Container>
      {savedPlayers.length === 0 ? (
        <Typography variant="body2">No saved players</Typography>
      ) : (
        <List disablePadding>
          {savedPlayers.map((player) => (
            <Player key={`saved-player-item-${player.item.uuid}`} player={player} />
          ))}
        </List>
      )}
    </Style.Container>
  )
}

export default SavedPlayers

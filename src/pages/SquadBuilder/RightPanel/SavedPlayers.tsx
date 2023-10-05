import { List, ListItem } from '@mui/material'
import * as React from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import SmallCard from '@components/cards/SmallCard'
import type { MarketPlayerItemListing } from '@services/marketListings'

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

type Props = {
  savedPlayers: MarketPlayerItemListing[]
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

const SavedPlayers = ({ savedPlayers }: Props) => {
  return (
    <Style.Container>
      <List disablePadding>
        {savedPlayers.map((player) => (
          <Player key={`saved-player-item-${player.item.uuid}`} player={player} />
        ))}
      </List>
    </Style.Container>
  )
}

export default SavedPlayers

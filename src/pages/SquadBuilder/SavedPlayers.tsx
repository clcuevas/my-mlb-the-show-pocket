import { List, ListItem, Typography } from '@mui/material'
import * as React from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import type { MarketPlayerItemListing } from '@services/marketListings'

const Style = {
  Container: styled.div``,
  List: styled(List)`
    max-height: 90vh;
    overflow-y: auto;
  `,
  ListItem: styled(ListItem)`
    flex-direction: column;
    align-items: flex-start;

    padding-left: 0px;

    &:hover {
      cursor: grab;
    }
  `,
  ListItemPrimaryText: styled.div``,
  ListItemSubText: styled.div``,
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
      <Style.ListItemPrimaryText>
        {player.item.name}, {player.item.display_position}
      </Style.ListItemPrimaryText>
      <Style.ListItemSubText>Overall {player.item.ovr}</Style.ListItemSubText>
    </Style.ListItem>
  )
}

const SavedPlayers = ({ savedPlayers }: Props) => {
  return (
    <Style.Container>
      <Typography variant="h5">Saved Players</Typography>
      <Style.List disablePadding>
        {savedPlayers.map((player) => (
          <Player key={`saved-player-item-${player.item.uuid}`} player={player} />
        ))}
      </Style.List>
    </Style.Container>
  )
}

export default SavedPlayers

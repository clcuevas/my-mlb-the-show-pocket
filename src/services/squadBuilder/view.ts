import { State } from '@reducers'
import { MarketPlayerItemListing } from '@services/marketListings'

export const getSquadBuild = (state: State) => state.squad

// Check if a player has been added to the "savedPlayers" list
export const isSavedPlayer = (
  state: State,
  player: MarketPlayerItemListing | null | undefined
): boolean => {
  if (player == null) {
    return false
  }

  const savedPlayers = getSquadBuild(state).savedPlayers
  // Immediately exits when it finds the first match (i.e. truthy)
  return savedPlayers.some((savedPlayer) => savedPlayer.item.uuid === player.item.uuid)
}

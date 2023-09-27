import { SelectedPlayer } from '@components/PlayerDetail/types'

export const pitchingStats = [
  'stamina',
  'pitching_clutch',
  'hits_per_bf',
  'k_per_bf',
  'bb_per_bf',
  'hr_per_bf',
  'pitch_velocity',
  'pitch_control',
  'pitch_movement',
]

export const battingStats = [
  'contact_left',
  'contact_right',
  'power_left',
  'power_right',
  'plate_vision',
  'plate_discipline',
  'batting_clutch',
  'bunting_ability',
  'drag_bunting_ability',
  'hitting_durability',
]

export const fieldingStats = [
  'fielding_durability',
  'fielding_ability',
  'arm_strength',
  'arm_accuracy',
  'reaction_time',
  'blocking',
]

export const runningStats = ['speed', 'baserunning_ability', 'baserunning_aggression']

export const getTopStats = (player: SelectedPlayer, numOfTopStats = 5) => {
  const isPitcher = !player['is_hitter']
  const data = Object.entries(player)
    .map(([key, value]) => {
      if (isPitcher && pitchingStats.includes(key)) {
        return [key, value]
      } else if (
        !isPitcher &&
        (fieldingStats.includes(key) || battingStats.includes(key) || runningStats.includes(key))
      ) {
        return [key, value]
      }
    })
    // Get rid of undefined values and only return items of 90 or higher
    .filter((item) => item != null && item[1] >= 90)
    // Sort in descending order (i.e. highest to lowest)
    .sort((prevItem, currentItem) => {
      if (prevItem != null && currentItem != null && prevItem[1] >= currentItem[1]) {
        return -1
      } else if (prevItem != null && currentItem != null && currentItem[1] > prevItem[1]) {
        return 1
      }

      return 0
    })
    .slice(0, numOfTopStats)

  return data
}

export const constructStatLabel = (key: string) => {
  const labelItems = key.split('_').map((item) => `${item.charAt(0).toUpperCase()}${item.slice(1)}`)
  return labelItems.length > 0 ? labelItems.join(' ') : labelItems[0]
}

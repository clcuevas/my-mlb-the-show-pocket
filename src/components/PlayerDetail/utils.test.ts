import { describe, expect, test } from 'vitest'
import { getTopStats } from './utils'
import { DetailedPlayerItem } from '@services/types'

const mockedCommonPlayerInfor = {
  uuid: '123',
  type: 'mlb_card',
  img: '',
  ['augmented_end_date']: null,
  ['augmented_text']: null,
  ['baked_img']: '',
  ['display_position']: 'SS',
  event: false,
  ['has_augment']: false,
  ['has_matchup']: false,
  ['has_rank_change']: false,
  ['is_live_set']: true,
  name: 'Jean Claude',
  ['new_rank']: 99,
  ovr: 95,
  rarity: 'Diamond' as const,
  ['sc_baked_img']: null,
  series: 'Live Series',
  ['series_texture_name']: 'Live Series',
  ['series_year']: 2023,
  ['set_name']: 'Live Series',
  stars: null,
  team: 'Anaheim Angels',
  ['team_short_name']: 'AA',
  trend: null,
  ['ui_anim_index']: 0,
}

const mockedPlayer: DetailedPlayerItem = {
  ...mockedCommonPlayerInfor,
  display_secondary_positions: '2B',
  jersey_number: '5',
  age: 21,
  bat_hand: 'R',
  throw_hand: 'R',
  weight: '205 lbs',
  height: `6'2"`,
  born: 'California',
  is_hitter: true,
  stamina: 75,
  pitching_clutch: 0,
  ['hits_per_bf']: 0,
  ['k_per_bf']: 0,
  ['bb_per_bf']: 0,
  ['hr_per_bf']: 0,
  ['pitch_velocity']: 55,
  ['pitch_control']: 25,
  ['pitch_movement']: 10,
  ['contact_left']: 110,
  ['contact_right']: 105,
  ['power_left']: 80,
  ['power_right']: 75,
  ['plate_vision']: 85,
  ['plate_discipline']: 90,
  ['batting_clutch']: 100,
  ['bunting_ability']: 35,
  ['drag_bunting_ability']: 35,
  ['hitting_durability']: 65,
  ['fielding_durability']: 85,
  ['fielding_ability']: 85,
  ['arm_strength']: 85,
  ['arm_accuracy']: 80,
  ['reaction_time']: 85,
  ['blocking']: 10,
  ['speed']: 75,
  ['baserunning_ability']: 75,
  ['baserunning_aggression']: 80,
  ['hit_rank_image']: '',
  ['fielding_rank_image']: '',
  pitches: [],
  quirks: [],
  ['is_sellable']: true,
}

describe('utils', () => {
  describe('getTopStats', () => {
    test('should return player stats >= 90 when player is a position player', () => {
      const response = getTopStats(mockedPlayer)

      expect(response).toStrictEqual([
        ['contact_left', mockedPlayer.contact_left],
        ['contact_right', mockedPlayer.contact_right],
        ['batting_clutch', mockedPlayer.batting_clutch],
        ['plate_discipline', mockedPlayer.plate_discipline],
        ['reaction_time', mockedPlayer.reaction_time],
      ])
      expect(mockedPlayer.is_hitter).toBe(true)
    })
  })
})

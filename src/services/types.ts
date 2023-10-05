/**
 * Only global types should be added here that are shared
 * across all services that are declared.
 */

export type Pitch = {
  name: string
  speed: number
  control: number
  movement: number
}

export type Quirk = {
  name: string
  description: string
  img: string
}

export type Rarity = 'Diamond' | 'Gold' | 'Silver' | 'Bronze' | 'Common'
export type BatHand = 'L' | 'R' | 'S'
export type ThrowHand = 'L' | 'R'

export interface CommonPlayerInfo {
  uuid: string
  type: string
  img: string
  ['augmented_end_date']: string | null | undefined
  ['augmented_text']: string | null | undefined
  ['baked_img']: string
  ['display_position']: string
  event: boolean
  ['has_augment']: boolean
  ['has_matchup']: boolean
  ['has_rank_change']: boolean
  ['is_live_set']: boolean
  name: string
  ['new_rank']: number
  ovr: number
  rarity: Rarity
  ['sc_baked_img']: string | null | undefined
  series: string
  ['series_texture_name']: string
  ['series_year']: number
  ['set_name']: string
  stars: string | null | undefined
  team: string
  ['team_short_name']: string
  trend: string | null | undefined
  ['ui_anim_index']: number
}

export interface DetailedPlayerItem extends CommonPlayerInfo {
  ['display_secondary_positions']: string
  ['jersey_number']: string
  age: number
  ['bat_hand']: BatHand
  ['throw_hand']: ThrowHand
  weight: string
  height: string
  born: string
  ['is_hitter']: boolean
  stamina: number
  ['pitching_clutch']: number
  ['hits_per_bf']: number
  ['k_per_bf']: number
  ['bb_per_bf']: number
  ['hr_per_bf']: number
  ['pitch_velocity']: number
  ['pitch_control']: number
  ['pitch_movement']: number
  ['contact_left']: number
  ['contact_right']: number
  ['power_left']: number
  ['power_right']: number
  ['plate_vision']: number
  ['plate_discipline']: number
  ['batting_clutch']: number
  ['bunting_ability']: number
  ['drag_bunting_ability']: number
  ['hitting_durability']: number
  ['fielding_durability']: number
  ['fielding_ability']: number
  ['arm_strength']: number
  ['arm_accuracy']: number
  ['reaction_time']: number
  ['blocking']: number
  ['speed']: number
  ['baserunning_ability']: number
  ['baserunning_aggression']: number
  ['hit_rank_image']: string
  ['fielding_rank_image']: string
  pitches: Pitch[]
  quirks: Quirk[]
  ['is_sellable']: boolean
}

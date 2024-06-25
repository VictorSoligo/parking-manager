export interface Booking {
  id: string
  started_at: string
  ended_at: null | string
  car_plate: string
  parking_id: string
  space_id: string
  space_identification: string
  cost_per_hour_in_cents: string
  cost_in_cents: string | null
  is_finished: '0' | '1'
  created_at: string
  updated_at: string
}

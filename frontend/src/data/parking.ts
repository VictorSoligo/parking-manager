import { api } from '../lib/axios'
import { Parking } from '../types/parking.types'

type GetParkingResponse = Parking

export async function getParking() {
  const { data } = await api.get<GetParkingResponse>('/parkings/info')

  return data
}

interface EditParkingRequest {
  name: string
  costPerHourInCents: number
}

export async function editParking({
  costPerHourInCents,
  name,
}: EditParkingRequest) {
  await api.put('/parkings', {
    name,
    cost_per_hour_in_cents: costPerHourInCents,
  })
}

interface CreateParkingRequest {
  name: string
  totalSpots: number
  hourlyRate: number
  manager: string
}

export async function createParking({
  name,
  totalSpots,
  hourlyRate,
  manager,
}: CreateParkingRequest) {
  await api.post('/parkings', {
    name,
    total_spots: totalSpots,
    hourly_rate: hourlyRate,
    manager,
  })
}

import { api } from '../lib/axios'
import { Parking } from '../types/parking.types'

type FetchParkingsResponse = Parking[]

export async function fetchParkings() {
  const { data } = await api.get<FetchParkingsResponse>('/parkings')

  return data
}

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
  costPerHourInCents: number
}

export async function createParking({
  name,
  costPerHourInCents,
}: CreateParkingRequest) {
  await api.post('/parkings', {
    name,
    cost_per_hour_in_cents: costPerHourInCents,
  })
}

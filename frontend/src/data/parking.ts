import { api } from '../lib/axios'

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

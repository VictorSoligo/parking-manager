import { api } from '../lib/axios'
import { Booking } from '../types/booking.types'

type FetchActiveBookingsResponse = Booking[]

export async function fetchActiveBookings() {
  const { data } = await api.get<FetchActiveBookingsResponse>(
    '/parkings/bookings/active',
  )

  return data
}

type FetchFinishedBookingsResponse = Booking[]

export async function fetchFinishedBookings() {
  const { data } = await api.get<FetchFinishedBookingsResponse>(
    '/parkings/bookings/finished',
  )

  return data
}

interface CreateBookingRequest {
  carPlate: string
  spaceId: number
}

export async function createBooking({
  carPlate,
  spaceId,
}: CreateBookingRequest) {
  await api.post('/parkings/bookings', {
    car_plate: carPlate,
    space_id: spaceId,
  })
}

interface ExitBookingRequest {
  carPlate: string
}

export async function exitBooking({ carPlate }: ExitBookingRequest) {
  await api.post('/parkings/bookings/exit', {
    car_plate: carPlate,
  })
}

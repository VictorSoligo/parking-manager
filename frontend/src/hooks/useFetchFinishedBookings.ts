import { useQuery } from '@tanstack/react-query'
import { fetchFinishedBookings } from '../data/booking'

export function useFetchFinishedBookings() {
  const query = useQuery({
    queryKey: ['finished-bookings'],
    queryFn: fetchFinishedBookings,
  })

  return query
}

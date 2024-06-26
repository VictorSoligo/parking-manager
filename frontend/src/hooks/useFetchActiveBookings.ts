import { useQuery } from '@tanstack/react-query'
import { fetchActiveBookings } from '../data/booking'

export function useFetchActiveBookings() {
  const query = useQuery({
    queryKey: ['active-bookings'],
    queryFn: fetchActiveBookings,
  })

  return query
}

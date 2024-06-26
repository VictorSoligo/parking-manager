import { useQuery } from '@tanstack/react-query'
import { fetchParkings } from '../data/parking'

export function useFetchParkings() {
  const query = useQuery({
    queryKey: ['parkings'],
    queryFn: fetchParkings,
  })

  return query
}

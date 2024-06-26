import { useQuery } from '@tanstack/react-query'
import { fetchAvailableSpaces } from '../data/space'

export function useFetchAvailableSpaces() {
  const query = useQuery({
    queryKey: ['available-parking-spaces'],
    queryFn: fetchAvailableSpaces,
  })

  return query
}

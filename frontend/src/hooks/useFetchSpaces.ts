import { useQuery } from '@tanstack/react-query'
import { fetchSpaces } from '../data/space'

export function useFetchSpaces() {
  const query = useQuery({
    queryKey: ['parking-spaces'],
    queryFn: fetchSpaces,
  })

  return query
}

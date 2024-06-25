import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../data/user'

export function useFetchUsers() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  return query
}

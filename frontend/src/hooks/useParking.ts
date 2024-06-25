import { useQuery } from '@tanstack/react-query'
import { getParking } from '../data/parking'
import { useAuth } from './useAuth'

export function useParking() {
  const { user } = useAuth()

  const query = useQuery({
    queryKey: ['parking'],
    queryFn: getParking,
    enabled: user ? user.role === 'manager' : false,
  })

  return query
}

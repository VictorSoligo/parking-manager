import { useQuery } from '@tanstack/react-query'
import { getFinancialReport } from '../data/financial'

export function useFetchFinancialReport() {
  const query = useQuery({
    queryKey: ['financial-report'],
    queryFn: getFinancialReport,
  })

  return query
}

import { api } from '../lib/axios'

interface GetFinancialReportResponse {
  total_revenue_in_cents: string
  month_revenue_in_cents: string
  day_revenue_in_cents: string
}

export async function getFinancialReport() {
  const { data } = await api.get<GetFinancialReportResponse>(
    '/parkings/financial',
  )

  return data
}

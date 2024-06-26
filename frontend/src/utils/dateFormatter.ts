import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

interface DateFormatterParams {
  date: Date | string
  format?: string
  formatInLocalTimezone?: boolean
}

export function dateFormatter({
  date,
  format = 'DD/MM/YYYY',
  formatInLocalTimezone = false,
}: DateFormatterParams) {
  return dayjs(date).utc(formatInLocalTimezone).format(format)
}

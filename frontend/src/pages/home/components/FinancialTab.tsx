import { Table, Thead, Tr, Th, Tbody, Td, Box, Text } from '@chakra-ui/react'
import { costFormatter } from '../../../utils/costFormatter'
import { dateFormatter } from '../../../utils/dateFormatter'
import { useFetchFinishedBookings } from '../../../hooks/useFetchFinishedBookings'
import { Card } from './Card'
import { useFetchFinancialReport } from '../../../hooks/useFetchFinancialReport'

export const FinancialTab = () => {
  const { data: bookings, isLoading } = useFetchFinishedBookings()
  const { data: report, isLoading: isLoadingReport } = useFetchFinancialReport()

  return (
    <>
      {isLoadingReport && <Text mb="4">Carregando receita...</Text>}

      {!isLoadingReport && report && (
        <Box mb="8" display="flex" gap="4">
          <Card>
            <Text mb="2" fontWeight="bold">
              Receita do dia
            </Text>

            <Text>{costFormatter(report.day_revenue_in_cents)}</Text>
          </Card>

          <Card>
            <Text fontWeight="bold" mb="2">
              Receita do mês
            </Text>

            <Text>{costFormatter(report.month_revenue_in_cents)}</Text>
          </Card>

          <Card>
            <Text mb="2" fontWeight="bold">
              Receita total
            </Text>

            <Text>{costFormatter(report.total_revenue_in_cents)}</Text>
          </Card>
        </Box>
      )}

      <Box
        w="100%"
        p={4}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Placa do carro</Th>
              <Th>Vaga</Th>
              <Th>Entrada</Th>
              <Th>Saída</Th>
              <Th>Custo por hora</Th>
              <Th>Custo total</Th>
            </Tr>
          </Thead>

          {isLoading && <Text>Carregando...</Text>}

          {!isLoading && bookings && (
            <Tbody>
              {bookings.map((booking) => (
                <Tr key={booking.id}>
                  <Td>{booking.car_plate}</Td>
                  <Td>{booking.space_identification}</Td>
                  <Td>
                    {dateFormatter({
                      date: booking.started_at,
                      formatInLocalTimezone: true,
                      format: 'DD/MM/YYYY HH:mm',
                    })}
                  </Td>
                  <Td>
                    {dateFormatter({
                      date: booking.ended_at ?? '',
                      formatInLocalTimezone: true,
                      format: 'DD/MM/YYYY HH:mm',
                    })}
                  </Td>
                  <Td>{costFormatter(booking.cost_per_hour_in_cents)}</Td>
                  <Td>{costFormatter(booking.cost_in_cents ?? '0')}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </Box>
    </>
  )
}

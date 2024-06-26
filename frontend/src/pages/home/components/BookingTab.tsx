import {
  Box,
  Button,
  Table,
  Tbody,
  Th,
  Thead,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { NewBookingModal } from './NewBookingModal'
import { useFetchActiveBookings } from '../../../hooks/useFetchActiveBookings'
import { dateFormatter } from '../../../utils/dateFormatter'
import { costFormatter } from '../../../utils/costFormatter'

export const BookingTab = () => {
  const {
    isOpen: isBookingModalOpen,
    onOpen: onOpenBookingModal,
    onClose: onCloseBookingModal,
  } = useDisclosure()

  const { data: bookings, isLoading } = useFetchActiveBookings()

  return (
    <>
      <Button colorScheme="blue" onClick={onOpenBookingModal} mb={4}>
        Nova reserva
      </Button>

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
              <Th>Valor por hora</Th>
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
                    })}
                  </Td>
                  <Td>{costFormatter(booking.cost_per_hour_in_cents)}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </Box>

      <NewBookingModal
        isOpen={isBookingModalOpen}
        onClose={onCloseBookingModal}
      />
    </>
  )
}

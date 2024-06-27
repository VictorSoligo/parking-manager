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
import { RemoveVehicleModal } from './RemoveVehicleModal'

export const BookingTab = () => {
  const {
    isOpen: isBookingModalOpen,
    onOpen: onOpenBookingModal,
    onClose: onCloseBookingModal,
  } = useDisclosure()

  const {
    isOpen: isRemoveModalOpen,
    onOpen: onOpenRemoveModal,
    onClose: onCloseRemoveModal,
  } = useDisclosure()

  const { data: bookings, isLoading } = useFetchActiveBookings()

  return (
    <>
      <Box display="flex" flexDirection="row" gap="4" mb={4}>
        <Button colorScheme="blue" onClick={onOpenBookingModal}>
          Nova reserva
        </Button>

        <Button colorScheme="blue" onClick={onOpenRemoveModal}>
          Registrar saída
        </Button>
      </Box>

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
              <Th>Custo por hora</Th>
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

      <RemoveVehicleModal
        isOpen={isRemoveModalOpen}
        onClose={onCloseRemoveModal}
      />
    </>
  )
}

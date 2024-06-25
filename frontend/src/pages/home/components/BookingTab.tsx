import {
  Box,
  Button,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { NewBookingModal } from './NewBookingModal'

export const BookingTab = () => {
  const {
    isOpen: isBookingModalOpen,
    onOpen: onOpenBookingModal,
    onClose: onCloseBookingModal,
  } = useDisclosure()

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

          <Tbody></Tbody>
        </Table>
      </Box>

      <NewBookingModal
        isOpen={isBookingModalOpen}
        onClose={onCloseBookingModal}
      />
    </>
  )
}

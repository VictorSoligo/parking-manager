import {
  Button,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  useDisclosure,
} from '@chakra-ui/react'
import { NewParkingModal } from './NewParkingModal'

export const ParkingTab = () => {
  const {
    isOpen: isParkingModalOpen,
    onOpen: onOpenParkingModal,
    onClose: onCloseParkingModal,
  } = useDisclosure()

  return (
    <>
      <Button colorScheme="blue" onClick={onOpenParkingModal} mb={4}>
        Novo estacionamento
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
              <Th>ID</Th>
              <Th>Nome do Estacionamento</Th>
              <Th>Valor por Hora</Th>
            </Tr>
          </Thead>

          <Tbody></Tbody>
        </Table>
      </Box>

      <NewParkingModal
        isOpen={isParkingModalOpen}
        onClose={onCloseParkingModal}
      />
    </>
  )
}

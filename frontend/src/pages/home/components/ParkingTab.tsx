import {
  Button,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from '@chakra-ui/react'
import { NewParkingModal } from './NewParkingModal'

export const ParkingTab = () => {
  const parkings = []

  const {
    isOpen: isParkingModalOpen,
    onOpen: onOpenParkingModal,
    onClose: onCloseParkingModal,
  } = useDisclosure()

  return (
    <>
      <Button colorScheme="blue" onClick={onOpenParkingModal} mb={4}>
        Cadastrar Novo Estacionamento
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
              <Th>Nome do Estacionamento</Th>
              <Th>Valor por Hora</Th>
            </Tr>
          </Thead>

          <Tbody>
            {parkings.length > 0 ? (
              <>
                {parkings.map((parking) => (
                  <Tr key={parking.id}>
                    <Td>{parking.name}</Td>
                    <Td>R${parking.cost_per_hour_in_cents / 100}</Td>
                  </Tr>
                ))}
              </>
            ) : (
              <span>Nada</span>
            )}
          </Tbody>
        </Table>
      </Box>

      <NewParkingModal
        isOpen={isParkingModalOpen}
        onClose={onCloseParkingModal}
      />
    </>
  )
}

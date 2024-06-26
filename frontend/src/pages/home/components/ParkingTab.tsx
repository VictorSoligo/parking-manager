import {
  Button,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Text,
  Tbody,
  useDisclosure,
} from '@chakra-ui/react'
import { NewParkingModal } from './NewParkingModal'
import { useFetchParkings } from '../../../hooks/useFetchParkings'

export const ParkingTab = () => {
  const {
    isOpen: isParkingModalOpen,
    onOpen: onOpenParkingModal,
    onClose: onCloseParkingModal,
  } = useDisclosure()

  const { isLoading, data: parkings } = useFetchParkings()

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

          {isLoading && <Text>Carregando...</Text>}

          {!isLoading && parkings && (
            <Tbody>
              {parkings.map((parking) => (
                <Tr key={parking.id}>
                  <Td>{parking.id}</Td>
                  <Td>{parking.name}</Td>
                  <Td>{Number(parking.cost_per_hour_in_cents) / 100}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </Box>

      <NewParkingModal
        isOpen={isParkingModalOpen}
        onClose={onCloseParkingModal}
      />
    </>
  )
}

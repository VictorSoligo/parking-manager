import {
  Box,
  Button,
  Table,
  Tbody,
  Th,
  Thead,
  Text,
  Tr,
  useDisclosure,
  Td,
} from '@chakra-ui/react'
import { NewSpaceModal } from './NewSpaceModal'
import { useFetchSpaces } from '../../../hooks/useFetchSpaces'

export const ParkingSpaceTab = () => {
  const {
    isOpen: isSpaceModalOpen,
    onOpen: onOpenSpaceModal,
    onClose: onCloseSpaceModal,
  } = useDisclosure()

  const { data: spaces, isLoading } = useFetchSpaces()

  return (
    <>
      <Button colorScheme="blue" onClick={onOpenSpaceModal} mb={4}>
        Nova vaga
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
              <Th>Identificação</Th>
            </Tr>
          </Thead>

          {isLoading && <Text>Carregando...</Text>}

          {!isLoading && spaces && (
            <Tbody>
              {spaces.map((space) => (
                <Tr key={space.id}>
                  <Td>{space.id}</Td>
                  <Td>{space.identification}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </Box>

      <NewSpaceModal isOpen={isSpaceModalOpen} onClose={onCloseSpaceModal} />
    </>
  )
}

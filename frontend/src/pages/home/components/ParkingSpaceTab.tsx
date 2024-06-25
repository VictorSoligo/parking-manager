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
import { NewSpaceModal } from './NewSpaceModal'

export const ParkingSpaceTab = () => {
  const {
    isOpen: isSpaceModalOpen,
    onOpen: onOpenSpaceModal,
    onClose: onCloseSpaceModal,
  } = useDisclosure()

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
              <Th>Nome da Vaga</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </Box>

      <NewSpaceModal isOpen={isSpaceModalOpen} onClose={onCloseSpaceModal} />
    </>
  )
}

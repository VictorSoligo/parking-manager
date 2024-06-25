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
import { NewUserModal } from './NewUserModal'

export const UserTab = () => {
  const {
    isOpen: isUserModalOpen,
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
  } = useDisclosure()

  return (
    <>
      <Button colorScheme="blue" onClick={onOpenUserModal} mb={4}>
        Novo usuário
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
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </Box>

      <NewUserModal isOpen={isUserModalOpen} onClose={onCloseUserModal} />
    </>
  )
}

import {
  Button,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Text,
  Tbody,
  useDisclosure,
  Td,
} from '@chakra-ui/react'
import { NewUserModal } from './NewUserModal'
import { useFetchUsers } from '../../../hooks/useFetchUsers'

export const UserTab = () => {
  const {
    isOpen: isUserModalOpen,
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
  } = useDisclosure()

  const { data: users, isLoading } = useFetchUsers()

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

          {isLoading && <Text>Carregando...</Text>}

          {!isLoading && users && (
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role === 'admin' ? 'Admin' : 'Gerente'}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </Box>

      <NewUserModal isOpen={isUserModalOpen} onClose={onCloseUserModal} />
    </>
  )
}

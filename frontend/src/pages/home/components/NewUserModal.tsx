import { FC, FormEvent, useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'
import { useCreateUser } from '../../../hooks/useCreateUser'
import { useFetchParkings } from '../../../hooks/useFetchParkings'

interface NewUserModalProps {
  isOpen: boolean
  onClose: () => void
}

const parkingIdDefaulValue = -1

export const NewUserModal: FC<NewUserModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [parkingId, setParkingId] = useState(parkingIdDefaulValue)

  const { mutateAsync, isPending } = useCreateUser()
  const { isLoading: isLoadingParkings, data: parkings } = useFetchParkings()

  function clearForm() {
    setName('')
    setEmail('')
    setPassword('')
    setRole('admin')
    setParkingId(parkingIdDefaulValue)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!email || !name || !password) {
      return
    }

    if (role === 'manager' && parkingId === -1) {
      return
    }

    await mutateAsync({
      email,
      name,
      password,
      role,
      parkingId,
    })

    handleCloseForm()
  }

  function handleCloseForm() {
    clearForm()
    onClose()
  }

  useEffect(() => {
    if (role === 'admin') {
      setParkingId(parkingIdDefaulValue)
    }
  }, [role])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Cadastrar novo usuário</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>

              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="manager">Gerente</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Estacionamento</FormLabel>

              <Select
                value={parkingId}
                disabled={isLoadingParkings || role === 'admin'}
                onChange={(e) => setParkingId(Number(e.target.value))}
              >
                <option value={-1}>Selecione um estacionamento</option>

                {parkings && (
                  <>
                    {parkings.map((parking) => (
                      <option value={parking.id} key={parking.id}>
                        {parking.name}
                      </option>
                    ))}
                  </>
                )}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" gap="4">
            <Button type="button" onClick={handleCloseForm}>
              Cancelar
            </Button>

            <Button colorScheme="blue" type="submit" isLoading={isPending}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

import React, { FormEvent, useState } from 'react'
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

interface NewUserModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewUserModal: React.FC<NewUserModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')

  const { mutateAsync, isPending } = useCreateUser()

  function clearForm() {
    setName('')
    setEmail('')
    setPassword('')
    setRole('admin')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    await mutateAsync({
      email,
      name,
      password,
      role,
    })

    clearForm()
    onClose()
  }

  function handleCloseForm() {
    clearForm()
    onClose()
  }

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

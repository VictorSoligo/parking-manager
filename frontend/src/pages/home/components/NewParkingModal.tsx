import { useState, FC, FormEvent } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useCreateParking } from '../../../hooks/useCreateParking'

interface NewParkingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewParkingModal: FC<NewParkingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('')

  const { mutateAsync, isPending } = useCreateParking()

  function clearForm() {
    setName('')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!name) {
      return
    }

    await mutateAsync({
      name,
    })

    handleCloseForm()
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
          <ModalHeader>Cadastrar estacionamento</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel>Nome do Estacionamento</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" gap="4">
            <Button onClick={handleCloseForm} type="button">
              Cancelar
            </Button>

            <Button colorScheme="blue" isLoading={isPending} type="submit">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

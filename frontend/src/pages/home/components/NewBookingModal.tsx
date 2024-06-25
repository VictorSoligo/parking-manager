import { FC, useState } from 'react'
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
} from '@chakra-ui/react'

interface NewBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewBookingModal: FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('')

  const handleSave = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Nova reserva</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel>Nome da Vaga</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome da vaga"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Salvar
          </Button>

          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

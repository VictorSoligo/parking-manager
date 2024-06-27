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
} from '@chakra-ui/react'
import { useCreateSpace } from '../../../hooks/useCreateSpace'

interface NewSpaceModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewSpaceModal: React.FC<NewSpaceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [identification, setIdentification] = useState('')
  const { mutateAsync, isPending } = useCreateSpace()

  function clearForm() {
    setIdentification('')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!identification) {
      return
    }

    await mutateAsync({ identification })

    handleCloseForm()
  }

  function handleCloseForm() {
    clearForm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Cadastrar nova vaga</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel>Nome da Vaga</FormLabel>
              <Input
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
                placeholder="Identificação da vaga"
              />
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

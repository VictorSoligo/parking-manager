import { FC, FormEvent, useState } from 'react'
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
import { useFetchAvailableSpaces } from '../../../hooks/useFetchAvailableSpaces'
import { useCreateBooking } from '../../../hooks/useCreateBooking'

interface NewBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewBookingModal: FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [carPlate, setCarPlate] = useState('')
  const [spaceId, setSpaceId] = useState(-1)

  const { isLoading: isLoadingSpaces, data: spaces } = useFetchAvailableSpaces()

  const { isPending, mutateAsync } = useCreateBooking()

  function clearForm() {
    setCarPlate('')
    setSpaceId(-1)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!carPlate || spaceId === -1) {
      return
    }

    await mutateAsync({
      carPlate,
      spaceId,
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
          <ModalHeader>Nova reserva</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel>Placa do carro</FormLabel>

              <Input
                value={carPlate}
                onChange={(e) => setCarPlate(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Vaga</FormLabel>

              <Select
                value={spaceId}
                disabled={isLoadingSpaces}
                onChange={(e) => setSpaceId(Number(e.target.value))}
              >
                <option value={-1}>Selecione uma vaga</option>

                {spaces && (
                  <>
                    {spaces.map((space) => (
                      <option key={space.id} value={space.id}>
                        {space.identification}
                      </option>
                    ))}
                  </>
                )}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" gap="4">
            <Button onClick={handleCloseForm} type="button">
              Cancelar
            </Button>

            <Button colorScheme="blue" type="submit" disabled={isPending}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

import { FC, FormEvent, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useFetchActiveBookings } from '../../../hooks/useFetchActiveBookings'
import { useFinishBooking } from '../../../hooks/useFinishBooking'

interface RemoveVehicleModalProps {
  isOpen: boolean
  onClose: () => void
}

export const RemoveVehicleModal: FC<RemoveVehicleModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [carPlate, setCarPlate] = useState('')

  const { data: bookings, isLoading: isLoadingActiveBookings } =
    useFetchActiveBookings()

  const { isPending, mutateAsync } = useFinishBooking()

  function clearForm() {
    setCarPlate('')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!carPlate) {
      return
    }

    await mutateAsync({
      carPlate,
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
          <ModalHeader>Confirmar Saída</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Placa do carro</FormLabel>

              <Select
                value={carPlate}
                disabled={isLoadingActiveBookings}
                onChange={(e) => setCarPlate(e.target.value)}
              >
                <option value={''}>Selecione a placa do veículo</option>

                {bookings && (
                  <>
                    {bookings.map((booking) => (
                      <option key={booking.id} value={booking.car_plate}>
                        {booking.car_plate}
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
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

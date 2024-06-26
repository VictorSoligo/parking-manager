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
  const [totalSpots, setTotalSpots] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [manager, setManager] = useState('')

  const { mutateAsync, status } = useCreateParking()

  const isLoading = status === 'pending'

  const handleSave = async (event: FormEvent) => {
    event.preventDefault()

    await mutateAsync({
      name,
      totalSpots: parseInt(totalSpots),
      hourlyRate: parseFloat(hourlyRate),
      manager,
    })

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Cadastrar Estacionamento</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel>Nome do Estacionamento</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Número de Vagas</FormLabel>
            <Input
              type="number"
              value={totalSpots}
              onChange={(e) => setTotalSpots(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Valor por Hora</FormLabel>

            <Input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Responsável</FormLabel>
            <Input
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSave}
            isLoading={isLoading}
          >
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

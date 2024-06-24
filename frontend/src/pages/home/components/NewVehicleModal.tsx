import React, { useState } from 'react'
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
  Input,
} from '@chakra-ui/react'
import { Vehicle } from '../../../types/vehicle.types'
import { mask } from 'remask'

interface NewVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (vehicle: Vehicle) => void
  hourlyRate: number // Assume hourly rate is passed as a prop from the parent component
  defaultVehicleType: string // Assume vehicle type is passed as a prop from the parent component
}

export const NewVehicleModal: React.FC<NewVehicleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  hourlyRate,
  defaultVehicleType,
}) => {
  const [plate, setPlate] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerCpf, setOwnerCpf] = useState('')

  const handleSave = () => {
    const newVehicle: Vehicle = {
      id: Date.now(),
      vehicleType: defaultVehicleType,
      plate,
      ownerName,
      ownerCpf,
      entryTime: new Date().toLocaleTimeString().slice(0, 5), // Automatically set entry time to current time
      hourlyRate,
      totalDue: 0,
    }
    onSave(newVehicle)
    onClose()
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerCpf(mask(e.target.value, ['999.999.999-99']))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Veículo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={2}>
            <FormLabel>Placa</FormLabel>
            <Input value={plate} onChange={(e) => setPlate(e.target.value)} />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Proprietário</FormLabel>
            <Input
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>CPF</FormLabel>
            <Input value={ownerCpf} onChange={handleCpfChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

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
}

export const NewVehicleModal: React.FC<NewVehicleModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [vehicleType, setVehicleType] = useState('')
  const [plate, setPlate] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerCpf, setOwnerCpf] = useState('')
  const [entryTime, setEntryTime] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')

  const handleSave = () => {
    const newVehicle: Vehicle = {
      id: Date.now(),
      vehicleType,
      plate,
      ownerName,
      ownerCpf,
      entryTime,
      hourlyRate: parseFloat(hourlyRate.replace(',', '.')),
      totalDue: 0,
    }
    onSave(newVehicle)
    onClose()
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerCpf(mask(e.target.value, ['999.999.999-99']))
  }

  const handleHourlyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourlyRate(
      mask(e.target.value, ['99,99', '999,99', '9.999,99', '99.999,99']),
    )
  }

  const handleEntryTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntryTime(mask(e.target.value, ['99:99']))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Veículo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Tipo</FormLabel>
            <Input
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            />
          </FormControl>
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
          <FormControl mt={2}>
            <FormLabel>Horário de Entrada</FormLabel>
            <Input value={entryTime} onChange={handleEntryTimeChange} />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Valor por Hora (R$)</FormLabel>
            <Input value={hourlyRate} onChange={handleHourlyRateChange} />
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

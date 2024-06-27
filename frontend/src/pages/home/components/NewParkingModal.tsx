// components/NewParkingModal.tsx
import React, { useState } from 'react'
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
import { Parking } from '../../../types/parking.types'

interface NewParkingModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (parking: Parking) => void
}

export const NewParkingModal: React.FC<NewParkingModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('')
  const [totalSpots, setTotalSpots] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [manager, setManager] = useState('')

  const handleSave = () => {
    const newParking: Parking = {
      id: Date.now(),
      name,
      totalSpots: parseInt(totalSpots, 10),
      hourlyRate: parseFloat(hourlyRate),
      manager,
    }
    onSave(newParking)
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
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

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

interface RemoveVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle
  onConfirm: (id: number, exitTime: string) => void
}

export const RemoveVehicleModal: React.FC<RemoveVehicleModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  onConfirm,
}) => {
  const [exitTime, setExitTime] = useState('')

  const handleExitTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExitTime(mask(e.target.value, ['99:99']))
  }

  const handleConfirm = () => {
    onConfirm(vehicle.id, exitTime)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar Saída</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Horário de Saída</FormLabel>
            <Input value={exitTime} onChange={handleExitTimeChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Total a Pagar (R$)</FormLabel>
            <Input
              value={(
                vehicle.hourlyRate *
                ((new Date(`1970-01-01T${exitTime}:00`).getTime() -
                  new Date(`1970-01-01T${vehicle.entryTime}:00`).getTime()) /
                  3600000)
              ).toFixed(2)}
              isReadOnly
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
            Confirmar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

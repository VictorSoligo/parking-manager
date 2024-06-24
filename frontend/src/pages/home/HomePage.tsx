import { Flex, Button, Box, useDisclosure, useToast } from '@chakra-ui/react'
import { Header } from './components/Header'
import { VehicleTable } from './components/VehicleTable'
import { useState } from 'react'
import { Vehicle, VehicleList } from '../../types/vehicle.types'
import { NewVehicleModal } from './components/NewVehicleModal'
import { RemoveVehicleModal } from './components/RemoveVehicleModal'

export const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isRemoveOpen,
    onOpen: onRemoveOpen,
    onClose: onRemoveClose,
  } = useDisclosure()
  const [vehicles, setVehicles] = useState<VehicleList>([
    {
      id: 1,
      plate: 'ABC-1234',
      ownerName: 'Vitão da XJ6',
      ownerCpf: '123.456.789-00',
      entryTime: '08:00',
      hourlyRate: 5,
      totalDue: 0,
    },
  ])
  const [vehicleToRemove, setVehicleToRemove] = useState<Vehicle | null>(null)
  const toast = useToast()

  const defaultHourlyRate = 5

  const handleRemoveVehicle = (id: number, exitTime: string) => {
    const vehicle = vehicles.find((v) => v.id === id)
    if (vehicle) {
      const entryTime = new Date(`1970-01-01T${vehicle.entryTime}:00`)
      const exitTimeDate = new Date(`1970-01-01T${exitTime}:00`)
      const hours = (exitTimeDate.getTime() - entryTime.getTime()) / 3600000
      vehicle.totalDue = hours * vehicle.hourlyRate
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
      toast({
        title: 'Veículo removido.',
        description: `O veículo foi removido com sucesso. Total a pagar: R$${vehicle.totalDue.toFixed(2)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleConfirmRemove = (vehicle: Vehicle) => {
    setVehicleToRemove(vehicle)
    onRemoveOpen()
  }

  return (
    <Flex w="100%" h="100%" flexDirection="column" alignItems="center">
      <Header />
      <Button
        colorScheme="blue"
        onClick={onOpen}
        alignSelf="flex-start"
        my={4}
        ml="5%"
      >
        Novo Veículo
      </Button>
      <Box
        w="90%"
        p={4}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
      >
        <VehicleTable vehicles={vehicles} onRemove={handleConfirmRemove} />
      </Box>
      <NewVehicleModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={(newVehicle: Vehicle) => setVehicles([...vehicles, newVehicle])}
        hourlyRate={defaultHourlyRate}
      />
      {vehicleToRemove && (
        <RemoveVehicleModal
          isOpen={isRemoveOpen}
          onClose={onRemoveClose}
          vehicle={vehicleToRemove}
          onConfirm={handleRemoveVehicle}
        />
      )}
    </Flex>
  )
}

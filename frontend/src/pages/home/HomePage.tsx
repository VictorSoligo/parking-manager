import { useState } from 'react'
import {
  Flex,
  Button,
  Box,
  useDisclosure,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { Header } from './components/Header'
import { VehicleTable } from './components/VehicleTable'
import { NewVehicleModal } from './components/NewVehicleModal'
import { RemoveVehicleModal } from './components/RemoveVehicleModal'
import { NewUserModal } from './components/NewUserModal'
import { Vehicle, VehicleList } from '../../types/vehicle.types'
import { User } from '../../types/user.types'
import { NewSpaceModal } from './components/NewSpaceModal'
import { Space } from '../../types/space.types'
import { ParkingTab } from './components/ParkingTab'

export const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    isOpen: isRemoveOpen,
    onOpen: onRemoveOpen,
    onClose: onRemoveClose,
  } = useDisclosure()

  const {
    isOpen: isUserModalOpen,
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
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

  const [users, setUsers] = useState<User[]>([])
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
      setVehicles(vehicles.filter((v) => v.id !== id))
      toast({
        title: 'Veículo removido.',
        description: `O veículo foi removido com sucesso. Total a pagar: R$${vehicle.totalDue.toFixed(2)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      onRemoveClose()
    }
  }

  const handleConfirmRemove = (vehicle: Vehicle) => {
    setVehicleToRemove(vehicle)
    onRemoveOpen()
  }

  const {
    isOpen: isSpaceModalOpen,
    onOpen: onOpenSpaceModal,
    onClose: onCloseSpaceModal,
  } = useDisclosure()
  const [spaces, setSpaces] = useState<Space[]>([])

  const handleAddSpace = (newSpace: Space) => {
    setSpaces([...spaces, newSpace])
  }

  return (
    <Flex w="100%" h="100%" flexDirection="column" alignItems="center">
      <Header />
      <Tabs variant="enclosed" colorScheme="blue" my={4} w="95%">
        <TabList>
          <Tab>Estacionamento</Tab>
          <Tab>Cadastrar Estacionamento</Tab>
          <Tab>Cadastrar Usuário</Tab>
          <Tab>Cadastrar Vaga</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button
              colorScheme="blue"
              onClick={onOpen}
              alignSelf="flex-start"
              mb={4}
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
              <VehicleTable
                vehicles={vehicles}
                onRemove={handleConfirmRemove}
              />
            </Box>
            <NewVehicleModal
              isOpen={isOpen}
              onClose={onClose}
              onSave={(newVehicle: Vehicle) =>
                setVehicles([...vehicles, newVehicle])
              }
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
          </TabPanel>

          <TabPanel>
            <ParkingTab />
          </TabPanel>

          <TabPanel>
            <Button colorScheme="blue" onClick={onOpenUserModal} mb={4}>
              Cadastrar Novo Usuário
            </Button>
            <Box
              w="90%"
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              overflow="hidden"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr key={user.id}>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.role}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <NewUserModal
              isOpen={isUserModalOpen}
              onClose={onCloseUserModal}
              onSave={(newUser) => setUsers([...users, newUser])}
            />
          </TabPanel>

          <TabPanel>
            <Button colorScheme="blue" onClick={onOpenSpaceModal} mb={4}>
              Cadastrar Nova Vaga
            </Button>
            <Box
              w="90%"
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              overflow="hidden"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nome da Vaga</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {spaces.map((space) => (
                    <Tr key={space.id}>
                      <Td>{space.name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <NewSpaceModal
              isOpen={isSpaceModalOpen}
              onClose={onCloseSpaceModal}
              onSave={handleAddSpace}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

import { FC } from 'react'
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { VehicleList, Vehicle } from '../../../types/vehicle.types'

interface VehicleTableProps {
  vehicles: VehicleList
  onRemove: (vehicle: Vehicle) => void
}

export const VehicleTable: FC<VehicleTableProps> = ({ vehicles, onRemove }) => {
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th
              textAlign="center"
              borderRight="1px solid"
              borderColor="gray.200"
            >
              Placa
            </Th>
            <Th
              textAlign="center"
              borderRight="1px solid"
              borderColor="gray.200"
            >
              Proprietário
            </Th>
            <Th
              textAlign="center"
              borderRight="1px solid"
              borderColor="gray.200"
            >
              CPF
            </Th>
            <Th
              textAlign="center"
              borderRight="1px solid"
              borderColor="gray.200"
            >
              Horário de Entrada
            </Th>
            <Th textAlign="center">Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {vehicles.map((vehicle) => (
            <Tr key={vehicle.id}>
              <Td
                textAlign="center"
                borderRight="1px solid"
                borderColor="gray.200"
              >
                {vehicle.plate}
              </Td>
              <Td
                textAlign="center"
                borderRight="1px solid"
                borderColor="gray.200"
              >
                {vehicle.ownerName}
              </Td>
              <Td
                textAlign="center"
                borderRight="1px solid"
                borderColor="gray.200"
              >
                {vehicle.ownerCpf}
              </Td>
              <Td
                textAlign="center"
                borderRight="1px solid"
                borderColor="gray.200"
              >
                {vehicle.entryTime}
              </Td>
              <Td textAlign="center">
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => onRemove(vehicle)}
                >
                  Remover
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

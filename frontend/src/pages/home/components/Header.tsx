import React, { FormEvent, useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react'
import { useAuth } from '../../../hooks/useAuth'
import { useEditParking } from '../../../hooks/useEditParking'

export const Header: React.FC = () => {
  const [name, setName] = useState('')
  const [costPerHour, setCostPerHour] = useState('')

  const { logout, user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutateAsync } = useEditParking()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    await mutateAsync({
      costPerHourInCents: Number(costPerHour) * 100,
      name,
    })

    onClose()
  }

  const isManagerWithParking =
    !!user && user.role === 'manager' && !!user.parking_id

  return (
    <Box px={8} boxShadow={'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'} w="100%">
      <Flex h={16} align="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="black">
            Parking Manager
          </Text>
        </Flex>

        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
              ml={4}
              position="relative"
            >
              <Avatar
                size="sm"
                name={user?.name ?? ''}
                bg="gray.500"
                color="white"
              />

              <Box
                position="absolute"
                bottom={0}
                right={0}
                bg="green.500"
                border="2px solid white"
                borderRadius="full"
                boxSize={3}
              />
            </MenuButton>

            <MenuList>
              {isManagerWithParking && (
                <>
                  <MenuItem onClick={onOpen}>Editar estacionamento</MenuItem>

                  <MenuDivider />
                </>
              )}

              <MenuItem onClick={logout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Editar Estacionamento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="name" mb={4}>
                <FormLabel>Nome</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do estacionamento"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Valor por Hora (R$)</FormLabel>
                <Input
                  type="number"
                  placeholder="Valor por hora"
                  value={costPerHour}
                  onChange={(e) => setCostPerHour(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose} type="button">
                Cancelar
              </Button>

              <Button colorScheme="blue" mr={3} type="submit">
                Salvar
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  )
}

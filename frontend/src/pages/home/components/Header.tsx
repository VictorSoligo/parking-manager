import React, { useState } from 'react'
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

export const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [totalSpots, setTotalSpots] = useState('')

  const handleSave = () => {
    onClose()
  }

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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTD3nS8DRDQ1YVjpMaMb1jGB7vItxSgnMiZ8KPYQ8AyBGznmOH67isMXNfjcGCnEqWOUk&usqp=CAU"
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
              <MenuItem onClick={onOpen}>Editar estacionamento</MenuItem>
              <MenuDivider />
              <MenuItem>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
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
            <FormControl id="hourlyRate" mb={4}>
              <FormLabel>Valor por Hora (R$)</FormLabel>
              <Input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="Valor por hora"
              />
            </FormControl>
            <FormControl id="totalSpots" mb={4}>
              <FormLabel>Quantidade de Vagas</FormLabel>
              <Input
                type="number"
                value={totalSpots}
                onChange={(e) => setTotalSpots(e.target.value)}
                placeholder="Quantidade de vagas"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

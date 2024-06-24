import React from 'react'
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
} from '@chakra-ui/react'

export const Header: React.FC = () => {
  return (
    <Box px={4} boxShadow={'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'} w="100%">
      <Flex h={16} align="center" justifyContent="space-between" mx={'4%'}>
        <Flex alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="black" mr={8}>
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
              <MenuItem>Editar estacionamento</MenuItem>
              <MenuDivider />
              <MenuItem>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

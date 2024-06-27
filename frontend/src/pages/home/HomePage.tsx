import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { BookingTab } from './components/BookingTab'
import { Header } from './components/Header'
import { ParkingSpaceTab } from './components/ParkingSpaceTab'
import { ParkingTab } from './components/ParkingTab'
import { UserTab } from './components/UserTab'
import { useAuth } from '../../hooks/useAuth'
import { FinancialTab } from './components/FinancialTab'

export const HomePage = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const isAdmin = user.role === 'admin'
  const isManager = user.role === 'manager'

  return (
    <Flex w="100%" h="100%" flexDirection="column" alignItems="center">
      <Header />

      <Tabs variant="enclosed" colorScheme="blue" mt={8} w="100%" px={4}>
        <TabList>
          {isManager && <Tab>Financeiro</Tab>}
          {isManager && <Tab>Reservas</Tab>}
          {isManager && <Tab>Vagas</Tab>}
          {isAdmin && <Tab>Usuários</Tab>}
          {isAdmin && <Tab>Estacionamentos</Tab>}
        </TabList>

        <TabPanels>
          {isManager && (
            <TabPanel>
              <FinancialTab />
            </TabPanel>
          )}

          {isManager && (
            <TabPanel>
              <BookingTab />
            </TabPanel>
          )}

          {isManager && (
            <TabPanel>
              <ParkingSpaceTab />
            </TabPanel>
          )}

          {isAdmin && (
            <TabPanel>
              <UserTab />
            </TabPanel>
          )}

          {isAdmin && (
            <TabPanel>
              <ParkingTab />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

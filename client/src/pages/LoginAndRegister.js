import React, { useEffect } from 'react';
import logo from '../assets/logo.svg';
import { Login, PreLoader, Register } from '../components';
import { useUserContext } from '../context/userContext';
import {
  Box,
  Container,
  Flex,
  Image,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

function Homepage() {
  const { authLoading } = useUserContext();

  useEffect(() => {
    document.title = 'TomperChat | Login/Register';
  }, []);

  if (authLoading) {
    return <PreLoader />;
  }

  return (
    <Container maxWidth='xl' mb='8'>
      <Flex justifyContent='center'>
        <Image src={logo} boxSize='200px' alt='app-logo' />
      </Flex>
      <Box p='4' borderRadius='md' shadow='md'>
        <Tabs variant='soft-rounded' colorScheme='green' isFitted>
          <TabList mb='1'>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;

import React, { useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const toast = useToast();

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const checkAuth = async () => {
    try {
      const response = await axios.post('/api/user/auth');
      const { data } = response.data;
      setUser(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/user/login', { email, password });
      const { data } = response.data;
      setUser(data);
      return toast({
        position: 'top',
        title: 'Logged In',
        description: `Logged in as ${data.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const { message } = error.response.data;
      return toast({
        position: 'top',
        title: 'Error occured',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const register = async (name, email, password, avatar) => {
    try {
      const response = await axios.post('/api/user/register', {
        name,
        email,
        password,
        avatar,
      });
      const { data } = response.data;
      setUser(data);
      return toast({
        position: 'top',
        title: 'Registration successfull',
        description: `Logged in as ${data.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const { message } = error.response.data;
      return toast({
        position: 'top',
        title: 'Error occured',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('/api/user/logout');
      const { success, message } = response.data;
      setUser(null);
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

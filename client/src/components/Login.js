import React, { useState } from 'react';
import { useUserContext } from '../context/userContext';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';

const initialCredential = {
  email: '',
  password: '',
};

function Login() {
  const { login } = useUserContext();

  const [credentials, setCredentials] = useState(initialCredential);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();

  const handleShow = () => {
    setShow((prev) => {
      return !prev;
    });
  };

  const handleSubmit = async () => {
    const { email, password } = credentials;
    if (!email || !password) {
      return toast({
        position: 'top',
        title: 'Invalid Input',
        description: 'Provide all the credentials',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <VStack spacing='4'>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type='email'
          name='email'
          placeholder='Enter your email'
          variant='filled'
          focusBorderColor='green.500'
          value={credentials.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            name='password'
            pr='4.5rem'
            variant='filled'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            value={credentials.password}
            onChange={handleChange}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button isFullWidth isLoading={loading} onClick={handleSubmit}>
        Login
      </Button>
    </VStack>
  );
}

export default Login;

import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
} from '@chakra-ui/react';

const initialCredential = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePicture: '',
};

function Register() {
  const [credentials, setCredentials] = useState(initialCredential);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow((prev) => {
      return !prev;
    });
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
        <FormLabel>Name</FormLabel>
        <Input
          name='name'
          placeholder='Enter your name'
          variant='filled'
          focusBorderColor='green.500'
          value={credentials.name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
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
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size='md'>
          <Input
            name='confirmPassword'
            pr='4.5rem'
            variant='filled'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            value={credentials.confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Profile Image</FormLabel>
        <Input
          type='file'
          accept='image/*'
          name='profilePicture'
          variant='filled'
          focusBorderColor='green.500'
          value={credentials.profilePicture}
          onChange={handleChange}
        />
      </FormControl>
      <Button isFullWidth>Register</Button>
    </VStack>
  );
}

export default Register;

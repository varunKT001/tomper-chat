import React from 'react';
import logo from '../assets/logo.svg';
import { MdNoEncryptionGmailerrorred } from 'react-icons/md';
import { Image, Progress, VStack, Text, HStack, Icon } from '@chakra-ui/react';

function PreLoader() {
  return (
    <VStack
      w='100%'
      h='100vh'
      spacing='4'
      justifyContent='center'
      alignItems='center'
    >
      <Image src={logo} width='150px' />
      <Progress size='xs' w='40%' colorScheme='whatsapp' isIndeterminate />
      <HStack>
        <Icon as={MdNoEncryptionGmailerrorred} color='gray.400' />
        <Text fontWeight='300' color='gray.400'>
          Not End-To-End encrypted
        </Text>
      </HStack>
    </VStack>
  );
}

export default PreLoader;

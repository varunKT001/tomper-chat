import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { Flex, Text } from '@chakra-ui/react';

function UserBadgeItem({ user, handleClick }) {
  return (
    <Flex
      my='1'
      mr='2'
      py='1'
      px='2'
      justifyContent='space-between'
      alignItems='center'
      fontSize='12'
      fontWeight='700'
      textTransform='uppercase'
      bg='green.500'
      color='white'
      borderRadius='xl'
    >
      <Text>{user.name}</Text>
      <MdOutlineClose onClick={() => handleClick(user)} />
    </Flex>
  );
}

export default UserBadgeItem;

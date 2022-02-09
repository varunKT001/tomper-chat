import React from 'react';
import { LeftTopBar, UsersChat, ChatBox } from '../components';
import { VStack, Stack } from '@chakra-ui/react';
import { useChatContext } from '../context/chatContext';

function ChatsPage() {
  const { selectedChat } = useChatContext();
  return (
    <Stack spacing='0' direction={{ base: 'column', md: 'row' }} h='100vh'>
      <VStack
        w={{ base: '100%', md: '30%' }}
        minH={`${!selectedChat && '100vh'}`}
        spacing='0'
        borderWidth='1px'
        borderColor='gray.200'
        borderStyle='solid'
        shadow='base'
      >
        <LeftTopBar />
        <UsersChat />
      </VStack>
      <ChatBox />
    </Stack>
  );
}

export default ChatsPage;

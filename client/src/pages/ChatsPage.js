import React from 'react';
import { SearchUserSideBar, UsersChat, ChatBox } from '../components';
import { Flex, Container } from '@chakra-ui/react';

function ChatsPage() {
  return (
    <Container w='100%'>
      <SearchUserSideBar />
      <Flex>
        <UsersChat />
        <ChatBox />
      </Flex>
    </Container>
  );
}

export default ChatsPage;

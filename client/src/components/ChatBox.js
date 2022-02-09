import React from 'react';
import { useChatContext } from '../context/chatContext';
import { useUserContext } from '../context/userContext';
import { SingleChat } from '.';
import { Box } from '@chakra-ui/react';

function ChatBox() {
  const { selectedChat, fetchFlag, setFetchFlag } = useChatContext();
  const { currentUser } = useUserContext();

  return (
    <Box
      d={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      w={{ base: '100%', md: '70%' }}
    >
      <SingleChat />
    </Box>
  );
}

export default ChatBox;

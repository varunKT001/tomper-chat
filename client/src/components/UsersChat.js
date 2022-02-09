import React, { useEffect } from 'react';
import { useChatContext } from '../context/chatContext';
import { SkeletonLoader } from '.';
import { useUserContext } from '../context/userContext';
import { getSender } from '../utils/helpers';
import { Box, VStack, Text, Divider, useToast } from '@chakra-ui/react';

function UsersChat() {
  const { currentUser } = useUserContext();
  const { chats, selectedChat, setSelectedChat, fetchFlag, fetchUserChats } =
    useChatContext();

  useEffect(() => {
    fetchUserChats();
  }, [fetchFlag, currentUser]);

  return (
    <Box
      w='100%'
      h='100%'
      d={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDirection='column'
      alignItems='center'
      p='4'
      bg='white'
      overflowY='scroll'
    >
      {!chats ? (
        <SkeletonLoader length='10' height='50px' mt='4' />
      ) : (
        <VStack w='100%' spacing='0'>
          {chats.map((chat, index) => {
            return (
              <Box
                key={index}
                w='100%'
                bg={selectedChat?._id === chat._id ? 'gray.200' : 'transparent'}
                _hover={{ background: 'gray.100' }}
                borderRadius='lg'
                onClick={() => setSelectedChat(chat)}
              >
                <Text p='4'>
                  {!chat.isGroupChat
                    ? getSender(currentUser, chat.users)
                    : chat.chatName}
                </Text>
                <Divider />
              </Box>
            );
          })}
        </VStack>
      )}
    </Box>
  );
}

export default UsersChat;

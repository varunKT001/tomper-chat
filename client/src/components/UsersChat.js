import React, { useEffect } from 'react';
import { useChatContext } from '../context/chatContext';
import { SkeletonLoader } from '.';
import { useUserContext } from '../context/userContext';
import { getSender, getSendersFullDetails } from '../utils/helpers';
import { Box, VStack, Text, Divider, Avatar, HStack } from '@chakra-ui/react';

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
      flexDirection='column'
      alignItems='center'
      p='2'
      bg='white'
      overflowY='scroll'
    >
      {!chats ? (
        <SkeletonLoader length='10' height='50px' mt='4' />
      ) : (
        <VStack w='100%' spacing='0'>
          {chats.map((chat, index) => {
            return (
              <Box key={index} w='100%'>
                <HStack
                  w='100%'
                  m='0'
                  py='4'
                  px='2'
                  spacing='2'
                  bg={
                    selectedChat?._id === chat._id ? 'gray.200' : 'transparent'
                  }
                  _hover={{ background: 'gray.100' }}
                  onClick={() => setSelectedChat(chat)}
                >
                  <Avatar
                    name={
                      !chat.isGroupChat
                        ? getSender(currentUser, chat.users)
                        : chat.chatName
                    }
                    src={
                      !chat.isGroupChat
                        ? getSendersFullDetails(currentUser, chat.users).avatar
                            .url
                        : ''
                    }
                  />
                  <VStack
                    w='100%'
                    justifyContent='space-between'
                    alignItems='flex-start'
                  >
                    <Text fontSize='1.125rem'>
                      {!chat.isGroupChat
                        ? getSender(currentUser, chat.users)
                        : chat.chatName}
                    </Text>
                  </VStack>
                </HStack>
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

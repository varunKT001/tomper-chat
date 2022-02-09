import React from 'react';
import { useChatContext } from '../context/chatContext';
import { IoArrowBackOutline } from 'react-icons/io5';
import { getSender, getSendersFullDetails } from '../utils/helpers';
import { useUserContext } from '../context/userContext';
import { ProfileModal, UpdateGroupChatModal } from '.';
import { Box, Center, IconButton, Flex, Text } from '@chakra-ui/react';

function SingleChat() {
  const { currentUser } = useUserContext();
  const { selectedChat, setSelectedChat } = useChatContext();

  return (
    <Box w='100%'>
      {selectedChat ? (
        <>
          <Flex
            justifyContent='space-between'
            alignItems='center'
            p='4'
            bg='gray.100'
          >
            <IconButton
              icon={<IoArrowBackOutline />}
              d={{ base: 'flex', md: 'none' }}
              onClick={() => setSelectedChat(null)}
            />
            {!selectedChat.isGroupChat ? (
              <>
                <Text>{getSender(currentUser, selectedChat.users)}</Text>
                <ProfileModal
                  user={getSendersFullDetails(currentUser, selectedChat.users)}
                />
              </>
            ) : (
              <>
                <Text>{selectedChat.chatName.toUpperCase()}</Text>
                <UpdateGroupChatModal />
              </>
            )}
          </Flex>
        </>
      ) : (
        <Center>Click on user to start chatting</Center>
      )}
    </Box>
  );
}

export default SingleChat;

import React, { useEffect, useState } from 'react';
import { useChatContext } from '../context/chatContext';
import { IoArrowBackOutline } from 'react-icons/io5';
import { getSender, getSendersFullDetails } from '../utils/helpers';
import { useUserContext } from '../context/userContext';
import bcg2 from '../assets/bcg-2.png';
import {
  ProfileModal,
  SpinnerLoader,
  UpdateGroupChatModal,
  ScrollableChat,
} from '.';
import InputEmoji from 'react-input-emoji';
import {
  Box,
  Image,
  IconButton,
  Flex,
  Text,
  FormControl,
  useToast,
  VStack,
  Avatar,
  AvatarGroup,
  HStack,
} from '@chakra-ui/react';
import bcg from '../assets/bcg.png';
import axios from 'axios';

function SingleChat() {
  const { currentUser } = useUserContext();
  const { selectedChat, setSelectedChat } = useChatContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      setLoading(true);
      const response = await axios.get(
        `/api/message/${selectedChat._id}`,
        options
      );
      const { data } = response.data;
      setMessages(data);
      setLoading(false);
    } catch (error) {
      const { message } = error.response.data;
      setLoading(false);
      return toast({
        position: 'top',
        title: 'Error occured',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const sendMessage = async (e) => {
    if (e.key === 'Enter' && newMessage) {
      try {
        const body = {
          chatId: selectedChat._id,
          content: newMessage,
        };
        const options = {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        };
        setNewMessage('');
        const response = await axios.post('/api/message', body, options);
        const { data } = response.data;
        setMessages((prev) => {
          return [...prev, data];
        });
      } catch (error) {
        const { message } = error.response.data;
        return toast({
          position: 'top',
          title: 'Error occured',
          description: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleTyping = (text) => {
    setNewMessage(text);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <Flex flexDirection='column' w='100%'>
      {selectedChat ? (
        <>
          <Flex
            p='4'
            bg='gray.100'
            justifyContent='space-between'
            alignItems='center'
            shadow='sm'
          >
            <IconButton
              icon={<IoArrowBackOutline />}
              d={{ base: 'flex', md: 'none' }}
              onClick={() => setSelectedChat(null)}
            />
            {!selectedChat.isGroupChat ? (
              <>
                <HStack spacing='4'>
                  <Avatar
                    size='sm'
                    name={getSender(currentUser, selectedChat.users)}
                    src={
                      getSendersFullDetails(currentUser, selectedChat.users)
                        .avatar.url
                    }
                  />
                  <Text>{getSender(currentUser, selectedChat.users)}</Text>
                </HStack>
                <ProfileModal
                  user={getSendersFullDetails(currentUser, selectedChat.users)}
                />
              </>
            ) : (
              <>
                <HStack spacing='4'>
                  <AvatarGroup size='sm' max='3'>
                    {selectedChat.users.map((user, index) => {
                      return <Avatar name={user.name} src={user.avatar.url} />;
                    })}
                  </AvatarGroup>
                  <Text>{selectedChat.chatName.toUpperCase()}</Text>
                </HStack>
                <UpdateGroupChatModal fetchMessages={fetchMessages} />
              </>
            )}
          </Flex>
          <Flex
            w='100%'
            h='100%'
            flexDirection='column'
            justifyContent='flex-end'
            backgroundImage={bcg}
            overflowY='hidden'
          >
            {loading ? (
              <SpinnerLoader size='xl' margin='auto' alignSelf='center' />
            ) : (
              <Flex flexDirection='column' overflowY='auto'>
                <ScrollableChat messages={messages} />
              </Flex>
            )}
            <Box py='2' px='4' bg='gray.100'>
              <FormControl onKeyDown={sendMessage} isRequired>
                <InputEmoji
                  bg='white'
                  focusBorderColor='none'
                  placeholder='Write your message'
                  value={newMessage}
                  onChange={handleTyping}
                />
              </FormControl>
            </Box>
          </Flex>
        </>
      ) : (
        <Flex
          w='100%'
          h='100%'
          bg='gray.50'
          flexDirection='column'
          justifyContent='space-between'
          alignItems='center'
          overflowY='hidden'
        >
          <VStack
            w='50%'
            m='auto'
            spacing='4'
            justifyContent='center'
            alignItems='center'
          >
            <Image src={bcg2} width='300px' />
            <Text textAlign='center' fontSize='3xl' fontWeight='300'>
              No need to keep phone connected
            </Text>
            <Text textAlign='center' fontWeight='300' color='gray.400'>
              TomperChat is centralized and does'nt need phone to be connected.
              Also its not End-To-End Encrypted, so chat wisely.
            </Text>
          </VStack>
          <Box w='100%' h='10px' alignSelf='flex-end' bg='whatsapp.400'></Box>
        </Flex>
      )}
    </Flex>
  );
}

export default SingleChat;

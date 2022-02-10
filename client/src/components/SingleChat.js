import React, { useEffect, useState } from 'react';
import { useChatContext } from '../context/chatContext';
import { IoArrowBackOutline } from 'react-icons/io5';
import { getSender, getSendersFullDetails } from '../utils/helpers';
import { useUserContext } from '../context/userContext';
import {
  ProfileModal,
  SpinnerLoader,
  UpdateGroupChatModal,
  ScrollableChat,
} from '.';
import InputEmoji from 'react-input-emoji';
import {
  Box,
  Center,
  IconButton,
  Flex,
  Text,
  FormControl,
  useToast,
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
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          overflowY='hidden'
        >
          Select user to chat
        </Flex>
      )}
    </Flex>
  );
}

export default SingleChat;

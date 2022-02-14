import React, { useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useUserContext } from './userContext';
import axios from 'axios';

const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser } = useUserContext();
  const toast = useToast();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [notification, setNotification] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(false);

  const fetchUserChats = async () => {
    try {
      const response = await axios.get('/api/chat');
      const { data } = response.data;
      setChats(data);
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
  };

  useEffect(() => {
    setSelectedChat(null);
  }, [currentUser]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        fetchFlag,
        notification,
        selectedChat,
        setChats,
        setFetchFlag,
        fetchUserChats,
        setNotification,
        setSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

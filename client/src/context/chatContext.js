import React, { useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useUserContext } from './userContext';

const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser } = useUserContext();
  const toast = useToast();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [fetchFlag, setFetchFlag] = useState(false);

  const fetchUserChats = async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const response = await axios.get('/api/chat', options);
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

  return (
    <ChatContext.Provider
      value={{
        chats,
        fetchFlag,
        selectedChat,
        setChats,
        setFetchFlag,
        setSelectedChat,
        fetchUserChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

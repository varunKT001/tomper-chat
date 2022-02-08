import React, { useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { getLocalStorage, setLocalStorage } from '../utils/helpers';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${getLocalStorage(
  'token'
)}`;

const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  return <ChatContext.Provider value='hello'>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

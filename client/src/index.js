import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { UserProvider } from './context/userContext';
import { ChakraProvider } from '@chakra-ui/react';
import { ChatProvider } from './context/chatContext';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

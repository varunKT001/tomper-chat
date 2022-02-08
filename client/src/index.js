import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './config/Theme';
import { UserProvider } from './context/userContext';
import { ChakraProvider } from '@chakra-ui/react';
import { ChatProvider } from './context/chatContext';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

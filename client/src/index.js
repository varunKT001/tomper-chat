import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './config/Theme';
import { UserProvider } from './context/userContext';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

import { Spinner } from '@chakra-ui/react';
import React from 'react';

function SpinnerLoader({ ...rest }) {
  return <Spinner {...rest} color='green.500' />;
}

export default SpinnerLoader;

import React from 'react';
import { Skeleton, Stack } from '@chakra-ui/react';

function SkeletonLoader({ length, ...rest }) {
  const arr = new Array(Number(length)).fill(0);
  return (
    <Stack>
      {arr.map((item, index) => {
        return <Skeleton key={index} {...rest} />;
      })}
    </Stack>
  );
}

export default SkeletonLoader;

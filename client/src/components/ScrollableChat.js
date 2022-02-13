import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender, isSameUser, isLastMessage } from '../utils/helpers';
import { useUserContext } from '../context/userContext';
import { Avatar, Box, Flex, HStack, Text, Tooltip } from '@chakra-ui/react';

function ScrollableChat({ messages }) {
  const { currentUser } = useUserContext();
  return (
    <ScrollableFeed>
      {messages.map((message, index) => {
        return (
          <Flex
            key={index}
            px={{ base: '1rem', md: '4rem' }}
            mb={`${index === messages.length - 1 ? '6' : '0'}`}
            mt={`${
              index === 0
                ? '6'
                : isSameUser(messages, message, index)
                ? '1'
                : '6'
            }`}
            justifyContent={`${
              message.sender._id === currentUser.id ? 'flex-end' : 'flex-start'
            }`}
            alignItems='center'
          >
            {(isSameSender(messages, message, index, currentUser.id) ||
              isLastMessage(messages, index, currentUser.id)) && (
              <Tooltip label={message.sender.name}>
                <Avatar
                  size='sm'
                  cursor='pointer'
                  name={message.sender.name}
                  src={message.sender.avatar.url}
                />
              </Tooltip>
            )}
            <HStack
              p='2'
              maxW='50%'
              ml={`${
                message.sender._id === currentUser.id
                  ? '0'
                  : isSameSender(messages, message, index, currentUser.id) ||
                    isLastMessage(messages, index, currentUser.id)
                  ? '1'
                  : '36px'
              }`}
              bg={`${
                message.sender._id === currentUser.id ? '#d9fdd3' : 'white'
              }`}
              borderRadius='md'
              shadow='base'
            >
              <Text>{message.content}</Text>
              <Text alignSelf='flex-end' fontSize='0.75rem' color='gray.500'>
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  hour12: true,
                  minute: '2-digit',
                })}
              </Text>
            </HStack>
          </Flex>
        );
      })}
    </ScrollableFeed>
  );
}

export default ScrollableChat;

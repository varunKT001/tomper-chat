import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender, isSameUser, isLastMessage } from '../utils/helpers';
import { useUserContext } from '../context/userContext';
import { Avatar, Box, Flex, Text, Tooltip } from '@chakra-ui/react';

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
            <Text
              p='2'
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
              {message.content}
            </Text>
          </Flex>
        );
      })}
    </ScrollableFeed>
  );
}

export default ScrollableChat;

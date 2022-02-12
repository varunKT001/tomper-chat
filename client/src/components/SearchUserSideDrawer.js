import React, { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { getLocalStorage } from '../utils/helpers';
import { SkeletonLoader, UserListItem } from '.';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Box,
  HStack,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useChatContext } from '../context/chatContext';
import { useUserContext } from '../context/userContext';

function SearchUserSideDrawer({ children }) {
  const toast = useToast();
  const InputFocusRef = useRef();
  const { chats, selectedChat, setChats, setSelectedChat, fetchFlag } =
    useChatContext();
  const { currentUser } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatsLoading, setChatsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchText) {
      return toast({
        position: 'top',
        title: 'Invalid Input',
        description: 'Please input something to search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
    try {
      setLoading(true);
      const response = await axios.get(`/api/user?search=${searchText}`);
      const { data } = response.data;
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      return toast({
        position: 'top',
        title: 'Error occured',
        description: 'Failed to load search result',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAccessChat = async (userId) => {
    try {
      setChatsLoading(true);
      const response = await axios.post('/api/chat', { userId });
      const { data } = response.data;
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats((prev) => {
          return [data, ...prev];
        });
      }
      setSelectedChat(data);
      setChatsLoading(false);
      onClose();
    } catch (error) {
      const { message } = error.response.data;
      setChatsLoading(false);
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
    <>
      <Box w='100%' onClick={onOpen}>
        {children}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        initialFocusRef={InputFocusRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search user</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSearch}>
              <HStack>
                <Input
                  ref={InputFocusRef}
                  value={searchText}
                  focusBorderColor='green.500'
                  placeholder='Type here...'
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <IconButton
                  icon={<AiOutlineSearch />}
                  colorScheme='whatsapp'
                  onClick={handleSearch}
                />
              </HStack>
            </form>
            {loading ? (
              <SkeletonLoader length={10} mt='4' height='50px' />
            ) : (
              <Box mt='4'>
                {searchResult?.map((user, index) => {
                  return (
                    <UserListItem
                      key={index}
                      user={user}
                      handleClick={() => handleAccessChat(user._id)}
                    />
                  );
                })}
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SearchUserSideDrawer;

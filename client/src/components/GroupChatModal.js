import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useUserContext } from '../context/userContext';
import { getLocalStorage } from '../utils/helpers';
import { SkeletonLoader, UserListItem, UserBadgeItem } from '.';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
  useToast,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  VStack,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useChatContext } from '../context/chatContext';

function GroupChatModal() {
  const { currentUser } = useUserContext();
  const { setChats, setSelectedChat } = useChatContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async (query) => {
    setSearchText(query);
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const response = await axios(`/api/user?search=${query}`, options);
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

  const handleGroup = (user) => {
    if (selectedUsers.includes(user)) {
      return toast({
        position: 'top',
        title: 'Warning',
        description: 'User already added',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
    setSelectedUsers((prev) => {
      return [...prev, user];
    });
  };

  const handleDelete = (userToBeDeleted) => {
    setSelectedUsers((prev) => {
      const tempSelectedUsers = prev.filter(
        (user) => user._id !== userToBeDeleted._id
      );
      return tempSelectedUsers;
    });
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length < 1) {
      return toast({
        position: 'top',
        title: 'Warning',
        description: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const response = await axios.post(
        '/api/chat/group',
        {
          name: groupChatName,
          users: selectedUsers.map((user) => user._id),
        },
        options
      );
      const { data } = response.data;
      setChats((prev) => {
        return [data, ...prev];
      });
      setSelectedChat(data);
      toast({
        position: 'top',
        title: 'Success',
        description: `Group chat ${data.chatName} created`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      const { message } = error.response.data;
      return toast({
        position: 'top',
        title: 'Error occured',
        description: message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <IconButton icon={<AiOutlinePlus />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create group chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Group name</FormLabel>
                <Input
                  placeholder='Group name'
                  variant='filled'
                  focusBorderColor='green.500'
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Group name</FormLabel>
                <Input
                  placeholder='Search users'
                  variant='filled'
                  focusBorderColor='green.500'
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <FormHelperText>Eg: Varun, Tarun</FormHelperText>
              </FormControl>
              <Flex w='100%' flexWrap='wrap' justifyContent='flex-start'>
                {selectedUsers.map((user, index) => {
                  return (
                    <UserBadgeItem
                      key={index}
                      user={user}
                      handleClick={handleDelete}
                    />
                  );
                })}
              </Flex>
            </VStack>
            {loading ? (
              <SkeletonLoader length='3' height='50px' mt='4' />
            ) : searchText !== '' && searchResult.length < 1 ? (
              <Text mt='4' textAlign='center' color='red.500'>
                No user found!
              </Text>
            ) : (
              <Box mt='4'>
                {searchResult.map((user, index) => {
                  return (
                    <UserListItem
                      key={index}
                      user={user}
                      handleClick={() => handleGroup(user)}
                    />
                  );
                })}
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loading}
              colorScheme='whatsapp'
              onClick={handleSubmit}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;

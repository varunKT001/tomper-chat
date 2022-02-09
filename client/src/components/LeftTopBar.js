import React from 'react';
import { AiOutlineSearch, AiFillBell, AiOutlinePlus } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useUserContext } from '../context/userContext';
import { ProfileModal, SearchUserSideDrawer, GroupChatModal } from '.';
import {
  Button,
  Tooltip,
  Text,
  Flex,
  Menu,
  VStack,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';

function SearchUserSideBar() {
  const { currentUser, logout } = useUserContext();

  return (
    <VStack w='100%' p='4' bg='gray.100'>
      <Flex w='100%' justifyContent='space-between' alignItems='center'>
        <Menu>
          <MenuButton
            as={Button}
            variant='ghost'
            rightIcon={<RiArrowDropDownLine />}
          >
            <Avatar
              size='sm'
              cursor='pointer'
              name={currentUser.name}
              src={currentUser.avatar.url}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <ProfileModal user={currentUser}>My Profile</ProfileModal>
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
        <Flex alignItems='center'>
          <Menu>
            <MenuButton p='2'>
              <AiFillBell fontSize='1.25rem' />
            </MenuButton>
            <MenuList>List</MenuList>
          </Menu>
          <GroupChatModal />
        </Flex>
      </Flex>
      <SearchUserSideDrawer>
        <Tooltip label='Search users'>
          <Button
            isFullWidth
            bg='white'
            variant='outline'
            justifyContent='space-between'
            rightIcon={<AiOutlineSearch />}
          >
            <Text>Search users</Text>
          </Button>
        </Tooltip>
      </SearchUserSideDrawer>
    </VStack>
  );
}

export default SearchUserSideBar;

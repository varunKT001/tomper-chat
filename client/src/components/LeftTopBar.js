import React from 'react';
import { AiOutlineSearch, AiFillBell, AiOutlinePlus } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useUserContext } from '../context/userContext';
import { useChatContext } from '../context/chatContext';
import { ProfileModal, SearchUserSideDrawer, GroupChatModal } from '.';
import { getSender } from '../utils/helpers';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
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
  Icon,
} from '@chakra-ui/react';

function SearchUserSideBar() {
  const { currentUser, logout } = useUserContext();
  const { notification, setNotification, setSelectedChat } = useChatContext();

  const handleClickNotification = (item) => {
    setSelectedChat(item.chat);
    setNotification((prev) => {
      return prev.filter((n) => n !== item);
    });
  };

  return (
    <VStack w='100%' p='4' bg='gray.100'>
      <Flex w='100%' mb='2' justifyContent='space-between' alignItems='center'>
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
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <Icon as={AiFillBell} m='1' fontSize='2xl' color='gray.500' />
            </MenuButton>
            <MenuList p='2'>
              {notification.length === 0 ? (
                'No new message'
              ) : (
                <>
                  {notification.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        onClick={() => handleClickNotification(item)}
                      >
                        {item.chat.isGroupChat
                          ? `New message in ${item.chat.chatName}`
                          : `New message from ${getSender(
                              currentUser,
                              item.chat.users
                            )}`}
                      </MenuItem>
                    );
                  })}
                </>
              )}
            </MenuList>
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

import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Avatar,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react';

function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          icon={<BsThreeDots />}
          colorScheme='gray'
          variant='ghost'
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={0} textAlign='center' fontSize='1.5rem'>
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py='8'>
            <VStack spacing='8'>
              <Avatar
                size='2xl'
                cursor='pointer'
                name={user.name}
                src={user.avatar.url}
              />
              <Box fontSize='1.25rem'>
                Email:{' '}
                <Text
                  as='a'
                  href={`mailto:${user.email}`}
                  color='whatsapp.500'
                  textDecoration='underline'
                >
                  {user.email}
                </Text>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;

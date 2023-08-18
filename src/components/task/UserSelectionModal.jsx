import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  RadioGroup,
  Stack,
  Radio,
  Button,
} from '@chakra-ui/react';
import { AiOutlineUserAdd } from 'react-icons/ai';

function UserSelectionModal({ isOpen, onClose, users, selectedUser, onSelectUser }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup value={selectedUser} onChange={onSelectUser}>
            <Stack spacing={2}>
              {users.map((user) => (
                <Radio key={user._id} value={user.name}>
                  {user.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Button mt={4} onClick={onClose}>
            Close
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UserSelectionModal;

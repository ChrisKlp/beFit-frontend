import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

export default function ModalWrapper({
  isOpen,
  onClose,
  title,
  children,
}: Props) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="5xl">
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Zamknij</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  itemName?: string | false;
  isOpen: boolean;
  onClose: () => void;
  onClick: () => Promise<void>;
};

export default function DeleteConfirmation({
  isOpen,
  itemName,
  onClose,
  onClick,
}: Props) {
  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete -{' '}
            <Text display="inline-block" fontWeight="bold" color="red.300">
              {itemName}
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? Item will be deleted permanently.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onClick} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

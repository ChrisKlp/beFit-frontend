import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';
import { useAppSelector } from '@/app/hooks';
import { selectMenuEditMode } from '../app/appSlice';

type Props = {
  name: string;
  date: string;
  handleDeleteClick: () => Promise<void>;
};

export default function WorkoutHistoryItem({
  name,
  date,
  handleDeleteClick,
}: Props) {
  const isEditModeActive = useAppSelector(selectMenuEditMode);
  return (
    <HStack justifyContent="space-between">
      <VStack alignItems="start" spacing={0}>
        <Text fontSize="sm" color="gray.300">
          {name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {date}
        </Text>
      </VStack>
      {isEditModeActive && (
        <HStack spacing={4}>
          <IconButton
            aria-label="Usuń"
            colorScheme="red"
            size="xs"
            variant="outline"
            icon={<AiFillDelete />}
            onClick={handleDeleteClick}
          />
        </HStack>
      )}
    </HStack>
  );
}

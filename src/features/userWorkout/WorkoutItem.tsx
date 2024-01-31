import {
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { useAppSelector } from '@/app/hooks';
import ModalWrapper from '@/components/ModalWrapper';
import { TWorkoutType } from '@/types/UserWorkout';
import { TWorkoutRes } from '@/types/Workout';
import { selectMenuEditMode } from '../app/appSlice';
import WorkoutList from '../workout/WorkoutList';
import WorkoutListItem from '../workout/WorkoutListItem';

type Props = {
  id: TWorkoutType;
  workoutData?: TWorkoutRes | null;
  label: string;
  handleSelect?: (recipeId: EntityId, workoutType: TWorkoutType) => void;
  handleDoneWorkout: (workoutId: EntityId) => Promise<void>;
};

export default function WorkoutItem({
  id,
  workoutData,
  label,
  handleSelect,
  handleDoneWorkout,
}: Props) {
  const isEditModeActive = useAppSelector(selectMenuEditMode);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!isEditModeActive && !workoutData) return null;

  const handleWorkoutSelect = (workoutId: EntityId) => {
    if (handleSelect) {
      handleSelect(workoutId, id);
    }
    onClose();
  };

  return (
    <>
      <Stack
        p={3}
        rounded="lg"
        position="relative"
        zIndex={0}
        _after={{
          content: `""`,
          bg: 'gray.700',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.6,
          rounded: 'lg',
          zIndex: -1,
        }}
      >
        <HStack w="100%" justifyContent="space-between">
          <Text fontSize="sm" color="gray.400">
            {label}
          </Text>
          {isEditModeActive && (
            <HStack>
              <IconButton
                aria-label="edytuj"
                colorScheme="gray"
                size="sm"
                variant="outline"
                icon={<AiFillEdit />}
                onClick={onOpen}
              />
              {workoutData && (
                <IconButton
                  aria-label="trening wykonany"
                  colorScheme="green"
                  size="sm"
                  icon={<AiOutlinePlus />}
                  onClick={() => handleDoneWorkout(workoutData._id)}
                />
              )}
            </HStack>
          )}
        </HStack>
        {workoutData && (
          <WorkoutListItem workoutId={workoutData._id} variant="compact" />
        )}
      </Stack>
      <ModalWrapper isOpen={isOpen} title={label} onClose={onClose}>
        <WorkoutList onClick={handleWorkoutSelect} />
      </ModalWrapper>
    </>
  );
}

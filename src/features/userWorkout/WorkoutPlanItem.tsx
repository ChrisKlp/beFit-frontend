import { Grid, HStack, IconButton, Text } from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { TWorkoutType } from '@/types/UserWorkout';
import ErrorStatus from '@/components/ErrorStatus';
import { useAppSelector } from '@/app/hooks';
import { selectMenuEditMode } from '../app/appSlice';
import {
  selectUserWorkoutById,
  useDeleteUserWorkoutMutation,
  useUpdateUserWorkoutMutation,
} from './userWorkoutApiSlice';
import WorkoutItem from './WorkoutItem';

type Props = {
  userWorkoutId: EntityId;
};

export default function WorkoutPlanItem({ userWorkoutId }: Props) {
  const data = useAppSelector((state) =>
    selectUserWorkoutById(state, userWorkoutId)
  );
  const isEditModeActive = useAppSelector(selectMenuEditMode);

  const [updateWorkout, { isError: isUpdateError, error: updateError }] =
    useUpdateUserWorkoutMutation();
  const [deleteWorkout, { isError: isDeleteError, error: deleteError }] =
    useDeleteUserWorkoutMutation();

  const handleDeleteClick = async () => {
    await deleteWorkout({ id: userWorkoutId });
  };

  const getUserWorkoutData = () => ({
    [TWorkoutType.WorkoutA]: data?.workoutA?._id || null,
    [TWorkoutType.WorkoutB]: data?.workoutB?._id || null,
    [TWorkoutType.WorkoutC]: data?.workoutC?._id || null,
  });

  const handleUpdateClick = async (
    workoutId: EntityId,
    workoutType: TWorkoutType
  ) => {
    await updateWorkout({
      id: userWorkoutId,
      ...getUserWorkoutData(),
      [workoutType]: workoutId,
    });
  };

  const isError = isUpdateError || isDeleteError;
  const error = updateError || deleteError;

  const workoutPlanData = useMemo(
    () => [
      {
        id: TWorkoutType.WorkoutA,
        workoutData: data?.workoutA,
        label: 'Trening A',
      },
      {
        id: TWorkoutType.WorkoutB,
        workoutData: data?.workoutB,
        label: 'Trening B',
      },
      {
        id: TWorkoutType.WorkoutC,
        workoutData: data?.workoutC,
        label: 'Trening C',
      },
    ],
    [data?.workoutA, data?.workoutB, data?.workoutC]
  );

  return (
    <Grid gap={3} bg="gray.800" w="full" p={3} rounded="lg">
      <HStack w="100%" justifyContent="space-between">
        <Text>Plan treningowy</Text>
        {isEditModeActive && (
          <HStack spacing={4} justifyContent="flex-end">
            <IconButton
              aria-label="Usuń"
              colorScheme="red"
              size="sm"
              variant="outline"
              icon={<AiFillDelete />}
              onClick={handleDeleteClick}
            />
          </HStack>
        )}
      </HStack>
      {isEditModeActive && isError && <ErrorStatus error={error} />}
      {data &&
        workoutPlanData.map(({ id, workoutData, label }) => (
          <WorkoutItem
            key={id}
            id={id}
            workoutData={workoutData}
            label={label}
            handleSelect={handleUpdateClick}
          />
        ))}
    </Grid>
  );
}

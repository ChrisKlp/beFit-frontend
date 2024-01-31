import { Button, Grid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import { selectMenuEditMode, setMenuEditMode } from '@/features/app/appSlice';
import WorkoutPlanItem from '@/features/userWorkout/WorkoutPlanItem';
import {
  useAddNewUserWorkoutMutation,
  useGetUserWorkoutsQuery,
} from '@/features/userWorkout/userWorkoutApiSlice';
import { isErrorWithDataAndStatus } from '@/utils/servicesHelpers';

export default function WorkoutsPage() {
  const { data, isError, isLoading, error } = useGetUserWorkoutsQuery();
  const isEditModeActive = useAppSelector(selectMenuEditMode);
  const dispatch = useAppDispatch();

  const [
    createWorkout,
    { isError: isCreateError, error: createError, isLoading: isCreateLoading },
  ] = useAddNewUserWorkoutMutation();

  useEffect(() => {
    if (
      data?.ids.length === 0 ||
      (isError &&
        isErrorWithDataAndStatus(error) &&
        error?.status === 404 &&
        isEditModeActive)
    ) {
      dispatch(setMenuEditMode(false));
    }
  }, [data?.ids.length, dispatch, error, isEditModeActive, isError]);

  const handleCreateWorkout = async () => {
    await createWorkout();
    if (!isEditModeActive) {
      dispatch(setMenuEditMode(true));
    }
  };

  if (isError && isErrorWithDataAndStatus(error) && error?.status === 404) {
    return (
      <VStack spacing={4}>
        <Text>Brak planu treningowego</Text>
        <Button
          colorScheme="green"
          variant="outline"
          size="sm"
          onClick={handleCreateWorkout}
          isLoading={isCreateLoading}
        >
          Dodaj plan
        </Button>
      </VStack>
    );
  }

  return data ? (
    <Grid gap={6}>
      {isCreateError && <ErrorStatus error={createError} />}
      {data.ids.map((userWorkoutId) => (
        <WorkoutPlanItem key={userWorkoutId} userWorkoutId={userWorkoutId} />
      ))}
      {isEditModeActive && (
        <Button
          colorScheme="green"
          size="sm"
          onClick={handleCreateWorkout}
          isLoading={isCreateLoading}
        >
          Dodaj plan
        </Button>
      )}
    </Grid>
  ) : isError ? (
    <ErrorStatus error={error} />
  ) : isLoading ? (
    <LoadingIndicator />
  ) : null;
}

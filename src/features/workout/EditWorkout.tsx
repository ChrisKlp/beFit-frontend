import { Button, Container, HStack, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ScrollRestoration, useNavigate, useParams } from 'react-router-dom';
import { TWorkoutFormValues, TWorkoutReq } from '@/types/Workout';
import ErrorStatus from '@/components/ErrorStatus';
import { useGetExercisesQuery } from '../exercise/exercisesApiSlice';
import WorkoutForm from './WorkoutForm';
import {
  parseValuesToWorkoutReq,
  parseWorkoutResToValues,
} from './workoutUtils';
import {
  useGetWorkoutsQuery,
  useUpdateWorkoutMutation,
} from './workoutsApiSlice';

export default function EditWorkout() {
  const navigate = useNavigate();
  const { workoutId } = useParams();

  const [
    updateWorkout,
    { isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess },
  ] = useUpdateWorkoutMutation();

  const { workout, isRequestError, requestError } = useGetWorkoutsQuery(
    undefined,
    {
      selectFromResult: ({ data, isError, error }) => {
        const workoutData = data?.entities[workoutId as string];
        return {
          workout: workoutData,
          isRequestError: isError,
          requestError: error,
        };
      },
    }
  );

  const {
    data: exercises,
    isError: isExercisesError,
    error: exercisesError,
  } = useGetExercisesQuery();

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate('/workouts');
    }
  }, [isUpdateSuccess, navigate]);

  const handleSubmit = async (
    values: TWorkoutFormValues,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const workoutReq: TWorkoutReq = parseValuesToWorkoutReq(values);
    await updateWorkout(workoutReq);
  };

  return (
    <>
      <Container mb={12} maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <HStack justifyContent="space-between" align="center" mb={6}>
            <Heading>Edit workout</Heading>
            <Button colorScheme="red" variant="outline">
              Delete
            </Button>
          </HStack>
          {(isUpdateError || isExercisesError || isRequestError) && (
            <ErrorStatus
              error={updateError || exercisesError || requestError}
            />
          )}
          {workout && (
            <WorkoutForm
              handleSubmit={handleSubmit}
              exercises={exercises}
              initialState={parseWorkoutResToValues(workout)}
            />
          )}
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

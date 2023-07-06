import { Container } from '@chakra-ui/react';
import { ScrollRestoration, useLocation, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import EditWorkout from './EditWorkout';
import WorkoutDetails from '../WorkoutDetails';
import { useGetWorkoutsQuery } from '../workoutsApiSlice';

export default function WorkoutItem() {
  const { workoutId } = useParams();
  const { pathname } = useLocation();

  const isEdit = /edit/i.test(pathname);

  const {
    workout,
    isWorkoutLoading,
    isWorkoutError,
    workoutError,
    isWorkoutSuccess,
  } = useGetWorkoutsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error, isSuccess }) => {
      const workoutData = data?.entities[workoutId as string];
      return {
        workout: workoutData,
        isWorkoutLoading: isLoading,
        isWorkoutError: isError,
        workoutError: error,
        isWorkoutSuccess: isSuccess,
      };
    },
  });

  const isError = isWorkoutError || (isWorkoutSuccess && !workout);

  const Content = isEdit ? EditWorkout : WorkoutDetails;

  return (
    <>
      <Container mb={12} maxW="container.lg">
        {workout ? (
          <Content workout={workout} />
        ) : isError ? (
          <ErrorStatus error={workoutError} />
        ) : isWorkoutLoading ? (
          <LoadingIndicator />
        ) : null}
      </Container>
      <ScrollRestoration />
    </>
  );
}

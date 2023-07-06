/* eslint-disable import/no-cycle */
import { ScrollRestoration, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import WorkoutDetails from '@/features/workout/WorkoutDetails';
import { useGetWorkoutsQuery } from '@/features/workout/workoutsApiSlice';

export default function WorkoutPage() {
  const { workoutId } = useParams();

  const {
    workout,
    isWorkoutLoading,
    isWorkoutSuccess,
    isWorkoutError,
    workoutError,
  } = useGetWorkoutsQuery(undefined, {
    selectFromResult: ({ data, isSuccess, isError, error, isLoading }) => {
      const workoutData = data?.entities[workoutId as string];
      return {
        workout: workoutData,
        isWorkoutSuccess: isSuccess,
        isWorkoutError: isError,
        workoutError: error,
        isWorkoutLoading: isLoading,
      };
    },
  });

  const isError = isWorkoutError || (isWorkoutSuccess && !workout);

  return (
    <>
      {workout ? (
        <WorkoutDetails workout={workout} />
      ) : isError ? (
        <ErrorStatus error={workoutError} />
      ) : isWorkoutLoading ? (
        <LoadingIndicator />
      ) : null}
      <ScrollRestoration />
    </>
  );
}

import { Button, HStack, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TWorkoutFormValues, TWorkoutReq, TWorkoutRes } from '@/types/Workout';
import ErrorStatus from '@/components/ErrorStatus';
import { useGetExercisesQuery } from '../exercise/exercisesApiSlice';
import WorkoutForm from './WorkoutForm';
import {
  parseValuesToWorkoutReq,
  parseWorkoutResToValues,
} from './workoutUtils';
import { useUpdateWorkoutMutation } from './workoutsApiSlice';

type Props = {
  workout: TWorkoutRes;
};

export default function EditWorkout({ workout }: Props) {
  const navigate = useNavigate();

  const [
    updateWorkout,
    { isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess },
  ] = useUpdateWorkoutMutation();

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
    <VStack spacing={6} align="stretch">
      <HStack justifyContent="space-between" align="center" mb={6}>
        <Heading>Edit workout</Heading>
        <Button colorScheme="red" variant="outline">
          Delete
        </Button>
      </HStack>
      {(isUpdateError || isExercisesError) && (
        <ErrorStatus error={updateError || exercisesError} />
      )}
      {workout && (
        <WorkoutForm
          handleSubmit={handleSubmit}
          exercises={exercises}
          initialState={parseWorkoutResToValues(workout)}
        />
      )}
    </VStack>
  );
}

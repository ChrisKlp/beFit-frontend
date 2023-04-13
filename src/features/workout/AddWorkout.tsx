import { Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import { TWorkoutFormValues, TWorkoutReq } from '@/types/Workout';
import ErrorStatus from '@/components/ErrorStatus';
import { useGetExercisesQuery } from '../exercise/exercisesApiSlice';
import WorkoutForm from './WorkoutForm';
import { useAddNewWorkoutMutation } from './workoutsApiSlice';

export default function AddWorkout() {
  const navigate = useNavigate();

  const [addWorkout, { isError, error, isSuccess }] =
    useAddNewWorkoutMutation();

  const {
    data: exercises,
    isError: isExercisesError,
    error: exercisesError,
  } = useGetExercisesQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate('/workouts');
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (
    values: TWorkoutFormValues,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const workoutReq: TWorkoutReq = {
      name: values.name,
      level: values.level,
      type: values.type,
      exercises: values.exercises.map((exercise) => ({
        exercise: exercise.exercise.value,
        sets: exercise.sets,
        reps: exercise.reps,
        rest: exercise.rest,
      })),
    };
    await addWorkout(workoutReq);
  };

  return (
    <>
      <Container mb={12} maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading>Add workout</Heading>
          {(isError || isExercisesError) && (
            <ErrorStatus error={error || exercisesError} />
          )}
          <WorkoutForm handleSubmit={handleSubmit} exercises={exercises} />
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

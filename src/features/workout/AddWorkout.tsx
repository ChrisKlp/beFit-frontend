/* eslint-disable @typescript-eslint/no-throw-literal */
import { Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import WorkoutForm from './WorkoutForm';
import { useAddNewWorkoutMutation } from './workoutsApiSlice';
import { useGetExercisesQuery } from '../exercise/exercisesApiSlice';
import { TWorkoutReq } from '@/types/Workout';

export default function AddWorkout() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    level: '',
    type: {
      label: '',
      value: '',
    },
    exercises: [] as any[],
  });

  const [addWorkout, { isError, error, isSuccess }] =
    useAddNewWorkoutMutation();

  const {
    data: exercises,
    isLoading: isExercisesLoading,
    isError: isExercisesError,
    error: exercisesError,
  } = useGetExercisesQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate('/workouts');
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const workoutReq: TWorkoutReq = {
      name: values.name,
      level: values.level,
      type: values.type.value,
      exercises: values.exercises.map((exercise) => ({
        exercise: exercise.exercise.value,
        sets: exercise.sets,
        reps: exercise.reps,
        rest: exercise.rest,
      })),
    };
    await addWorkout(workoutReq);
  };

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onTypeChange = (item: any) => {
    setValues((prev) => ({ ...prev, type: item }));
  };

  const onExerciseChange = (item: any, index: number) => {
    setValues((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === index ? { ...exercise, exercise: item } : exercise
      ),
    }));
  };

  const onExerciseInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [name]: value } : exercise
      ),
    }));
  };

  const removeExercise = (index: number) => {
    setValues((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const addExercise = () => {
    setValues((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        { exercise: { label: '', value: '' }, sets: 0, reps: 0, rest: 0 },
      ],
    }));
  };

  return (
    <>
      <Container mb={12} maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading>Add workout</Heading>
          {(isError || isExercisesError) && (
            <ErrorStatus error={error || exercisesError} />
          )}
          <WorkoutForm
            values={values}
            onChange={updateValue}
            handleSubmit={handleSubmit}
            exercises={exercises}
            addExercise={addExercise}
            removeExercise={removeExercise}
            onInputChange={updateValue}
            onTypeChange={onTypeChange}
            onExerciseChange={onExerciseChange}
            onExerciseInputChange={onExerciseInputChange}
          />
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

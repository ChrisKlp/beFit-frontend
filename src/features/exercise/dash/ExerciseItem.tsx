import { Container } from '@chakra-ui/react';
import { ScrollRestoration, useLocation, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import EditExercise from './EditExercise';
import ExerciseDetails from './ExerciseDetails';
import { useGetExercisesQuery } from '../exercisesApiSlice';

export default function ExerciseItem() {
  const { exerciseId } = useParams();
  const { pathname } = useLocation();

  const isEdit = /edit/i.test(pathname);

  const {
    exercise,
    isExerciseLoading,
    isExerciseError,
    exerciseError,
    isExerciseSuccess,
  } = useGetExercisesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error, isSuccess }) => {
      const exerciseData = data?.entities[exerciseId as string];
      return {
        exercise: exerciseData,
        isExerciseLoading: isLoading,
        isExerciseError: isError,
        exerciseError: error,
        isExerciseSuccess: isSuccess,
      };
    },
  });

  const isError = isExerciseError || (isExerciseSuccess && !exercise);

  const Content = isEdit ? EditExercise : ExerciseDetails;

  return (
    <>
      <Container mb={12} maxW="container.lg">
        {exercise ? (
          <Content exercise={exercise} />
        ) : isError ? (
          <ErrorStatus error={exerciseError} />
        ) : isExerciseLoading ? (
          <LoadingIndicator />
        ) : null}
      </Container>
      <ScrollRestoration />
    </>
  );
}

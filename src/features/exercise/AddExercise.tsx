import { Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import { TExerciseFormValues, TExerciseReq } from '@/types/Exercise';
import ErrorStatus from '@/components/ErrorStatus';
import ExerciseForm from './ExerciseForm';
import { useAddNewExerciseMutation } from './exercisesApiSlice';
import { paths } from '@/router';

export default function AddExercise() {
  const navigate = useNavigate();

  const [addExercise, { isError, error, isSuccess }] =
    useAddNewExerciseMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(paths.dashboard.exercises.list);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (values: TExerciseFormValues) => {
    const exerciseReq: TExerciseReq = values;
    await addExercise(exerciseReq);
  };

  return (
    <>
      <Container mb={12} maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading>Add exercise</Heading>
          {isError && <ErrorStatus error={error} />}
          <ExerciseForm handleSubmit={handleSubmit} />
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

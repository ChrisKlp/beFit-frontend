/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Spinner,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ScrollRestoration, useNavigate, useParams } from 'react-router-dom';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import ErrorStatus from '@/components/ErrorStatus';
import { handleError } from '@/utils/servicesHelpers';
import ExerciseForm from './ExerciseForm';
import {
  useDeleteExerciseMutation,
  useGetExercisesQuery,
  useUpdateExerciseMutation,
} from './exercisesApiSlice';

export type TExerciseFormValues = {
  name: string;
  videoUrl: string;
  type: string;
};

export default function EditExercise() {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState<TExerciseFormValues>({
    name: '',
    videoUrl: '',
    type: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    exercise,
    isRequestSuccess,
    isRequestError,
    requestError,
    isRequestLoading,
  } = useGetExercisesQuery(undefined, {
    selectFromResult: ({ data, isSuccess, isError, isLoading, error }) => {
      const exerciseData = data?.entities[exerciseId as string];
      return {
        exercise: exerciseData,
        isRequestSuccess: isSuccess,
        isRequestError: isError,
        requestError: error,
        isRequestLoading: isLoading,
      };
    },
  });

  const [updateExercise, { isError, error, isSuccess }] =
    useUpdateExerciseMutation();

  const [
    deleteExercise,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteExerciseMutation();

  useEffect(() => {
    if (exercise && isRequestSuccess) {
      setValues({
        name: exercise.name,
        videoUrl: exercise.videoUrl,
        type: exercise.type,
      });
    }
  }, [exercise, isRequestSuccess]);

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      navigate('/exercises');
    }
    if (isDeleteError) {
      onClose();
    }
  }, [isDeleteError, isDeleteSuccess, isSuccess, navigate, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (exercise) {
      await updateExercise({
        id: exercise._id,
        ...values,
      });
    }
  };

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = async () => {
    if (exercise) {
      await deleteExercise({ id: exercise._id });
    }
  };

  handleError(isRequestError, requestError);

  if (!exercise) {
    if (isRequestSuccess) {
      throw new Response('', {
        status: 403,
        statusText: 'Exercise Not Found',
      });
    }
  }

  return exercise ? (
    <>
      <Container mb={12} maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <HStack justifyContent="space-between" align="center">
            <Heading>Edit exercise</Heading>
            <Button colorScheme="red" variant="outline" onClick={onOpen}>
              Delete
            </Button>
          </HStack>
          {(isError || isDeleteError) && (
            <ErrorStatus error={error || deleteError} />
          )}
          <ExerciseForm
            values={values}
            onChange={updateValue}
            handleSubmit={handleSubmit}
          />
        </VStack>
      </Container>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        itemName={exercise.name}
        onClick={handleDelete}
      />
      <ScrollRestoration />
    </>
  ) : isRequestLoading ? (
    <Center>
      <Spinner />
    </Center>
  ) : null;
}

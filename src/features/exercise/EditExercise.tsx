import {
  Button,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import ErrorStatus from '@/components/ErrorStatus';
import paths from '@/routes/paths';
import {
  TExerciseFormValues,
  TExerciseReq,
  TExerciseRes,
} from '@/types/Exercise';
import ExerciseForm from './ExerciseForm';
import {
  useDeleteExerciseMutation,
  useUpdateExerciseMutation,
} from './exercisesApiSlice';

type Props = {
  exercise: TExerciseRes;
};

export default function EditExercise({ exercise }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateExercise, { isError, error, isSuccess }] =
    useUpdateExerciseMutation();

  const [
    deleteExercise,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteExerciseMutation();

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      navigate(paths.dash.exercises.list);
    }
    if (isDeleteError) {
      onClose();
    }
  }, [isDeleteError, isDeleteSuccess, isSuccess, navigate, onClose]);

  const handleSubmit = async (values: TExerciseFormValues) => {
    const workoutReq: TExerciseReq = {
      id: exercise._id,
      ...values,
    };
    await updateExercise(workoutReq);
  };

  const handleDelete = async () => {
    await deleteExercise({ id: exercise._id });
  };

  return (
    <>
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
          handleSubmit={handleSubmit}
          initialState={{
            name: exercise.name,
            videoUrl: exercise.videoUrl,
            type: exercise.type,
          }}
        />
      </VStack>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        itemName={exercise.name}
        onClick={handleDelete}
      />
    </>
  );
}

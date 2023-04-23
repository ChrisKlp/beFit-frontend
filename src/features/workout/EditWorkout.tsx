import {
  Button,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
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
import {
  useDeleteWorkoutMutation,
  useUpdateWorkoutMutation,
} from './workoutsApiSlice';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { paths } from '@/router';

type Props = {
  workout: TWorkoutRes;
};

export default function EditWorkout({ workout }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [
    updateWorkout,
    { isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess },
  ] = useUpdateWorkoutMutation();

  const {
    data: exercises,
    isError: isExercisesError,
    error: exercisesError,
  } = useGetExercisesQuery();

  const [
    deleteWorkout,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteWorkoutMutation();

  useEffect(() => {
    if (isUpdateSuccess || isDeleteSuccess) {
      navigate(paths.dashboard.workouts.list);
    }
    if (isDeleteError) {
      onClose();
    }
  }, [isDeleteError, isDeleteSuccess, isUpdateSuccess, navigate, onClose]);

  const handleSubmit = async (values: TWorkoutFormValues) => {
    const workoutReq: TWorkoutReq = {
      id: workout._id,
      ...parseValuesToWorkoutReq(values),
    };
    await updateWorkout(workoutReq);
  };

  const handleDelete = async () => {
    await deleteWorkout({ id: workout._id });
  };

  const isError = isUpdateError || isExercisesError || isDeleteError;

  return (
    <>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" align="center" mb={6}>
          <Heading>Edit workout</Heading>
          <Button colorScheme="red" variant="outline" onClick={onOpen}>
            Delete
          </Button>
        </HStack>
        {isError && (
          <ErrorStatus error={updateError || exercisesError || deleteError} />
        )}
        {workout && (
          <WorkoutForm
            handleSubmit={handleSubmit}
            exercises={exercises}
            initialState={parseWorkoutResToValues(workout)}
          />
        )}
      </VStack>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        itemName={workout.name}
        onClick={handleDelete}
      />
    </>
  );
}

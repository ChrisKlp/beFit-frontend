import {
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import {
  capitalizeFirstLetter,
  convertSecondsToTime,
} from '@/utils/stringUtils';
import { useGetWorkoutsQuery } from './workoutsApiSlice';

export default function WorkoutDetails() {
  const { workoutId } = useParams();

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

  return (
    <>
      <Container mb={12} maxW="container.lg">
        {workout ? (
          <VStack spacing={6} align="stretch">
            <Heading>{workout.name}</Heading>
            <VStack align="stretch">
              <Text>{`Poziom: ${capitalizeFirstLetter(workout.level)}`}</Text>
              <Text>{`Typ: ${workout.type}`}</Text>
              <Center height={12}>
                <Divider />
              </Center>
              <Grid templateColumns="30px 1fr 150px 150px">
                <Text />
                <Text fontWeight="bold" color="green.400" fontSize="sm">
                  Ćwiczenia:
                </Text>
                <Text fontWeight="bold" color="green.400" fontSize="sm">
                  Powtórzenia:
                </Text>
                <Text fontWeight="bold" color="green.400" fontSize="sm">
                  Odpoczynek:
                </Text>
              </Grid>
              {workout.exercises.map((exercise, index) => (
                <Grid key={exercise._id} templateColumns="30px 1fr 150px 150px">
                  <GridItem w={2}>{index + 1}</GridItem>
                  <GridItem>{exercise.exercise.name}</GridItem>
                  <GridItem>{`${exercise.sets} x ${
                    exercise.exercise.type === 'time'
                      ? convertSecondsToTime(exercise.reps)
                      : exercise.reps
                  }`}</GridItem>
                  <GridItem>{convertSecondsToTime(exercise.rest)}</GridItem>
                </Grid>
              ))}
            </VStack>
          </VStack>
        ) : isError ? (
          <ErrorStatus error={workoutError} />
        ) : isWorkoutLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : null}
      </Container>
      <ScrollRestoration />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Text, VStack } from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import WorkoutListItem from './WorkoutListItem';
import { useGetWorkoutsQuery } from './workoutsApiSlice';

type Props = {
  onClick?: (id: EntityId) => void;
};

export default function WorkoutList({ onClick }: Props) {
  const { data, isError, isLoading, error } = useGetWorkoutsQuery();

  return data ? (
    <Grid gap={6} mt={2} mb={8}>
      {data.ids.length ? (
        <VStack spacing={2}>
          {data.ids.map((id) => (
            <WorkoutListItem key={id} workoutId={id} onClick={onClick} />
          ))}
        </VStack>
      ) : (
        <Text textAlign="center" color="whiteAlpha.500">
          Brak treningów
        </Text>
      )}
    </Grid>
  ) : isError ? (
    <ErrorStatus error={error} />
  ) : isLoading ? (
    <LoadingIndicator />
  ) : null;
}

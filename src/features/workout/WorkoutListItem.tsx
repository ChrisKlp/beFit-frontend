/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import LoadingIndicator from '@/components/LoadingIndicator';
import paths from '@/routes/paths';
import { selectWorkoutById } from './workoutsApiSlice';

type Props = {
  workoutId: EntityId;
  variant?: 'default' | 'compact';
  onClick?: (id: EntityId) => void;
};

export default function WorkoutListItem({
  workoutId,
  variant = 'default',
  onClick,
}: Props) {
  const data = useAppSelector((state) => selectWorkoutById(state, workoutId));

  if (!data) return <LoadingIndicator />;

  return (
    <LinkBox
      w="full"
      bg={variant === 'default' ? 'gray.800' : 'transparent'}
      py={variant === 'default' ? 3 : 1}
      px={variant === 'default' ? 4 : 1}
      rounded="lg"
      onClick={() => onClick && onClick(workoutId)}
      cursor={onClick ? 'pointer' : 'default'}
    >
      <HStack flex={1} align="stretch" justifyContent="space-between">
        {onClick ? (
          <Text>{data.name}</Text>
        ) : (
          <LinkOverlay as={RouterLink} to={paths.workouts.item(workoutId)}>
            <Text>{data.name}</Text>
          </LinkOverlay>
        )}
        <Text fontSize="sm" color="green.300">
          {data.type}
        </Text>
      </HStack>
    </LinkBox>
  );
}

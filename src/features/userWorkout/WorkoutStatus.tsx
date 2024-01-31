import { Grid, Text, VStack } from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from '@/app/hooks';
import ErrorStatus from '@/components/ErrorStatus';
import { TUserDoneWorkout } from '@/types/UserWorkout';
import { formatCreatedAt } from '@/utils/stringUtils';
import { selectMenuEditMode } from '../app/appSlice';
import { useDeleteUserDoneWorkoutMutation } from '../userDoneWorkout/userDoneWorkoutApiSlice';
import WorkoutHistoryItem from './WorkoutHistoryItem';

type Props = {
  data: TUserDoneWorkout[];
};

export default function WorkoutStatus({ data }: Props) {
  const isEditModeActive = useAppSelector(selectMenuEditMode);

  const [deleteDoneWorkout, { isError, error }] =
    useDeleteUserDoneWorkoutMutation();

  const handleDeleteClick = async (id: EntityId) => {
    await deleteDoneWorkout({ id });
  };

  const totalWorkoutsInPlan = 18;
  const stats = [
    {
      name: 'Wykonane',
      value: data.length,
    },
    {
      name: 'Pozostało',
      value:
        totalWorkoutsInPlan - data.length < 0
          ? 0
          : totalWorkoutsInPlan - data.length,
    },
    {
      name: 'Ilość',
      value: totalWorkoutsInPlan,
    },
  ];

  const filteredData = isEditModeActive ? data : [data[0]];

  return (
    <Grid my={4} gap={4}>
      {isEditModeActive && isError && <ErrorStatus error={error} />}
      {data.length > 0 && (
        <Grid gap={2}>
          <Text fontSize="sm" color="gray.400">
            Ostatni trening:
          </Text>
          {filteredData.map(({ _id, createdAt, workout }) => (
            <WorkoutHistoryItem
              key={_id}
              name={workout.name}
              date={formatCreatedAt(createdAt)}
              handleDeleteClick={() => handleDeleteClick(_id)}
            />
          ))}
        </Grid>
      )}
      <Grid gridAutoFlow="column" templateColumns="repeat(3, 1fr)" gap={3}>
        {stats.map((stat) => (
          <VStack
            key={stat.name}
            p={3}
            spacing={0}
            rounded="lg"
            position="relative"
            zIndex={0}
            _after={{
              content: `""`,
              bg: 'gray.700',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0.6,
              rounded: 'lg',
              zIndex: -1,
            }}
          >
            <Text fontSize="sm" color="gray.400">
              {stat.name}
            </Text>
            <Text fontWeight={700} color="green.400">
              {stat.value}
            </Text>
          </VStack>
        ))}
      </Grid>
    </Grid>
  );
}

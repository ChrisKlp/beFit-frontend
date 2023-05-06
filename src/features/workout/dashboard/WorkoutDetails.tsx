import {
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TWorkoutRes } from '@/types/Workout';
import {
  capitalizeFirstLetter,
  convertSecondsToTime,
} from '@/utils/stringUtils';

type Props = {
  workout: TWorkoutRes;
};

export default function WorkoutDetails({ workout }: Props) {
  return (
    <VStack spacing={6} align="stretch">
      <Heading>{workout.name}</Heading>
      <VStack align="stretch">
        <Text>{`Poziom: ${capitalizeFirstLetter(workout.level)}`}</Text>
        <Text>{`Typ: ${workout.type}`}</Text>
        <Center height={12}>
          <Divider />
        </Center>
        <Grid templateColumns="10px 1fr 100px 100px" gap={2}>
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
          <Grid
            key={exercise._id}
            templateColumns="10px 1fr 100px 100px"
            gap={2}
          >
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
  );
}

import {
  Box,
  Grid,
  HStack,
  Heading,
  Icon,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BiTimeFive } from 'react-icons/bi';
import { TbBarbell } from 'react-icons/tb';
import PlayYoutubeButton from '@/components/PlayYoutubeButton';
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
    <Box>
      <Heading mb={2}>{workout.name}</Heading>
      <HStack spacing={2} mb={10}>
        <Tag colorScheme="green">{capitalizeFirstLetter(workout.level)}</Tag>
        <Tag colorScheme="green">{workout.type}</Tag>
      </HStack>
      <VStack align="stretch">
        {workout.exercises.map((exercise) => (
          <Box key={exercise._id} bgColor="gray.800" p={3} rounded="lg">
            <Text mb={3}>{exercise.exercise.name}</Text>
            <Grid gridAutoFlow="column" gap={2} templateColumns="1fr 1fr 75px">
              <HStack
                bgColor="gray.700"
                p={3}
                rounded="lg"
                justifyContent="space-between"
              >
                <Icon as={TbBarbell} boxSize={5} />
                <Text>{`${exercise.sets} x ${
                  exercise.exercise.type === 'time'
                    ? convertSecondsToTime(exercise.reps)
                    : exercise.reps
                }`}</Text>
              </HStack>
              <HStack
                bgColor="green.800"
                p={3}
                rounded="lg"
                justifyContent="space-between"
              >
                <Icon as={BiTimeFive} boxSize={5} />
                <Text>{convertSecondsToTime(exercise.rest)}</Text>
              </HStack>
              <PlayYoutubeButton url={exercise.exercise.videoUrl} />
            </Grid>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

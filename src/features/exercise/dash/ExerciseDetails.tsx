import { HStack, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { TExerciseRes } from '@/types/Exercise';

type Props = {
  exercise: TExerciseRes;
};

export default function ExerciseDetails({ exercise }: Props) {
  return (
    <VStack spacing={6} align="stretch">
      <Heading>{exercise.name}</Heading>
      <VStack align="stretch">
        <HStack>
          <Text>Video url: </Text>
          <Link href={exercise.videoUrl} target="_blank">
            {exercise.videoUrl}
          </Link>
        </HStack>
        <Text>{`Typ: ${exercise.type}`}</Text>
      </VStack>
    </VStack>
  );
}

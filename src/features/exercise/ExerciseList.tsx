import {
  Button,
  Center,
  Container,
  HStack,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@/components/Dashboard/ListItem';
import { handleError } from '@/utils/servicesHelpers';
import { useGetExercisesQuery } from './exercisesApiSlice';

export default function ExerciseList() {
  const { data, isError, isLoading, error } = useGetExercisesQuery();

  handleError(isError, error);

  return data ? (
    <Container maxWidth="container.lg">
      <HStack>
        <Button
          as={RouterLink}
          to="/exercises/add"
          colorScheme="orange"
          size="sm"
          variant="outline"
          mt={2}
          mb={6}
        >
          Add Exercise
        </Button>
      </HStack>
      <VStack spacing={2}>
        {data.ids.map((id) => (
          <ListItem
            key={id}
            link={`/exercises/edit/${id}`}
            editLink={`/exercises/edit/${id}`}
            data={data.entities[id]}
          />
        ))}
      </VStack>
    </Container>
  ) : isLoading ? (
    <Center>
      <Spinner />
    </Center>
  ) : null;
}

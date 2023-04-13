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
import { useGetWorkoutsQuery } from './workoutsApiSlice';
import ErrorStatus from '@/components/ErrorStatus';

export default function ExerciseList() {
  const { data, isError, isLoading, error } = useGetWorkoutsQuery();

  return (
    <Container maxWidth="container.lg">
      <HStack>
        <Button
          as={RouterLink}
          to="/workouts/add"
          colorScheme="orange"
          size="sm"
          variant="outline"
          mt={2}
          mb={6}
        >
          Add Exercise
        </Button>
      </HStack>
      {data ? (
        <VStack spacing={2}>
          {data.ids.map((id) => (
            <ListItem
              key={id}
              data={data.entities[id]}
              link={`/workouts/${id}`}
              editLink={`/workouts/edit/${id}`}
            />
          ))}
        </VStack>
      ) : isError ? (
        <ErrorStatus error={error} />
      ) : isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : null}
    </Container>
  );
}

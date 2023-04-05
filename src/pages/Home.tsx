import {
  Button,
  Center,
  Container,
  HStack,
  LinkBox,
  LinkOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';
import { handleError } from '@/utils/servicesHelpers';
import ListItem from '@/components/Dashboard/ListItem';

export default function Home() {
  const { data, isError, error } = useGetRecipesQuery();

  handleError(isError, error);

  return data ? (
    <Container maxWidth="container.lg">
      <VStack spacing={2}>
        {data.ids.map((id) => (
          <ListItem key={id} link={`/recipes/${id}`} data={data.entities[id]} />
        ))}
      </VStack>
    </Container>
  ) : (
    <Center>
      <Spinner />
    </Center>
  );
}

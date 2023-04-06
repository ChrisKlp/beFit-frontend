import { Center, Container, Spinner, VStack } from '@chakra-ui/react';
import ListItem from '@/components/Dashboard/ListItem';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';
import { handleError } from '@/utils/servicesHelpers';

export default function RecipeList() {
  const { data, isError, isLoading, error } = useGetRecipesQuery();

  handleError(isError, error);

  return data ? (
    <Container maxWidth="container.lg">
      <VStack spacing={2}>
        {data.ids.map((id) => (
          <ListItem key={id} link={`/recipes/${id}`} data={data.entities[id]} />
        ))}
      </VStack>
    </Container>
  ) : isLoading ? (
    <Center>
      <Spinner />
    </Center>
  ) : null;
}

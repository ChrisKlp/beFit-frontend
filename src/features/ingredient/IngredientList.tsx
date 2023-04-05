import { Center, Container, Spinner, VStack } from '@chakra-ui/react';
import ListItem from '@/components/Dashboard/ListItem';
import { handleError } from '@/utils/servicesHelpers';
import { useGetIngredientsQuery } from './ingredientsApiSlice';

export default function IngredientList() {
  const { data, isError, error } = useGetIngredientsQuery();

  handleError(isError, error);

  return data ? (
    <Container maxWidth="container.lg">
      <VStack spacing={2}>
        {data.ids.map((id) => (
          <ListItem
            key={id}
            link={`/ingredients/${id}`}
            data={data.entities[id]}
          />
        ))}
      </VStack>
    </Container>
  ) : (
    <Center>
      <Spinner />
    </Center>
  );
}

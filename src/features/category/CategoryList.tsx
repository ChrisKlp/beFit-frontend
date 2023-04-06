import { Center, Container, Spinner, VStack } from '@chakra-ui/react';
import ListItem from '@/components/Dashboard/ListItem';
import { handleError } from '@/utils/servicesHelpers';
import { useGetCategoriesQuery } from './categoriesApiSlice';

export default function CategoryList() {
  const { data, isError, error } = useGetCategoriesQuery();

  handleError(isError, error);

  return data ? (
    <Container maxWidth="container.lg">
      <VStack spacing={2}>
        {data.ids.map((id) => (
          <ListItem
            key={id}
            link={`/categories/${id}`}
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

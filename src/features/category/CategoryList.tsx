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
import { useGetCategoriesQuery } from './categoriesApiSlice';

export default function CategoryList() {
  const { data, isError, isLoading, error } = useGetCategoriesQuery();

  handleError(isError, error);

  return data ? (
    <Container maxWidth="container.lg">
      <HStack>
        <Button
          as={RouterLink}
          to="/categories/add"
          colorScheme="orange"
          size="sm"
          variant="outline"
          mt={2}
          mb={6}
        >
          Add Category
        </Button>
      </HStack>
      <VStack spacing={2}>
        {data.ids.map((id) => (
          <ListItem
            key={id}
            link={`/categories/edit/${id}`}
            editLink={`/categories/edit/${id}`}
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

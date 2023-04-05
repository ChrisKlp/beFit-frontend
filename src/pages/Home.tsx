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

export default function Home() {
  const { data, isError, error } = useGetRecipesQuery();

  handleError(isError, error);

  return data ? (
    <Container maxWidth="container.lg">
      <VStack spacing={2}>
        {data.ids.map((id) => (
          <LinkBox w="full" bg="gray.700" py={3} px={4} rounded="md" key={id}>
            <HStack justifyContent="space-between" alignItems="center">
              <LinkOverlay as={RouterLink} to={`/recipes/${id}`}>
                <Text>{data.entities[id]?.title}</Text>
              </LinkOverlay>
              <Button colorScheme="green" variant="outline" size="sm">
                Edit
              </Button>
            </HStack>
          </LinkBox>
        ))}
      </VStack>
    </Container>
  ) : (
    <Center>
      <Spinner />
    </Center>
  );
}

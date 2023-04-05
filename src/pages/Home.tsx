import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';

export default function Home() {
  const { data, isError, isLoading, error } = useGetRecipesQuery();

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Container maxWidth="container.lg">
      <VStack spacing={2}>
        {data.ids.map((id) => (
          <Box w="full" bg="gray.700" py={3} px={4} rounded="md" key={id}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text>{data.entities[id]?.title}</Text>
              <Button colorScheme="green" variant="outline" size="sm">
                Edit
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
}

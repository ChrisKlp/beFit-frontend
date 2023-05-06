import {
  Container,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';
import { TRecipeRes } from '@/types/Recipe';
import LoadingView from '@/components/LoadingView';

type ListItemProps = {
  data?: TRecipeRes;
};

function ListItem({ data }: ListItemProps) {
  return (
    <LinkBox w="full" bg="gray.800" py={3} px={4} rounded="lg">
      <HStack alignItems="center" spacing={4}>
        {data?.image && (
          <Image
            boxSize="60px"
            rounded="full"
            objectFit="cover"
            src={data?.image}
            alt="recipe image"
          />
        )}
        <VStack flex={1} align="stretch" spacing={0}>
          <LinkOverlay as={RouterLink} to="/home">
            <Text>{data?.title}</Text>
          </LinkOverlay>
          <Text fontSize="xs" color="gray.500">
            {data?.categories.map((c) => c.name).join(', ')}
          </Text>
        </VStack>
      </HStack>
    </LinkBox>
  );
}

export default function RecipeList() {
  const { data, isError, isLoading, error } = useGetRecipesQuery();

  return (
    <Container maxWidth="container.lg">
      {data ? (
        <VStack spacing={2}>
          {data.ids.map((id) => {
            return <ListItem key={id} data={data.entities[id]} />;
          })}
        </VStack>
      ) : isError || isLoading ? (
        <LoadingView isError={isError} isLoading={isLoading} />
      ) : null}
    </Container>
  );
}

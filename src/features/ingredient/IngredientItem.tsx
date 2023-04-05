/* eslint-disable @typescript-eslint/no-throw-literal */
import {
  Center,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import { handleError } from '@/utils/servicesHelpers';
import { useGetIngredientsQuery } from './ingredientsApiSlice';

export default function IngredientItem() {
  const { ingredientId } = useParams();

  const { ingredient, isRequestSuccess, isRequestError, requestError } =
    useGetIngredientsQuery(undefined, {
      selectFromResult: ({ data, isSuccess, isError, error }) => {
        const ingredientData = data?.entities[ingredientId as string];
        return {
          ingredient: ingredientData,
          isRequestSuccess: isSuccess,
          isRequestError: isError,
          requestError: error,
        };
      },
    });

  handleError(isRequestError, requestError);

  if (!ingredient) {
    if (isRequestSuccess) {
      throw new Response('', {
        status: 403,
        statusText: 'Ingredient Not Found',
      });
    } else {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
  }

  return (
    <>
      <Container mb={12}>
        <VStack spacing={6} align="stretch">
          <Heading>{ingredient.name}</Heading>
          <Text>{`Waga jednostki: ${ingredient.unitWeight} g`}</Text>
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

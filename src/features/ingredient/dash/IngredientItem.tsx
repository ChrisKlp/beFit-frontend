import { Container } from '@chakra-ui/react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import EditIngredient from './EditIngredient';
import { useGetIngredientsQuery } from '../ingredientsApiSlice';

export default function IngredientItem() {
  const { ingredientId } = useParams();

  const {
    ingredient,
    isIngredientLoading,
    isIngredientError,
    ingredientError,
    isIngredientSuccess,
  } = useGetIngredientsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error, isSuccess }) => {
      const ingredientData = data?.entities[ingredientId as string];
      return {
        ingredient: ingredientData,
        isIngredientLoading: isLoading,
        isIngredientError: isError,
        ingredientError: error,
        isIngredientSuccess: isSuccess,
      };
    },
  });

  const isError = isIngredientError || (isIngredientSuccess && !ingredient);

  return (
    <>
      <Container mb={12} maxW="container.lg">
        {ingredient ? (
          <EditIngredient ingredient={ingredient} />
        ) : isError ? (
          <ErrorStatus error={ingredientError} />
        ) : isIngredientLoading ? (
          <LoadingIndicator />
        ) : null}
      </Container>
      <ScrollRestoration />
    </>
  );
}

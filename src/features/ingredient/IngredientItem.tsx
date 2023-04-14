import { Container } from '@chakra-ui/react';
import { ScrollRestoration, useLocation, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import IngredientDetails from './IngredientDetails';
import { useGetIngredientsQuery } from './ingredientsApiSlice';
import EditIngredient from './EditIngredient';

export default function IngredientItem() {
  const { ingredientId } = useParams();
  const { pathname } = useLocation();

  const isEdit = /edit/i.test(pathname);

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

  const Content = isEdit ? EditIngredient : IngredientDetails;

  return (
    <>
      <Container mb={12} maxW="container.lg">
        {ingredient ? (
          <Content ingredient={ingredient} />
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

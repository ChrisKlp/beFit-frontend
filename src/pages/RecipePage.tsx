/* eslint-disable import/no-cycle */
import { Container } from '@chakra-ui/react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import SingleRecipe from '@/features/recipe/home/SingleRecipe';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';

export default function RecipePage() {
  const { recipeId } = useParams();

  const {
    recipe,
    isRecipeLoading,
    isRecipeSuccess,
    isRecipeError,
    recipeError,
  } = useGetRecipesQuery(undefined, {
    selectFromResult: ({ data, isSuccess, isError, error, isLoading }) => {
      const recipeData = data?.entities[recipeId as string];
      return {
        recipe: recipeData,
        isRecipeSuccess: isSuccess,
        isRecipeError: isError,
        recipeError: error,
        isRecipeLoading: isLoading,
      };
    },
  });

  const isError = isRecipeError || (isRecipeSuccess && !recipe);

  return (
    <>
      <Container mb={12} maxW="container.lg">
        {recipe ? (
          <SingleRecipe recipe={recipe} />
        ) : isError ? (
          <ErrorStatus error={recipeError} />
        ) : isRecipeLoading ? (
          <LoadingIndicator />
        ) : null}
      </Container>
      <ScrollRestoration />
    </>
  );
}

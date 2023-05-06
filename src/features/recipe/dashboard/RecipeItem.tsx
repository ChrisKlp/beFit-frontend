/* eslint-disable import/no-cycle */
import { Container } from '@chakra-ui/react';
import { ScrollRestoration, useLocation, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import EditRecipe from './EditRecipe';
import RecipeDetails from './RecipeDetails';
import { useGetRecipesQuery } from '../recipesApiSlice';

export default function RecipeItem() {
  const { recipeId } = useParams();
  const { pathname } = useLocation();

  const isEdit = /edit/i.test(pathname);

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

  const Content = isEdit ? EditRecipe : RecipeDetails;

  return (
    <>
      <Container mb={12} maxW="container.lg">
        {recipe ? (
          <Content recipe={recipe} />
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

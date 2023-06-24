/* eslint-disable import/no-cycle */
import { ScrollRestoration, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import SingleRecipe from '@/features/recipe/home/RecipeDetails';
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
      {recipe ? (
        <SingleRecipe recipe={recipe} />
      ) : isError ? (
        <ErrorStatus error={recipeError} />
      ) : isRecipeLoading ? (
        <LoadingIndicator />
      ) : null}
      <ScrollRestoration />
    </>
  );
}

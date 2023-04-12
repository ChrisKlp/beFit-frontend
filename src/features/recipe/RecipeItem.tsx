/* eslint-disable import/no-cycle */
import { Center, Container, Spinner } from '@chakra-ui/react';
import { ScrollRestoration, useLocation, useParams } from 'react-router-dom';
import { handleError } from '@/utils/servicesHelpers';
import EditRecipe from './EditRecipe';
import RecipeDetails from './RecipeDetails';
import { useGetRecipesQuery } from './recipesApiSlice';

export default function RecipeItem() {
  const { recipeId } = useParams();
  const { pathname } = useLocation();

  const isEdit = /edit/i.test(pathname);

  const { recipe, isRequestSuccess, isRequestError, requestError } =
    useGetRecipesQuery(undefined, {
      selectFromResult: ({ data, isSuccess, isError, error }) => {
        const recipeData = data?.entities[recipeId as string];
        return {
          recipe: recipeData,
          isRequestSuccess: isSuccess,
          isRequestError: isError,
          requestError: error,
        };
      },
    });

  handleError(isRequestError, requestError);

  if (!recipe) {
    if (isRequestSuccess) {
      throw new Response('', {
        status: 403,
        statusText: 'Recipe Not Found',
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
      <Container mb={12} maxW="container.lg">
        {isEdit ? (
          <EditRecipe recipe={recipe} />
        ) : (
          <RecipeDetails recipe={recipe} />
        )}
      </Container>
      <ScrollRestoration />
    </>
  );
}

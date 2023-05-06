import { Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import { TRecipeFormValues, TRecipeReq } from '@/types/Recipe';
import ErrorStatus from '@/components/ErrorStatus';
import RecipeForm from './RecipeForm';
import { useAddNewRecipeMutation } from '../recipesApiSlice';
import { parseValuesToRecipeReq } from './recipeUtils';
import { useGetCategoriesQuery } from '../../category/categoriesApiSlice';
import { useGetIngredientsQuery } from '../../ingredient/ingredientsApiSlice';
import paths from '@/routes/paths';

export default function AddRecipe() {
  const navigate = useNavigate();

  const [
    addRecipe,
    { isError: isAddError, error: addError, isSuccess: isAddSuccess },
  ] = useAddNewRecipeMutation();

  const {
    data: categories,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const {
    data: ingredients,
    isError: isIngredientsError,
    error: ingredientsError,
  } = useGetIngredientsQuery();

  useEffect(() => {
    if (isAddSuccess) {
      navigate(paths.dash.recipes.list);
    }
  }, [isAddSuccess, navigate]);

  const handleSubmit = async (values: TRecipeFormValues) => {
    const recipeReq: TRecipeReq = parseValuesToRecipeReq(values);
    const data = new FormData();

    Object.keys(recipeReq).forEach((key) => {
      const value = recipeReq[key as keyof TRecipeReq];
      if (key === 'image') {
        data.append(key, value as File);
      } else if (value !== undefined || value != null) {
        data.append(key, JSON.stringify(value));
      }
    });

    await addRecipe(data);
  };

  const isError = isAddError || isCategoriesError || isIngredientsError;
  const error = addError || categoriesError || ingredientsError;

  return (
    <>
      <Container mb={12} maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading>Add recipe</Heading>
          {isError && <ErrorStatus error={error} />}
          <RecipeForm
            handleSubmit={handleSubmit}
            categories={categories}
            ingredients={ingredients}
          />
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

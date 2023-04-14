/* eslint-disable import/no-cycle */
import { Button, HStack, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ErrorStatus from '@/components/ErrorStatus';
import { TRecipeFormValues, TRecipeReq, TRecipeRes } from '@/types/Recipe';
import { useGetCategoriesQuery } from '../category/categoriesApiSlice';
import { useGetIngredientsQuery } from '../ingredient/ingredientsApiSlice';
import RecipeForm from './RecipeForm';
import { parseRecipeResToValues, parseValuesToRecipeReq } from './recipeUtils';
import { useUpdateRecipeMutation } from './recipesApiSlice';

type Props = {
  recipe: TRecipeRes;
};

export default function EditRecipe({ recipe }: Props) {
  const navigate = useNavigate();

  const [
    updateRecipe,
    { isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess },
  ] = useUpdateRecipeMutation();

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

  const handleSubmit = async (values: TRecipeFormValues) => {
    const recipeReq: TRecipeReq = parseValuesToRecipeReq(values, recipe._id);
    console.log(recipeReq);
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate('/workouts');
    }
  }, [isUpdateSuccess, navigate]);

  const isError = isUpdateError || isCategoriesError || isIngredientsError;
  const error = updateError || categoriesError || ingredientsError;

  return (
    <VStack spacing={6} align="stretch">
      <HStack justifyContent="space-between" align="center" mb={6}>
        <Heading>Edit recipe</Heading>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() => console.log('open')}
        >
          Delete
        </Button>
      </HStack>
      {isError && <ErrorStatus error={error} />}
      {recipe && (
        <RecipeForm
          handleSubmit={handleSubmit}
          categories={categories}
          ingredients={ingredients}
          initialState={parseRecipeResToValues(recipe)}
        />
      )}
    </VStack>
  );
}

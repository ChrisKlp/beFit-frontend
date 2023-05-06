/* eslint-disable import/no-cycle */
import {
  Button,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ErrorStatus from '@/components/ErrorStatus';
import { TRecipeFormValues, TRecipeReq, TRecipeRes } from '@/types/Recipe';
import { useGetCategoriesQuery } from '../../category/categoriesApiSlice';
import { useGetIngredientsQuery } from '../../ingredient/ingredientsApiSlice';
import RecipeForm from './RecipeForm';
import { parseRecipeResToValues, parseValuesToRecipeReq } from './recipeUtils';
import {
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
} from '../recipesApiSlice';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import paths from '@/routes/paths';

type Props = {
  recipe: TRecipeRes;
};

export default function EditRecipe({ recipe }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [
    updateRecipe,
    { isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess },
  ] = useUpdateRecipeMutation();

  const [
    deleteRecipe,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteRecipeMutation();

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
    const data = new FormData();

    Object.keys(recipeReq).forEach((key) => {
      const value = recipeReq[key as keyof TRecipeReq];
      if (key === 'image') {
        data.append(key, value as File);
      } else if (value !== undefined || value != null) {
        data.append(key, JSON.stringify(value));
      }
    });
    await updateRecipe(data);
  };

  const handleDelete = async () => {
    await deleteRecipe({ id: recipe._id });
  };

  useEffect(() => {
    if (isUpdateSuccess || isDeleteSuccess) {
      navigate(paths.dash.recipes.list);
    }

    if (isDeleteSuccess) {
      onClose();
    }
  }, [isDeleteSuccess, isUpdateSuccess, navigate, onClose]);

  const isError =
    isUpdateError || isCategoriesError || isIngredientsError || isDeleteError;
  const error =
    updateError || categoriesError || ingredientsError || deleteError;

  return (
    <>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" align="center" mb={6}>
          <Heading>Edit recipe</Heading>
          <Button colorScheme="red" variant="outline" onClick={onOpen}>
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
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        itemName={recipe.title}
        onClick={handleDelete}
      />
    </>
  );
}

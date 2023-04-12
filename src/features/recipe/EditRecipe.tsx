/* eslint-disable import/no-cycle */
import { Center, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MultiValue, SingleValue } from 'chakra-react-select';
import ErrorStatus from '@/components/ErrorStatus';
import { TRecipeReq, TRecipeRes } from '@/types/Recipe';
import { useGetCategoriesQuery } from '../category/categoriesApiSlice';
import { useGetIngredientsQuery } from '../ingredient/ingredientsApiSlice';
import RecipeForm from './RecipeForm';

export type TRecipeFormValues = {
  title: string;
  categories: MultiValue<{
    label: string;
    value: string;
  }>;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  instructions: string;
  ingredients: {
    ingredient: SingleValue<{
      label: string;
      value: string;
      unitWeight: number;
    }>;
    quantity: number;
    _id: string;
  }[];
};

function parseToValues(recipe: TRecipeRes): TRecipeFormValues {
  return {
    title: recipe.title,
    categories: recipe.categories.map((cat) => ({
      label: cat.name,
      value: cat._id,
    })) as MultiValue<{
      label: string;
      value: string;
    }>,
    calories: recipe.calories,
    protein: recipe.protein,
    carbohydrates: recipe.carbohydrates,
    fat: recipe.fat,
    instructions: recipe.instructions.join('\n\n'),
    ingredients: recipe.ingredients.map((ing) => ({
      ingredient: {
        label: ing.ingredient.name,
        value: ing.ingredient._id,
        unitWeight: ing.ingredient.unitWeight,
      },
      quantity: ing.quantity,
      _id: ing._id,
    })),
  };
}

function parseToReq(values: TRecipeFormValues, id: string): TRecipeReq {
  return {
    ...values,
    id,
    categories: values.categories.map((cat) => cat.value),
    ingredients: values.ingredients.map((ing) => ({
      ingredient: ing.ingredient?.value || '',
      quantity: ing.quantity,
    })),
    instructions: values.instructions.split('\n\n'),
  };
}

type Props = {
  recipe: TRecipeRes;
};

export default function EditRecipe({ recipe }: Props) {
  const [values, setValues] = useState<TRecipeFormValues>(
    parseToValues(recipe)
  );

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const {
    data: ingredients,
    isLoading: isIngredientsLoading,
    isError: isIngredientsError,
    error: ingredientsError,
  } = useGetIngredientsQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipeReq: TRecipeReq = parseToReq(values, recipe._id);
    console.log(recipeReq);
  };

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setValues((prev) => {
      if (id === 'instructions') {
        return {
          ...prev,
          [id]: value.split('\n\n'),
        };
      }
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleCategoryChange = (items: any) => {
    setValues((prev) => ({
      ...prev,
      categories: items,
    }));
  };

  const handleIngredientsChange = (ingredient: any) => {
    const ingredientIndex = values.ingredients.findIndex(
      (ing) => ing._id === ingredient._id
    );
    if (ingredientIndex > -1) {
      setValues((prev) => ({
        ...prev,
        ingredients: [
          ...prev.ingredients.slice(0, ingredientIndex),
          ingredient,
          ...prev.ingredients.slice(ingredientIndex + 1),
        ],
      }));
    }
  };

  return categories && ingredients ? (
    <RecipeForm
      values={values}
      categories={categories}
      ingredients={ingredients}
      handleInputChange={handleInputChange}
      handleCategoryChange={handleCategoryChange}
      handleIngredientsChange={handleIngredientsChange}
      handleSubmit={handleSubmit}
    />
  ) : isCategoriesError || isIngredientsError ? (
    <ErrorStatus error={categoriesError || ingredientsError} />
  ) : isIngredientsLoading || isCategoriesLoading ? (
    <Center>
      <Spinner />
    </Center>
  ) : null;
}

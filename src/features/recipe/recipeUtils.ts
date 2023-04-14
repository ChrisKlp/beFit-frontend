import { TRecipeFormValues, TRecipeReq, TRecipeRes } from '@/types/Recipe';

export function parseRecipeResToValues(recipe: TRecipeRes): TRecipeFormValues {
  return {
    title: recipe.title,
    categories: recipe.categories.map((cat) => ({
      label: cat.name,
      value: cat._id,
    })),
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

export function parseValuesToRecipeReq(
  values: TRecipeFormValues,
  id: string
): TRecipeReq {
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

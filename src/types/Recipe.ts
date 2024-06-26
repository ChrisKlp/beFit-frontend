import { TCategoryRes } from './Category';
import { TIngredientRes } from './Ingredient';

export type TRecipeRes = {
  _id: string;
  title: string;
  image: string;
  categories: TCategoryRes[];
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  instructions: string[];
  ingredients: {
    ingredient: TIngredientRes;
    quantity: number;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type TRecipeReq = {
  id?: string;
  image?: File | null;
  categories?: string[];
  title: string;
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  instructions?: string[];
  ingredients: {
    ingredient: string;
    quantity: number;
  }[];
};

export type TRecipeFormValues = {
  title: string;
  image?: File | null;
  categories: {
    label: string;
    value: string;
  }[];
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  instructions: string;
  ingredients: {
    ingredient: {
      label: string;
      value: string;
      unitWeight: number;
    };
    quantity: number;
  }[];
};

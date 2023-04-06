import { TCategoryRes } from './Category';
import { TIngredientRes } from './Ingredient';

export type TRecipeRes = {
  _id: string;
  title: string;
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
  id: string;
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

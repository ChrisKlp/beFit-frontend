import { EntityId } from '@reduxjs/toolkit';
import { TIngredientRes } from './Ingredient';

export type TShoppingListRes = {
  _id: EntityId;
  user: EntityId;
  products: TShoppingListProduct[];
};

export type TShoppingListReq = {
  id: EntityId;
  products: {
    _id: EntityId;
    ingredient: EntityId;
    quantity: number;
    isCompleted: boolean;
  }[];
};

export type TShoppingListProduct = {
  _id: EntityId;
  ingredient: TIngredientRes;
  quantity: number;
  isCompleted: boolean;
};

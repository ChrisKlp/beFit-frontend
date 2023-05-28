import { EntityId } from '@reduxjs/toolkit';

export type TMenuRes = {
  _id: string;
  breakfast: string | null;
  secondBreakfast: string | null;
  dinner: string | null;
  supper: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TMenuReq = {
  id: EntityId;
  breakfast: string | null;
  secondBreakfast: string | null;
  dinner: string | null;
  supper: string | null;
};

export enum MealType {
  Breakfast = 'breakfast',
  SecondBreakfast = 'secondBreakfast',
  Dinner = 'dinner',
  Supper = 'supper',
}

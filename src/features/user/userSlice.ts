/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

type TRecipeFilters = {
  category: any;
  ingredients: any[];
};

type TInitialState = {
  recipeFilters: TRecipeFilters;
};

const initialState: TInitialState = {
  recipeFilters: { category: '', ingredients: [] },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRecipeFilters: (
      state,
      action: PayloadAction<Partial<TRecipeFilters>>
    ) => {
      state.recipeFilters = { ...state.recipeFilters, ...action.payload };
    },
  },
});

export const { setRecipeFilters } = userSlice.actions;

export default userSlice.reducer;

export const selectRecipeFilters = (state: RootState) =>
  state.user.recipeFilters;

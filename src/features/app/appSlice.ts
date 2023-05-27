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
  menuEditMode: boolean;
};

const initialState: TInitialState = {
  recipeFilters: { category: '', ingredients: [] },
  menuEditMode: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRecipeFilters: (
      state,
      action: PayloadAction<Partial<TRecipeFilters>>
    ) => {
      state.recipeFilters = { ...state.recipeFilters, ...action.payload };
    },
    setMenuEditMode: (state, action: PayloadAction<boolean>) => {
      state.menuEditMode = action.payload;
    },
  },
});

export const { setRecipeFilters, setMenuEditMode } = appSlice.actions;

export default appSlice.reducer;

export const selectRecipeFilters = (state: RootState) =>
  state.app.recipeFilters;

export const selectMenuEditMode = (state: RootState) => state.app.menuEditMode;

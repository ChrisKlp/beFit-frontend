import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import apiSlice from '@/features/api/apiSlice';
import { TRecipe } from '@/types/Recipe';

const adapter = createEntityAdapter<TRecipe>({
  selectId: (recipe) => recipe._id,
});

const initialState = adapter.getInitialState();

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<EntityState<TRecipe>, void>({
      query: () => '/api/recipes',
      transformResponse: (res: TRecipe[]) => {
        return adapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: 'Recipe' as const, id })),
              { type: 'Recipe', id: 'LIST' },
            ]
          : [{ type: 'Recipe', id: 'LIST' }],
    }),
  }),
});

export const { useGetRecipesQuery } = recipesApiSlice;

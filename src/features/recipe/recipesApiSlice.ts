import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import apiSlice from '@/features/api/apiSlice';
import { TRecipeReq, TRecipeRes } from '@/types/Recipe';
import { RootState } from '@/app/store';

type TMessage = {
  message: string;
};

const adapter = createEntityAdapter<TRecipeRes>({
  selectId: (recipe) => recipe._id,
});

const initialState = adapter.getInitialState();

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<EntityState<TRecipeRes>, void>({
      query: () => '/api/recipes',
      transformResponse: (res: TRecipeRes[]) => {
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
    addNewRecipe: builder.mutation<TMessage, TRecipeReq & { id: string }>({
      query: (recipe) => ({
        url: '/api/recipes',
        method: 'POST',
        body: recipe,
      }),
      invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
    }),
    updateRecipe: builder.mutation<TMessage, TRecipeReq>({
      query: (recipe) => ({
        url: `/api/recipes`,
        method: 'PATCH',
        body: recipe,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Recipe', id: arg.id }],
    }),
    deleteRecipe: builder.mutation<string, { id: string }>({
      query: (id) => ({
        url: `/api/recipes`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Recipe', id: arg.id }],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useAddNewRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApiSlice;

export const selectRecipesResult =
  recipesApiSlice.endpoints.getRecipes.select();

const selectRecipesData = createSelector(
  selectRecipesResult,
  (result) => result.data
);

export const {
  selectAll: selectAllRecipes,
  selectById: selectRecipeById,
  selectIds: selectRecipeIds,
} = adapter.getSelectors(
  (state: RootState) => selectRecipesData(state) ?? initialState
);

import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import apiSlice from '@/app/api/apiSlice';
import { TRecipeRes } from '@/types/Recipe';

type TMessage = {
  message: string;
};

const adapter = createEntityAdapter<TRecipeRes>({
  selectId: (recipe) => recipe._id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = adapter.getInitialState();

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<EntityState<TRecipeRes>, void>({
      query: () => '/recipes',
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
    addNewRecipe: builder.mutation<TMessage, FormData>({
      query: (recipe) => ({
        url: '/recipes',
        method: 'POST',
        body: recipe,
      }),
      invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
    }),
    updateRecipe: builder.mutation<TMessage, FormData>({
      query: (recipe) => ({
        url: `/recipes`,
        method: 'PATCH',
        body: recipe,
      }),
      invalidatesTags: (result, error, arg) => {
        const id = arg.get('id') as string;
        const parsedId = JSON.parse(id);
        return [{ type: 'Recipe', id: parsedId }];
      },
    }),
    deleteRecipe: builder.mutation<string, { id: string }>({
      query: ({ id }) => ({
        url: `/recipes`,
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

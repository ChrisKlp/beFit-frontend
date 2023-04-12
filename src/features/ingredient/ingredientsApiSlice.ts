import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import apiSlice from '@/features/api/apiSlice';
import { TIngredientReq, TIngredientRes } from '@/types/Ingredient';
import { RootState } from '@/app/store';

type TMessage = {
  message: string;
};

const adapter = createEntityAdapter<TIngredientRes>({
  selectId: (ingredient) => ingredient._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = adapter.getInitialState();

export const ingredientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<EntityState<TIngredientRes>, void>({
      query: () => '/ingredients',
      transformResponse: (res: TIngredientRes[]) => {
        return adapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: 'Ingredient' as const, id })),
              { type: 'Ingredient', id: 'LIST' },
            ]
          : [{ type: 'Ingredient', id: 'LIST' }],
    }),
    addNewIngredient: builder.mutation<TMessage, TIngredientReq>({
      query: (ingredient) => ({
        url: '/ingredients',
        method: 'POST',
        body: ingredient,
      }),
      invalidatesTags: [{ type: 'Ingredient', id: 'LIST' }],
    }),
    updateIngredient: builder.mutation<TMessage, TIngredientReq>({
      query: (ingredient) => ({
        url: `/ingredients`,
        method: 'PATCH',
        body: ingredient,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Ingredient', id: arg.id },
      ],
    }),
    deleteIngredient: builder.mutation<string, { id: string }>({
      query: (id) => ({
        url: `/ingredients`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Ingredient', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useAddNewIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} = ingredientsApiSlice;

export const selectIngredientsResult =
  ingredientsApiSlice.endpoints.getIngredients.select();

const selectIngredientsData = createSelector(
  selectIngredientsResult,
  (result) => result.data
);

export const {
  selectAll: selectAllIngredients,
  selectById: selectIngredientById,
  selectIds: selectIngredientIds,
} = adapter.getSelectors(
  (state: RootState) => selectIngredientsData(state) ?? initialState
);

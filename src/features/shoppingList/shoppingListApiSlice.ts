/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createSelector,
  EntityId,
  EntityState,
} from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import apiSlice from '@/app/api/apiSlice';
import { TShoppingListRes, TShoppingListReq } from '@/types/ShoppingList';

type TMessage = {
  message: string;
};

const adapter = createEntityAdapter<TShoppingListRes>({
  selectId: (shoppingList) => shoppingList._id,
});

const initialState = adapter.getInitialState();

export const shoppingListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShoppingList: builder.query<EntityState<TShoppingListRes>, void>({
      query: () => '/shopping-list',
      transformResponse: (res: TShoppingListRes[]) => {
        return adapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({
                type: 'ShoppingList' as const,
                id,
              })),
              { type: 'ShoppingList', id: 'LIST' },
            ]
          : [{ type: 'ShoppingList', id: 'LIST' }],
    }),
    generateShoppingList: builder.mutation<TMessage, TShoppingListReq | void>({
      query: (shoppingList) => ({
        url: '/shopping-list',
        method: 'POST',
        body: shoppingList ?? {},
      }),
      invalidatesTags: [{ type: 'ShoppingList', id: 'LIST' }],
    }),
    updateShoppingList: builder.mutation<
      TMessage,
      { shoppingList: TShoppingListReq; productId: EntityId }
    >({
      query: ({ shoppingList }) => ({
        url: `/shopping-list`,
        method: 'PATCH',
        body: shoppingList,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'ShoppingList', id: arg.shoppingList.id },
      ],
      async onQueryStarted(
        { shoppingList, productId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          shoppingListApiSlice.util.updateQueryData(
            'getShoppingList',
            undefined,
            (draft) => {
              draft.entities[shoppingList.id]?.products.forEach((product) => {
                if (product._id === productId) {
                  product.isCompleted = !product.isCompleted;
                }
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteShoppingList: builder.mutation<string, { id: EntityId }>({
      query: ({ id }) => ({
        url: `/shopping-list`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'ShoppingList', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetShoppingListQuery,
  useGenerateShoppingListMutation,
  useUpdateShoppingListMutation,
  useDeleteShoppingListMutation,
} = shoppingListApiSlice;

export const selectShoppingListsResult =
  shoppingListApiSlice.endpoints.getShoppingList.select();

const selectShoppingListsData = createSelector(
  selectShoppingListsResult,
  (result) => result.data
);

export const {
  selectAll: selectAllShoppingLists,
  selectById: selectShoppingListById,
  selectIds: selectShoppingListIds,
} = adapter.getSelectors(
  (state: RootState) => selectShoppingListsData(state) ?? initialState
);

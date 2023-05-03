import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import apiSlice from '@/app/api/apiSlice';
import { RootState } from '@/app/store';
import { TCategoryReq, TCategoryRes } from '@/types/Category';

type TMessage = { message: string };

const adapter = createEntityAdapter<TCategoryRes>({
  selectId: (category) => category._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = adapter.getInitialState();

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<EntityState<TCategoryRes>, void>({
      query: () => '/categories',
      transformResponse: (res: TCategoryRes[]) => {
        return adapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: 'Category' as const, id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    addNewCategory: builder.mutation<TMessage, { name: string }>({
      query: (category) => ({
        url: '/categories',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<TMessage, TCategoryReq>({
      query: (category) => ({
        url: `/categories`,
        method: 'PATCH',
        body: category,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Category', id: arg.id },
      ],
    }),
    deleteCategory: builder.mutation<string, { id: string }>({
      query: ({ id }) => ({
        url: `/categories`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Category', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;

export const selectCategoryResult =
  categoriesApiSlice.endpoints.getCategories.select();

const selectCategoryData = createSelector(
  selectCategoryResult,
  (result) => result.data
);

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = adapter.getSelectors(
  (state: RootState) => selectCategoryData(state) ?? initialState
);

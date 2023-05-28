import {
  createEntityAdapter,
  createSelector,
  EntityId,
  EntityState,
} from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import apiSlice from '@/app/api/apiSlice';
import { TMenuRes, TMenuReq } from '@/types/Menu';

type TMessage = {
  message: string;
};

const adapter = createEntityAdapter<TMenuRes>({
  selectId: (menu) => menu._id,
});

const initialState = adapter.getInitialState();

export const menusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserMenus: builder.query<EntityState<TMenuRes>, void>({
      query: () => '/menus',
      transformResponse: (res: TMenuRes[]) => {
        return adapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: 'Menu' as const, id })),
              { type: 'Menu', id: 'LIST' },
            ]
          : [{ type: 'Menu', id: 'LIST' }],
    }),
    addNewMenu: builder.mutation<TMessage, TMenuReq | void>({
      query: (menu) => ({
        url: '/menus',
        method: 'POST',
        body: menu ?? {},
      }),
      invalidatesTags: [{ type: 'Menu', id: 'LIST' }],
    }),
    updateMenu: builder.mutation<TMessage, TMenuReq>({
      query: (menu) => ({
        url: `/menus`,
        method: 'PATCH',
        body: menu,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Menu', id: arg.id }],
    }),
    deleteMenu: builder.mutation<string, { id: EntityId }>({
      query: ({ id }) => ({
        url: `/menus`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Menu', id: arg.id }],
    }),
  }),
});

export const {
  useGetUserMenusQuery,
  useAddNewMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menusApiSlice;

export const selectMenusResult = menusApiSlice.endpoints.getUserMenus.select();

const selectMenusData = createSelector(
  selectMenusResult,
  (result) => result.data
);

export const {
  selectAll: selectAllMenus,
  selectById: selectMenuById,
  selectIds: selectMenuIds,
} = adapter.getSelectors(
  (state: RootState) => selectMenusData(state) ?? initialState
);

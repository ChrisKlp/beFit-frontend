import {
  createEntityAdapter,
  createSelector,
  EntityId,
  EntityState,
} from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import apiSlice from '@/app/api/apiSlice';
import { TUserWorkoutRes, TUserWorkoutReq } from '@/types/UserWorkout';

type TMessage = {
  message: string;
};

const adapter = createEntityAdapter<TUserWorkoutRes>({
  selectId: (userWorkout) => userWorkout._id,
});

const initialState = adapter.getInitialState();

export const userWorkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserWorkouts: builder.query<EntityState<TUserWorkoutRes>, void>({
      query: () => '/user-workouts',
      transformResponse: (res: TUserWorkoutRes[]) => {
        return adapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: 'UserWorkout' as const, id })),
              { type: 'UserWorkout', id: 'LIST' },
            ]
          : [{ type: 'UserWorkout', id: 'LIST' }],
    }),
    addNewUserWorkout: builder.mutation<TMessage, TUserWorkoutReq | void>({
      query: (userWorkout) => ({
        url: '/user-workouts',
        method: 'POST',
        body: userWorkout ?? {},
      }),
      invalidatesTags: [{ type: 'UserWorkout', id: 'LIST' }],
    }),
    updateUserWorkout: builder.mutation<TMessage, TUserWorkoutReq>({
      query: (userWorkout) => ({
        url: `/user-workouts`,
        method: 'PATCH',
        body: userWorkout,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'UserWorkout', id: arg.id },
      ],
    }),
    deleteUserWorkout: builder.mutation<string, { id: EntityId }>({
      query: ({ id }) => ({
        url: `/user-workouts`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'UserWorkout', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetUserWorkoutsQuery,
  useAddNewUserWorkoutMutation,
  useUpdateUserWorkoutMutation,
  useDeleteUserWorkoutMutation,
} = userWorkoutApiSlice;

export const selectUserWorkoutsResult =
  userWorkoutApiSlice.endpoints.getUserWorkouts.select();

const selectUserWorkoutsData = createSelector(
  selectUserWorkoutsResult,
  (result) => result.data
);

export const {
  selectAll: selectAllUserWorkouts,
  selectById: selectUserWorkoutById,
  selectIds: selectUserWorkoutIds,
} = adapter.getSelectors(
  (state: RootState) => selectUserWorkoutsData(state) ?? initialState
);

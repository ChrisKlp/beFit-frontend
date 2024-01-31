import {
  createEntityAdapter,
  createSelector,
  EntityId,
  EntityState,
} from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import apiSlice from '@/app/api/apiSlice';
import {
  TUserDoneWorkoutReq,
  TUserDoneWorkoutRes,
} from '@/types/UserDoneWorkout';

type TMessage = {
  message: string;
};

const adapter = createEntityAdapter<TUserDoneWorkoutRes>({
  selectId: (userWorkout) => userWorkout._id,
});

const initialState = adapter.getInitialState();

export const userDoneWorkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDoneWorkouts: builder.query<EntityState<TUserDoneWorkoutRes>, void>({
      query: () => '/user-done-workouts',
      transformResponse: (res: TUserDoneWorkoutRes[]) => {
        return adapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({
                type: 'UserDoneWorkout' as const,
                id,
              })),
              { type: 'UserDoneWorkout', id: 'LIST' },
            ]
          : [{ type: 'UserDoneWorkout', id: 'LIST' }],
    }),
    addUserDoneWorkout: builder.mutation<TMessage, TUserDoneWorkoutReq | void>({
      query: (userWorkout) => ({
        url: '/user-done-workouts',
        method: 'POST',
        body: userWorkout ?? {},
      }),
      invalidatesTags: [
        { type: 'UserDoneWorkout', id: 'LIST' },
        { type: 'UserWorkout', id: 'LIST' },
      ],
    }),
    deleteUserDoneWorkout: builder.mutation<string, { id: EntityId }>({
      query: ({ id }) => ({
        url: `/user-done-workouts`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'UserDoneWorkout', id: arg.id },
        { type: 'UserWorkout', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetUserDoneWorkoutsQuery,
  useAddUserDoneWorkoutMutation,
  useDeleteUserDoneWorkoutMutation,
} = userDoneWorkoutApiSlice;

export const selectUserDoneWorkoutsResult =
  userDoneWorkoutApiSlice.endpoints.getUserDoneWorkouts.select();

const selectUserDoneWorkoutsData = createSelector(
  selectUserDoneWorkoutsResult,
  (result) => result.data
);

export const {
  selectAll: selectAllUserDoneWorkouts,
  selectById: selectUserDoneWorkoutById,
  selectIds: selectUserDoneWorkoutIds,
} = adapter.getSelectors(
  (state: RootState) => selectUserDoneWorkoutsData(state) ?? initialState
);

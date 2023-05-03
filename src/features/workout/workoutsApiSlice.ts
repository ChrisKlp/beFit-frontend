import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import apiSlice from '@/app/api/apiSlice';
import { RootState } from '@/app/store';
import { TWorkoutReq, TWorkoutRes } from '@/types/Workout';

type TMessage = { message: string };

const adapter = createEntityAdapter<TWorkoutRes>({
  selectId: (workout) => workout._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = adapter.getInitialState();

export const workoutsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkouts: builder.query<EntityState<TWorkoutRes>, void>({
      query: () => '/workouts',
      transformResponse: (res: TWorkoutRes[]) => {
        return adapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: 'Workout' as const, id })),
              { type: 'Workout', id: 'LIST' },
            ]
          : [{ type: 'Workout', id: 'LIST' }],
    }),
    addNewWorkout: builder.mutation<TMessage, TWorkoutReq>({
      query: (workout) => ({
        url: '/workouts',
        method: 'POST',
        body: workout,
      }),
      invalidatesTags: [{ type: 'Workout', id: 'LIST' }],
    }),
    updateWorkout: builder.mutation<TMessage, TWorkoutReq>({
      query: (workout) => ({
        url: `/workouts`,
        method: 'PATCH',
        body: workout,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Workout', id: arg.id },
      ],
    }),
    deleteWorkout: builder.mutation<string, { id: string }>({
      query: ({ id }) => ({
        url: `/workouts`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Workout', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useAddNewWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
} = workoutsApiSlice;

export const selectWorkoutResult =
  workoutsApiSlice.endpoints.getWorkouts.select();

const selectWorkoutData = createSelector(
  selectWorkoutResult,
  (result) => result.data
);

export const {
  selectAll: selectAllWorkouts,
  selectById: selectWorkoutById,
  selectIds: selectWorkoutIds,
} = adapter.getSelectors(
  (state: RootState) => selectWorkoutData(state) ?? initialState
);

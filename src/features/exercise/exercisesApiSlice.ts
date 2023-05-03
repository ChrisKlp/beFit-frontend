import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import apiSlice from '@/app/api/apiSlice';
import { RootState } from '@/app/store';
import { TExerciseReq, TExerciseRes } from '@/types/Exercise';

type TMessage = { message: string };

const adapter = createEntityAdapter<TExerciseRes>({
  selectId: (exercise) => exercise._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = adapter.getInitialState();

export const exercisesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<EntityState<TExerciseRes>, void>({
      query: () => '/exercises',
      transformResponse: (res: TExerciseRes[]) => {
        return adapter.setAll(initialState, res);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: 'Exercise' as const, id })),
              { type: 'Exercise', id: 'LIST' },
            ]
          : [{ type: 'Exercise', id: 'LIST' }],
    }),
    addNewExercise: builder.mutation<TMessage, TExerciseReq>({
      query: (exercise) => ({
        url: '/exercises',
        method: 'POST',
        body: exercise,
      }),
      invalidatesTags: [{ type: 'Exercise', id: 'LIST' }],
    }),
    updateExercise: builder.mutation<TMessage, TExerciseReq>({
      query: (exercise) => ({
        url: `/exercises`,
        method: 'PATCH',
        body: exercise,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Exercise', id: arg.id },
      ],
    }),
    deleteExercise: builder.mutation<string, { id: string }>({
      query: ({ id }) => ({
        url: `/exercises`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Exercise', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useAddNewExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} = exercisesApiSlice;

export const selectExerciseResult =
  exercisesApiSlice.endpoints.getExercises.select();

const selectExerciseData = createSelector(
  selectExerciseResult,
  (result) => result.data
);

export const {
  selectAll: selectAllExercises,
  selectById: selectExerciseById,
  selectIds: selectExerciseIds,
} = adapter.getSelectors(
  (state: RootState) => selectExerciseData(state) ?? initialState
);

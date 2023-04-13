import { TWorkoutRes, TWorkoutFormValues, TWorkoutReq } from '@/types/Workout';

export function parseWorkoutResToValues(
  workout: TWorkoutRes
): TWorkoutFormValues {
  return {
    name: workout.name,
    level: workout.level,
    type: workout.type,
    exercises: workout.exercises.map((exercise) => ({
      exercise: {
        value: exercise.exercise._id,
        label: exercise.exercise.name,
      },
      sets: exercise.sets,
      reps: exercise.reps,
      rest: exercise.rest,
    })),
  };
}

export function parseValuesToWorkoutReq(
  values: TWorkoutFormValues
): TWorkoutReq {
  return {
    name: values.name,
    level: values.level,
    type: values.type,
    exercises: values.exercises.map((exercise) => ({
      exercise: exercise.exercise.value,
      sets: exercise.sets,
      reps: exercise.reps,
      rest: exercise.rest,
    })),
  };
}

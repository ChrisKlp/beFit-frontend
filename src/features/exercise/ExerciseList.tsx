import ListView from '@/components/Dashboard/ListView';
import { useGetExercisesQuery } from './exercisesApiSlice';

export default function ExerciseList() {
  const { data, isError, isLoading, error } = useGetExercisesQuery();

  return (
    <ListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

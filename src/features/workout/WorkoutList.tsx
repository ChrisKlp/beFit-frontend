import ListView from '@/components/dashboard/ListView';
import { useGetWorkoutsQuery } from './workoutsApiSlice';

export default function ExerciseList() {
  const { data, isError, isLoading, error } = useGetWorkoutsQuery();

  return (
    <ListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

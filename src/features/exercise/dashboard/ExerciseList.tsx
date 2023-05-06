import DashListView from '@/components/dashboard/DashListView';
import { useGetExercisesQuery } from '../exercisesApiSlice';

export default function ExerciseList() {
  const { data, isError, isLoading, error } = useGetExercisesQuery();

  return (
    <DashListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

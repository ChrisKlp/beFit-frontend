import DashboardList from '@/components/dash/DashboardList';
import { useGetExercisesQuery } from '../exercisesApiSlice';

export default function ExerciseList() {
  const { data, isError, isLoading, error } = useGetExercisesQuery();

  return (
    <DashboardList
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

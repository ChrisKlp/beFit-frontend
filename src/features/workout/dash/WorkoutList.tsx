import DashboardList from '@/components/dash/DashboardList';
import { useGetWorkoutsQuery } from '../workoutsApiSlice';

export default function ExerciseList() {
  const { data, isError, isLoading, error } = useGetWorkoutsQuery();

  return (
    <DashboardList
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

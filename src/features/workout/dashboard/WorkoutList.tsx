import DashListView from '@/components/dashboard/DashListView';
import { useGetWorkoutsQuery } from '../workoutsApiSlice';

export default function ExerciseList() {
  const { data, isError, isLoading, error } = useGetWorkoutsQuery();

  return (
    <DashListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

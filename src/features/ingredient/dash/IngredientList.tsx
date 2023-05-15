import DashboardList from '@/components/dash/DashboardList';
import { useGetIngredientsQuery } from '../ingredientsApiSlice';

export default function IngredientList() {
  const { data, isError, isLoading, error } = useGetIngredientsQuery();

  return (
    <DashboardList
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

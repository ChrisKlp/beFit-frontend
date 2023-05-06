import DashListView from '@/components/dashboard/DashListView';
import { useGetIngredientsQuery } from '../ingredientsApiSlice';

export default function IngredientList() {
  const { data, isError, isLoading, error } = useGetIngredientsQuery();

  return (
    <DashListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

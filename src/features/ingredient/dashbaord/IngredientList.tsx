import ListView from '@/components/dashboard/ListView';
import { useGetIngredientsQuery } from '../ingredientsApiSlice';

export default function IngredientList() {
  const { data, isError, isLoading, error } = useGetIngredientsQuery();

  return (
    <ListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

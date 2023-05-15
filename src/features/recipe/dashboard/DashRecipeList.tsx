import DashboardList from '@/components/dashboard/DashboardList';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';

export default function DashRecipeList() {
  const { data, isError, isLoading, error } = useGetRecipesQuery();

  return (
    <DashboardList
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

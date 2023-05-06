import DashListView from '@/components/dashboard/DashListView';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';

export default function DashRecipeList() {
  const { data, isError, isLoading, error } = useGetRecipesQuery();

  return (
    <DashListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

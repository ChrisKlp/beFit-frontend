import ListView from '@/components/Dashboard/ListView';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';

export default function RecipeList() {
  const { data, isError, isLoading, error } = useGetRecipesQuery();

  return (
    <ListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

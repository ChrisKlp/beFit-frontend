import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';

export default function DashRecipeList() {
  const { data, isError, isLoading, error } = useGetRecipesQuery();

  return <p>list</p>;
}

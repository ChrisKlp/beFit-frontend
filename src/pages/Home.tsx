import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';

export default function Home() {
  const { data, isError, isLoading, error } = useGetRecipesQuery();

  return (
    <div>
      <p>Home</p>
    </div>
  );
}

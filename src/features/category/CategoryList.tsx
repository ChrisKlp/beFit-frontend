import ListView from '@/components/dashboard/ListView';
import { useGetCategoriesQuery } from './categoriesApiSlice';

export default function CategoryList() {
  const { data, isError, isLoading, error } = useGetCategoriesQuery();

  return (
    <ListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

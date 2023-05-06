import DashListView from '@/components/dashboard/DashListView';
import { useGetCategoriesQuery } from '../categoriesApiSlice';

export default function CategoryList() {
  const { data, isError, isLoading, error } = useGetCategoriesQuery();

  return (
    <DashListView
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

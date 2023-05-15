import DashboardList from '@/components/dashboard/DashboardList';
import { useGetCategoriesQuery } from '../categoriesApiSlice';

export default function CategoryList() {
  const { data, isError, isLoading, error } = useGetCategoriesQuery();

  return (
    <DashboardList
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );
}

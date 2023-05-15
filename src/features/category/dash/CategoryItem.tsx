import { Container } from '@chakra-ui/react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import EditCategory from './EditCategory';
import { useGetCategoriesQuery } from '../categoriesApiSlice';

export default function CategoryItem() {
  const { categoryId } = useParams();

  const {
    category,
    isCategoryLoading,
    isCategoryError,
    categoryError,
    isCategorySuccess,
  } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error, isSuccess }) => {
      const categoryData = data?.entities[categoryId as string];
      return {
        category: categoryData,
        isCategoryLoading: isLoading,
        isCategoryError: isError,
        categoryError: error,
        isCategorySuccess: isSuccess,
      };
    },
  });

  const isError = isCategoryError || (isCategorySuccess && !category);

  return (
    <>
      <Container mb={12} maxW="container.lg">
        {category ? (
          <EditCategory category={category} />
        ) : isError ? (
          <ErrorStatus error={categoryError} />
        ) : isCategoryLoading ? (
          <LoadingIndicator />
        ) : null}
      </Container>
      <ScrollRestoration />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-throw-literal */
import { Center, Container, Heading, Spinner, VStack } from '@chakra-ui/react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import { handleError } from '@/utils/servicesHelpers';
import { useGetCategoriesQuery } from './categoriesApiSlice';

export default function CategoryItem() {
  const { categoryId } = useParams();

  const { category, isRequestSuccess, isRequestError, requestError } =
    useGetCategoriesQuery(undefined, {
      selectFromResult: ({ data, isSuccess, isError, error }) => {
        const categoryData = data?.entities[categoryId as string];
        return {
          category: categoryData,
          isRequestSuccess: isSuccess,
          isRequestError: isError,
          requestError: error,
        };
      },
    });

  handleError(isRequestError, requestError);

  if (!category) {
    if (isRequestSuccess) {
      throw new Response('', {
        status: 403,
        statusText: 'Category Not Found',
      });
    } else {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
  }

  return (
    <>
      <Container mb={12}>
        <VStack spacing={6} align="stretch">
          <Heading>{category.name}</Heading>
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-throw-literal */
import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Spinner,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ScrollRestoration, useNavigate, useParams } from 'react-router-dom';
import { handleError } from '@/utils/servicesHelpers';
import ErrorStatus from '@/components/ErrorStatus';
import CategoryForm from './CategoryForm';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from './categoriesApiSlice';
import DeleteConfirmation from '@/components/DeleteConfirmation';

export default function EditCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    category,
    isRequestSuccess,
    isRequestError,
    requestError,
    isRequestLoading,
  } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isSuccess, isError, isLoading, error }) => {
      const categoryData = data?.entities[categoryId as string];
      return {
        category: categoryData,
        isRequestSuccess: isSuccess,
        isRequestError: isError,
        requestError: error,
        isRequestLoading: isLoading,
      };
    },
  });

  const [updateCategory, { isError, error, isSuccess }] =
    useUpdateCategoryMutation({});

  const [
    deleteCategory,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteCategoryMutation();

  useEffect(() => {
    if (category && isRequestSuccess) {
      setValue(category.name);
    }
  }, [category, isRequestSuccess]);

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      navigate('/categories');
    }
    if (isDeleteError) {
      onClose();
    }
  }, [isDeleteError, isDeleteSuccess, isSuccess, navigate, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category) {
      await updateCategory({ id: category._id, name: value });
    }
  };

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDelete = async () => {
    if (category) {
      await deleteCategory({ id: category._id });
    }
  };

  handleError(isRequestError, requestError);

  if (!category) {
    if (isRequestSuccess) {
      throw new Response('', {
        status: 403,
        statusText: 'Category Not Found',
      });
    }
  }

  return category ? (
    <>
      <Container mb={12}>
        <VStack spacing={6} align="stretch">
          <HStack justifyContent="space-between" align="center">
            <Heading>Edit category</Heading>
            <Button colorScheme="red" variant="outline" onClick={onOpen}>
              Delete
            </Button>
          </HStack>
          {(isError || isDeleteError) && (
            <ErrorStatus error={error || deleteError} />
          )}
          <CategoryForm
            isDisabled={value === category.name}
            value={value}
            onChange={updateValue}
            handleSubmit={handleSubmit}
          />
        </VStack>
      </Container>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        itemName={category.name}
        onClick={handleDelete}
      />
      <ScrollRestoration />
    </>
  ) : isRequestLoading ? (
    <Center>
      <Spinner />
    </Center>
  ) : null;
}

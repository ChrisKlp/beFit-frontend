import { Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import CategoryForm from './CategoryForm';
import { useAddNewCategoryMutation } from './categoriesApiSlice';

export default function AddCategory() {
  const navigate = useNavigate();

  const [addCategory, { isError, error, isSuccess }] =
    useAddNewCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/categories');
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (value: string) => {
    await addCategory({ name: value });
  };

  return (
    <>
      <Container mb={12} maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading>Add category</Heading>
          {isError && <ErrorStatus error={error} />}
          <CategoryForm handleSubmit={handleSubmit} />
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

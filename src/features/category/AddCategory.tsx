/* eslint-disable @typescript-eslint/no-throw-literal */
import { Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import ErrorStatus from '@/components/ErrorStatus';
import CategoryForm from './CategoryForm';
import { useAddNewCategoryMutation } from './categoriesApiSlice';

export default function AddCategory() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const [addCategory, { isError, error, isSuccess }] =
    useAddNewCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/categories');
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addCategory({ name: value });
  };

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Container mb={12}>
        <VStack spacing={6} align="stretch">
          <Heading>Add category</Heading>
          {isError && <ErrorStatus error={error} />}
          <CategoryForm
            value={value}
            onChange={updateValue}
            handleSubmit={handleSubmit}
            isDisabled={value.length === 0}
          />
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

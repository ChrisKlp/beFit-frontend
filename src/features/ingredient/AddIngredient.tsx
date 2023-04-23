import { Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import { TIngredientFormValues, TIngredientReq } from '@/types/Ingredient';
import ErrorStatus from '@/components/ErrorStatus';
import IngredientForm from './IngredientForm';
import { useAddNewIngredientMutation } from './ingredientsApiSlice';
import { paths } from '@/router';

export default function AddIngredient() {
  const navigate = useNavigate();

  const [addIngredient, { isError, error, isSuccess }] =
    useAddNewIngredientMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(paths.dashboard.ingredients.list);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (values: TIngredientFormValues) => {
    const ingredientReq: TIngredientReq = values;
    await addIngredient(ingredientReq);
  };

  return (
    <>
      <Container mb={12} maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading>Add ingredient</Heading>
          {isError && <ErrorStatus error={error} />}
          <IngredientForm handleSubmit={handleSubmit} />
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

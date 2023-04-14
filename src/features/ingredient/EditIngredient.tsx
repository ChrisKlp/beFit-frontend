import {
  Button,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import ErrorStatus from '@/components/ErrorStatus';
import {
  TIngredientFormValues,
  TIngredientReq,
  TIngredientRes,
} from '@/types/Ingredient';
import IngredientForm from './IngredientForm';
import {
  useDeleteIngredientMutation,
  useUpdateIngredientMutation,
} from './ingredientsApiSlice';

type Props = {
  ingredient: TIngredientRes;
};

export default function EditIngredient({ ingredient }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateIngredient, { isError, error, isSuccess }] =
    useUpdateIngredientMutation();

  const [
    deleteIngredient,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteIngredientMutation();

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      navigate('/ingredients');
    }
    if (isDeleteError) {
      onClose();
    }
  }, [isDeleteError, isDeleteSuccess, isSuccess, navigate, onClose]);

  const handleSubmit = async (values: TIngredientFormValues) => {
    const ingredientReq: TIngredientReq = {
      id: ingredient._id,
      ...values,
    };
    await updateIngredient(ingredientReq);
  };

  const handleDelete = async () => {
    await deleteIngredient({ id: ingredient._id });
  };

  return (
    <>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" align="center">
          <Heading>Edit ingredient</Heading>
          <Button colorScheme="red" variant="outline" onClick={onOpen}>
            Delete
          </Button>
        </HStack>
        {(isError || isDeleteError) && (
          <ErrorStatus error={error || deleteError} />
        )}
        <IngredientForm
          handleSubmit={handleSubmit}
          initialState={{
            name: ingredient.name,
            unitWeight: ingredient.unitWeight,
          }}
        />
      </VStack>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        itemName={ingredient.name}
        onClick={handleDelete}
      />
    </>
  );
}

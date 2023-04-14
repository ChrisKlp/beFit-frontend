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
import { TCategoryRes } from '@/types/Category';
import CategoryForm from './CategoryForm';
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from './categoriesApiSlice';

type Props = {
  category: TCategoryRes;
};

export default function EditCategory({ category }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateCategory, { isError, error, isSuccess }] =
    useUpdateCategoryMutation({});

  const [
    deleteCategory,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteCategoryMutation();

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      navigate('/categories');
    }
    if (isDeleteError) {
      onClose();
    }
  }, [isDeleteError, isDeleteSuccess, isSuccess, navigate, onClose]);

  const handleSubmit = async (value: string) => {
    await updateCategory({ name: value });
  };

  const handleDelete = async () => {
    await deleteCategory({ id: category._id });
  };

  return (
    <>
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
        <CategoryForm category={category.name} handleSubmit={handleSubmit} />
      </VStack>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        itemName={category.name}
        onClick={handleDelete}
      />
    </>
  );
}

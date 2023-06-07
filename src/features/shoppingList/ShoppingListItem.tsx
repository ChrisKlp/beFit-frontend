import { Checkbox, Grid, HStack, Text } from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from '@/app/hooks';
import { TShoppingListProduct } from '@/types/ShoppingList';
import {
  selectShoppingListById,
  useUpdateShoppingListMutation,
} from './shoppingListApiSlice';

type Props = {
  shoppingListId: EntityId;
};

export default function ShoppingListItem({ shoppingListId }: Props) {
  const data = useAppSelector((state) =>
    selectShoppingListById(state, shoppingListId)
  );

  const [updateShoppingList] = useUpdateShoppingListMutation();

  const handleChange = async (productId: EntityId) => {
    if (data) {
      const products = data.products.map((product) => ({
        _id: product._id,
        ingredient: product.ingredient._id as EntityId,
        quantity: product.quantity,
        isCompleted:
          product._id === productId
            ? !product.isCompleted
            : product.isCompleted,
      }));
      await updateShoppingList({
        productId,
        shoppingList: { id: shoppingListId, products },
      });
    }
  };
  let sortedProducts = [] as TShoppingListProduct[];

  if (data) {
    sortedProducts = [...data.products].sort((a, b) => {
      const aProductWeight = a.ingredient.unitWeight * a.quantity;
      const bProductWeight = b.ingredient.unitWeight * b.quantity;
      return bProductWeight - aProductWeight;
    });
  }

  return (
    <Grid gap={2}>
      {sortedProducts?.map(({ _id, ingredient, isCompleted, quantity }) => (
        <HStack
          key={_id}
          alignItems="center"
          onClick={() => handleChange(_id)}
          bgColor="gray.800"
          rounded="md"
          p={2}
        >
          <Checkbox
            colorScheme="green"
            isChecked={isCompleted}
            textDecoration={isCompleted ? 'line-through' : 'none'}
            color={isCompleted ? 'gray.500' : 'white'}
          >
            {ingredient.name}
          </Checkbox>
          <Text fontSize="sm" color="green.300">
            {`(${ingredient.unitWeight * quantity} g)`}{' '}
          </Text>
        </HStack>
      ))}
    </Grid>
  );
}

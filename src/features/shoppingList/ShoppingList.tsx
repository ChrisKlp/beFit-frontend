import { Button, Grid } from '@chakra-ui/react';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import ShoppingListItem from './ShoppingListItem';
import {
  useGenerateShoppingListMutation,
  useGetShoppingListQuery,
} from './shoppingListApiSlice';

export default function ShoppingList() {
  const { data, isLoading, isError, error } = useGetShoppingListQuery();

  const [generateShoppingList] = useGenerateShoppingListMutation();

  const handleGenerateList = async () => {
    await generateShoppingList();
  };

  return (
    <Grid gap={6}>
      <Button colorScheme="green" size="sm" onClick={handleGenerateList}>
        Generuj Listę
      </Button>
      {data ? (
        data?.ids.map((dataId) => (
          <Grid key={dataId} gap={2}>
            <ShoppingListItem shoppingListId={dataId} />
          </Grid>
        ))
      ) : isError ? (
        <ErrorStatus error={error} />
      ) : isLoading ? (
        <LoadingIndicator />
      ) : null}
    </Grid>
  );
}

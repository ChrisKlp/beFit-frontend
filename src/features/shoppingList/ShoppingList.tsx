import { Button, Grid, Text, VStack } from '@chakra-ui/react';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import ShoppingListItem from './ShoppingListItem';
import {
  useDeleteShoppingListMutation,
  useGenerateShoppingListMutation,
  useGetShoppingListQuery,
} from './shoppingListApiSlice';
import { isErrorWithDataAndStatus } from '@/utils/servicesHelpers';

export default function ShoppingList() {
  const {
    data,
    isLoading,
    isError: isGetError,
    error: getError,
  } = useGetShoppingListQuery();

  const [
    generateShoppingList,
    { error: generateError, isError: isGenerateError },
  ] = useGenerateShoppingListMutation();
  const [deleteShoppingList, { error: deleteError, isError: isDeleteError }] =
    useDeleteShoppingListMutation();

  const handleGenerateList = async () => {
    if (data?.ids.length) {
      await deleteShoppingList({ id: data.ids[0] });
    }
    await generateShoppingList();
  };

  const isError = isGetError || isGenerateError || isDeleteError;
  const error = getError || generateError || deleteError;

  let errorContent = <ErrorStatus error={error} />;

  if (
    isGetError &&
    isErrorWithDataAndStatus(getError) &&
    getError?.status === 404
  ) {
    errorContent = (
      <VStack spacing={4}>
        <Text>Nie masz jeszcze listy zakupów</Text>
      </VStack>
    );
  }

  if (
    isGenerateError &&
    isErrorWithDataAndStatus(generateError) &&
    generateError?.status === 404
  ) {
    errorContent = (
      <VStack spacing={4}>
        <Text>Brak dostępnych menu</Text>
      </VStack>
    );
  }

  return (
    <Grid gap={6}>
      <Button colorScheme="green" size="sm" onClick={handleGenerateList}>
        Generuj Listę
      </Button>
      {isError ? (
        errorContent
      ) : isLoading ? (
        <LoadingIndicator />
      ) : data ? (
        data?.ids.map((dataId) => (
          <Grid key={dataId} gap={2}>
            <ShoppingListItem shoppingListId={dataId} />
          </Grid>
        ))
      ) : null}
    </Grid>
  );
}

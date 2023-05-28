import { Button, Grid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import { isErrorWithDataAndStatus } from '@/utils/servicesHelpers';
import { selectMenuEditMode, setMenuEditMode } from '../app/appSlice';
import MenuItem from './MenuItem';
import { useAddNewMenuMutation, useGetUserMenusQuery } from './menusApiSlice';

export default function MenuList() {
  const { data, isError, isLoading, error } = useGetUserMenusQuery();
  const isEditModeActive = useAppSelector(selectMenuEditMode);
  const dispatch = useAppDispatch();

  const [
    createMenu,
    { isError: isCreateError, error: createError, isLoading: isCreateLoading },
  ] = useAddNewMenuMutation();

  useEffect(() => {
    if (
      data?.ids.length === 0 ||
      (isError &&
        isErrorWithDataAndStatus(error) &&
        error?.status === 404 &&
        isEditModeActive)
    ) {
      dispatch(setMenuEditMode(false));
    }
  }, [data?.ids.length, dispatch, error, isEditModeActive, isError]);

  const handleCreateMenu = async () => {
    await createMenu();
    if (!isEditModeActive) {
      dispatch(setMenuEditMode(true));
    }
  };

  if (isError && isErrorWithDataAndStatus(error) && error?.status === 404) {
    return (
      <VStack spacing={4}>
        <Text>Nie masz jeszcze menu</Text>
        <Button
          colorScheme="green"
          variant="outline"
          size="sm"
          onClick={handleCreateMenu}
          isLoading={isCreateLoading}
        >
          Dodaj menu
        </Button>
      </VStack>
    );
  }

  return data ? (
    <Grid gap={6}>
      {isCreateError && <ErrorStatus error={createError} />}
      {data.ids.map((menuId, i) => (
        <MenuItem key={menuId} menuId={menuId} index={i} />
      ))}
      {isEditModeActive && (
        <Button
          colorScheme="green"
          size="sm"
          onClick={handleCreateMenu}
          isLoading={isCreateLoading}
        >
          Dodaj Menu
        </Button>
      )}
    </Grid>
  ) : isError ? (
    <ErrorStatus error={error} />
  ) : isLoading ? (
    <LoadingIndicator />
  ) : null;
}

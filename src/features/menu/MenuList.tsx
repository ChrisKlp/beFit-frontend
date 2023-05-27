import React from 'react';
import {
  Box,
  Button,
  Center,
  CloseButton,
  Grid,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SiAddthis } from 'react-icons/si';
import { useGetUserMenusQuery } from './menusApiSlice';
import RecipeItem from '../recipe/dash/RecipeItem';
import ErrorStatus from '@/components/ErrorStatus';
import LoadingIndicator from '@/components/LoadingIndicator';
import MenuItem from './MenuItem';
import { isErrorWithDataAndStatus } from '@/utils/servicesHelpers';
import { useAppSelector } from '@/app/hooks';
import { selectMenuEditMode } from '../app/appSlice';

export default function MenuList() {
  const { data, isError, isLoading, error } = useGetUserMenusQuery();
  const isEditModeActive = useAppSelector(selectMenuEditMode);

  if (isError && isErrorWithDataAndStatus(error) && error?.status === 404) {
    return (
      <VStack spacing={4}>
        <Text>Nie masz jeszcze menu</Text>
        <Button colorScheme="green" variant="outline" size="sm">
          Dodaj menu
        </Button>
      </VStack>
    );
  }

  return data ? (
    <Grid gap={6}>
      {data.ids.map((menuId, i) => (
        <MenuItem key={menuId} menuId={menuId} index={i} />
      ))}
      {isEditModeActive && (
        <Button colorScheme="green" size="sm">
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

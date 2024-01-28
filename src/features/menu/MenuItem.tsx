import { Grid, HStack, IconButton, Text } from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { BiDuplicate } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useAppSelector } from '@/app/hooks';
import { selectMenuEditMode } from '../app/appSlice';
import {
  selectMenuById,
  useAddNewMenuMutation,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
} from './menusApiSlice';
import ErrorStatus from '@/components/ErrorStatus';
import { MealType } from '@/types/Menu';
import MenuRecipeItem from './MenuRecipeItem';

type Props = {
  menuId: EntityId;
  index: number;
};

export default function MenuItem({ menuId, index }: Props) {
  const data = useAppSelector((state) => selectMenuById(state, menuId));

  const isEditModeActive = useAppSelector(selectMenuEditMode);

  const [createMenu, { isError: isCreateError, error: createError }] =
    useAddNewMenuMutation();
  const [updateMenu, { isError: isUpdateError, error: updateError }] =
    useUpdateMenuMutation();
  const [deleteMenu, { isError: isDeleteError, error: deleteError }] =
    useDeleteMenuMutation();

  const menuData = useMemo(
    () => [
      {
        id: MealType.Breakfast,
        recipeId: data?.breakfast,
        label: 'Śniadanie',
      },
      {
        id: MealType.SecondBreakfast,
        recipeId: data?.secondBreakfast,
        label: 'Drugie śniadanie',
      },
      {
        id: MealType.Dinner,
        recipeId: data?.dinner,
        label: 'Obiad',
      },
      {
        id: MealType.Supper,
        recipeId: data?.supper,
        label: 'Kolacja',
      },
    ],
    [data?.breakfast, data?.secondBreakfast, data?.dinner, data?.supper]
  );

  const getMealsData = () => ({
    [MealType.Breakfast]: data?.breakfast,
    [MealType.SecondBreakfast]: data?.secondBreakfast,
    [MealType.Dinner]: data?.dinner,
    [MealType.Supper]: data?.supper,
  });

  const handleSelect = async (recipeId: EntityId, mealType: MealType) => {
    await updateMenu({ id: menuId, ...getMealsData(), [mealType]: recipeId });
  };

  const handleDuplicateClick = async () => {
    await createMenu(getMealsData());
  };

  const handleDeleteClick = async () => {
    await deleteMenu({ id: menuId });
  };

  const isError = isUpdateError || isDeleteError || isCreateError;
  const error = updateError || deleteError || createError;

  // if (data) {
  //   createdAt = intlFormat(
  //     new Date(data.createdAt),
  //     {
  //       weekday: 'long',
  //       year: 'numeric',
  //       month: 'numeric',
  //       day: 'numeric',
  //     },
  //     {
  //       locale: 'pl-PL',
  //     }
  //   );
  // }

  return (
    <Grid gap={3} bg="gray.800" w="full" p={3} rounded="lg">
      <HStack w="100%" justifyContent="space-between">
        <Text>{`Dzień ${index + 1}`}</Text>
        {isEditModeActive && (
          <HStack spacing={4}>
            <IconButton
              aria-label="duplikuj"
              colorScheme="gray"
              size="sm"
              variant="outline"
              icon={<BiDuplicate />}
              onClick={handleDuplicateClick}
            />
            <IconButton
              aria-label="Usuń"
              colorScheme="red"
              size="sm"
              variant="outline"
              icon={<AiFillDelete />}
              onClick={handleDeleteClick}
            />
          </HStack>
        )}
      </HStack>
      {isEditModeActive && isError && <ErrorStatus error={error} />}
      {data &&
        menuData.map(({ id, recipeId, label }) => (
          <MenuRecipeItem
            key={label}
            id={id}
            recipeId={recipeId}
            label={label}
            handleSelect={handleSelect}
          />
        ))}
    </Grid>
  );
}

import { Grid, HStack, IconButton, Text } from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { BiDuplicate } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useAppSelector } from '@/app/hooks';
import { selectMenuEditMode } from '../app/appSlice';
import { selectMenuById, useUpdateMenuMutation } from './menusApiSlice';
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

  const [updateMenu, { isError, error }] = useUpdateMenuMutation();

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

  const handleSelect = async (recipeId: EntityId, mealType: MealType) => {
    const mealsData = {
      [MealType.Breakfast]: data?.breakfast || null,
      [MealType.SecondBreakfast]: data?.secondBreakfast || null,
      [MealType.Dinner]: data?.dinner || null,
      [MealType.Supper]: data?.supper || null,
    };
    await updateMenu({ id: menuId, ...mealsData, [mealType]: recipeId });
  };

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
            />
            <IconButton
              aria-label="Usuń"
              colorScheme="red"
              size="sm"
              variant="outline"
              icon={<AiFillDelete />}
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

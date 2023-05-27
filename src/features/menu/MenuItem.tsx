import { Grid, HStack, IconButton, Text } from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { BiDuplicate } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useAppSelector } from '@/app/hooks';
import { selectMenuEditMode } from '../app/appSlice';
import MenuRecipeItem from './MenuRecipeItem';
import { selectMenuById } from './menusApiSlice';

type Props = {
  menuId: EntityId;
  index: number;
};

export default function MenuItem({ menuId, index }: Props) {
  const data = useAppSelector((state) => selectMenuById(state, menuId));
  const isEditModeActive = useAppSelector(selectMenuEditMode);

  const menuData = useMemo(
    () => [
      {
        id: data?.breakfast,
        label: 'Śniadanie',
      },
      {
        id: data?.secondBreakfast,
        label: 'Drugie śniadanie',
      },
      {
        id: data?.dinner,
        label: 'Obiad',
      },
      {
        id: data?.supper,
        label: 'Kolacja',
      },
    ],
    [data?.breakfast, data?.secondBreakfast, data?.dinner, data?.supper]
  );

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
      {data &&
        menuData.map(({ id, label }) => (
          <MenuRecipeItem key={label} id={id} label={label} />
        ))}
    </Grid>
  );
}

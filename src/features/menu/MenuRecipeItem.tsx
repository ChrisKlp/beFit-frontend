import { Stack, HStack, IconButton, Text } from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { AiFillEdit } from 'react-icons/ai';
import { useAppSelector } from '@/app/hooks';
import { selectMenuEditMode } from '../app/appSlice';
import RecipeListItem from '../recipe/home/RecipeListItem';

type Props = {
  id?: EntityId | null;
  label: string;
};

export default function MenuRecipeItem({ id, label }: Props) {
  const isEditModeActive = useAppSelector(selectMenuEditMode);

  if (!isEditModeActive && !id) return null;

  return (
    <Stack
      key={id}
      p={3}
      rounded="lg"
      position="relative"
      zIndex={0}
      _after={{
        content: `""`,
        bg: 'gray.700',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.6,
        rounded: 'lg',
        zIndex: -1,
      }}
    >
      <HStack w="100%" justifyContent="space-between">
        <Text fontSize="sm" color="gray.400">
          {label}
        </Text>
        {isEditModeActive && (
          <IconButton
            aria-label="duplikuj"
            colorScheme="gray"
            size="sm"
            variant="outline"
            icon={<AiFillEdit />}
          />
        )}
      </HStack>
      {id && <RecipeListItem recipeId={id} variant="compact" />}
    </Stack>
  );
}

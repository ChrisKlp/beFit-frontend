import {
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { AiFillEdit } from 'react-icons/ai';
import ModalWrapper from '@/components/ModalWrapper';
import { useAppSelector } from '@/app/hooks';
import { selectMenuEditMode } from '../app/appSlice';
import RecipeList from '../recipe/home/RecipeList';
import RecipeListItem from '../recipe/home/RecipeListItem';
import { MealType } from '@/types/Menu';

type Props = {
  id: MealType;
  recipeId?: EntityId | null;
  label: string;
  handleSelect?: (recipeId: EntityId, mealType: MealType) => void;
};

export default function MenuRecipeItem({
  id,
  recipeId,
  label,
  handleSelect,
}: Props) {
  const isEditModeActive = useAppSelector(selectMenuEditMode);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!isEditModeActive && !recipeId) return null;

  const handleRecipeSelect = (recipe: EntityId) => {
    if (handleSelect) {
      handleSelect(recipe, id);
    }
    onClose();
  };

  return (
    <>
      <Stack
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
              onClick={onOpen}
            />
          )}
        </HStack>
        {recipeId && <RecipeListItem recipeId={recipeId} variant="compact" />}
      </Stack>
      <ModalWrapper isOpen={isOpen} title={label} onClose={onClose}>
        <RecipeList onClick={handleRecipeSelect} />
      </ModalWrapper>
    </>
  );
}

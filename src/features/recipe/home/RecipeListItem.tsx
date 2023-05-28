/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityId } from '@reduxjs/toolkit';
import {
  LinkBox,
  HStack,
  VStack,
  LinkOverlay,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectRecipeById } from '../recipesApiSlice';
import paths from '@/routes/paths';

type Props = {
  recipeId: EntityId;
  variant?: 'default' | 'compact';
  onClick?: (id: EntityId) => void;
};

export default function RecipeListItem({
  recipeId,
  variant = 'default',
  onClick,
}: Props) {
  const data = useAppSelector((state) => selectRecipeById(state, recipeId));

  if (!data) return null;

  const categories =
    data && typeof data === 'object' && 'categories' in data
      ? (data.categories as any[]).map((c) => c.name)
      : [];

  return (
    <LinkBox
      w="full"
      bg={variant === 'default' ? 'gray.800' : 'transparent'}
      py={variant === 'default' ? 3 : 1}
      px={variant === 'default' ? 4 : 1}
      rounded="lg"
      onClick={() => onClick && onClick(recipeId)}
      cursor={onClick ? 'pointer' : 'default'}
    >
      <HStack alignItems="center" spacing={4}>
        {data.image && (
          <Image
            boxSize={variant === 'default' ? '60px' : '50px'}
            rounded="full"
            objectFit="cover"
            src={data.image}
            alt="recipe image"
          />
        )}
        <VStack flex={1} align="stretch" spacing={0}>
          {onClick ? (
            <Text>{data.title}</Text>
          ) : (
            <LinkOverlay as={RouterLink} to={paths.recipes.item(recipeId)}>
              <Text>{data.title}</Text>
            </LinkOverlay>
          )}

          {variant === 'default' && (
            <Text fontSize="xs" color="gray.500">
              {categories?.join(', ')}
            </Text>
          )}
        </VStack>
      </HStack>
    </LinkBox>
  );
}

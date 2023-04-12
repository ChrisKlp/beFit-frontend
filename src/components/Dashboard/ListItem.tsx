import { Button, HStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { TCategoryRes } from '@/types/Category';
import { TIngredientRes } from '@/types/Ingredient';
import { TRecipeRes } from '@/types/Recipe';
import { TExerciseRes } from '@/types/Exercise';

type Props = {
  data?: TRecipeRes | TIngredientRes | TCategoryRes | TExerciseRes;
  link: string;
  editLink?: string;
};

export default function ListItem({ link, editLink, data }: Props) {
  const title =
    (data && 'title' in data && data.title) ||
    (data && 'name' in data && data.name);

  return (
    <LinkBox w="full" bg="gray.800" py={3} px={4} rounded="lg">
      <HStack justifyContent="space-between" alignItems="center">
        <LinkOverlay as={RouterLink} to={link}>
          <Text>{title}</Text>
        </LinkOverlay>
        <HStack>
          <Button
            as={RouterLink}
            to={editLink}
            colorScheme="green"
            variant="outline"
            size="sm"
          >
            Edit
          </Button>
        </HStack>
      </HStack>
    </LinkBox>
  );
}

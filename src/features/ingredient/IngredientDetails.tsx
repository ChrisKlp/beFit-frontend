import { Heading, Text, VStack } from '@chakra-ui/react';
import { TIngredientRes } from '@/types/Ingredient';

type Props = {
  ingredient: TIngredientRes;
};

export default function IngredientDetails({ ingredient }: Props) {
  return (
    <VStack spacing={6} align="stretch">
      <Heading>{ingredient.name}</Heading>
      <Text>{`Waga jednostki: ${ingredient.unitWeight} g`}</Text>
    </VStack>
  );
}

/* eslint-disable react/no-array-index-key */
import {
  VStack,
  Heading,
  HStack,
  Text,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { TRecipeRes } from '@/types/Recipe';

type Props = {
  recipe: TRecipeRes;
};

export default function RecipeDetials({ recipe }: Props) {
  const categories = recipe.categories.map((category) => (
    <Text key={category._id} color="green.400">
      {capitalizeFirstLetter(category.name)}
    </Text>
  ));

  const instructions = (
    <OrderedList spacing={3}>
      {recipe.instructions.map((instruction, index) => (
        <ListItem key={index}>{instruction}</ListItem>
      ))}
    </OrderedList>
  );

  const ingredients = (
    <VStack align="stretch">
      {recipe.ingredients.map(({ _id, ingredient, quantity }) => (
        <HStack key={_id}>
          <Text>{`${quantity}x`}</Text>
          <Text>{capitalizeFirstLetter(ingredient.name)}</Text>
          <Text>{`(${ingredient.unitWeight * quantity}g)`}</Text>
        </HStack>
      ))}
    </VStack>
  );

  return (
    <VStack spacing={6} align="stretch">
      <Heading>{recipe?.title}</Heading>
      <HStack spacing={4}>{categories}</HStack>
      <VStack align="stretch">
        <Text>{`Kalorie: ${recipe.calories} kcal`}</Text>
        <Text>{`Białko: ${recipe.protein} g`}</Text>
        <Text>{`Węglowodany: ${recipe.carbohydrates} g`}</Text>
        <Text>{`Tłuszcze: ${recipe.fat} g`}</Text>
      </VStack>
      <Heading size="sm" color="green.400">
        Składniki:
      </Heading>
      {ingredients}
      <Heading size="sm" color="green.400">
        Instrukcje:
      </Heading>
      {instructions}
    </VStack>
  );
}

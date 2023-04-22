/* eslint-disable react/no-array-index-key */
import {
  HStack,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TRecipeRes } from '@/types/Recipe';
import { capitalizeFirstLetter } from '@/utils/stringUtils';

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
      <Image src={recipe.image} w="300px" />
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

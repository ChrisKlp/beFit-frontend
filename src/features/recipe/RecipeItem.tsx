/* eslint-disable @typescript-eslint/no-throw-literal */
import { ScrollRestoration, useParams } from 'react-router-dom';
import {
  Center,
  Container,
  HStack,
  Heading,
  ListItem,
  OrderedList,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useGetRecipesQuery } from './recipesApiSlice';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { handleError } from '@/utils/servicesHelpers';

export default function RecipeItem() {
  const { recipeId } = useParams();

  const { recipe, isRequestSuccess, isRequestError, requestError } =
    useGetRecipesQuery(undefined, {
      selectFromResult: ({ data, isSuccess, isError, error }) => {
        const recipeData = data?.entities[recipeId as string];
        return {
          recipe: recipeData,
          isRequestSuccess: isSuccess,
          isRequestError: isError,
          requestError: error,
        };
      },
    });

  handleError(isRequestError, requestError);

  if (!recipe) {
    if (isRequestSuccess) {
      throw new Response('', {
        status: 403,
        statusText: 'Recipe Not Found',
      });
    } else {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
  }

  const categories = recipe.categories.map((category) => (
    <Text key={category._id} opacity={0.5}>
      {category.name}
    </Text>
  ));

  const instructions = (
    <OrderedList spacing={3}>
      {recipe.instructions.map((instruction) => (
        <ListItem key={instruction}>{instruction}</ListItem>
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
    <>
      <Container mb={12}>
        <VStack spacing={6} align="stretch">
          <Heading>{recipe?.title}</Heading>
          <HStack>{categories}</HStack>
          <VStack align="stretch">
            <Text>{`Kalorie: ${recipe.calories} kcal`}</Text>
            <Text>{`Białko: ${recipe.protein} g`}</Text>
            <Text>{`Węglowodany: ${recipe.carbohydrates} g`}</Text>
            <Text>{`Tłuszcze: ${recipe.fat} g`}</Text>
          </VStack>
          <Heading size="sm">Składniki:</Heading>
          {ingredients}
          <Heading size="sm">Instrukcje:</Heading>
          {instructions}
        </VStack>
      </Container>
      <ScrollRestoration />
    </>
  );
}

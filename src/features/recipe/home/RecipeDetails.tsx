/* eslint-disable react/no-array-index-key */
import {
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TRecipeRes } from '@/types/Recipe';
import { capitalizeFirstLetter } from '@/utils/stringUtils';

function Nutrient({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0}>
      <Text fontSize="sm" color="gray.400" whiteSpace="nowrap">
        {label}
      </Text>
      <Text>{value}</Text>
    </Stack>
  );
}

type Props = {
  recipe: TRecipeRes;
  oneColumn?: boolean;
};

export default function SingleRecipe({ recipe, oneColumn }: Props) {
  const categories = recipe.categories.map((category) => (
    <Tag
      key={category._id}
      colorScheme="green"
      size="sm"
      whiteSpace="nowrap"
      flexShrink={0}
      mb={1}
      mr={1}
    >
      {capitalizeFirstLetter(category.name)}
    </Tag>
  ));

  const instructions = (
    <Stack spacing={3}>
      {recipe.instructions.map((instruction, index) => (
        <Grid
          gridAutoFlow="column"
          justifyContent="start"
          templateColumns="30px 1fr"
          key={index}
        >
          <Text color="gray.400">{`${index + 1}.`}</Text>
          <Text>{instruction}</Text>
        </Grid>
      ))}
    </Stack>
  );

  const ingredients = (
    <VStack align="stretch">
      {recipe.ingredients.map(({ _id, ingredient, quantity }) => (
        <Grid
          gridAutoFlow="column"
          justifyContent="start"
          templateColumns="50px 1fr"
          key={_id}
        >
          <Text
            color="gray.400"
            fontSize="sm"
            alignSelf="center"
          >{`${quantity}x`}</Text>
          <HStack alignItems="flex-start">
            <Text>{capitalizeFirstLetter(ingredient.name)}</Text>
            <Text>{`(${ingredient.unitWeight * quantity}g)`}</Text>
          </HStack>
        </Grid>
      ))}
    </VStack>
  );

  return (
    <VStack spacing={8} align="stretch">
      <Flex
        flexFlow={{ base: 'column', md: oneColumn ? 'column' : 'row' }}
        gap={8}
        alignItems="center"
      >
        <Image src={recipe.image} w="300px" />
        <Stack spacing={4} w="full">
          <Stack>
            <Flex wrap="wrap">{categories}</Flex>
            <Heading>{recipe?.title}</Heading>
          </Stack>
          <SimpleGrid
            columns={{ base: 2, md: 4 }}
            spacing={4}
            bg="gray.800"
            p={6}
            rounded="lg"
          >
            <Nutrient label="Kalorie" value={`${recipe.calories} kcal`} />
            <Nutrient label="Białko" value={`${recipe.protein} g`} />
            <Nutrient label="Węglowodany" value={`${recipe.carbohydrates} g`} />
            <Nutrient label="Tłuszcze" value={`${recipe.fat} g`} />
          </SimpleGrid>
        </Stack>
      </Flex>
      <Stack spacing={4} bg="gray.800" p={6} rounded="lg">
        <Heading size="sm" color="green.400">
          Składniki:
        </Heading>
        {ingredients}
      </Stack>
      <Stack spacing={4} bg="gray.800" p={6} rounded="lg">
        <Heading size="sm" color="green.400">
          Instrukcje:
        </Heading>
        {instructions}
      </Stack>
    </VStack>
  );
}

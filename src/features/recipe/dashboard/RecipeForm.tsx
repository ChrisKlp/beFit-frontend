/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import { Select } from 'chakra-react-select';
import { useState } from 'react';
import FormFileInput from '@/components/dashboard/FormFileInput';
import FormInput from '@/components/dashboard/FormInput';
import { TCategoryRes } from '@/types/Category';
import { TIngredientRes } from '@/types/Ingredient';
import { TRecipeFormValues } from '@/types/Recipe';

const initialEmptyState = {
  title: '',
  categories: [] as any,
  calories: 0,
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  instructions: '',
  ingredients: [] as any,
};

type RecipeFormProps = {
  initialState?: TRecipeFormValues;
  categories?: EntityState<TCategoryRes>;
  ingredients?: EntityState<TIngredientRes>;
  handleSubmit: (values: TRecipeFormValues) => Promise<void>;
};

export default function RecipeForm({
  initialState,
  categories,
  ingredients,
  handleSubmit,
}: RecipeFormProps) {
  const [values, setValues] = useState<TRecipeFormValues>(
    initialState || initialEmptyState
  );

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCategoryChange = (items: any) => {
    setValues((prev) => ({
      ...prev,
      categories: items,
    }));
  };

  const handleIngredientsChange = (ingredient: any, index: number) => {
    setValues((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((item: any, i: number) =>
        i === index ? ingredient : item
      ),
    }));
  };

  const addIngredient = () => {
    setValues((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        {
          ingredient: {
            label: '',
            value: '',
            unitWeight: 0,
          },
          quantity: 0,
        },
      ],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      image: e.target.files?.[0] || null,
    }));
  };

  const removeIngredient = (index: number) => {
    setValues((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(values);
      }}
    >
      <VStack spacing={6} align="stretch">
        <FormInput
          placeholder="Budyń jaglany"
          value={values?.title}
          name="title"
          label="Title:"
          isRequired
          onChange={handleInputChange}
        />
        <FormFileInput
          label="Image:"
          value={values.image}
          onChange={handleImageChange}
        />
        <FormControl>
          <FormLabel>Category:</FormLabel>
          <Select
            isMulti
            colorScheme="green"
            noOptionsMessage={() => 'No categories'}
            value={values?.categories}
            options={
              categories?.ids.map((id) => ({
                value: categories?.entities[id]?._id || '',
                label: categories?.entities[id]?.name || '',
              })) || []
            }
            onChange={handleCategoryChange}
          />
        </FormControl>
        <SimpleGrid columns={2} spacing={6}>
          <FormInput
            placeholder="545"
            value={values?.calories}
            name="calories"
            label="Calories:"
            type="number"
            onChange={handleInputChange}
          />
          <FormInput
            placeholder="45"
            value={values?.protein}
            name="protein"
            label="Protein:"
            type="number"
            onChange={handleInputChange}
          />
          <FormInput
            placeholder="45"
            value={values?.carbohydrates}
            name="carbohydrates"
            label="Carbohydrates:"
            type="number"
            onChange={handleInputChange}
          />
          <FormInput
            placeholder="34"
            value={values?.fat}
            name="fat"
            label="Fat:"
            type="number"
            onChange={handleInputChange}
          />
        </SimpleGrid>
        <Text fontWeight="medium">Ingredients:</Text>
        {values?.ingredients.map((ing, index) => (
          <Grid
            templateColumns="60px auto 1fr 50px auto"
            gap={2}
            key={index}
            bg="gray.800"
            rounded="lg"
            border="1px"
            borderColor="gray.700"
            p={4}
          >
            <FormInput
              placeholder="34"
              value={ing.quantity}
              name="quantity"
              label="Qty:"
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const ingredient = {
                  ...ing,
                  quantity: e.target.value,
                };
                handleIngredientsChange(ingredient, index);
              }}
            />
            <Text alignSelf="end" mb={2}>
              x
            </Text>
            <FormControl>
              <FormLabel>Ingredient:</FormLabel>
              <Select
                selectedOptionColorScheme="green"
                noOptionsMessage={() => 'No ingredients'}
                value={{
                  value: ing.ingredient?.value,
                  label: ing.ingredient?.label,
                }}
                options={
                  ingredients?.ids.map((id) => ({
                    value: ingredients?.entities[id]?._id || '',
                    label: ingredients?.entities[id]?.name || '',
                    unitWeight: ingredients?.entities[id]?.unitWeight || 0,
                  })) || []
                }
                onChange={(item) => {
                  const ingredient = {
                    ...ing,
                    ingredient: item,
                  };
                  handleIngredientsChange(ingredient, index);
                }}
              />
            </FormControl>
            <Text
              alignSelf="end"
              mb={2}
            >{`${ing.ingredient?.unitWeight} g`}</Text>
            <CloseButton size="sm" onClick={() => removeIngredient(index)} />
          </Grid>
        ))}
        <Button onClick={addIngredient}>Add Ingredient</Button>
        <FormControl>
          <FormLabel>Instructions:</FormLabel>
          <Textarea
            name="instructions"
            rows={8}
            placeholder="Zblenduj wszystko"
            value={values?.instructions}
            onChange={handleInputChange}
          />
        </FormControl>
      </VStack>
      <HStack justifyContent="flex-end" mt={6}>
        <Button type="submit" colorScheme="green" variant="outline">
          Submit
        </Button>
      </HStack>
    </form>
  );
}

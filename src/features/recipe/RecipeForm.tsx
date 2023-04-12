/* eslint-disable import/no-cycle */
import {
  Button,
  FormControl,
  FormControlProps,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import { Select } from 'chakra-react-select';
import { TIngredientRes } from '@/types/Ingredient';
import { TCategoryRes } from '@/types/Category';
import { TRecipeFormValues } from './EditRecipe';

type FormInputProps = {
  id: string;
  label: string;
  value?: string | number;
  placeholder?: string;
  isRequired?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & FormControlProps;

function FormInput({
  id,
  label,
  value,
  placeholder,
  isRequired,
  type,
  onChange,
  ...rest
}: FormInputProps) {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
    </FormControl>
  );
}

type RecipeFormProps = {
  values?: TRecipeFormValues;
  categories?: EntityState<TCategoryRes>;
  ingredients?: EntityState<TIngredientRes>;
  handleInputChange: (e: any) => void;
  handleCategoryChange: (items: any) => void;
  handleIngredientsChange: (ingredient: any) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function RecipeForm({
  values,
  categories,
  ingredients,
  handleInputChange,
  handleCategoryChange,
  handleIngredientsChange,
  handleSubmit,
}: RecipeFormProps) {
  return (
    <VStack align="stretch">
      <HStack justifyContent="space-between" align="center" mb={6}>
        <Heading>Edit recipe</Heading>
        <Button colorScheme="red" variant="outline">
          Delete
        </Button>
      </HStack>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormInput
            placeholder="Budyń jaglany"
            value={values?.title}
            id="title"
            label="Title:"
            onChange={handleInputChange}
          />
          <FormControl isRequired>
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
              id="calories"
              label="Calories:"
              type="number"
              onChange={handleInputChange}
            />
            <FormInput
              placeholder="45"
              value={values?.protein}
              id="protein"
              label="Protein:"
              type="number"
              onChange={handleInputChange}
            />
            <FormInput
              placeholder="45"
              value={values?.carbohydrates}
              id="carbohydrates"
              label="Carbohydrates:"
              type="number"
              onChange={handleInputChange}
            />
            <FormInput
              placeholder="34"
              value={values?.fat}
              id="fat"
              label="Fat:"
              type="number"
              onChange={handleInputChange}
            />
          </SimpleGrid>
          <Text fontWeight="medium">Ingredients:</Text>
          {values?.ingredients.map((ing) => (
            <Grid templateColumns="75px 10px auto 50px" gap={2} key={ing._id}>
              <FormInput
                placeholder="34"
                value={ing.quantity}
                id="quantity"
                label="Qty:"
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const ingredient = { ...ing, quantity: e.target.value };
                  handleIngredientsChange(ingredient);
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
                    const ingredient = { ...ing, ingredient: item };
                    handleIngredientsChange(ingredient);
                  }}
                />
              </FormControl>
              <Text
                alignSelf="end"
                mb={2}
              >{`${ing.ingredient?.unitWeight} g`}</Text>
            </Grid>
          ))}
          <FormControl>
            <FormLabel>Instructions:</FormLabel>
            <Textarea
              id="instructions"
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
    </VStack>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Input, Text } from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import { Select } from 'chakra-react-select';
import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';
import ErrorStatus from '@/components/ErrorStatus';
import ItemList from '@/components/ItemList';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useGetCategoriesQuery } from '@/features/category/categoriesApiSlice';
import { useGetIngredientsQuery } from '@/features/ingredient/ingredientsApiSlice';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';

export default function RecipeList() {
  const { data, isError, isLoading, error } = useGetRecipesQuery();
  const { data: ingredientsData } = useGetIngredientsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();

  const [value, setValue] = useState('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);

  let filteredIds = data?.ids;
  let filteredData = data as EntityState<unknown>;

  if (value !== '' && data) {
    filteredIds = data.ids.filter((id) => {
      const title = data.entities[id]?.title as string;
      return title.toLowerCase().includes(value.toLowerCase());
    });
    filteredData = {
      ...data,
      ids: filteredIds,
    };
  }

  if (ingredients.length > 0 && data) {
    filteredIds = filteredData.ids.filter((id) => {
      const recipeIngredients = data.entities[id]?.ingredients;
      return ingredients.every((ingredient) =>
        recipeIngredients?.some(
          (recipeIngredient) =>
            recipeIngredient.ingredient._id === ingredient.value
        )
      );
    });
    filteredData = {
      ...data,
      ids: filteredIds,
    };
  }

  if (category && data) {
    filteredIds = filteredData.ids.filter((id) => {
      const recipeCategories = data.entities[id]?.categories;
      return recipeCategories?.some(
        (recipeCategory) => recipeCategory._id === category.value
      );
    });
    filteredData = {
      ...data,
      ids: filteredIds,
    };
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedOnChange = useMemo(() => debounce(onChange, 500), []);

  const handleIngredientsChange = (items: any) => {
    setIngredients(items);
  };

  const handleCategoriesChange = (items: any) => {
    setCategory(items);
  };

  return data ? (
    <Grid gap={6} mt={2} mb={8}>
      <Input placeholder="Szukaj" onChange={debouncedOnChange} />
      <Box flex={1}>
        <Select
          isMulti
          selectedOptionColorScheme="green"
          noOptionsMessage={() => 'Brak składników'}
          placeholder="Wybierz składniki"
          value={ingredients}
          options={
            ingredientsData?.ids.map((id) => ({
              value: ingredientsData?.entities[id]?._id || '',
              label: ingredientsData?.entities[id]?.name || '',
            })) || []
          }
          onChange={handleIngredientsChange}
        />
      </Box>
      <Box flex={1}>
        <Select
          selectedOptionColorScheme="green"
          noOptionsMessage={() => 'Brak kategorii'}
          value={category}
          placeholder="Wybierz kategorię"
          isClearable
          options={
            categoriesData?.ids.map((id) => ({
              value: categoriesData?.entities[id]?._id || '',
              label: categoriesData?.entities[id]?.name || '',
            })) || []
          }
          onChange={handleCategoriesChange}
        />
      </Box>
      {filteredData.ids.length ? (
        <ItemList data={filteredData} category="recipe" />
      ) : (
        <Text textAlign="center" color="whiteAlpha.500">
          Brak przepisów
        </Text>
      )}
    </Grid>
  ) : isError ? (
    <ErrorStatus error={error} />
  ) : isLoading ? (
    <LoadingIndicator />
  ) : null;
}

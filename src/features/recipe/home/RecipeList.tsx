/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Input, Text } from '@chakra-ui/react';
import { EntityId, EntityState } from '@reduxjs/toolkit';
import { Select } from 'chakra-react-select';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ErrorStatus from '@/components/ErrorStatus';
import ItemList from '@/components/ItemList';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useGetCategoriesQuery } from '@/features/category/categoriesApiSlice';
import { useGetIngredientsQuery } from '@/features/ingredient/ingredientsApiSlice';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';
import { selectRecipeFilters, setRecipeFilters } from '@/features/app/appSlice';

type Props = {
  onClick?: (id: EntityId) => void;
};

export default function RecipeList({ onClick }: Props) {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, error } = useGetRecipesQuery();
  const { data: ingredientsData } = useGetIngredientsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { ingredients, category } = useAppSelector(selectRecipeFilters);
  const [search, setSearch] = useState('');

  let filteredIds = data?.ids;
  let filteredData = data as EntityState<unknown>;

  if (search !== '' && data) {
    filteredIds = data.ids.filter((id) => {
      const title = data.entities[id]?.title as string;
      return title.toLowerCase().includes(search.toLowerCase());
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
    setSearch(e.target.value);
  };

  const debouncedOnChange = useMemo(() => debounce(onChange, 500), []);

  const handleIngredientsChange = useCallback((items: any) => {
    dispatch(
      setRecipeFilters({
        ingredients: items,
      })
    );
  }, []);

  const handleCategoriesChange = useCallback((items: any) => {
    dispatch(
      setRecipeFilters({
        category: items,
      })
    );
  }, []);

  console.log(onClick);

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
        <ItemList data={filteredData} category="recipe" onClick={onClick} />
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

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Grid, Input, Text, VStack } from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import { Select } from 'chakra-react-select';
import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';
import ItemList from '@/components/ItemList';
import LoadingView from '@/components/LoadingView';
import Logo from '@/components/Logo';
import { useGetIngredientsQuery } from '@/features/ingredient/ingredientsApiSlice';
import { useGetRecipesQuery } from '@/features/recipe/recipesApiSlice';

export default function RecipeList() {
  const { data, isError, isLoading } = useGetRecipesQuery();
  const { data: ingredientsData } = useGetIngredientsQuery();

  const [value, setValue] = useState('');
  const [ingredients, setIngredients] = useState<any[]>([]);

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedOnChange = useMemo(() => debounce(onChange, 500), []);

  const handleIngredientsChange = (items: any) => {
    setIngredients(items);
  };

  return data ? (
    <Container maxWidth="container.lg">
      <Grid gap={6} mt={2}>
        <Logo mb={-3} />
        <Input placeholder="Szukaj" onChange={debouncedOnChange} />
        <VStack align="stretch" spacing={2}>
          <Text>Wybierz składniki: </Text>
          <Box flex={1}>
            <Select
              isMulti
              selectedOptionColorScheme="green"
              noOptionsMessage={() => 'Brak składników'}
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
        </VStack>
        <ItemList data={filteredData} />
      </Grid>
    </Container>
  ) : isLoading || isError ? (
    <LoadingView isError={isError} isLoading={isLoading} />
  ) : null;
}

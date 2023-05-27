/* eslint-disable react/no-array-index-key */
import {
  Button,
  CloseButton,
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { EntityId } from '@reduxjs/toolkit';
import { useState } from 'react';
import RecipeList from '@/features/recipe/home/RecipeList';
import { useAppSelector } from '@/app/hooks';
import { selectRecipeById } from '@/features/recipe/recipesApiSlice';
import { ListItem } from '@/components/ItemList';

function RecipeItem({ id }: { id: EntityId }) {
  const data = useAppSelector((state) => selectRecipeById(state, id));
  return <ListItem data={data} />;
}

export default function MenuPage() {
  const [days, setDays] = useState(0);
  const [meal, setMeal] = useState('');
  const [recipes, setRecipes] = useState<
    Record<string, { id: EntityId | null; label: string }>
  >({
    breakfast: {
      id: null,
      label: 'Śniadanie',
    },
    secondBreakfast: {
      id: null,
      label: 'Drugie śniadanie',
    },
    dinner: {
      id: null,
      label: 'Obiad',
    },
    supper: {
      id: null,
      label: 'Kolacja',
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddDay = () => {
    setDays(days + 1);
  };

  const handleRemoveDay = () => {
    setDays(days ? days - 1 : 0);
  };

  const handleMealClick = (mealId: string) => {
    onOpen();
    setMeal(mealId);
  };

  const handleRecipeSelect = (id: EntityId) => {
    setRecipes((prev) => ({
      ...prev,
      [meal]: {
        ...prev[meal],
        id,
      },
    }));
  };

  return (
    <>
      <Grid gap={4}>
        {Array.from({ length: days }).map((_, i) => (
          <Grid
            key={i}
            gap={4}
            bg="gray.800"
            p={6}
            rounded="lg"
            position="relative"
          >
            <HStack align="stretch" justifyContent="space-between">
              <Text fontSize="xl">Dzień {i + 1}</Text>
              <CloseButton
                size="sm"
                onClick={handleRemoveDay}
                bgColor="red.700"
              />
            </HStack>
            {Object.entries(recipes).map(([key, value]) => {
              return value.id ? (
                <RecipeItem key={key} id={value.id} />
              ) : (
                <Button key={key} py={8} onClick={() => handleMealClick(key)}>
                  {value.label}
                </Button>
              );
            })}
          </Grid>
        ))}
        <Button colorScheme="green" onClick={handleAddDay}>
          Dodaj dzienne menu
        </Button>
      </Grid>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{meal && recipes[meal].label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RecipeList onClick={handleRecipeSelect} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Zamknij</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

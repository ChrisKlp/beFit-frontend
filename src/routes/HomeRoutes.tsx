import { RouteObject } from 'react-router-dom';
import Layout from '@/components/Layout';
import Prefetch from '@/features/auth/Prefetch';
import MenuPage from '@/pages/MenuPage';
import RecipeList from '@/features/recipe/home/RecipeList';
import RecipePage from '@/pages/RecipePage';
import ShoppingListPage from '@/pages/ShoppingListPage';
import WorkoutsPage from '@/pages/WorkoutsPage';
import WorkoutPage from '@/pages/WorkoutPage';

const HomeRoutes: RouteObject = {
  element: <Prefetch />,
  children: [
    {
      element: <Layout />,
      children: [
        { path: 'menu', element: <MenuPage /> },
        {
          path: 'recipes',
          element: <RecipeList />,
        },
        {
          path: 'recipe/:recipeId',
          element: <RecipePage />,
        },
        {
          path: 'shopping-list',
          element: <ShoppingListPage />,
        },
        {
          path: 'workouts',
          element: <WorkoutsPage />,
        },
        {
          path: 'workouts/:workoutId',
          element: <WorkoutPage />,
        },
      ],
    },
  ],
};

export default HomeRoutes;

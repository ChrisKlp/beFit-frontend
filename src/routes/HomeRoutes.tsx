import { RouteObject } from 'react-router-dom';
import Layout from '@/components/Layout';
import Prefetch from '@/features/auth/Prefetch';
import MenuList from '@/features/menu/MenuList';
import RecipeList from '@/features/recipe/home/RecipeList';
import RecipePage from '@/pages/RecipePage';
import ShoppingList from '@/features/shoppingList/ShoppingList';

const HomeRoutes: RouteObject = {
  element: <Prefetch />,
  children: [
    {
      element: <Layout />,
      children: [
        { path: 'menu', element: <MenuList /> },
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
          element: <ShoppingList />,
        },
      ],
    },
  ],
};

export default HomeRoutes;

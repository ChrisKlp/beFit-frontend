import { Navigate, RouteObject } from 'react-router-dom';
import Dashboard from '@/components/dashboard/Dashboard';
import AddCategory from '@/features/category/AddCategory';
import CategoryItem from '@/features/category/CategoryItem';
import CategoryList from '@/features/category/CategoryList';
import AddExercise from '@/features/exercise/AddExercise';
import ExerciseItem from '@/features/exercise/ExerciseItem';
import ExerciseList from '@/features/exercise/ExerciseList';
import AddIngredient from '@/features/ingredient/AddIngredient';
import IngredientItem from '@/features/ingredient/IngredientItem';
import IngredientList from '@/features/ingredient/IngredientList';
import AddRecipe from '@/features/recipe/dashboard/AddRecipe';
import RecipeItem from '@/features/recipe/dashboard/RecipeItem';
import RecipeList from '@/features/recipe/dashboard/RecipeList';
import AddWorkout from '@/features/workout/AddWorkout';
import WorkoutItem from '@/features/workout/WorkoutItem';
import WorkoutList from '@/features/workout/WorkoutList';
import ErrorPage from '@/pages/ErrorPage';
import paths from './paths';

const DashRecipes: RouteObject = {
  path: 'recipes',
  children: [
    {
      index: true,
      element: <RecipeList />,
    },
    {
      path: 'add',
      element: <AddRecipe />,
    },
    {
      path: ':recipeId',
      element: <RecipeItem />,
    },
    {
      path: 'edit/:recipeId',
      element: <RecipeItem />,
    },
  ],
};

const DashIngredients: RouteObject = {
  path: 'ingredients',
  children: [
    {
      index: true,
      element: <IngredientList />,
    },
    {
      path: 'add',
      element: <AddIngredient />,
    },
    {
      path: ':ingredientId',
      element: <IngredientItem />,
    },
    {
      path: 'edit/:ingredientId',
      element: <IngredientItem />,
    },
  ],
};

const DashWorkouts: RouteObject = {
  path: 'workouts',
  children: [
    {
      index: true,
      element: <WorkoutList />,
    },
    {
      path: 'add',
      element: <AddWorkout />,
    },
    {
      path: ':workoutId',
      element: <WorkoutItem />,
    },
    {
      path: 'edit/:workoutId',
      element: <WorkoutItem />,
    },
  ],
};

const DashExercises: RouteObject = {
  path: 'exercises',
  children: [
    {
      index: true,
      element: <ExerciseList />,
    },
    {
      path: 'add',
      element: <AddExercise />,
    },
    {
      path: ':exerciseId',
      element: <ExerciseItem />,
    },
    {
      path: 'edit/:exerciseId',
      element: <ExerciseItem />,
    },
  ],
};

const DashCategories: RouteObject = {
  path: 'categories',
  children: [
    {
      index: true,
      element: <CategoryList />,
    },
    {
      path: 'add',
      element: <AddCategory />,
    },
    {
      path: ':categoryId',
      element: <CategoryItem />,
    },
    {
      path: 'edit/:categoryId',
      element: <CategoryItem />,
    },
  ],
};

const DashRoutes: RouteObject = {
  path: 'dash',
  element: <Dashboard />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <Navigate to={paths.dash.recipes.list} />,
    },
    DashRecipes,
    DashCategories,
    DashIngredients,
    DashExercises,
    DashWorkouts,
  ],
};

export default DashRoutes;

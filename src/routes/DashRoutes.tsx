import { Navigate, RouteObject } from 'react-router-dom';
import Dashboard from '@/components/dash/Dashboard';
import AddCategory from '@/features/category/dash/AddCategory';
import CategoryItem from '@/features/category/dash/CategoryItem';
import CategoryList from '@/features/category/dash/CategoryList';
import AddExercise from '@/features/exercise/dash/AddExercise';
import ExerciseItem from '@/features/exercise/dash/ExerciseItem';
import ExerciseList from '@/features/exercise/dash/ExerciseList';
import AddIngredient from '@/features/ingredient/dash/AddIngredient';
import IngredientItem from '@/features/ingredient/dash/IngredientItem';
import IngredientList from '@/features/ingredient/dash/IngredientList';
import AddRecipe from '@/features/recipe/dash/AddRecipe';
import RecipeItem from '@/features/recipe/dash/RecipeItem';
import DashRecipeList from '@/features/recipe/dash/DashRecipeList';
import AddWorkout from '@/features/workout/dash/AddWorkout';
import WorkoutItem from '@/features/workout/dash/WorkoutItem';
import WorkoutList from '@/features/workout/dash/WorkoutList';
import ErrorPage from '@/pages/ErrorPage';
import paths from './paths';

const DashRecipes: RouteObject = {
  path: 'recipes',
  children: [
    {
      index: true,
      element: <DashRecipeList />,
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

import { Navigate, RouteObject } from 'react-router-dom';
import Dashboard from '@/components/dashboard/Dashboard';
import AddCategory from '@/features/category/dashboard/AddCategory';
import CategoryItem from '@/features/category/dashboard/CategoryItem';
import CategoryList from '@/features/category/dashboard/CategoryList';
import AddExercise from '@/features/exercise/dashboard/AddExercise';
import ExerciseItem from '@/features/exercise/dashboard/ExerciseItem';
import ExerciseList from '@/features/exercise/dashboard/ExerciseList';
import AddIngredient from '@/features/ingredient/dashbaord/AddIngredient';
import IngredientItem from '@/features/ingredient/dashbaord/IngredientItem';
import IngredientList from '@/features/ingredient/dashbaord/IngredientList';
import AddRecipe from '@/features/recipe/dashboard/AddRecipe';
import RecipeItem from '@/features/recipe/dashboard/RecipeItem';
import RecipeList from '@/features/recipe/dashboard/RecipeList';
import AddWorkout from '@/features/workout/dashboard/AddWorkout';
import WorkoutItem from '@/features/workout/dashboard/WorkoutItem';
import WorkoutList from '@/features/workout/dashboard/WorkoutList';
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

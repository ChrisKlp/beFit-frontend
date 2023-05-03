import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Dashboard from '@/components/dashboard/Dashboard';
import AddCategory from '@/features/category/AddCategory';
import CategoryList from '@/features/category/CategoryList';
import ExerciseList from '@/features/exercise/ExerciseList';
import IngredientItem from '@/features/ingredient/IngredientItem';
import IngredientList from '@/features/ingredient/IngredientList';
import RecipeItem from '@/features/recipe/RecipeItem';
import RecipeList from '@/features/recipe/RecipeList';
import AddWorkout from '@/features/workout/AddWorkout';
import WorkoutList from '@/features/workout/WorkoutList';
import ErrorPage from '@/pages/ErrorPage';
import CategoryItem from './features/category/CategoryItem';
import AddExercise from './features/exercise/AddExercise';
import ExerciseItem from './features/exercise/ExerciseItem';
import AddIngredient from './features/ingredient/AddIngredient';
import AddRecipe from './features/recipe/AddRecipe';
import WorkoutItem from './features/workout/WorkoutItem';
import LoginPage from './pages/LoginPage';

export const paths = {
  dash: {
    recipes: {
      list: '/dash/recipes',
      add: '/dash/recipes/add',
      item: (id: string) => `/dash/recipes/${id}`,
      edit: (id: string) => `/dash/recipes/edit/${id}`,
    },
    categories: {
      list: '/dash/categories',
      add: '/dash/categories/add',
      item: (id: string) => `/dash/categories/${id}`,
      edit: (id: string) => `/dash/categories/edit/${id}`,
    },
    ingredients: {
      list: '/dash/ingredients',
      add: '/dash/ingredients/add',
      item: (id: string) => `/dash/ingredients/${id}`,
      edit: (id: string) => `/dash/ingredients/edit/${id}`,
    },
    exercises: {
      list: '/dash/exercises',
      add: '/dash/exercises/add',
      item: (id: string) => `/dash/exercises/${id}`,
      edit: (id: string) => `/dash/exercises/edit/${id}`,
    },
    workouts: {
      list: '/dash/workouts',
      add: '/dash/workouts/add',
      item: (id: string) => `/dash/workouts/${id}`,
      edit: (id: string) => `/dash/workouts/edit/${id}`,
    },
  },
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="login" />} />
      <Route
        path="login"
        element={<LoginPage />}
        errorElement={<ErrorPage />}
      />
      <Route path="dash" element={<Dashboard />} errorElement={<ErrorPage />}>
        <Route index element={<Navigate to={paths.dash.recipes.list} />} />
        <Route path="recipes">
          <Route index element={<RecipeList />} />
          <Route path="add" element={<AddRecipe />} />
          <Route path=":recipeId" element={<RecipeItem />} />
          <Route path="edit/:recipeId" element={<RecipeItem />} />
        </Route>
        <Route path="categories">
          <Route index element={<CategoryList />} />
          <Route path="add" element={<AddCategory />} />
          <Route path=":categoryId" element={<CategoryItem />} />
          <Route path="edit/:categoryId" element={<CategoryItem />} />
        </Route>
        <Route path="ingredients">
          <Route index element={<IngredientList />} />
          <Route path="add" element={<AddIngredient />} />
          <Route path=":ingredientId" element={<IngredientItem />} />
          <Route path="edit/:ingredientId" element={<IngredientItem />} />
        </Route>
        <Route path="exercises">
          <Route index element={<ExerciseList />} />
          <Route path="add" element={<AddExercise />} />
          <Route path=":exerciseId" element={<ExerciseItem />} />
          <Route path="edit/:exerciseId" element={<ExerciseItem />} />
        </Route>
        <Route path="workouts">
          <Route index element={<WorkoutList />} />
          <Route path="add" element={<AddWorkout />} />
          <Route path=":workoutId" element={<WorkoutItem />} />
          <Route path="edit/:workoutId" element={<WorkoutItem />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;

import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from '@/components/Dashboard/Dashboard';
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
import WorkoutItem from './features/workout/WorkoutItem';
import AddRecipe from './features/recipe/AddRecipe';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to="/recipes" />} />
      <Route path="/recipes">
        <Route index element={<RecipeList />} />
        <Route path="add" element={<AddRecipe />} />
        <Route path=":recipeId" element={<RecipeItem />} />
        <Route path="edit/:recipeId" element={<RecipeItem />} />
      </Route>
      <Route path="/categories">
        <Route index element={<CategoryList />} />
        <Route path="add" element={<AddCategory />} />
        <Route path=":categoryId" element={<CategoryItem />} />
        <Route path="edit/:categoryId" element={<CategoryItem />} />
      </Route>
      <Route path="/ingredients">
        <Route index element={<IngredientList />} />
        <Route path="add" element={<AddIngredient />} />
        <Route path=":ingredientId" element={<IngredientItem />} />
        <Route path="edit/:ingredientId" element={<IngredientItem />} />
      </Route>
      <Route path="/exercises">
        <Route index element={<ExerciseList />} />
        <Route path="add" element={<AddExercise />} />
        <Route path=":exerciseId" element={<ExerciseItem />} />
        <Route path="edit/:exerciseId" element={<ExerciseItem />} />
      </Route>
      <Route path="/workouts">
        <Route index element={<WorkoutList />} />
        <Route path="add" element={<AddWorkout />} />
        <Route path=":workoutId" element={<WorkoutItem />} />
        <Route path="edit/:workoutId" element={<WorkoutItem />} />
      </Route>
    </Route>
  )
);

export default router;

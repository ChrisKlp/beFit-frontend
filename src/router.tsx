import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './components/Dashboard/Dashboard';
import IngredientItem from './features/ingredient/IngredientItem';
import IngredientList from './features/ingredient/IngredientList';
import RecipeItem from './features/recipe/RecipeItem';
import RecipeList from './features/recipe/RecipeList';
import ErrorPage from './pages/ErrorPage';
import CategoryList from './features/category/CategoryList';
import ExerciseList from './features/exercise/ExerciseList';
import WorkoutList from './features/workout/WorkoutList';
import EditCategory from './features/category/EditCategory';
import AddCategory from './features/category/AddCategory';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to="/recipes" />} />
      <Route path="/recipes">
        <Route index element={<RecipeList />} />
        <Route path=":recipeId" element={<RecipeItem />} />
      </Route>
      <Route path="/categories">
        <Route index element={<CategoryList />} />
        <Route path="add" element={<AddCategory />} />
        <Route path="edit/:categoryId" element={<EditCategory />} />
      </Route>
      <Route path="/ingredients">
        <Route index element={<IngredientList />} />
        <Route path=":ingredientId" element={<IngredientItem />} />
      </Route>
      <Route path="/exercises">
        <Route index element={<ExerciseList />} />
      </Route>
      <Route path="/workouts">
        <Route index element={<WorkoutList />} />
      </Route>
    </Route>
  )
);

export default router;

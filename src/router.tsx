import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './components/Layout';
import RecipeItem from './features/recipe/RecipeItem';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/recipes">
        <Route index element={<Navigate to="/" />} />
        <Route path=":recipeId" element={<RecipeItem />} />
      </Route>
    </Route>
  )
);

export default router;

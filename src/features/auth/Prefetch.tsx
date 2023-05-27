/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { recipesApiSlice } from '../recipe/recipesApiSlice';
import { ingredientsApiSlice } from '../ingredient/ingredientsApiSlice';
import { categoriesApiSlice } from '../category/categoriesApiSlice';

export default function Prefetch() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      recipesApiSlice.util.prefetch('getRecipes', undefined, { force: true })
    );
    dispatch(
      ingredientsApiSlice.util.prefetch('getIngredients', undefined, {
        force: true,
      })
    );
    dispatch(
      categoriesApiSlice.util.prefetch('getCategories', undefined, {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
}

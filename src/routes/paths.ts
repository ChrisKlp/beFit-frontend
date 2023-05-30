import { EntityId } from '@reduxjs/toolkit';

export default {
  home: '/menu',
  recipes: {
    list: '/recipes',
    item: (id: string | EntityId) => `/recipe/${id}`,
  },
  shopList: '/shop-list',
  dash: {
    recipes: {
      list: '/dash/recipes',
      add: '/dash/recipes/add',
    },
    categories: {
      list: '/dash/categories',
      add: '/dash/categories/add',
    },
    ingredients: {
      list: '/dash/ingredients',
      add: '/dash/ingredients/add',
    },
    exercises: {
      list: '/dash/exercises',
      add: '/dash/exercises/add',
    },
    workouts: {
      list: '/dash/workouts',
      add: '/dash/workouts/add',
    },
  },
};

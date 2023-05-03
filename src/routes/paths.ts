export default {
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

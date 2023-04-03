export type TRecipe = {
  _id: string;
  title: string;
  categories: {
    _id: string;
    name: string;
  }[];
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  instructions: string[];
  ingredients: {
    ingredient: {
      _id: string;
      name: string;
      unitWeight: number;
    };
    quantity: number;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

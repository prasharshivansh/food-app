import { getMeals, Meal } from '../lib/data';
import RecipesList from './RecipesList';

export default async function Recipes({ query }: { query: string | undefined }) {
  const meals = await getMeals(query);
  return <RecipesList meals={meals} />;
}

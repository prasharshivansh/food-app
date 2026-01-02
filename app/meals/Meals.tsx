import { getMeals } from '../lib/data';
import MealsPageClient from './MealsPageClient';

export default async function Meals({ query }: { query: string | undefined }) {
  const meals = await getMeals(query);
  return <MealsPageClient meals={meals} />;
}

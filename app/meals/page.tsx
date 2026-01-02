
import MealsPageClient from './MealsPageClient';
import db from '../lib/db';

interface Meal {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

async function getMeals(): Promise<Meal[]> {
  // Add a delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));

  const stmt = db.prepare('SELECT * FROM recipes');
  
  const meals = stmt.all() as Meal[];
  
  return meals;
}

export default async function MealsPage() {
  const meals = await getMeals();

  return (
    <MealsPageClient meals={meals} />
  );
}

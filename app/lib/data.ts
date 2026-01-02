import db from './db';

export interface Meal {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export async function getMeals(query: string | undefined): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  let stmt = db.prepare('SELECT * FROM recipes');

  if (query) {
    stmt = db.prepare('SELECT * FROM recipes WHERE title LIKE ?');
    const meals = stmt.all(`%${query}%`) as Meal[];
    return meals;
  }
  const meals = stmt.all() as Meal[];
  return meals;
}

export function getMeal(slug: string): Meal {
  const stmt = db.prepare('SELECT * FROM recipes WHERE slug = ?');
  const meal = stmt.get(slug) as Meal;
  return meal;
}
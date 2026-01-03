'use server';

import { redirect } from 'next/navigation';
import db from '../lib/db';
import { writeFile } from 'fs/promises';
import xss from 'xss';
import { generateSlug } from '../lib/db';


interface Meal {
  title: string;
  image: File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}


export async function saveMeal(formData: FormData) {
  const meal: Meal = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    creator: formData.get('creator') as string,
    creator_email: formData.get('creator_email') as string,
    image: formData.get('image') as File,
  };

  if (
    !meal.title ||
    !meal.summary ||
    !meal.instructions ||
    !meal.creator ||
    !meal.creator_email ||
    !meal.image ||
    meal.image.size === 0
  ) {
    throw new Error('Invalid input');
  }

  const extension = meal.image.name.split('.').pop();
  const fileName = `${generateSlug(meal.title)}-${Math.random()}.${extension}`;

  const stream = Buffer.from(await meal.image.arrayBuffer());
  await writeFile(`public/images/${fileName}`, stream);

  const newMeal = {
    ...meal,
    slug: generateSlug(meal.title),
    image: `/images/${fileName}`,
    instructions: xss(meal.instructions), // Sanitize instructions
  };

  const stmt = db.prepare(`
    INSERT INTO recipes (title, slug, image, summary, instructions, creator, creator_email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    newMeal.title,
    newMeal.slug,
    newMeal.image,
    newMeal.summary,
    newMeal.instructions,
    newMeal.creator,
    newMeal.creator_email
  );

  redirect('/meals');
}

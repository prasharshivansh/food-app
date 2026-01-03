'use server';

import { redirect } from 'next/navigation';
import db from '../lib/db';
import { writeFile } from 'fs/promises';
import xss from 'xss';
import { generateSlug } from '../lib/db';
import { revalidatePath } from 'next/cache';


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

  const errors: { [key: string]: string } = {};

  if (!meal.title || meal.title.trim() === '' || meal.title.length > 100) {
    errors.title = "Please provide a valid meal title (max 100 characters).";
  }

  if (!meal.summary || meal.summary.trim() === '' || meal.summary.length > 200) {
    errors.summary = "Please provide a short summary (max 200 characters).";
  }

  if (!meal.instructions || meal.instructions.trim() === '' || meal.instructions.length < 20) {
    errors.instructions = "Please provide detailed cooking instructions.";
  }

  if (!meal.image || meal.image.size === 0 || meal.image.size > 5 * 1024 * 1024 || (meal.image.type !== 'image/png' && meal.image.type !== 'image/jpeg')) {
    errors.image = "Please upload a valid image (PNG/JPEG, under 5MB).";
  }

  if (!meal.creator || meal.creator.trim() === '') {
    errors.creator = "Please enter your name.";
  }

  if (!meal.creator_email || !meal.creator_email.includes('@') || !meal.creator_email.includes('.')) {
    errors.creator_email = "Please enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: 'Missing or invalid fields',
      errors,
    };
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
  revalidatePath('/meals');
  redirect('/meals');
}

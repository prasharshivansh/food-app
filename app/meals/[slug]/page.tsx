import Image from 'next/image';
import { notFound } from 'next/navigation';
import classes from './page.module.css';

import db from '../../lib/db';

function formatInstructions(text: string) {
  return text.split('\n').map((line, index) => (
    <div key={index}>{line}</div>
  ));
}

interface Meal {
  image: string;
  title: string;
  creator_email: string;
  creator: string;
  summary: string;
  instructions: string;
}

async function getMeal(slug: string): Promise<Meal | undefined> {
  const stmt = db.prepare('SELECT * FROM recipes WHERE slug = ?');
  const meal = stmt.get(slug) as Meal | undefined;
  return meal;
}

export default async function MealDetailsPage({ params }: { params: { slug: string } }) {
  const awaitedParams = await params;
  const meal = await getMeal(awaitedParams.slug);

  if (!meal) {
    notFound();
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <div className={classes.instructions}>
          {formatInstructions(meal.instructions)}
        </div>
      </main>
    </>
  );
}
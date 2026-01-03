import Image from "next/image";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import db from "../../lib/db";
import { Metadata } from "next";

// Improved instruction parsing
function formatInstructions(text: string) {
  // 1. Try splitting by newline first
  let steps = text.split("\n").filter((step) => step.trim() !== "");

  // 2. If that didn't result in multiple steps, try splitting by "Number dot" pattern (e.g. "1. ", "2. ")
  if (steps.length === 1) {
    // This regex looks for a digit followed by a dot, effectively splitting the text
    const splitByNumber = text
      .split(/\d+\.\s+/)
      .filter((step) => step.trim() !== "");
    if (splitByNumber.length > 1) {
      steps = splitByNumber;
    }
  }

  return steps.map((step, index) => (
    <div key={index} className={classes.instructionCard}>
      <div className={classes.stepNumber}>{index + 1}</div>
      <p className={classes.stepText}>{step}</p>
    </div>
  ));
}

interface Meal {
  image: string;
  title: string;
  creator_email: string;
  creator: string;
  summary: string;
  instructions: string;
  slug: string;
}

async function getMeal(slug: string): Promise<Meal | undefined> {
  const stmt = db.prepare("SELECT * FROM recipes WHERE slug = ?");
  // Add a delay to simulate loading if you want to test loading states
  // await new Promise(resolve => setTimeout(resolve, 2000));
  return stmt.get(slug) as Meal | undefined;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const awaitedParams = await params;
  const meal = await getMeal(awaitedParams.slug);

  if (!meal) {
    return {
      title: "Meal Not Found",
      description: "This meal does not exist or could not be found.",
    };
  }

  return {
    title: meal.title,
    description: meal.summary,
    openGraph: {
      images: [meal.image],
    },
  };
}

export default async function MealDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const awaitedParams = await params;
  const meal = await getMeal(awaitedParams.slug);

  if (!meal) {
    notFound();
  }

  return (
    <div className={classes.container}>
      <header className={classes.hero}>
        <div className={classes.imageWrapper}>
          <Image
            src={meal.image}
            alt={meal.title}
            fill
            className={classes.recipeImage}
            priority // Load this image immediately as it's above the fold
          />
        </div>

        <div className={classes.headerText}>
          <h1 className={classes.title}>{meal.title}</h1>

          <div className={classes.creator}>
            <span>Created by</span>
            <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </div>

          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main className={classes.instructionsSection}>
        <h2 className={classes.sectionTitle}>Instructions</h2>
        <div className={classes.instructionsList}>
          {formatInstructions(meal.instructions)}
        </div>
      </main>
    </div>
  );
}

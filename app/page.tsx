import { Suspense } from 'react';
import HomePageClient from './HomePageClient';
import Recipes from './components/Recipes';
import Loading from './loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Orange Feast - Recipes & Culinary Adventures",
  description: "Discover delicious recipes and culinary adventures with Orange Feast. Find your next favorite meal from our collection of popular and diverse recipes.",
  openGraph: {
    images: ['https://www.indianhealthyrecipes.com/wp-content/uploads/2023/07/paneer-butter-masala-recipe.jpg'],
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;

  return (
    <HomePageClient>
      <Suspense fallback={<Loading />}>
        <Recipes query={query} />
      </Suspense>
    </HomePageClient>
  );
}
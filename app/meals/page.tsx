import { Suspense } from 'react';
import Loading from '../loading';
import Meals from './Meals';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All Meals - Orange Feast",
  description: "Browse all the delicious meals available on Orange Feast. Find your next favorite recipe!",
};

export default async function MealsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;

  return (
    <Suspense fallback={<Loading />}>
      <Meals query={query} />
    </Suspense>
  );
}

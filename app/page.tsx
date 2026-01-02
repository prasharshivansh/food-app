import { Suspense } from 'react';
import HomePageClient from './HomePageClient';
import Recipes from './components/Recipes';
import Loading from './loading';

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
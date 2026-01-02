import { Suspense } from 'react';
import Loading from '../loading';
import Meals from './Meals';

export default function MealsPage({
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

import classes from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={classes['not-found']}>
      <h1>Meal Not Found</h1>
      <p>Unfortunately, we could not find the requested page or meal data.</p>
    </main>
  );
}

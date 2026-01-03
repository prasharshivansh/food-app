'use client';

import Link from 'next/link';

export default function NotFound() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main className="not-found">
      <h1>Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <p>
        Go back to{' '}
        <Link href="/" className="link">
          Home
        </Link>
      </p>
      <button onClick={handleRefresh} className="discover-btn">
        Refresh Page
      </button>
    </main>
  );
}

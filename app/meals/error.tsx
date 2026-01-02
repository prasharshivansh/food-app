"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-10 font-sans text-center text-white">
      <h1 className="mb-2.5 text-4xl text-orange-500">
        An error occurred!
      </h1>
      <p className="mx-auto mb-5 max-w-xl text-gray-300">
        Failed to fetch meal data. Please try again later.
      </p>
      <p className="mx-auto mb-8 max-w-xl text-red-500">
        Error: {error.message}
      </p>
      <button
        onClick={reset}
        className="cursor-pointer rounded-lg border-none bg-orange-500 px-7 py-3 font-semibold text-gray-900 shadow-lg transition-colors duration-200"
      >
        Try again
      </button>
    </main>
  );
}
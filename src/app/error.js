"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Error caught by Global Error Boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 text-center">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <p className="mt-4 text-lg">{error?.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}

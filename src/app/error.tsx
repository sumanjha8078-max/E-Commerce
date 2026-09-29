"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
      <p className="text-gray-500 mt-2">We encountered an unexpected error.</p>
      <button onClick={() => reset()} className="mt-6 px-6 py-2 bg-black text-white rounded-full font-medium">Try again</button>
    </div>
  );
}

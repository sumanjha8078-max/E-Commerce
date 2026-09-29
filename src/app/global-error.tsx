"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-2xl font-bold text-red-500">Critical Error!</h2>
          <button onClick={() => reset()} className="mt-6 px-6 py-2 bg-black text-white rounded-full font-medium">Try again</button>
        </div>
      </body>
    </html>
  );
}

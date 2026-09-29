export default function DemoDataBadge() {
  const isDemo = process.env.NEXT_PUBLIC_DATA_MODE !== 'live';
  if (!isDemo) return null;
  return (
    <div className="bg-yellow-400 text-black text-xs font-bold py-1 px-3 flex items-center justify-center text-center z-[100]" aria-label="Demo data active">
      Demo mode: Prices and products shown are illustrative, not real-time live data.
    </div>
  );
}

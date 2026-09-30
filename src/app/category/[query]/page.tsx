import ProductCard from "@/components/ProductCard";

export default async function CategoryPage({ params }: { params: Promise<{ query: string }> }) {
  const resolvedParams = await params;
  const decodedQuery = decodeURIComponent(resolvedParams.query);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h1 className="text-4xl font-black text-black dark:text-white capitalize">
          {decodedQuery.replace(/-/g, ' ')} Deals
        </h1>
        <p className="text-gray-500 mt-2">Showing all live aggregated price drops for this category.</p>
      </div>
      
      {/* We reuse ProductCard but tell it to show many more items */}
      <ProductCard 
        title="" 
        defaultQuery={decodedQuery} 
        hideSearch={true}
        limit={20}
      />
    </div>
  );
}

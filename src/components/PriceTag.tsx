import { formatCurrency } from '@/utils/formatCurrency';
import { Product } from '@/types';
import { computeBestDiscount } from '@/lib/score';

export default function PriceTag({ product, className = "" }: { product: Product, className?: string }) {
  const { maxDiscountPct, savings, bestOffer } = computeBestDiscount(product);
  
  if (!bestOffer) return null;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-xl font-black text-black dark:text-white" aria-label={`Sale price ${formatCurrency(bestOffer.price)}`}>
          {formatCurrency(bestOffer.price)}
        </span>
        {maxDiscountPct > 0 && (
          <span className="text-xs font-bold bg-[#ff2d3d]/10 text-[#ff2d3d] px-2 py-1 rounded-md" aria-label={`${maxDiscountPct} percent off`}>
            -{maxDiscountPct}% OFF
          </span>
        )}
      </div>
      {maxDiscountPct > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400 line-through" aria-label={`Original MRP ${formatCurrency(bestOffer.originalPrice)}`}>
            MRP: {formatCurrency(bestOffer.originalPrice)}
          </span>
          <span className="text-green-600 dark:text-green-400 font-medium">
            You save {formatCurrency(savings)}
          </span>
        </div>
      )}
    </div>
  );
}

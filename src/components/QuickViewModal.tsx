"use client";

import { useStore } from "../store/useStore";
import { formatCurrency } from "../utils/formatCurrency";
import { FaTimes, FaHeart, FaRegHeart, FaExternalLinkAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import toast from "react-hot-toast";

const getVendorColors = (vendorName: string) => {
  const normalized = vendorName.toLowerCase();
  if (normalized.includes('amazon')) return { bg: 'bg-[#FF9900]/10', text: 'text-[#FF9900]', border: 'border-[#FF9900]', mainBg: 'bg-[#232F3E]', mainText: 'text-white' };
  if (normalized.includes('flipkart')) return { bg: 'bg-[#2874F0]/10', text: 'text-[#2874F0]', border: 'border-[#2874F0]', mainBg: 'bg-[#2874F0]', mainText: 'text-[#FFE11B]' };
  if (normalized.includes('myntra')) return { bg: 'bg-[#FF3F6C]/10', text: 'text-[#FF3F6C]', border: 'border-[#FF3F6C]', mainBg: 'bg-[#FF3F6C]', mainText: 'text-white' };
  if (normalized.includes('jiomart')) return { bg: 'bg-[#008CCF]/10', text: 'text-[#008CCF]', border: 'border-[#008CCF]', mainBg: 'bg-[#008CCF]', mainText: 'text-white' };
  if (normalized.includes('tatacliq')) return { bg: 'bg-black/10 dark:bg-white/10', text: 'text-black dark:text-white', border: 'border-black dark:border-white', mainBg: 'bg-black', mainText: 'text-white' };
  if (normalized.includes('croma')) return { bg: 'bg-[#00E9C5]/10', text: 'text-[#00E9C5]', border: 'border-[#00E9C5]', mainBg: 'bg-[#00E9C5]', mainText: 'text-black' };
  if (normalized.includes('reliance')) return { bg: 'bg-[#E42529]/10', text: 'text-[#E42529]', border: 'border-[#E42529]', mainBg: 'bg-[#E42529]', mainText: 'text-white' };
  if (normalized.includes('vijay')) return { bg: 'bg-[#DA251D]/10', text: 'text-[#DA251D]', border: 'border-[#DA251D]', mainBg: 'bg-[#DA251D]', mainText: 'text-white' };
  return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', mainBg: 'bg-gray-800', mainText: 'text-white' };
};

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, toggleWatchlist, watchlist } = useStore();

  if (!quickViewProduct) return null;

  const isTracked = watchlist.some(w => w.id === quickViewProduct.id);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
        onClick={(e) => {
           if (e.target === e.currentTarget) {
              setQuickViewProduct(null);
           }
        }}
      >
        <div
          className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-[#ff2d3d] transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>

          {/* Left: Product Info */}
          <div className="w-full md:w-2/5 bg-gray-50 dark:bg-gray-800/50 p-8 flex flex-col relative overflow-y-auto border-r border-gray-100 dark:border-gray-800">
             <div className="flex justify-between items-start w-full mb-6">
               <div className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                  GreedyScore: {quickViewProduct.greedyScore}/10
               </div>
               <button
                  onClick={() => {
                    toggleWatchlist(quickViewProduct);
                    toast.success(isTracked ? 'Removed from Watchlist' : 'Deal Alert Set!');
                  }}
                  className="bg-white dark:bg-gray-800 p-2.5 rounded-full shadow hover:scale-110 transition-transform cursor-pointer"
                >
                  {isTracked ? (
                    <FaHeart className="text-[#ff2d3d] text-lg" />
                  ) : (
                    <FaRegHeart className="text-gray-400 hover:text-[#ff2d3d] text-lg" />
                  )}
                </button>
             </div>
             
            <div className="flex-1 flex items-center justify-center min-h-[250px] mb-8">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-[300px] h-[300px] object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              />
            </div>
            
            <div>
               <span className="text-xs font-bold text-[#ff2d3d] uppercase tracking-wider mb-2 block">
                 {quickViewProduct.category}
               </span>
               <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-3">
                 {quickViewProduct.name}
               </h2>
               <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                 {quickViewProduct.description}
               </p>
            </div>
          </div>

          {/* Right: Price Comparison */}
          <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col overflow-y-auto bg-white dark:bg-gray-900">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Price Comparison <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500">{quickViewProduct.offers.length} stores</span>
            </h3>
            
            <div className="space-y-4">
               {quickViewProduct.offers.map((offer, index) => {
                  const isCheapest = index === 0;
                  const discount = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
                  const colors = getVendorColors(offer.vendorName);
                  
                  return (
                     <div 
                        key={offer.vendorName} 
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border-2 transition-all ${isCheapest ? `${colors.border} ${colors.bg}` : 'border-gray-100 dark:border-gray-800 bg-transparent'}`}
                     >
                        <div className="flex items-center gap-4 mb-3 sm:mb-0">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-sm ${colors.mainBg} ${colors.mainText}`}>
                              {offer.vendorName.charAt(0)}
                           </div>
                           <div>
                              <h4 className={`font-bold text-lg flex items-center gap-2 ${colors.text}`}>
                                 {offer.vendorName}
                                 {isCheapest && <span className="text-[10px] bg-[#ff2d3d] text-white px-2 py-0.5 rounded uppercase tracking-wider">Best Deal</span>}
                              </h4>
                              <div className="flex items-center gap-1 mt-1 text-xs font-medium">
                                 {offer.inStock ? (
                                    <span className="text-green-600 flex items-center gap-1"><FaCheckCircle/> In Stock</span>
                                 ) : (
                                    <span className="text-red-500 flex items-center gap-1"><FaExclamationCircle/> Out of Stock</span>
                                 )}
                                 <span className="text-gray-300 mx-1">•</span>
                                 <span className="text-gray-500">Delivers in {offer.deliveryDays} day(s)</span>
                              </div>
                           </div>
                        </div>
                        
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:gap-2 pl-16 sm:pl-0">
                           <div className="text-left sm:text-right">
                              <div className="text-2xl font-black text-gray-900 dark:text-white">
                                 {formatCurrency(offer.price)}
                              </div>
                              {discount > 0 && (
                                 <div className="text-xs text-gray-400 mt-0.5">
                                    <span className="line-through">{formatCurrency(offer.originalPrice)}</span>
                                    <span className="text-green-500 ml-2 font-bold">{discount}% off</span>
                                 </div>
                              )}
                           </div>
                           
                           {offer.inStock ? (
                              <a 
                                 href={offer.url}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className={`px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-50 cursor-pointer ${colors.mainBg} ${colors.mainText}`}
                              >
                                 Buy on {offer.vendorName} <FaExternalLinkAlt className="text-[10px]"/>
                              </a>
                           ) : (
                              <span 
                                 className={`px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-sm opacity-50 cursor-not-allowed ${colors.mainBg} ${colors.mainText}`}
                              >
                                 Out of Stock
                              </span>
                           )}
                        </div>
                     </div>
                  );
               })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
               <p className="text-xs text-gray-400">Prices are tracked continuously. Click &apos;View Deal&apos; to verify final pricing on the merchant&apos;s site.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

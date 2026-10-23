import React, { useState } from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { PlantProduct } from '../../types';
import { formatPrice, Currency } from '../../utils/format';

interface ProductCardProps {
  product: PlantProduct;
  currency?: Currency;
  onAddToCart: (product: PlantProduct) => void;
  onQuickView: (product: PlantProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency = 'IDR',
  onAddToCart,
  onQuickView,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col justify-between pt-16 pb-7 px-6 mt-14 rounded-[32px] bg-[#1F2D25]/60 hover:bg-[#1F2D25]/85 backdrop-blur-md border border-white/10 hover:border-[#7BC043]/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#7BC043]/10"
    >
      {/* Overflowing Plant Image popping out of card */}
      <div className="absolute -top-20 inset-x-0 flex justify-center pointer-events-none">
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow-[0_18px_20px_rgba(0,0,0,0.65)]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Spacer for plant offset */}
      <div className="h-24 sm:h-28" />

      {/* Product Information */}
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium tracking-wider uppercase text-[#7BC043]">
            {product.category}
          </span>
          {product.o2Level === 'Very High' && (
            <span className="text-[11px] text-[#9DB0A3] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7BC043]" />
              O₂ Max
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-medium text-[#E8EFE9] group-hover:text-white transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs sm:text-sm text-[#9DB0A3] line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Card Footer: Price & Add to Cart button */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/5">
        <div>
          <span className="text-xs text-[#9DB0A3] block -mb-0.5">Mulai dari</span>
          <span className="text-base sm:text-lg font-semibold text-[#E8EFE9] tracking-tight">
            {formatPrice(product.price, currency)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick View Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label={`Detail ${product.name}`}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#9DB0A3] hover:text-white border border-white/10 transition-colors"
          >
            <Eye size={16} />
          </button>

          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Tambah ${product.name} ke keranjang`}
            className={`p-2.5 rounded-2xl border transition-all duration-200 ${
              isAdded
                ? 'bg-[#7BC043] border-[#7BC043] text-black shadow-lg shadow-[#7BC043]/30'
                : 'bg-white/5 hover:bg-[#7BC043] text-[#E8EFE9] hover:text-black border-white/15 hover:border-[#7BC043]'
            }`}
          >
            {isAdded ? <Check size={18} strokeWidth={2.5} /> : <ShoppingBag size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ALL_PRODUCTS } from '../../data/plants';
import { PlantProduct } from '../../types';
import { formatPrice, Currency } from '../../utils/format';

interface TrendyPlantsSectionProps {
  onAddToCart: (product: PlantProduct) => void;
  onQuickView: (product: PlantProduct) => void;
  currency: Currency;
}

export const TrendyPlantsSection: React.FC<TrendyPlantsSectionProps> = ({
  onAddToCart,
  onQuickView,
  currency,
}) => {
  const plant1 = ALL_PRODUCTS.find(p => p.id === 'prod-trendy-1') || ALL_PRODUCTS[6];
  const plant2 = ALL_PRODUCTS.find(p => p.id === 'prod-trendy-2') || ALL_PRODUCTS[7];

  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: PlantProduct) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="trendy-plants" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with green brackets */}
        <SectionTitle id="trendy-title">Our Trendy plants</SectionTitle>

        {/* Two Large Horizontal Alternating Cards */}
        <div className="space-y-16 md:space-y-24 mt-12 md:mt-20">
          
          {/* Card 1: Image Left, Content Right */}
          <div className="relative rounded-[32px] bg-[#1F2D25]/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl overflow-visible p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Plant Image Left */}
              <div 
                onClick={() => onQuickView(plant1)}
                className="md:col-span-5 flex justify-center cursor-pointer group"
              >
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 -mt-14 md:-mt-20 md:-mb-12 transition-transform duration-500 ease-out group-hover:scale-105">
                  <img
                    src={plant1.imageUrl}
                    alt={plant1.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>

              {/* Text & Actions Right */}
              <div className="md:col-span-7 flex flex-col justify-center space-y-4 md:pl-6">
                <span className="text-xs font-semibold text-[#7BC043] tracking-widest uppercase">
                  Eksklusif Koleksi Ruang Tamu
                </span>

                <h3 
                  onClick={() => onQuickView(plant1)}
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#E8EFE9] hover:text-white cursor-pointer transition-colors"
                >
                  {plant1.name}
                </h3>

                <p className="text-sm sm:text-base text-[#9DB0A3] max-w-xl leading-relaxed">
                  {plant1.description}
                </p>

                <div className="pt-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#E8EFE9] tracking-tight">
                    {formatPrice(plant1.price, currency)}
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => onQuickView(plant1)}
                    className="px-8 py-3 rounded-full bg-transparent hover:bg-white/10 text-white font-medium text-sm border border-white/25 hover:border-white transition-all duration-200 cursor-pointer"
                  >
                    Explore
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAdd(plant1)}
                    aria-label={`Tambah ${plant1.name} ke keranjang`}
                    className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      addedId === plant1.id
                        ? 'bg-[#7BC043] border-[#7BC043] text-black shadow-lg shadow-[#7BC043]/30'
                        : 'bg-white/5 hover:bg-[#7BC043] text-[#E8EFE9] hover:text-black border-white/20 hover:border-[#7BC043]'
                    }`}
                  >
                    {addedId === plant1.id ? <Check size={20} strokeWidth={2.5} /> : <ShoppingBag size={20} />}
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Card 2: Content Left, Image Right (Reversed) */}
          <div className="relative rounded-[32px] bg-[#1F2D25]/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl overflow-visible p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Text & Actions Left */}
              <div className="order-2 md:order-1 md:col-span-7 flex flex-col justify-center space-y-4 md:pr-6">
                <span className="text-xs font-semibold text-[#7BC043] tracking-widest uppercase">
                  Koleksi Sukulen Meja Kerja
                </span>

                <h3 
                  onClick={() => onQuickView(plant2)}
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#E8EFE9] hover:text-white cursor-pointer transition-colors"
                >
                  {plant2.name}
                </h3>

                <p className="text-sm sm:text-base text-[#9DB0A3] max-w-xl leading-relaxed">
                  {plant2.description}
                </p>

                <div className="pt-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#E8EFE9] tracking-tight">
                    {formatPrice(plant2.price, currency)}
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => onQuickView(plant2)}
                    className="px-8 py-3 rounded-full bg-transparent hover:bg-white/10 text-white font-medium text-sm border border-white/25 hover:border-white transition-all duration-200 cursor-pointer"
                  >
                    Explore
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAdd(plant2)}
                    aria-label={`Tambah ${plant2.name} ke keranjang`}
                    className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      addedId === plant2.id
                        ? 'bg-[#7BC043] border-[#7BC043] text-black shadow-lg shadow-[#7BC043]/30'
                        : 'bg-white/5 hover:bg-[#7BC043] text-[#E8EFE9] hover:text-black border-white/20 hover:border-[#7BC043]'
                    }`}
                  >
                    {addedId === plant2.id ? <Check size={20} strokeWidth={2.5} /> : <ShoppingBag size={20} />}
                  </button>
                </div>

              </div>

              {/* Plant Image Right */}
              <div 
                onClick={() => onQuickView(plant2)}
                className="order-1 md:order-2 md:col-span-5 flex justify-center cursor-pointer group"
              >
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 -mt-14 md:-mt-20 md:-mb-12 transition-transform duration-500 ease-out group-hover:scale-105">
                  <img
                    src={plant2.imageUrl}
                    alt={plant2.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ProductCard } from '../product/ProductCard';
import { ALL_PRODUCTS } from '../../data/plants';
import { PlantProduct } from '../../types';
import { Currency } from '../../utils/format';

interface TopSellingSectionProps {
  onAddToCart: (product: PlantProduct) => void;
  onQuickView: (product: PlantProduct) => void;
  currency: Currency;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const TopSellingSection: React.FC<TopSellingSectionProps> = ({
  onAddToCart,
  onQuickView,
  currency,
  selectedCategory,
  onSelectCategory,
}) => {
  const topSellingBase = ALL_PRODUCTS.filter(p => p.isTopSeller);

  // Filter based on selected category if not 'all'
  const displayedProducts = selectedCategory === 'all'
    ? topSellingBase
    : ALL_PRODUCTS.filter(p => p.category === selectedCategory || (selectedCategory === 'Air Purifying' && p.isO2Plant));

  const filterTabs = [
    { label: 'Semua Terlaris', value: 'all' },
    { label: 'Tanaman Indoor', value: 'Indoor' },
    { label: 'Pemurni Udara (O₂)', value: 'Air Purifying' },
    { label: 'Kaktus & Sukulen', value: 'Succulents' },
  ];

  return (
    <section id="top-selling" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with green corner brackets */}
        <SectionTitle id="top-selling-title">Our Top Selling</SectionTitle>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 mb-12 sm:mb-16">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onSelectCategory(tab.value)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#7BC043] text-black font-semibold shadow-md shadow-[#7BC043]/20'
                    : 'bg-white/5 hover:bg-white/10 text-[#9DB0A3] hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3x2 Responsive Product Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 lg:gap-x-10 pt-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div className="text-center py-12 text-[#9DB0A3]">
            <p>Tidak ada tanaman dalam kategori ini saat ini.</p>
          </div>
        )}

      </div>
    </section>
  );
};

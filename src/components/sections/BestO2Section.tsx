import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Wind } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { O2_COLLECTION_SLIDES } from '../../data/plants';
import { PlantProduct } from '../../types';
import { formatPrice, Currency } from '../../utils/format';

interface BestO2SectionProps {
  onAddToCart: (product: PlantProduct) => void;
  onQuickView: (product: PlantProduct) => void;
  currency: Currency;
}

export const BestO2Section: React.FC<BestO2SectionProps> = ({
  onAddToCart,
  onQuickView,
  currency,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const slides = O2_COLLECTION_SLIDES;
  const currentPlant = slides[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Format 01/04
  const formattedIndex = String(currentIdx + 1).padStart(2, '0');
  const totalSlides = String(slides.length).padStart(2, '0');

  return (
    <section id="best-o2" className="py-16 md:py-24 relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#7BC043]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title with green corner brackets */}
        <SectionTitle id="best-o2-title">Our Best O2</SectionTitle>

        {/* Big Showcase Carousel Card */}
        <div className="mt-12 md:mt-20">
          <div className="relative rounded-[32px] bg-[#1F2D25]/55 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-visible p-6 sm:p-10 lg:p-14">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Big Overflowing O2 Plant */}
              <div 
                onClick={() => onQuickView(currentPlant)}
                className="lg:col-span-5 flex justify-center cursor-pointer group"
              >
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 -mt-16 sm:-mt-24 lg:-mt-28 transition-transform duration-500 ease-out group-hover:scale-105">
                  <img
                    key={currentPlant.id}
                    src={currentPlant.imageUrl}
                    alt={currentPlant.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-300"
                  />
                </div>
              </div>

              {/* Right Column: Information, Explore & Pagination */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pl-6">
                
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7BC043]">
                    <Wind size={15} />
                    <span>NASA Clean Air Verified • 24h O₂ Producer</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#E8EFE9] leading-snug">
                    We Have Small And Best O2 Plants Collection's
                  </h3>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#9DB0A3] leading-relaxed">
                  <p>
                    {currentPlant.name} ({currentPlant.botanicalName}): {currentPlant.description}
                  </p>
                  <p className="text-xs sm:text-sm text-[#9DB0A3]/80">
                    Menghasilkan oksigen segar dan menyerap polutan udara hingga 87% dalam ruangan tertutup. Dirawat secara khusus dengan media tanam organik ramah rumah tangga.
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#E8EFE9] tracking-tight">
                    {formatPrice(currentPlant.price, currency)}
                  </span>
                  {currentPlant.originalPrice && (
                    <span className="text-sm text-[#9DB0A3] line-through">
                      {formatPrice(currentPlant.originalPrice, currency)}
                    </span>
                  )}
                </div>

                {/* Bottom Row: CTA Button & Pagination `< 01/04 >` */}
                <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/5">
                  
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onQuickView(currentPlant)}
                      className="px-8 py-3 rounded-full bg-transparent hover:bg-white/10 text-white font-medium text-sm border border-white/25 hover:border-white transition-all duration-200 cursor-pointer"
                    >
                      Explore
                    </button>

                    <button
                      type="button"
                      onClick={() => onAddToCart(currentPlant)}
                      className="px-5 py-3 rounded-full bg-[#7BC043] hover:bg-[#8ee04f] text-black font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-[#7BC043]/20"
                    >
                      <ShoppingBag size={16} />
                      <span>Beli Sekarang</span>
                    </button>
                  </div>

                  {/* Pagination Navigation matching `< 01/04 >` in mockup */}
                  <div className="flex items-center gap-3 text-sm text-[#E8EFE9] font-medium select-none">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Tanaman sebelumnya"
                      className="p-2 rounded-full hover:bg-white/10 text-[#9DB0A3] hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <span className="tabular-nums tracking-widest text-[#E8EFE9]">
                      {formattedIndex}/{totalSlides}
                    </span>

                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Tanaman berikutnya"
                      className="p-2 rounded-full hover:bg-white/10 text-[#9DB0A3] hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Carousel dots below the card */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Pindah ke slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIdx === idx
                    ? 'w-8 bg-[#7BC043]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

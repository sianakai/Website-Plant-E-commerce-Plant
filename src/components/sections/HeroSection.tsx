import React, { useState } from 'react';
import { Play, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { RatingStars } from '../ui/RatingStars';
import { HERO_TESTIMONIAL } from '../../data/reviews';
import { ALL_PRODUCTS } from '../../data/plants';
import { PlantProduct } from '../../types';
import { formatPrice, Currency } from '../../utils/format';

interface HeroSectionProps {
  onExplore: () => void;
  onLiveDemo: () => void;
  onAddToCart: (product: PlantProduct) => void;
  onQuickView: (product: PlantProduct) => void;
  currency: Currency;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onLiveDemo,
  onAddToCart,
  onQuickView,
  currency,
}) => {
  const featuredProduct = ALL_PRODUCTS.find(p => p.id === 'prod-hero-featured') || ALL_PRODUCTS[0];
  const [activeSlide, setActiveSlide] = useState(0);

  // Alternative featured slides for the hero card dots
  const heroSlides = [
    featuredProduct,
    ALL_PRODUCTS.find(p => p.id === 'prod-top-4') || ALL_PRODUCTS[1],
    ALL_PRODUCTS.find(p => p.id === 'prod-o2-1') || ALL_PRODUCTS[2],
  ];

  const currentProduct = heroSlides[activeSlide];

  return (
    <section id="home" className="relative pt-6 pb-20 md:pt-12 md:pb-28 overflow-hidden">
      
      {/* Background Ambience & Botanical Topiary Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[850px] md:h-[850px] bg-[#7BC043]/5 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Center Topiary Tree in Background for authentic Figma atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] lg:w-[560px] opacity-25 lg:opacity-35 pointer-events-none select-none filter blur-[1px]">
        <img 
          src="/plants/hero-topiary.png" 
          alt="Lush green botanical tree background" 
          className="w-full h-auto object-contain mx-auto"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">
          
          {/* Left Column: Headline, Description, CTAs, Floating Review */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10 space-y-7">
            
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#7BC043]">
                <Sparkles size={14} />
                Toko Tanaman Hias & Pemurni Udara No.1
              </span>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#E8EFE9] leading-[1.1] text-balance">
                Breathe Naturally
              </h1>

              <p className="text-base sm:text-lg text-[#9DB0A3] max-w-xl leading-relaxed">
                Hadirkan kesegaran alami ke dalam hunian Anda dengan koleksi tanaman hias premium penyaring racun udara dan penghasil oksigen murni setiap hari.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={onExplore}
                className="px-8 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white font-medium text-sm border border-white/30 hover:border-white transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore
              </button>

              <button
                type="button"
                onClick={onLiveDemo}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-full text-[#E8EFE9] hover:text-white font-medium text-sm transition-all duration-200 cursor-pointer"
              >
                <span className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#7BC043] flex items-center justify-center bg-white/5 group-hover:bg-[#7BC043]/20 transition-all">
                  <Play size={15} className="ml-0.5 fill-[#E8EFE9] group-hover:fill-[#7BC043] text-transparent transition-colors" />
                </span>
                <span>Live Demo...</span>
              </button>
            </div>

            {/* Floating Review Card on bottom left */}
            <div className="pt-4 sm:pt-6">
              <div className="max-w-xs sm:max-w-sm rounded-[24px] bg-[#1F2D25]/70 backdrop-blur-xl border border-white/10 p-4 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={HERO_TESTIMONIAL.avatar}
                    alt={HERO_TESTIMONIAL.author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#7BC043]/40"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#E8EFE9] capitalize leading-none">
                      {HERO_TESTIMONIAL.author}
                    </h4>
                    <div className="mt-1">
                      <RatingStars rating={HERO_TESTIMONIAL.rating} size={12} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#9DB0A3] leading-relaxed italic line-clamp-3">
                  "{HERO_TESTIMONIAL.comment}"
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Plant Glass Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center z-10 pt-10 sm:pt-14 lg:pt-0">
            <div className="relative w-full max-w-sm">
              
              {/* Outer Glass Card */}
              <div className="relative pt-20 pb-8 px-7 rounded-[32px] bg-[#1F2D25]/60 backdrop-blur-2xl border border-white/15 shadow-2xl transition-all duration-300 hover:border-[#7BC043]/30">
                
                {/* Overflowing Hero Plant Image */}
                <div 
                  onClick={() => onQuickView(currentProduct)}
                  className="absolute -top-24 sm:-top-28 inset-x-0 flex justify-center cursor-pointer group"
                >
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2">
                    <img
                      src={currentProduct.imageUrl}
                      alt={currentProduct.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                </div>

                {/* Spacing for overflowing plant */}
                <div className="h-32 sm:h-36" />

                {/* Text Content */}
                <div className="space-y-1">
                  <span className="text-xs font-medium text-[#9DB0A3] tracking-wide block">
                    Trendy House Plant
                  </span>

                  <div className="flex items-center justify-between">
                    <h3 
                      onClick={() => onQuickView(currentProduct)}
                      className="text-2xl font-semibold text-[#E8EFE9] hover:text-white cursor-pointer transition-colors"
                    >
                      {currentProduct.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() => onQuickView(currentProduct)}
                      className="p-1.5 rounded-full text-[#9DB0A3] hover:text-white hover:bg-white/10 transition-colors"
                      title="Lihat detail tanaman"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  <p className="text-xs text-[#9DB0A3] line-clamp-2 pt-1 pb-2">
                    {currentProduct.description}
                  </p>

                  <div className="flex items-baseline gap-2 pt-1 pb-4">
                    <span className="text-xl font-bold text-[#E8EFE9]">
                      {formatPrice(currentProduct.price, currency)}
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="text-xs text-[#9DB0A3] line-through">
                        {formatPrice(currentProduct.originalPrice, currency)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Buy Now Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onAddToCart(currentProduct)}
                    className="w-full py-3 px-6 rounded-full bg-transparent hover:bg-[#7BC043] text-white hover:text-black font-medium text-sm border border-white/25 hover:border-[#7BC043] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#7BC043]/20"
                  >
                    <ShoppingBag size={16} />
                    <span>Buy Now</span>
                  </button>
                </div>

              </div>

              {/* Carousel Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeSlide === idx 
                        ? 'w-7 bg-[#7BC043]' 
                        : 'w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

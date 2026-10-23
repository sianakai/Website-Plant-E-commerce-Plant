import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { RatingStars } from '../ui/RatingStars';
import { CUSTOMER_REVIEWS } from '../../data/reviews';

export const CustomerReviewSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 relative overflow-hidden">
      
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#7BC043]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title with green corner brackets */}
        <SectionTitle id="reviews-title">Customer Review</SectionTitle>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 md:mt-16">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="group flex flex-col justify-between p-7 sm:p-8 rounded-[32px] bg-[#1F2D25]/50 hover:bg-[#1F2D25]/70 backdrop-blur-xl border border-white/10 hover:border-[#7BC043]/30 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* User Profile Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-[#7BC043]/50 transition-all"
                    />
                    <span 
                      title="Pembeli Terverifikasi"
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#7BC043] flex items-center justify-center text-[9px] text-black font-bold"
                    >
                      ✓
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#E8EFE9] group-hover:text-white transition-colors">
                      {review.author}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <RatingStars rating={review.rating} size={14} />
                    </div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-[#9DB0A3] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Bottom metadata */}
              <div className="flex items-center justify-between pt-5 mt-6 border-t border-white/5 text-[11px] text-[#9DB0A3]/80">
                <span>{review.location}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

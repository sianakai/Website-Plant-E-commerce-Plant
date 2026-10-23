import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  max = 5, 
  size = 14, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-1 text-[#FBBF24] ${className}`}>
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index + 1 <= rating;
        return (
          <Star 
            key={index} 
            size={size} 
            className={`${isFilled ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-gray-500 fill-none'}`} 
          />
        );
      })}
    </div>
  );
};

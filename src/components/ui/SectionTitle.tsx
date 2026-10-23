import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = '', id }) => {
  return (
    <div id={id} className={`flex items-center justify-center my-10 md:my-14 ${className}`}>
      <div className="relative inline-block px-7 py-3">
        {/* Top-left green corner bracket */}
        <span 
          aria-hidden="true"
          className="absolute top-0 left-0 w-5 h-5 border-t-[2.5px] border-l-[2.5px] border-[#7BC043] rounded-tl-sm pointer-events-none" 
        />
        
        {/* Title Text */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#E8EFE9] text-center select-none">
          {children}
        </h2>

        {/* Bottom-right green corner bracket */}
        <span 
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-5 h-5 border-b-[2.5px] border-r-[2.5px] border-[#7BC043] rounded-br-sm pointer-events-none" 
        />
      </div>
    </div>
  );
};

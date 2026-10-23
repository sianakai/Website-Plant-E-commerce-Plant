import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { Currency } from '../../utils/format';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenLiveDemo: () => void;
  onSelectCategory: (category: string) => void;
  currency: Currency;
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenLiveDemo,
  onSelectCategory,
  currency,
  onToggleCurrency,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlantsDropdownOpen, setIsPlantsDropdownOpen] = useState(false);

  const plantTypes = [
    { label: 'Semua Koleksi', category: 'all' },
    { label: 'O₂ Air Purifying Plants', category: 'Air Purifying' },
    { label: 'Indoor Living Plants', category: 'Indoor' },
    { label: 'Succulents & Cactus', category: 'Succulents' },
    { label: 'Trendy Designer Plants', category: 'Trendy' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#14201A]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-[#E8EFE9] hover:opacity-90 transition-opacity shrink-0"
          >
            {/* Custom Leaf Icon */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(123,192,67,0.4)]">
                <path 
                  d="M16 3C11 9 6 15 6 22C6 26.4 9.6 30 14 30C14.7 30 15.4 29.9 16 29.8C16.6 29.9 17.3 30 18 30C22.4 30 26 26.4 26 22C26 15 21 9 16 3Z" 
                  fill="#7BC043" 
                />
                <path 
                  d="M16 8V27M16 15L21 11M16 20L22 17M16 17L11 13M16 22L10 19" 
                  stroke="#14201A" 
                  strokeWidth="1.8" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>
            <span className="font-semibold text-2xl">Planto<span className="text-[#7BC043]">.</span></span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium text-[#E8EFE9]/85">
            <a 
              href="#home" 
              className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7BC043] after:scale-x-100"
            >
              Home
            </a>

            {/* Plants Type Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPlantsDropdownOpen(true)}
              onMouseLeave={() => setIsPlantsDropdownOpen(false)}
            >
              <button 
                type="button"
                className="flex items-center gap-1.5 py-2 hover:text-white transition-colors cursor-pointer"
                onClick={() => setIsPlantsDropdownOpen(!isPlantsDropdownOpen)}
              >
                Plants Type
                <ChevronDown size={15} className={`transition-transform duration-200 ${isPlantsDropdownOpen ? 'rotate-180 text-[#7BC043]' : ''}`} />
              </button>

              {isPlantsDropdownOpen && (
                <div className="absolute top-full -left-4 w-56 py-2 rounded-2xl bg-[#1F2D25] border border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {plantTypes.map((item) => (
                    <button
                      key={item.category}
                      type="button"
                      onClick={() => {
                        onSelectCategory(item.category);
                        setIsPlantsDropdownOpen(false);
                        const el = document.getElementById('top-selling');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#E8EFE9]/80 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      {item.category === 'Air Purifying' && (
                        <span className="text-[10px] bg-[#7BC043]/20 text-[#7BC043] px-1.5 py-0.5 rounded font-medium">O₂</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a 
              href="#trendy-plants" 
              className="hover:text-white transition-colors"
            >
              Trendy
            </a>

            <a 
              href="#best-o2" 
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              Best O₂
              <span className="w-1.5 h-1.5 rounded-full bg-[#7BC043] inline-block" />
            </a>

            <a 
              href="#reviews" 
              className="hover:text-white transition-colors"
            >
              Reviews
            </a>

            <a 
              href="#footer" 
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Currency Switcher */}
            <button
              type="button"
              onClick={onToggleCurrency}
              title="Ganti mata uang (IDR / USD / INR)"
              className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#9DB0A3] hover:text-[#E8EFE9] transition-colors"
            >
              {currency}
            </button>

            {/* Virtual Placement / Live Demo CTA */}
            <button
              type="button"
              onClick={onOpenLiveDemo}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7BC043] bg-[#7BC043]/10 hover:bg-[#7BC043]/20 border border-[#7BC043]/30 rounded-full transition-colors"
            >
              <Sparkles size={13} />
              <span>O₂ Room Sim</span>
            </button>

            {/* Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Cari tanaman"
              className="p-2 text-[#E8EFE9]/80 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Shopping Bag Button with Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Keranjang belanja ${cartCount} barang`}
              className="relative p-2 text-[#E8EFE9]/80 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[#7BC043] text-[#14201A] font-bold text-xs flex items-center justify-center shadow-lg animate-in zoom-in-75 duration-150">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Buka menu navigasi"
              className="md:hidden p-2 text-[#E8EFE9]/80 hover:text-white rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1F2D25]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <a 
              href="#home" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#E8EFE9] hover:text-[#7BC043]"
            >
              Home
            </a>
            <a 
              href="#top-selling" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#E8EFE9] hover:text-[#7BC043]"
            >
              Plants Catalog (Top Selling)
            </a>
            <a 
              href="#trendy-plants" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#E8EFE9] hover:text-[#7BC043]"
            >
              Our Trendy Plants
            </a>
            <a 
              href="#best-o2" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#E8EFE9] hover:text-[#7BC043]"
            >
              Best O₂ Collection
            </a>
            <a 
              href="#reviews" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#E8EFE9] hover:text-[#7BC043]"
            >
              Customer Reviews
            </a>
            <a 
              href="#footer" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#E8EFE9] hover:text-[#7BC043]"
            >
              Contact Us
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onToggleCurrency}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 text-white"
            >
              Mata Uang: {currency}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLiveDemo();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black bg-[#7BC043] rounded-full"
            >
              <Sparkles size={13} />
              <span>O₂ Room Simulator</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

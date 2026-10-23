import React, { useState } from 'react';
import { Search, X, ShoppingBag } from 'lucide-react';
import { ALL_PRODUCTS } from '../../data/plants';
import { PlantProduct } from '../../types';
import { formatPrice, Currency } from '../../utils/format';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: PlantProduct) => void;
  onAddToCart: (product: PlantProduct) => void;
  currency: Currency;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
  currency,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim() === ''
    ? ALL_PRODUCTS.slice(0, 4) // trending suggestion when empty
    : ALL_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.botanicalName.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#18241E] border border-white/10 rounded-[28px] shadow-2xl p-6 text-[#E8EFE9] z-10">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 pb-4">
          <Search size={22} className="text-[#7BC043] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari tanaman (contoh: Monstera, Kaktus, Calathea, O2, Sukulen)..."
            className="w-full bg-transparent text-base sm:text-lg text-white placeholder-[#9DB0A3]/50 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#9DB0A3] hover:text-white p-1"
            >
              <X size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="text-[#9DB0A3] hover:text-white p-1"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Suggestion / Results Header */}
        <div className="py-3 flex items-center justify-between text-xs text-[#9DB0A3]">
          <span>{query.trim() === '' ? 'Rekomendasi Tanaman Populer' : `${results.length} tanaman ditemukan`}</span>
          <span className="text-[11px] bg-white/5 px-2 py-0.5 rounded text-[#7BC043]">
            Planto Catalog
          </span>
        </div>

        {/* Product Results List */}
        <div className="max-h-96 overflow-y-auto space-y-2.5 pr-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-[#9DB0A3] text-sm">
              Tidak ditemukan tanaman dengan kata kunci "{query}". Coba cari "Calathea", "Monstera", atau "O2".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#7BC043]/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 bg-black/20 rounded-xl p-1 flex items-center justify-center shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#7BC043] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-[#9DB0A3] block">
                      {product.botanicalName} • {product.category}
                    </span>
                    <span className="text-xs font-bold text-[#7BC043] mt-0.5 block">
                      {formatPrice(product.price, currency)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-[#7BC043] text-white hover:text-black transition-colors"
                  title="Tambah ke keranjang"
                >
                  <ShoppingBag size={16} />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, ShoppingBag, Sun, Droplets, PawPrint, Wind, Ruler, Check, Heart } from 'lucide-react';
import { PlantProduct } from '../../types';
import { RatingStars } from '../ui/RatingStars';
import { formatPrice, Currency } from '../../utils/format';

interface ProductDetailModalProps {
  product: PlantProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: PlantProduct, qty: number) => void;
  currency: Currency;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  currency,
}) => {
  const [qty, setQty] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#18241E] border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl text-[#E8EFE9] z-10 my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-[#9DB0A3] hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Plant Image Showcase */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-black/25 rounded-3xl p-6 border border-white/5 relative">
            <button
              type="button"
              onClick={() => setIsFavorited(!isFavorited)}
              aria-label="Simpan ke wishlist"
              className="absolute top-4 left-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9DB0A3] hover:text-red-400 transition-colors"
            >
              <Heart size={18} className={isFavorited ? 'fill-red-500 text-red-500' : ''} />
            </button>

            <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="text-center mt-3">
              <span className="text-[11px] font-mono text-[#9DB0A3]">
                {product.dimensions}
              </span>
            </div>
          </div>

          {/* Right Column: Plant Specifications */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#7BC043] uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-xs text-[#9DB0A3]">•</span>
                <span className="text-xs italic text-[#9DB0A3]">
                  {product.botanicalName}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={product.rating} size={14} />
                <span className="text-xs font-semibold text-[#E8EFE9]">{product.rating}</span>
                <span className="text-xs text-[#9DB0A3]">({product.reviewCount} ulasan pembeli)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9DB0A3] leading-relaxed">
              {product.description}
            </p>

            {/* Quick Plant Care Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                <Wind size={16} className="text-[#7BC043] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#9DB0A3] block">Kapasitas O₂</span>
                  <span className="font-semibold text-white">{product.o2Level} Purifier</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                <Sun size={16} className="text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-[#9DB0A3] block">Kebutuhan Sinar</span>
                  <span className="font-semibold text-white truncate block max-w-[140px]">{product.lightRequirement}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                <Droplets size={16} className="text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-[#9DB0A3] block">Jadwal Siram</span>
                  <span className="font-semibold text-white truncate block max-w-[140px]">{product.waterSchedule}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                <PawPrint size={16} className={product.petSafe ? 'text-[#7BC043]' : 'text-orange-400'} />
                <div>
                  <span className="text-[10px] text-[#9DB0A3] block">Ramah Hewan</span>
                  <span className="font-semibold text-white">{product.petSafe ? 'Aman untuk Anjing/Kucing' : 'Jauhkan dari Peliharaan'}</span>
                </div>
              </div>
            </div>

            {/* Price & Quantity & Add To Cart Button */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#9DB0A3] block">Harga Resmi</span>
                <span className="text-2xl font-bold text-[#7BC043]">
                  {formatPrice(product.price, currency)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center gap-2 bg-black/40 rounded-xl px-3 py-2 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="text-[#9DB0A3] hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-xs font-bold tabular-nums">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="text-[#9DB0A3] hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    justAdded
                      ? 'bg-[#7BC043] text-black shadow-lg shadow-[#7BC043]/30'
                      : 'bg-white/10 hover:bg-[#7BC043] text-white hover:text-black border border-white/20 hover:border-[#7BC043]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={16} />
                      <span>Berhasil Ditambah!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Tambah ke Keranjang</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

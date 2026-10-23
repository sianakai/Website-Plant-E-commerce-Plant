import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { CartItem } from '../../types';
import { formatPrice, Currency } from '../../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  currency: Currency;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 500000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#18241E] border-l border-white/10 shadow-2xl flex flex-col justify-between text-[#E8EFE9] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#7BC043]" />
              <h2 className="text-lg font-semibold tracking-tight">Keranjang Belanja</h2>
              <span className="text-xs bg-[#7BC043]/20 text-[#7BC043] px-2 py-0.5 rounded-full font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#9DB0A3] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="px-6 py-3 bg-[#14201A] border-b border-white/5">
            <div className="flex items-center justify-between text-xs text-[#9DB0A3] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#7BC043]" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#7BC043] font-medium">Selamat! Anda mendapatkan Bebas Ongkir se-Indonesia</span>
                ) : (
                  <span>Tambah <strong className="text-white">{formatPrice(remainingForFreeShipping, currency)}</strong> lagi untuk Bebas Ongkir</span>
                )}
              </span>
              <span className="font-mono text-[11px]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#7BC043] h-full transition-all duration-300 rounded-full" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9DB0A3]">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="text-base font-medium">Keranjang belanja Anda masih kosong</h3>
                <p className="text-xs text-[#9DB0A3] max-w-xs">
                  Pilih tanaman hias favoritmu sekarang untuk menghadirkan udara segar di rumah.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 object-contain rounded-xl bg-black/20 p-1 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#E8EFE9] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#9DB0A3] hover:text-red-400 p-1 transition-colors"
                          title="Hapus barang"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#9DB0A3]">
                        {item.product.potType}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-bold text-[#7BC043]">
                        {formatPrice(item.product.price, currency)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-black/30 rounded-lg px-2 py-1 border border-white/10">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="text-[#9DB0A3] hover:text-white transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="text-xs font-semibold tabular-nums w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="text-[#9DB0A3] hover:text-white transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#14201A] border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs text-[#9DB0A3]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Pengiriman</span>
                  <span className={remainingForFreeShipping === 0 ? 'text-[#7BC043] font-semibold' : 'text-white font-medium'}>
                    {remainingForFreeShipping === 0 ? 'GRATIS' : formatPrice(25000, currency)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                  <span>Total Pembayaran</span>
                  <span className="text-[#7BC043] text-base">
                    {formatPrice(subtotal + (remainingForFreeShipping === 0 ? 0 : 25000), currency)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onCheckout}
                className="w-full py-3.5 px-6 rounded-full bg-[#7BC043] hover:bg-[#8ee04f] text-black font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#7BC043]/20"
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight size={17} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

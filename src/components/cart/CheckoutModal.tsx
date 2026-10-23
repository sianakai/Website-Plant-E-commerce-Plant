import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, ChevronRight, PackageCheck } from 'lucide-react';
import { CartItem, OrderDetails } from '../../types';
import { formatPrice, Currency } from '../../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: OrderDetails) => void;
  currency: Currency;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  currency,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('Budi Santoso');
  const [email, setEmail] = useState('budi.santoso@example.com');
  const [phone, setPhone] = useState('081234567890');
  const [address, setAddress] = useState('Jl. Senopati No. 45, Kebayoran Baru');
  const [city, setCity] = useState('Jakarta Selatan, DKI Jakarta');
  const [courier, setCourier] = useState('JNE Tanaman Aman (Khusus Tanaman)');
  const [paymentMethod, setPaymentMethod] = useState('QRIS (GoPay/OVO/ShopeePay)');
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 500000 ? 0 : 25000;
  const grandTotal = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order: OrderDetails = {
      orderId: `PLNTO-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: address,
      city,
      courier,
      paymentMethod,
      items,
      subtotal,
      shippingFee,
      total: grandTotal,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
    setCompletedOrder(order);
    onOrderSuccess(order);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#18241E] border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl text-[#E8EFE9] z-10 my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-[#9DB0A3] hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-[#7BC043] uppercase tracking-wider">
                Pembayaran Aman (Checkout)
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Pengiriman &amp; Pembayaran Tanaman
              </h2>
              <p className="text-xs text-[#9DB0A3] mt-1">
                Semua tanaman dikemas dengan pelindung sabut kelapa dan box berventilasi khusus.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Customer Contact */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#E8EFE9] uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#7BC043]" />
                  1. Informasi Pembeli
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#9DB0A3] block mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7BC043]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#9DB0A3] block mb-1">WhatsApp / No. HP</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7BC043]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-[#9DB0A3] block mb-1">Alamat Email (Untuk Bukti &amp; Panduan Perawatan)</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7BC043]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-[#E8EFE9] uppercase tracking-wider flex items-center gap-2">
                  <Truck size={16} className="text-[#7BC043]" />
                  2. Alamat Pengiriman
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-[#9DB0A3] block mb-1">Alamat Jalan &amp; No. Rumah</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7BC043]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#9DB0A3] block mb-1">Kota / Kabupaten</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#7BC043]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#9DB0A3] block mb-1">Pilihan Ekspedisi</label>
                    <select
                      value={courier}
                      onChange={(e) => setCourier(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14201A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7BC043]"
                    >
                      <option value="JNE Tanaman Aman (Khusus Tanaman)">JNE Tanaman Aman (Gratis Garansi)</option>
                      <option value="SiCepat Best (1 Hari Sampai)">SiCepat Best (1 Hari Sampai)</option>
                      <option value="GoSend Instant (Jabodetabek)">GoSend Instant (Jabodetabek)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-[#E8EFE9] uppercase tracking-wider flex items-center gap-2">
                  <CreditCard size={16} className="text-[#7BC043]" />
                  3. Metode Pembayaran (Midtrans Gateway)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['QRIS (GoPay/OVO/ShopeePay)', 'BCA Virtual Account', 'Mandiri / BNI VA'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={`p-3 rounded-xl border text-left text-xs transition-colors flex flex-col justify-between ${
                        paymentMethod === m
                          ? 'border-[#7BC043] bg-[#7BC043]/15 text-white'
                          : 'border-white/10 bg-white/5 text-[#9DB0A3] hover:text-white'
                      }`}
                    >
                      <span className="font-semibold">{m}</span>
                      <span className="text-[10px] text-[#7BC043] mt-1">Konfirmasi Otomatis</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-[#9DB0A3]">
                  <span>Jumlah Barang ({items.reduce((a, b) => a + b.quantity, 0)} item)</span>
                  <span className="text-white">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-[#9DB0A3]">
                  <span>Biaya Pengiriman</span>
                  <span className={shippingFee === 0 ? 'text-[#7BC043] font-bold' : 'text-white'}>
                    {shippingFee === 0 ? 'GRATIS ONGKIR' : formatPrice(shippingFee, currency)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                  <span>Total Tagihan</span>
                  <span className="text-[#7BC043] text-lg font-bold">{formatPrice(grandTotal, currency)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#7BC043] hover:bg-[#8ee04f] text-black font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#7BC043]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Konfirmasi Pembayaran ({formatPrice(grandTotal, currency)})</span>
                <ChevronRight size={18} />
              </button>

            </form>
          </div>
        ) : (
          /* Success Screen */
          completedOrder && (
            <div className="py-8 px-2 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#7BC043]/20 border border-[#7BC043] flex items-center justify-center mx-auto text-[#7BC043]">
                <PackageCheck size={36} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Pesanan Berhasil Dikonfirmasi!</h2>
                <p className="text-xs sm:text-sm text-[#9DB0A3] max-w-md mx-auto">
                  Terima kasih, <strong>{completedOrder.customerName}</strong>. Nomor pesanan Anda adalah:
                </p>
                <div className="inline-block px-4 py-2 bg-white/5 border border-[#7BC043]/40 rounded-xl font-mono text-base font-bold text-[#7BC043] tracking-widest mt-2">
                  {completedOrder.orderId}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-[#9DB0A3]">Waktu Pemesanan</span>
                  <span className="text-white font-medium">{completedOrder.date}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-[#9DB0A3]">Metode Pembayaran</span>
                  <span className="text-white font-medium">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-[#9DB0A3]">Kurir Pengiriman</span>
                  <span className="text-white font-medium">{completedOrder.courier}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-[#9DB0A3]">Alamat Tujuan</span>
                  <span className="text-white font-medium">{completedOrder.shippingAddress}, {completedOrder.city}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-white">Total Lunas</span>
                  <span className="text-[#7BC043]">{formatPrice(completedOrder.total, currency)}</span>
                </div>
              </div>

              <p className="text-xs text-[#9DB0A3]">
                Email konfirmasi dan barcode tracking ekspedisi telah dikirimkan ke <strong>{completedOrder.customerEmail}</strong>.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-[#7BC043] text-black font-semibold text-sm hover:bg-[#8ee04f] transition-all cursor-pointer shadow-lg"
              >
                Kembali ke Beranda
              </button>
            </div>
          )
        )}

      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { TrendyPlantsSection } from './components/sections/TrendyPlantsSection';
import { TopSellingSection } from './components/sections/TopSellingSection';
import { CustomerReviewSection } from './components/sections/CustomerReviewSection';
import { BestO2Section } from './components/sections/BestO2Section';
import { Footer } from './components/layout/Footer';

import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { SearchModal } from './components/search/SearchModal';
import { LiveDemoModal } from './components/sections/LiveDemoModal';

import { CartItem, PlantProduct, OrderDetails } from './types';
import { Currency, formatPrice } from './utils/format';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Initial item so the user sees a ready cart experience
    {
      product: {
        id: 'prod-top-1',
        slug: 'calathea-leopardina',
        name: 'Calathea Leopardina',
        botanicalName: 'Calathea concinna',
        category: 'Indoor',
        description: 'Tanaman tropis elegan berdaun beludru dengan motif garis hijau khas.',
        price: 359000,
        imageUrl: '/plants/top-calathea.png',
        stock: 14,
        rating: 4.9,
        reviewCount: 42,
        dimensions: 'Tinggi 35-40 cm • Diameter Pot 15 cm',
        potType: 'Speckled White Ceramic Pot',
        o2Level: 'Optimal',
        careLevel: 'Moderate',
        lightRequirement: 'Cahaya tidak langsung sedang hingga terang',
        waterSchedule: 'Siram 1-2 kali seminggu',
        petSafe: true,
      },
      quantity: 1,
    },
  ]);

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLiveDemoOpen, setIsLiveDemoOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<PlantProduct | null>(null);

  // Filter & Currency states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currency, setCurrency] = useState<Currency>('IDR');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: PlantProduct, qty: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`${product.name} telah ditambahkan ke keranjang`);
  };

  const handleAddMultipleToCart = (products: PlantProduct[]) => {
    products.forEach((p) => handleAddToCart(p, 1));
    setIsCartOpen(true);
    showToast(`Paket ${products.length} tanaman ruangan berhasil dimasukkan ke keranjang`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast(`Tanaman dihapus dari keranjang`);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => {
      if (prev === 'IDR') return 'USD';
      if (prev === 'USD') return 'INR';
      return 'IDR';
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToExplore = () => {
    const el = document.getElementById('top-selling');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#14201A] text-[#E8EFE9] flex flex-col font-['Poppins',sans-serif] selection:bg-[#7BC043]/30 selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLiveDemo={() => setIsLiveDemoOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
        }}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onExplore={scrollToExplore}
          onLiveDemo={() => setIsLiveDemoOpen(true)}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          currency={currency}
        />

        {/* 2. Our Trendy Plants Section */}
        <TrendyPlantsSection
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          currency={currency}
        />

        {/* 3. Our Top Selling Section */}
        <TopSellingSection
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          currency={currency}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 4. Customer Review Section */}
        <CustomerReviewSection />

        {/* 5. Our Best O2 Section */}
        <BestO2Section
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          currency={currency}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        currency={currency}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={(order) => {
          // Clear cart on successful order
          setCartItems([]);
          showToast(`Pesanan ${order.orderId} berhasil dibuat!`);
        }}
        currency={currency}
      />

      {/* Product Quick-View Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, qty) => {
          handleAddToCart(prod, qty);
        }}
        currency={currency}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Live Demo O2 Room Simulation Modal */}
      <LiveDemoModal
        isOpen={isLiveDemoOpen}
        onClose={() => setIsLiveDemoOpen(false)}
        onAddMultipleToCart={handleAddMultipleToCart}
        currency={currency}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#1F2D25] text-white border border-[#7BC043]/40 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 size={18} className="text-[#7BC043] shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

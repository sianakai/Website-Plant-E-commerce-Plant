import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer id="footer" className="bg-[#101915] border-t border-white/5 pt-16 pb-12 text-[#9DB0A3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-6">
            <a href="#" className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-[#E8EFE9] inline-block">
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

            <p className="text-xs sm:text-sm text-[#9DB0A3] max-w-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Social Links (FB, TW, LI) */}
            <div className="flex items-center gap-6 pt-2 font-bold text-sm tracking-wider text-[#E8EFE9]">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#7BC043] transition-colors"
              >
                FB
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#7BC043] transition-colors"
              >
                TW
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#7BC043] transition-colors"
              >
                LI
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-[#E8EFE9]">
              Quick Link's
            </h4>
            
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-[#7BC043] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#top-selling" className="hover:text-[#7BC043] transition-colors">
                  Type's Of plant's
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-[#7BC043] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Kebijakan Privasi: Planto menjamin keamanan data pengiriman dan kerahasiaan Anda 100%."); }} className="hover:text-[#7BC043] transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter Subscription */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-[#E8EFE9]">
              For Every Update.
            </h4>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#7BC043]/15 border border-[#7BC043]/40 text-[#7BC043] text-xs flex items-center gap-2">
                <Check size={16} />
                <span>Terima kasih! Anda berhasil berlangganan newsletter Planto.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    required
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg bg-[#14201A] border border-white/20 text-[#E8EFE9] placeholder-[#9DB0A3]/50 focus:outline-none focus:border-[#7BC043] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold tracking-wider uppercase text-black bg-white hover:bg-[#7BC043] rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}

            <p className="text-[11px] text-[#9DB0A3]/70">
              Dapatkan voucher diskon 15% untuk pembelian tanaman pertamamu setelah subscribe.
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9DB0A3]/60 gap-4">
          <p>planto © all right reserve</p>
          <p className="text-[11px]">Designed with Dark mode UI &amp; Glassmorphism</p>
        </div>

      </div>
    </footer>
  );
};

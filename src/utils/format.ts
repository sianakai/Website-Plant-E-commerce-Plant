export type Currency = 'IDR' | 'USD' | 'INR';

export function formatPrice(amountInIDR: number, currency: Currency = 'IDR'): string {
  if (currency === 'USD') {
    const usd = Math.round(amountInIDR / 15800);
    return `$${usd}`;
  }
  if (currency === 'INR') {
    // 1 INR ~ 190 IDR
    const inr = Math.round(amountInIDR / 190);
    return `Rs. ${inr}/-`;
  }
  
  // Default Indonesian Rupiah formatted according to design requirement
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amountInIDR);
}

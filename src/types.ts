export interface PlantProduct {
  id: string;
  slug: string;
  name: string;
  botanicalName: string;
  category: 'Air Purifying' | 'Indoor' | 'Succulents' | 'Trendy' | 'Bonsai';
  description: string;
  price: number; // in IDR
  originalPrice?: number;
  imageUrl: string;
  isTrending?: boolean;
  isTopSeller?: boolean;
  isO2Plant?: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  dimensions: string;
  potType: string;
  o2Level: 'High' | 'Very High' | 'Optimal';
  careLevel: 'Easy' | 'Moderate' | 'Low Care';
  lightRequirement: string;
  waterSchedule: string;
  petSafe: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  location?: string;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productName?: string;
}

export interface CartItem {
  product: PlantProduct;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  courier: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  date: string;
}

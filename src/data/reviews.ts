import { Review } from '../types';

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Maxn Raval',
    avatar: '/plants/avatar-maxn.png',
    rating: 5,
    location: 'Jakarta Selatan',
    date: '12 Okt 2026',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    verifiedPurchase: true,
    productName: 'Calathea Leopardina',
  },
  {
    id: 'rev-2',
    author: 'venely k',
    avatar: '/plants/avatar-venely.png',
    rating: 5,
    location: 'Surabaya',
    date: '18 Okt 2026',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    verifiedPurchase: true,
    productName: 'For Small Deco Air Plant',
  },
  {
    id: 'rev-3',
    author: 'Lii thakur',
    avatar: '/plants/avatar-lii.png',
    rating: 5,
    location: 'Bandung',
    date: '21 Okt 2026',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    verifiedPurchase: true,
    productName: 'Monstera Deliciosa',
  },
];

export const HERO_TESTIMONIAL: Review = {
  id: 'rev-hero',
  author: 'alena Patel',
  avatar: '/plants/avatar-alena.png',
  rating: 5,
  location: 'Bali',
  date: 'Verified Buyer',
  comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
  verifiedPurchase: true,
  productName: 'Calathea Plant',
};

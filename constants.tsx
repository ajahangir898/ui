
import React from 'react';
import { Product, Category } from './types.ts';

export const COLORS = {
  primary: '#e91e63', // Pink/Magenta
  secondary: '#00AEEF', // Blue from image
  dark: '#333333',
  lightGray: '#f1f5f9',
};

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Learning', icon: '💡' },
  { id: '2', name: 'kids accessories', icon: '🕶️' },
  { id: '3', name: 'Baby Care', icon: '🛁' },
  { id: '4', name: 'Pet Care', icon: '🐾' },
  { id: '5', name: 'Kids Books', icon: '📚' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Kodomo Baby Bath 100ml',
    description: 'The Aveeno Baby calming lotion soothes delicate skin gently. The...',
    brand: 'Kodomo',
    tags: ['Baby Bibs', 'Deal of The Day', 'Flash Sale', 'Popular Products', 'Recent Product'],
    image: 'https://picsum.photos/seed/kodomo/400/400',
    images: [
      'https://picsum.photos/seed/kodomo1/400/400',
      'https://picsum.photos/seed/kodomo2/400/400',
    ],
    price: 295,
    oldPrice: 300,
    rating: 0,
    soldCount: 0,
    coinsReward: 400,
    isSale: true,
  },
  {
    id: 'p2',
    name: 'Meril Baby Gel Strawberry Toothpaste',
    description: 'Meril Baby Gel Strawberry Toothpaste 45 gm is a gentle, fluoride-free...',
    brand: 'Meril',
    tags: ['Daily Essentials', 'Baby Care'],
    image: 'https://picsum.photos/seed/toothpaste1/400/400',
    images: [
      'https://picsum.photos/seed/toothpaste1/400/400',
    ],
    price: 100,
    rating: 0,
    soldCount: 0,
    coinsReward: 50,
    isSale: true,
  }
];

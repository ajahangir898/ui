
import React from 'react';
import { Product, Category } from './types';

export const COLORS = {
  primary: '#e91e63', // Pink/Magenta
  secondary: '#0096d6', // Blue
  dark: '#333333',
  lightGray: '#f1f5f9',
};

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Pet Care', icon: '🐾' },
  { id: '2', name: 'Kids Books', icon: '📚' },
  { id: '3', name: 'Diapers', icon: '👶' },
  { id: '4', name: 'Kids Toys', icon: '🧸' },
  { id: '5', name: 'Clothes', icon: '👕' },
  { id: '6', name: 'Feeding', icon: '🍼' },
  { id: '7', name: 'Health & Safety', icon: '🏥' },
  { id: '8', name: 'Classy Home', icon: '🏠' },
  { id: '9', name: 'Moms Care', icon: '🤱' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aveeno Baby Calming Comfort Lotion 150 ml',
    description: 'The Aveeno Baby calming lotion soothes delicate skin gently. The...',
    image: 'https://picsum.photos/seed/aveeno/400/400',
    price: 1480,
    oldPrice: 2100,
    rating: 0,
    soldCount: 0,
    coinsReward: 500,
    isSale: true,
  },
  {
    id: 'p2',
    name: 'Meril Baby Gel Strawberry Toothpaste',
    description: 'Meril Baby Gel Strawberry Toothpaste 45 gm is a gentle, fluoride-free...',
    image: 'https://picsum.photos/seed/toothpaste/400/400',
    price: 100,
    rating: 0,
    soldCount: 0,
    coinsReward: 50,
    isSale: true,
  },
  {
    id: 'p3',
    name: 'Pepsodent Awesome Orange Toothpaste',
    description: 'Your kids will love the gentle formula of Pepsodent Kids Sweet Strawberry...',
    image: 'https://picsum.photos/seed/pepso/400/400',
    price: 88,
    oldPrice: 90,
    rating: 0,
    soldCount: 1,
    coinsReward: 100,
    isSale: true,
  },
  {
    id: 'p4',
    name: 'Mum Mum Pant System Baby Diaper Pant (M Size)',
    description: 'Our Baby deserves the softest touch like that of a mother. Mum-Mum Baby...',
    image: 'https://picsum.photos/seed/diaper/400/400',
    price: 105,
    oldPrice: 140,
    rating: 0,
    soldCount: 0,
    coinsReward: 100,
    isSale: true,
  },
  {
    id: 'p5',
    name: 'Neocare Premium Belt System Baby Diaper (XL Size)',
    description: 'The Neocare Premium Belt System Baby Diaper is a helpful product. This...',
    image: 'https://picsum.photos/seed/neo/400/400',
    price: 1510,
    oldPrice: 1950,
    rating: 0,
    soldCount: 0,
    coinsReward: 500,
    isSale: true,
  },
];

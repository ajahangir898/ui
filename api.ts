
import { SiteConfig, Product } from './types.ts';
import { MOCK_PRODUCTS, CATEGORIES } from './constants.tsx';

export const fetchSiteConfig = async (): Promise<SiteConfig> => {
  // Simulate API Delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    heroSlides: [
      {
        image: 'https://picsum.photos/seed/hero1/1200/400',
        title: 'সুস্থ শিশু সুখী ভবিষ্যৎ',
        subtitle: 'আপনার শিশুর সুস্থ স্বাস্থ্য নিশ্চিতে সকল পণ্যই পাচ্ছেন কোকোকিডস এ ..',
        phone: '09638-866300'
      },
      {
        image: 'https://picsum.photos/seed/hero2/1200/400',
        title: 'Premium Quality Care',
        subtitle: 'Everything your little one needs for a happy childhood.',
        phone: '09638-866300'
      }
    ],
    categories: CATEGORIES,
    specialOffer: {
      badge: 'Special Offer',
      title: 'Healthy Baby, Happy Smiles!',
      subtitle: 'Discover our premium range of organic baby products curated just for your little ones.',
      buttonText: 'Explore Premium Collection',
      image: 'https://picsum.photos/seed/promo/600/400',
      bgColor: 'bg-blue-600'
    },
    trustItems: [
      { title: 'Quality Assured', desc: '100% Genuine Products', color: 'text-pink-500' },
      { title: 'Secure Payment', desc: 'PCI Compliant Processing', color: 'text-blue-500' },
      { title: 'Fast Delivery', desc: 'Dhaka City 24h Delivery', color: 'text-green-500' },
      { title: 'Easy Returns', desc: '7-Day Hassle Free Returns', color: 'text-orange-500' }
    ],
    flashSaleTime: { h: 19, m: 9, s: 28 }
  };
};

export const fetchProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_PRODUCTS;
};

export const fetchRelatedProducts = async (productId: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  // In a real app, you'd filter by category. For mock, we'll just exclude the current product
  // and pick a random subset to simulate dynamic relevance.
  return MOCK_PRODUCTS
    .filter(p => p.id !== productId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
};

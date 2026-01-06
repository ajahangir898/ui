
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  soldCount: number;
  coinsReward: number;
  isSale: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  phone: string;
}

export interface SpecialOfferConfig {
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  bgColor: string;
}

export interface TrustItem {
  title: string;
  desc: string;
  color: string;
}

export interface SiteConfig {
  heroSlides: HeroSlide[];
  categories: Category[];
  specialOffer: SpecialOfferConfig;
  trustItems: TrustItem[];
  flashSaleTime: { h: number; m: number; s: number };
}

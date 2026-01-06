
import { SiteConfig, Product } from './types.ts';
import { MOCK_PRODUCTS, CATEGORIES } from './constants.tsx';
import { GoogleGenAI, Type } from "@google/genai";

// Replace with your real backend URL when live
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Service layer to handle all database communications.
 * Prepared to switch from Mock to Real API seamlessly.
 */
export const DatabaseService = {
  /**
   * Fetches the dashboard configuration.
   */
  async fetchConfig(): Promise<SiteConfig> {
    try {
      // Simulation of a fetch call
      // const response = await fetch(`${API_BASE_URL}/config`);
      // return await response.json();
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        heroSlides: [
          {
            image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=1200',
            title: 'সুস্থ শিশু সুখী ভবিষ্যৎ',
            subtitle: 'আপনার শিশুর সুস্থ স্বাস্থ্য নিশ্চিতে সকল পণ্যই পাচ্ছেন কোকোকিডস এ ..',
            phone: '09638-866300'
          },
          {
            image: 'https://images.unsplash.com/photo-1555252333-978fead06c04?auto=format&fit=crop&q=80&w=1200',
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
          image: 'https://images.unsplash.com/photo-1544126592-807daf21565c?auto=format&fit=crop&q=80&w=600',
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
    } catch (error) {
      console.error("Config fetch error:", error);
      throw error;
    }
  },

  /**
   * Fetches all products.
   */
  async fetchAllProducts(): Promise<Product[]> {
    try {
      // In production: const response = await fetch(`${API_BASE_URL}/products`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_PRODUCTS;
    } catch (error) {
      return MOCK_PRODUCTS; // Fallback to mock on error
    }
  },

  /**
   * AI-Powered Smart Discovery.
   * Uses Gemini to simulate a smart backend that can "understand" user needs.
   */
  async getSmartSuggestions(context: string): Promise<{ products: Product[], reasoning: string }> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const productsData = MOCK_PRODUCTS.map(p => ({ id: p.id, name: p.name, tags: p.tags }));
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Context: "${context}". Based on these products: ${JSON.stringify(productsData)}, pick the top matches. Return JSON: {ids: string[], reasoning: string}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              ids: { type: Type.ARRAY, items: { type: Type.STRING } },
              reasoning: { type: Type.STRING }
            },
            required: ["ids", "reasoning"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      const matched = MOCK_PRODUCTS.filter(p => data.ids?.includes(p.id));
      return { products: matched, reasoning: data.reasoning };
    } catch (error) {
      console.error("Smart Discovery failed:", error);
      return { products: MOCK_PRODUCTS.slice(0, 3), reasoning: "Handpicked for you." };
    }
  },

  /**
   * Fetches related products for a specific ID.
   */
  async fetchRelatedProducts(productId: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_PRODUCTS
      .filter(p => p.id !== productId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }
};

// Maintaining export names for backward compatibility
export const fetchSiteConfig = DatabaseService.fetchConfig;
export const fetchProducts = DatabaseService.fetchAllProducts;
export const fetchRelatedProducts = DatabaseService.fetchRelatedProducts;

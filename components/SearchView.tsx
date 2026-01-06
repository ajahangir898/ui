
import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, ArrowLeft, Search, Loader2 } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface SearchViewProps {
  query: string;
  allProducts: Product[];
  onProductClick: (product: Product) => void;
  onBack: () => void;
  onAddToCart?: (product: Product) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ query, allProducts, onProductClick, onBack, onAddToCart }) => {
  const [deepSearchResults, setDeepSearchResults] = useState<Product[]>([]);
  const [isDeepSearching, setIsDeepSearching] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);

  // Initial Keyword Search
  const keywordResults = useMemo(() => {
    const q = query.toLowerCase();
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }, [query, allProducts]);

  const performDeepSearch = async () => {
    setIsDeepSearching(true);
    setAiReasoning(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const productContext = allProducts.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an expert shopping assistant for CocoKids. Analyze query: "${query}" from products: ${JSON.stringify(productContext)}. Return JSON: {matchingIds: string[], reasoning: string}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchingIds: { type: Type.ARRAY, items: { type: Type.STRING } },
              reasoning: { type: Type.STRING }
            },
            required: ["matchingIds", "reasoning"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      const matched = allProducts.filter(p => data.matchingIds?.includes(p.id));
      
      setDeepSearchResults(matched);
      setAiReasoning(data.reasoning);
    } catch (error) {
      console.error("Deep search failed:", error);
    } finally {
      setIsDeepSearching(false);
    }
  };

  useEffect(() => {
    if (keywordResults.length < 2) {
      performDeepSearch();
    }
  }, [query]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-in fade-in duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-all w-fit">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-black text-gray-800">Results for "<span className="text-pink-600">{query}</span>"</h2>
          </div>
          <button onClick={performDeepSearch} disabled={isDeepSearching} className="bg-gray-900 hover:bg-pink-600 text-white px-6 py-3 font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 rounded-none">
            {isDeepSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Deep Search
          </button>
        </div>

        {aiReasoning && (
          <div className="bg-blue-600 text-white p-4 mb-8 flex items-start gap-3 shadow-lg animate-in slide-in-from-top-4 duration-500 rounded-none">
            <div className="p-2 bg-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-80 mb-1">AI Shopping Insight</p>
              <p className="text-sm md:text-base font-bold">{aiReasoning}</p>
            </div>
          </div>
        )}

        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-lg font-black text-gray-900 border-b-4 border-blue-500 pb-1">Recommended Matches</h3>
              {isDeepSearching && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
            </div>
            {deepSearchResults.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {deepSearchResults.map(product => (
                  <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} onAddToCart={onAddToCart} />
                ))}
              </div>
            ) : !isDeepSearching && (
              <div className="text-center py-12 bg-white border-2 border-dashed border-gray-200">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-bold">No exact AI matches found. Try broadening your query.</p>
              </div>
            )}
          </div>

          {keywordResults.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-lg font-black text-gray-900 border-b-4 border-gray-200 pb-1">Keyword Matches</h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 opacity-80">
                {keywordResults.map(product => (
                  <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} onAddToCart={onAddToCart} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchView;

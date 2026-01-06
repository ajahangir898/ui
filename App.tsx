
import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Categories from './components/Categories.tsx';
import FlashSale from './components/FlashSale.tsx';
import DealOfTheDay from './components/DealOfTheDay.tsx';
import Footer from './components/Footer.tsx';
import MobileBottomNav from './components/MobileBottomNav.tsx';
import TrustSection from './components/TrustSection.tsx';
import SpecialOffer from './components/SpecialOffer.tsx';
import LoadingFallback from './components/LoadingFallback.tsx';
import FloatingCart from './components/FloatingCart.tsx';
import ProductCard from './components/ProductCard.tsx';
import { DatabaseService } from './api.ts';
import { Product, SiteConfig } from './types.ts';

const ProductView = lazy(() => import('./components/ProductView.tsx'));
const Checkout = lazy(() => import('./components/Checkout.tsx'));
const OrderConfirmed = lazy(() => import('./components/OrderConfirmed.tsx'));
const SearchView = lazy(() => import('./components/SearchView.tsx'));
const CategoryView = lazy(() => import('./components/CategoryView.tsx'));

interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

function App() {
  const [view, setView] = useState<'home' | 'product' | 'checkout' | 'success' | 'search' | 'category'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Smart Discovery State
  const [smartPicks, setSmartPicks] = useState<{ products: Product[], reasoning: string } | null>(null);
  const [isDiscovering, setIsDiscovering] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  useEffect(() => {
    async function loadData() {
      try {
        const [configData, productData] = await Promise.all([
          DatabaseService.fetchConfig(),
          DatabaseService.fetchAllProducts()
        ]);
        setConfig(configData);
        setProducts(productData);
        
        // Initial Smart Discovery
        setIsDiscovering(true);
        const picks = await DatabaseService.getSmartSuggestions("trending premium baby essentials");
        setSmartPicks(picks);
      } catch (error) {
        console.error("Data load error:", error);
      } finally {
        setLoading(false);
        setIsDiscovering(false);
      }
    }
    loadData();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, price: product.price, quantity: 1 }];
    });
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setView('search');
    window.scrollTo(0, 0);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setView('home');
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  if (loading) return <LoadingFallback />;

  return (
    <div className="min-h-screen flex flex-col selection:bg-pink-100 selection:text-pink-600 pb-12 md:pb-0 font-['Inter'] antialiased">
      <Header 
        onLogoClick={navigateToHome} 
        onSearch={handleSearch} 
        products={products}
        onSuggestionClick={navigateToProduct}
        cartCount={totalItems}
      />
      
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          {view === 'home' && config && (
            <div className="animate-in fade-in duration-500 space-y-12 md:space-y-20 pb-20">
              <Hero slides={config.heroSlides} />
              
              <div className="space-y-10">
                <Categories 
                  categories={config.categories} 
                  onViewAll={() => setView('category')}
                />

                {/* AI Smart Discovery Section */}
                <section className="container mx-auto px-4 mt-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="relative">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-pink-500 p-2 rounded-2xl">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        AI Smart Picks
                      </h2>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2 ml-14">Personalized by our AI database</p>
                    </div>
                    {isDiscovering && <div className="flex items-center gap-2 text-blue-500 font-bold text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Analyzing trends...</div>}
                  </div>

                  {smartPicks && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {smartPicks.products.map(p => (
                        <ProductCard key={p.id} product={p} onClick={() => navigateToProduct(p)} onAddToCart={handleAddToCart} />
                      ))}
                    </div>
                  )}
                </section>

                <FlashSale 
                  products={products} 
                  initialTime={config.flashSaleTime} 
                  onProductClick={navigateToProduct}
                  onAddToCart={handleAddToCart}
                />
              </div>

              <SpecialOffer config={config.specialOffer} />
              
              <DealOfTheDay products={products} onProductClick={navigateToProduct} onAddToCart={handleAddToCart} />
              
              <TrustSection items={config.trustItems} />
            </div>
          )}

          {view === 'search' && (
            <SearchView 
              query={searchQuery} 
              allProducts={products} 
              onProductClick={navigateToProduct} 
              onBack={navigateToHome}
              onAddToCart={handleAddToCart}
            />
          )}

          {view === 'category' && (
            <CategoryView 
              allProducts={products}
              categories={config?.categories || []}
              onProductClick={navigateToProduct}
              onAddToCart={handleAddToCart}
              onBack={navigateToHome}
            />
          )}

          {view === 'product' && selectedProduct && (
            <ProductView 
              product={selectedProduct} 
              onBuyNow={() => setView('checkout')} 
              onAddToCart={() => handleAddToCart(selectedProduct)}
              onProductClick={navigateToProduct}
            />
          )}

          {view === 'checkout' && (
            <Checkout 
              onConfirm={() => {
                setCart([]);
                setView('success');
              }} 
              onBack={navigateToHome} 
              cartItems={cart}
              totalPrice={totalPrice}
              allProducts={products}
            />
          )}

          {view === 'success' && (
            <OrderConfirmed onContinue={navigateToHome} />
          )}
        </Suspense>
      </main>

      <FloatingCart itemCount={totalItems} totalPrice={totalPrice} onClick={() => setView('checkout')} />
      <Footer />
      <MobileBottomNav currentView={view} onNavigate={setView} cartCount={totalItems} />
    </div>
  );
}

export default App;
